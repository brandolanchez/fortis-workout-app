import { usePageTitle } from '../hooks/usePageTitle';

const G = ({ children }) => <span className="text-fortis-gold font-bold">{children}</span>;

const Illustration = ({ src, alt, className = 'max-w-md' }) => (
  <div className="flex justify-center my-10">
    <img src={src} alt={alt} loading="lazy" className={`w-full ${className} rounded-lg shadow-lg`} />
  </div>
);

const rules = [
  {
    title: 'Objeto',
    body: [
      <>Este reglamento busca mantener un ambiente <G>seguro</G>, <G>respetuoso</G> y <G>profesional</G> en los entrenamientos de calistenia realizados por <G>Fortis Workout</G> en el Parque Vereda del Lago y en cualquier otro espacio donde se represente al club.</>,
    ],
  },
  {
    title: 'Respeto y convivencia',
    body: [
      <>Todos los miembros, invitados y visitantes deben ser tratados con <G>respeto</G>, sin gritos, insultos, burlas ni actitudes agresivas.</>,
      'No se tolerarán conductas discriminatorias por nivel, apariencia, género, edad u otra condición; cualquier conflicto debe resolverse de forma calmada o con apoyo del entrenador responsable.',
    ],
  },
  {
    title: 'Uso del espacio y del equipo',
    body: [
      'Mantén el área de entrenamiento limpia y ordenada: no dejes basura, botellas ni equipo tirado; usa papeleras y recicla cuando sea posible.',
      'Usa las barras, anillos y demás implementos de forma cuidadosa y devuélvelos en buen estado para el siguiente usuario; cualquier daño debe reportarse al responsable del grupo.',
    ],
  },
  {
    title: 'Turnos y consideración con otros',
    body: [
      'Comparte el espacio y el equipo: en horarios de alta afluencia, limita el tiempo en cada estación y permite que otros alternen series contigo.',
      'Evita bloquear zonas de paso o grabar videos ocupando equipos por tiempo excesivo cuando haya personas esperando para entrenar.',
    ],
  },
  {
    title: 'Inclusión y apoyo a todos los niveles',
    body: [
      'Fortis es una comunidad abierta a principiantes y atletas avanzados; no se permiten burlas ni críticas destructivas hacia el nivel o condición física de nadie.',
      'Se espera una actitud de mentoría: quien tenga más experiencia debe estar dispuesto a orientar, corregir técnica básica y animar a quienes comienzan.',
    ],
    after: <Illustration src="/assets/Img/mochuelo/espacio.webp" alt="Ilustración del mochuelo: cuida el espacio" className="max-w-lg" />,
  },
  {
    title: 'Responsabilidad y seguridad personal',
    body: [
      'Cada miembro es responsable de escuchar a su cuerpo, calentar adecuadamente y no intentar movimientos para los que aún no tiene la base necesaria.',
      'Si no sabes cómo ejecutar un ejercicio, pide ayuda al entrenador o a un miembro con más experiencia antes de intentarlo; cualquier lesión o malestar debe informarse de inmediato.',
    ],
  },
  {
    title: 'Normas del parque y de la ciudad',
    body: [
      'Deben respetarse las reglas del Parque Vereda del Lago y de las autoridades locales: no rayar, golpear ni modificar estructuras, y evitar ruidos excesivos o conductas que afecten a otros usuarios del parque.',
      'Está prohibido consumir alcohol, drogas u otras sustancias que comprometan la seguridad durante los entrenamientos o actividades oficiales de Fortis.',
    ],
  },
  {
    title: 'Lenguaje y conducta pública',
    body: [
      'Se exige un lenguaje respetuoso: no se permiten palabras ofensivas, groseras ni comentarios que humillen a otros miembros o usuarios del parque.',
      'Se promueve el uso de un lenguaje positivo y constructivo que motive, corrija con respeto y represente bien la imagen del club frente a familias, niños y posibles patrocinadores.',
    ],
  },
  {
    title: 'Hidratación y cuidado del entorno',
    body: [
      'Cada miembro debe traer su propia hidratación y procurar beber agua con regularidad durante la sesión.',
      'No dejes envases vacíos en el suelo o sobre las estructuras; llévalos contigo hasta un punto de reciclaje o basura.',
    ],
    after: <Illustration src="/assets/Img/mochuelo/agua.webp" alt="Ilustración del mochuelo: hidrátate" />,
  },
  {
    title: 'Participación en actividades Fortis',
    body: [
      'Se anima a los miembros a participar en entrenamientos grupales, retos internos, competencias y eventos benéficos organizados por Fortis, respetando siempre las instrucciones de los responsables.',
      'En actividades donde se use la marca Fortis (camisetas, redes, eventos), los participantes deben cumplir este reglamento, ya que representan a la comunidad frente al público y posibles patrocinadores.',
    ],
  },
  {
    title: 'Incumplimiento de las normas',
    body: [
      'Ante una falta leve, se realizará una llamada de atención y recordatorio del reglamento; en caso de conductas repetidas o graves, el miembro podrá ser invitado a retirarse de la sesión o, en última instancia, del club.',
      <>La prioridad siempre será proteger la seguridad, la armonía del grupo y la buena reputación de <G>Fortis Workout</G> dentro del parque y ante marcas aliadas.</>,
    ],
    after: <Illustration src="/assets/Img/mochuelo/expulsion.webp" alt="Ilustración del mochuelo: incumplimiento de las normas" />,
  },
];

const ReglamentoPage = () => {
  usePageTitle('Reglamento');

  return (
    <div className="bg-black text-white min-h-screen font-sans pt-8 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="font-heading text-4xl md:text-6xl mb-10 text-fortis-gold">
          Reglamento de la comunidad Fortis Workout
        </h1>
        <Illustration src="/assets/Img/mochuelo/mandamientos.webp" alt="Mandamientos Fortis ilustrados con el mochuelo" />

        <div className="space-y-10 text-stone-300 text-lg leading-relaxed">
          {rules.map((rule, i) => (
            <article key={rule.title}>
              <h2 className="font-heading text-2xl md:text-3xl text-fortis-gold">
                <span className="text-stone-500 mr-2">{i + 1}.</span>
                {rule.title}
              </h2>
              <div className="mt-3 space-y-3">
                {rule.body.map((p, j) => <p key={j}>{p}</p>)}
              </div>
              {rule.after}
            </article>
          ))}
        </div>

        <p className="text-stone-500 text-sm mt-12">Última actualización: 2025.</p>
      </div>
    </div>
  );
};

export default ReglamentoPage;
