// Se ejecuta después de `vite build`.
// Genera un index.html por ruta (dist/faq/index.html, dist/blog/<post>/index.html, etc.)
// con su propio título, descripción, canonical, Open Graph y datos estructurados,
// para que Google y las redes sociales lean la información correcta de cada página
// sin depender de JavaScript. También regenera dist/sitemap.xml.

import fs from 'node:fs';
import path from 'node:path';
import fm from 'front-matter';
import { SEO, SITE_URL, SITE_NAME, canonicalFor } from '../src/config/seo.js';
import { faqs } from '../src/config/faq.js';

const DIST = path.resolve('dist');
const POSTS = path.resolve('src/posts');
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const setTag = (html, regex, replacement) => {
  if (!regex.test(html)) throw new Error(`No se encontró la etiqueta: ${regex}`);
  return html.replace(regex, replacement);
};

const render = ({ route, title, description, jsonLd, noscript, type = 'website' }) => {
  const url = canonicalFor(route);
  let html = template;
  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  html = setTag(html, /<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(description)}">`);
  html = setTag(html, /<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`);
  html = setTag(html, /<meta property="og:type" content="[^"]*">/, `<meta property="og:type" content="${type}">`);
  html = setTag(html, /<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(title)}">`);
  html = setTag(html, /<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(description)}">`);
  html = setTag(html, /<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`);
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
  const title = `${a.title} | ${SITE_NAME}`;
  const description = a.description || SEO['/blog'].description;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: a.title,
    description,
    datePublished: a.date,
    inLanguage: 'es-VE',
    mainEntityOfPage: canonicalFor(route),
    author: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` },
    publisher: { '@id': `${SITE_URL}/#club` },
  };
  write(route, render({ route, title, description, jsonLd, type: 'article', noscript: noscriptFor(a.title, description) }));
  sitemap.push({ loc: canonicalFor(route), lastmod: String(a.date || today).slice(0, 10), priority: '0.5' });
}

fs.writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap
    .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.priority}</priority></url>`)
    .join('\n')}\n</urlset>\n`
);

console.log(`SEO: ${sitemap.length} páginas con meta propia y sitemap actualizado.`);
