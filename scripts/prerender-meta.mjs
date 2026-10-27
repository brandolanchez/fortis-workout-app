// Se ejecuta después de `vite build`.
// Genera un index.html por ruta (dist/faq/index.html, dist/blog/<post>/index.html, etc.)
// con su propio título, descripción, canonical, Open Graph y datos estructurados,
// para que Google y las redes sociales lean la información correcta de cada página
// sin depender de JavaScript. También regenera dist/sitemap.xml.

import fs from 'node:fs';
import path from 'node:path';
import fm from 'front-matter';
import { SEO, SITE_URL, SITE_NAME, OG_IMAGE, canonicalFor } from '../src/config/seo.js';
import { faqs } from '../src/config/faq.js';

const DIST = path.resolve('dist');
const POSTS = path.resolve('src/posts');
let template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

// CSS en línea: evita una petición que bloquea el primer pintado (el CSS completo pesa ~7 KB comprimido).
template = template.replace(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/, (tag, href) => {
  const css = fs.readFileSync(path.join(DIST, href), 'utf8');
  return `<style>${css}</style>`;
});

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const setTag = (html, regex, replacement) => {
  if (!regex.test(html)) throw new Error(`No se encontró la etiqueta: ${regex}`);
  return html.replace(regex, replacement);
};

const render = ({ route, title, description, jsonLd, noscript, image, preload, type = 'website' }) => {
  const url = canonicalFor(route);
  let html = template;
  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  html = setTag(html, /<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(description)}">`);
  html = setTag(html, /<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`);
  html = setTag(html, /<meta property="og:type" content="[^"]*">/, `<meta property="og:type" content="${type}">`);
  html = setTag(html, /<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(title)}">`);
  html = setTag(html, /<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(description)}">`);
  html = setTag(html, /<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`);
  if (image) html = setTag(html, /<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${image}">`);
  if (image) html = html.replace(/\s*<meta property="og:image:(width|height)" content="\d+">/g, '');
  if (preload) html = html.replace('</head>', `    ${preload}\n  </head>`);
  if (jsonLd) {
    html = html.replace(
      '<!--structured-data-->',
      `<!--structured-data-->\n    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
    );
  }
  if (noscript) {
    html = html.replace('<div id="root"></div>', `<div id="root"></div>\n    <noscript>${noscript}</noscript>`);
  }
  return html;
};

// Archivos JS de la página de artículo (se cargan aparte), para precargarlos en cada post.
const assetFiles = fs.readdirSync(path.join(DIST, 'assets'));
const postChunks = assetFiles.filter((f) => /^(BlogPostPage|posts|date)-.*\.js$/.test(f));

// Precarga la portada (versión de 800 px en móvil) y el JS del artículo, para que aparezcan antes.
const postPreloads = (image) => {
  const links = postChunks.map((f) => `<link rel="modulepreload" crossorigin href="/assets/${f}">`);
  if (image) {
    const small = image.replace(/\.webp$/, '-800.webp');
    const hasSmall = fs.existsSync(path.join(DIST, small));
    links.push(
      hasSmall
        ? `<link rel="preload" as="image" href="${image}" imagesrcset="${small} 800w, ${image} 1600w" imagesizes="(max-width: 768px) 100vw, 768px" fetchpriority="high">`
        : `<link rel="preload" as="image" href="${image}" fetchpriority="high">`
    );
  }
  return links.join('\n    ');
};

const write = (route, html) => {
  const file = route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, route, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
};

const noscriptFor = (h1, text) =>
  `<h1>${esc(h1)}</h1><p>${esc(text)}</p><p><a href="${SITE_URL}/">Fortis Workout · Calistenia en Maracaibo</a></p>`;

const sitemap = [];
const today = new Date().toISOString().slice(0, 10);

// Páginas fijas
for (const [route, meta] of Object.entries(SEO)) {
  let jsonLd = null;
  if (route === '/faq') {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    };
  }
  write(route, render({ route, ...meta, jsonLd, noscript: noscriptFor(meta.title, meta.description) }));
  if (route !== '/privacy') sitemap.push({ loc: canonicalFor(route), lastmod: today, priority: route === '/' ? '1.0' : '0.7' });
}

// Posts del blog
for (const file of fs.readdirSync(POSTS).filter((f) => f.endsWith('.md'))) {
  const slug = file.replace(/\.md$/, '');
  const { attributes: a } = fm(fs.readFileSync(path.join(POSTS, file), 'utf8'));
  const route = `/blog/${slug}`;
  const title = a.seoTitle || `${a.title} | ${SITE_NAME}`;
  const description = a.description || SEO['/blog'].description;
  const image = a.image ? `${SITE_URL}${a.image}` : OG_IMAGE;
  const article = {
    '@type': 'BlogPosting',
    headline: a.title,
    description,
    image,
    datePublished: a.date,
    dateModified: a.updated || a.date,
    inLanguage: 'es-VE',
    keywords: Array.isArray(a.keywords) ? a.keywords.join(', ') : undefined,
    mainEntityOfPage: canonicalFor(route),
    author: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` },
    publisher: { '@id': `${SITE_URL}/#club` },
  };
  const graph = [article];
  if (Array.isArray(a.faq) && a.faq.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: a.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
  }
  const jsonLd = { '@context': 'https://schema.org', '@graph': graph };
  write(route, render({ route, title, description, image, jsonLd, preload: postPreloads(a.image), type: 'article', noscript: noscriptFor(a.title, description) }));
  sitemap.push({ loc: canonicalFor(route), lastmod: String(a.date || today).slice(0, 10), priority: '0.5' });
}

fs.writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap
    .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.priority}</priority></url>`)
    .join('\n')}\n</urlset>\n`
);

// llms.txt: resumen del sitio para asistentes y agentes de IA (formato llmstxt.org)
const postList = fs
  .readdirSync(POSTS)
  .filter((f) => f.endsWith('.md'))
  .map((f) => ({ slug: f.replace(/\.md$/, ''), ...fm(fs.readFileSync(path.join(POSTS, f), 'utf8')).attributes }))
  .sort((x, y) => new Date(y.date) - new Date(x.date));

const llms = `# Fortis Workout

> Club de calistenia y street workout en Maracaibo, Venezuela. Entrenamiento en grupo en las barras del Parque Vereda del Lago (diagonal a las gradas), para principiantes y avanzados.

- Horario: lunes a sábado, de 7:00 a 10:00 a. m. y de 6:00 a 10:00 p. m. Cada persona elige sus días.
- Precio: $35 al mes por tres sesiones semanales. Pago mensual.
- Contacto: WhatsApp +58 422-7144707.
- Fortis Workout no ofrece CrossFit ni gimnasio de pesas: entrena calistenia, fuerza y resistencia con el peso corporal.

## Páginas principales

- [Inicio](${SITE_URL}/): qué es Fortis Workout, horario, ubicación y cómo inscribirse.
- [Preguntas frecuentes](${SITE_URL}/faq/): horario, precio, qué llevar y cómo empezar.
- [Patrocinios](${SITE_URL}/patrocinios/): opciones para marcas que quieran patrocinar al club.
- [Reglamento](${SITE_URL}/reglamento/): normas de la comunidad.
- [Blog](${SITE_URL}/blog/): artículos sobre calistenia y entrenamiento al aire libre en Maracaibo.

## Artículos

${postList.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}/)${p.description ? `: ${p.description}` : ''}`).join('\n')}
`;
fs.writeFileSync(path.join(DIST, 'llms.txt'), llms);

console.log(`SEO: ${sitemap.length} páginas con meta propia, sitemap y llms.txt actualizados.`);
