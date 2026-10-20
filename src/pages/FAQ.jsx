import { waLink, WA_MESSAGES } from '../config/site';
import { faqs } from '../config/faq';
import { usePageTitle } from '../hooks/usePageTitle';


const FAQ = () => {
  usePageTitle('Preguntas frecuentes');

  return (
    <section className="bg-black text-white min-h-screen pt-8 pb-20 px-4 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-4xl md:text-6xl text-fortis-gold mb-10">Preguntas frecuentes</h1>

        <dl className="divide-y divide-stone-800 border-y border-stone-800">
          {faqs.map((f) => (
            <div key={f.q} className="py-6">
              <dt className="font-heading text-2xl md:text-3xl text-white">{f.q}</dt>
              <dd className="mt-2 text-lg text-stone-300 leading-relaxed">{f.a}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12">
          <a
            href={waLink(WA_MESSAGES.entrenar)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-fortis-gold text-black font-bold px-7 py-4 rounded-md text-lg hover:brightness-110"
          >
            Quiero entrenar
          </a>
          <p className="text-sm text-stone-500 mt-3">Te respondemos por WhatsApp.</p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
