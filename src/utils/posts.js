// Todos los posts de /src/posts/*.md. El nombre del archivo es la URL: /blog/<archivo>.
// Campos del encabezado (front matter):
//   title        H1 del artículo (obligatorio)
//   seoTitle     título para Google, máximo 60 caracteres (si falta se usa title)
//   description  meta descripción, máximo 155 caracteres
//   date         fecha de publicación, AAAA-MM-DD
//   image        imagen de portada (ruta dentro de /public)
//   imageAlt     texto alternativo de la portada
//   keywords     palabra clave principal y secundarias (lista)
//   faq          preguntas frecuentes del artículo: lista de { q, a }
const modules = import.meta.glob('../posts/*.md', { query: '?post', import: 'default', eager: true });

const wordsPerMinute = 200;

export const posts = Object.entries(modules)
  .map(([path, { attributes, body }]) => {
    const slug = path.split('/').pop().replace('.md', '');
    const words = body.split(/\s+/).filter(Boolean).length;
    return {
      ...attributes,
      slug,
      body,
      readingMinutes: Math.max(1, Math.round(words / wordsPerMinute)),
    };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export const getPost = (slug) => posts.find((p) => p.slug === slug);
