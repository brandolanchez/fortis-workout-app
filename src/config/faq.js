// Preguntas frecuentes. Las usa la página /faq y el script de build (datos estructurados FAQPage).
import { SCHEDULE, SCHEDULE_NOTE, PRICING } from './site.js';

export const faqs = [
  {
    q: '¿Dónde puedo hacer calistenia en Maracaibo?',
    a: 'Entrenamos en las barras del Parque Vereda del Lago, diagonal a las gradas. Es un gimnasio al aire libre y ahí nos reunimos en grupo.',
  },
  {
    q: '¿Necesito experiencia previa?',
    a: 'No. Hay progresiones para todos los niveles, desde quien todavía no puede hacer una dominada hasta quien trabaja estáticos avanzados.',
  },
  {
    q: '¿Qué días y a qué hora entrenan?',
    a: SCHEDULE
      ? `${SCHEDULE}, en las barras del Parque Vereda del Lago.${SCHEDULE_NOTE ? ` ${SCHEDULE_NOTE}` : ''}`
      : 'Escríbenos por WhatsApp y te enviamos los horarios de la semana.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: PRICING || 'Escríbenos por WhatsApp y te enviamos precios y modalidades.',
  },
  {
    q: '¿Hay clases de calistenia para principiantes?',
    a: 'Sí. La mayoría empezó sin experiencia. Arrancas con progresiones básicas y avanzas a tu ritmo, con la técnica corregida por el grupo.',
  },
  {
    q: '¿Qué necesito llevar?',
    a: 'Ropa cómoda, agua y ganas de esforzarte. Si tienes magnesio o equipo ligero, puedes traerlo.',
  },
  {
    q: '¿Es seguro entrenar en el parque?',
    a: 'Entrenamos en grupo, en un área conocida y concurrida, y cuidamos la técnica para reducir el riesgo de lesiones.',
  },
  {
    q: '¿Cómo me uno?',
    a: 'Escríbenos por WhatsApp. Te contamos horarios y modalidad, y te agregamos al grupo.',
  },
];
