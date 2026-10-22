// Imágenes que tienen versión de 800 px para móvil (archivo con sufijo -800.webp).
const HAS_800 = new Set([
  '/assets/Img/nosotros/20251216_175133.webp',
  '/assets/Img/nosotros/20251216_175758.webp',
  '/assets/Img/nosotros/20251216_182659.webp',
  '/assets/Img/nosotros/20251216_203959.webp',
  '/assets/Img/nosotros/20251216_180228.webp',
  '/assets/Img/nosotros/20251216_181150.webp',
  '/assets/Img/Place/photo_2025-12-25_10-43-16.webp',
  '/assets/Img/nosotros/tirados-al-suelo.webp',
  '/assets/Img/nosotros/grupo-desktop.webp',
  '/assets/Img/nosotros/grupo-movil.webp',
  '/assets/Img/mochuelo/mochuelo-ilustracion.webp',
]);

const WIDTHS = {
  '/assets/Img/nosotros/grupo-movil.webp': 1000,
  '/assets/Img/mochuelo/mochuelo-ilustracion.webp': 896,
  '/assets/Img/Place/photo_2025-12-25_10-43-16.webp': 1280,
  '/assets/Img/nosotros/tirados-al-suelo.webp': 1400,
};

// Devuelve src + srcSet para que el navegador elija la versión de 800 px en pantallas pequeñas.
export const responsive = (src, sizes = '100vw') => {
  if (!src || !HAS_800.has(src)) return { src };
  const small = src.replace(/\.webp$/, '-800.webp');
  const full = WIDTHS[src] || 1600;
  return { src, srcSet: `${small} 800w, ${src} ${full}w`, sizes };
};
