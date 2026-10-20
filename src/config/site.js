// Datos editables del sitio. Si un campo queda vacío, el bloque que lo usa no se muestra.

export const WHATSAPP_NUMBER = '584227144707';
export const WHATSAPP_DISPLAY = '+58 422-7144707';

export const waLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

// Mensajes precargados por intención (así sabes de dónde viene cada contacto).
export const WA_MESSAGES = {
  entrenar: 'Hola, quiero empezar a entrenar con Fortis. ¿Cómo me inscribo?',
  patrocinio: 'Hola, represento a una marca y quiero información para patrocinar a Fortis.',
  dudas: 'Hola, tengo una pregunta sobre la comunidad Fortis.',
  precios: 'Hola, quiero saber el precio del entrenamiento y cómo me inscribo.',
};

// Horario de entrenamiento (se muestra en el hero, en Dónde entrenamos y en el FAQ).
export const SCHEDULE = 'Mañanas de 7:00 a 10:00 a. m. y tardes de 6:00 a 10:00 p. m.';

// Nota adicional (no sale en el hero). Vacío = no se muestra.
export const SCHEDULE_NOTE = 'Sábados: sesiones a convenir según tu agenda.';

// Respuesta de precio en el FAQ.
export const PRICING = '$35 al mes por tres sesiones semanales. El pago es mensual. Escríbenos por WhatsApp si tienes dudas sobre el plan.';

// Métricas para la página de patrocinios. Oculto mientras esté vacío.
// Ej: { value: '40+', label: 'miembros activos' }
export const SPONSOR_STATS = [
  // { value: '', label: 'miembros activos' },
  // { value: '', label: 'seguidores en Instagram' },
  // { value: '', label: 'entrenos por semana en la Vereda' },
  // { value: '', label: 'eventos organizados en 2025' },
];
