// SEO por ruta. Lo usa el sitio (al navegar) y el script de build (scripts/prerender-meta.mjs),
// que genera un HTML por ruta con estos títulos y descripciones para Google y redes sociales.
// Palabra clave principal: "calistenia en Maracaibo".

export const SITE_URL = 'https://fortisworkout.org';
export const SITE_NAME = 'Fortis Workout';
export const OG_IMAGE = `${SITE_URL}/og-fortis.jpg`;

export const SEO = {
  '/': {
    title: 'Calistenia en Maracaibo | Fortis Workout, Vereda del Lago',
    description:
      'Club de calistenia y street workout en Maracaibo. Entrenamiento en grupo en las barras de la Vereda del Lago, para principiantes y avanzados. $35 al mes.',
  },
  '/faq': {
    title: 'Preguntas frecuentes sobre calistenia en Maracaibo | Fortis Workout',
    description:
      'Horarios, precio, qué llevar y cómo empezar a entrenar calistenia en la Vereda del Lago, Maracaibo. No necesitas experiencia previa.',
  },
  '/patrocinios': {
    title: 'Patrocina a un club de calistenia en Maracaibo | Fortis Workout',
    description:
      'Asocia tu marca a la comunidad de calistenia de la Vereda del Lago: indumentaria, eventos y activaciones de marca en Maracaibo.',
  },
  '/blog': {
    title: 'Blog de calistenia y street workout en Maracaibo | Fortis Workout',
    description:
      'Noticias, retos y eventos de la comunidad Fortis Workout, el club de calistenia de la Vereda del Lago en Maracaibo.',
  },
  '/testimonios': {
    title: 'Testimonios de miembros | Fortis Workout, calistenia en Maracaibo',
    description:
      'Lo que dicen los miembros que entrenan calistenia con Fortis Workout en la Vereda del Lago, Maracaibo.',
  },
  '/reglamento': {
    title: 'Reglamento de la comunidad | Fortis Workout',
    description:
      'Normas de convivencia, seguridad y uso del espacio para entrenar con Fortis Workout en el Parque Vereda del Lago.',
  },
  '/privacy': {
    title: 'Políticas de privacidad | Fortis Workout',
    description: 'Cómo Fortis Workout recopila, usa y protege los datos personales de quienes visitan el sitio.',
  },
};

// Netlify sirve cada página como carpeta (/faq/) y redirige /faq a /faq/.
// Por eso todas las direcciones oficiales llevan barra al final.
export const canonicalFor = (path) => `${SITE_URL}${path === '/' ? '/' : path.replace(/\/?$/, '/')}`;
