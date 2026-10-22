import { useState, useEffect, useRef } from 'react';
import { FaInstagram, FaWhatsapp, FaLink, FaShareAlt } from 'react-icons/fa';

// Botones para compartir un artículo.
// "Historia de Instagram" genera una imagen vertical (1080×1920) con la portada y el título.
// En el teléfono se abre el menú de compartir para mandarla directo a Instagram;
// en computadora se descarga. El enlace se copia para pegarlo en el sticker "Enlace".

const W = 1080;
const H = 1920;

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

const wrapLines = (ctx, text, maxWidth) => {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
};

const buildStoryImage = async ({ title, image }) => {
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  try {
    await document.fonts.load('96px "GillSans-Extended"');
  } catch {
    /* si la fuente no carga se usa la del sistema */
  }

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);

  // Portada en la mitad superior, recortada tipo "cover"
  if (image) {
    try {
      const img = await loadImage(image);
      const areaH = 1150;
      const scale = Math.max(W / img.width, areaH / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      ctx.drawImage(img, (W - dw) / 2, (areaH - dh) / 2, dw, dh);
      const grad = ctx.createLinearGradient(0, areaH - 500, 0, areaH);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(1, 'rgba(0,0,0,1)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, areaH - 500, W, 500);
    } catch {
      /* sin portada, queda el fondo negro */
    }
  }

  // Título
  ctx.fillStyle = '#ffffff';
  ctx.font = '96px "GillSans-Extended", "Arial Narrow", sans-serif';
  const lines = wrapLines(ctx, title, W - 160).slice(0, 5);
  let y = 1180;
  for (const l of lines) {
    ctx.fillText(l, 80, y);
    y += 100;
  }

  // Invitación a tocar el sticker de enlace (se pega debajo, en el espacio libre)
  ctx.fillStyle = '#D99414';
  ctx.font = '44px Lato, Arial, sans-serif';
  ctx.fillText('Lee el artículo completo en el enlace', 80, y + 30);

  // Pie: espacio para el sticker de enlace y marca
  ctx.fillStyle = '#D99414';
  ctx.fillRect(80, H - 250, 120, 8);
  ctx.font = '52px "GillSans-Extended", "Arial Narrow", sans-serif';
  ctx.fillText('Fortis Workout', 80, H - 180);
  ctx.fillStyle = '#d6d3d1';
  ctx.font = '38px Lato, Arial, sans-serif';
  ctx.fillText('Calistenia en la Vereda del Lago · fortisworkout.org', 80, H - 120);

  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
};

const ShareBar = ({ title, description, image, url }) => {
  const [status, setStatus] = useState('');
  const storyUrl = `${url}?utm_source=instagram&utm_medium=story`;
  const storyBlob = useRef(null);

  // La imagen se prepara apenas carga el artículo, para que al tocar el botón
  // el menú de compartir se abra al instante (iPhone lo exige).
  useEffect(() => {
    let cancelled = false;
    const t = setTimeout(async () => {
      const blob = await buildStoryImage({ title, image });
      if (!cancelled) storyBlob.current = blob;
    }, 800);
    return () => { cancelled = true; clearTimeout(t); };
  }, [title, image]);

  const flash = (msg) => {
    setStatus(msg);
    setTimeout(() => setStatus(''), 4000);
  };

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description, url });
      } catch {
        /* el usuario canceló */
      }
    } else if (await copy(url)) {
      flash('Enlace copiado.');
    }
  };

  const shareStory = async () => {
    const copied = await copy(storyUrl);
    const blob = storyBlob.current || (await buildStoryImage({ title, image }));
    if (!blob) return flash('No se pudo crear la imagen.');
    const file = new File([blob], 'fortis-historia.png', { type: 'image/png' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file] });
        flash(copied ? 'Enlace copiado: en Instagram agrega el sticker "Enlace" y pégalo.' : '');
        return;
      } catch {
        /* canceló o falló: se descarga */
      }
    }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'fortis-historia.png';
    a.click();
    URL.revokeObjectURL(a.href);
    flash(copied
      ? 'Imagen descargada y enlace copiado. Súbela a tu historia y pega el enlace con el sticker "Enlace".'
      : 'Imagen descargada. Súbela a tu historia y agrega el enlace con el sticker "Enlace".');
  };

  const btn = 'inline-flex items-center gap-2 rounded-md border border-stone-700 px-4 py-3 font-bold text-white hover:border-fortis-gold hover:text-fortis-gold transition-colors';

  return (
    <section className="mt-14" aria-label="Compartir artículo">
      <h2 className="font-heading text-3xl text-white">Comparte este artículo</h2>
      <p className="mt-2 text-stone-400">Si le sirve a alguien que conoces, mándaselo o súbelo a tu historia.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={shareStory} className="inline-flex items-center gap-2 rounded-md border border-fortis-gold bg-fortis-gold px-4 py-3 font-bold text-black hover:brightness-110 transition">
          <FaInstagram size={20} /> Historia de Instagram
        </button>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={btn}
        >
          <FaWhatsapp size={20} /> WhatsApp
        </a>
        <button type="button" onClick={shareNative} className={btn}>
          <FaShareAlt size={18} /> Compartir
        </button>
        <button type="button" onClick={async () => flash((await copy(url)) ? 'Enlace copiado.' : 'No se pudo copiar.')} className={btn}>
          <FaLink size={18} /> Copiar enlace
        </button>
      </div>
      <p className="mt-3 min-h-[1.5rem] text-sm text-fortis-gold" role="status" aria-live="polite">{status}</p>
    </section>
  );
};

export default ShareBar;
