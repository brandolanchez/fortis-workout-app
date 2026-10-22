import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaWhatsapp } from 'react-icons/fa';
import { formatDate } from '../utils/date';
import { posts, getPost } from '../utils/posts';
import { applySeo } from '../hooks/usePageTitle';
import ShareBar from '../components/ShareBar';
import { canonicalFor } from '../config/seo';
import { waLink, WA_MESSAGES, SCHEDULE } from '../config/site';

// Enlaces internos (/faq, /blog/...) navegan dentro del sitio; los externos abren en otra pestaña.
const SmartLink = ({ href = '', children, ...props }) => {
  const cls = 'text-fortis-gold underline underline-offset-4 hover:text-white';
  if (href.startsWith('/')) return <Link to={href} className={cls}>{children}</Link>;
  return <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...props}>{children}</a>;
};

const markdownComponents = {
  // El título del post ya es el H1 de la página; un "#" dentro del Markdown se muestra como H2.
  h1: ({ ...props }) => <h2 className="font-heading text-4xl md:text-5xl text-white mt-12 mb-5" {...props} />,
  h2: ({ ...props }) => <h2 className="font-heading text-3xl md:text-4xl text-white mt-12 mb-4 leading-tight" {...props} />,
  h3: ({ ...props }) => <h3 className="font-heading text-2xl md:text-3xl text-white mt-8 mb-3 leading-tight" {...props} />,
  p: ({ ...props }) => <p className="mb-6 leading-relaxed text-lg" {...props} />,
  ul: ({ ...props }) => <ul className="list-disc pl-6 mb-6 space-y-2 text-lg marker:text-fortis-gold" {...props} />,
  ol: ({ ...props }) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-lg marker:text-fortis-gold" {...props} />,
  li: ({ ...props }) => <li className="leading-relaxed pl-1" {...props} />,
  strong: ({ ...props }) => <strong className="font-bold text-white" {...props} />,
  a: SmartLink,
  blockquote: ({ ...props }) => <blockquote className="border-l-4 border-fortis-gold pl-5 my-8 text-xl text-stone-200" {...props} />,
  table: ({ ...props }) => (
    <div tabIndex={0} role="region" aria-label="Tabla comparativa" className="my-8 overflow-x-auto rounded-lg border border-stone-800">
      <table className="w-full min-w-[36rem] text-left text-base" {...props} />
    </div>
  ),
  thead: ({ ...props }) => <thead className="bg-stone-900 text-white" {...props} />,
  th: ({ ...props }) => <th className="px-4 py-3 font-bold align-bottom" {...props} />,
  td: ({ ...props }) => <td className="px-4 py-3 border-t border-stone-800 align-top" {...props} />,
  img: ({ alt, ...props }) => <img alt={alt || ''} loading="lazy" className="w-full h-auto rounded-lg my-8" {...props} />,
  hr: () => <hr className="my-12 border-stone-800" />,
};

// Divide el texto antes del subtítulo (##) más cercano a la mitad,
// para insertar ahí un llamado a la acción intermedio.
const splitForMidCta = (body) => {
  const positions = [...body.matchAll(/\n## /g)].map((m) => m.index);
  if (positions.length < 3) return [body, ''];
  const middle = body.length / 2;
  const candidates = positions.slice(1, -1);
  const cut = candidates.reduce((best, pos) => (Math.abs(pos - middle) < Math.abs(best - middle) ? pos : best), candidates[0]);
  return [body.slice(0, cut), body.slice(cut)];
};

const MidCta = () => (
  <aside className="my-10 rounded-lg border border-fortis-gold/60 bg-stone-900 p-6">
    <p className="font-heading text-2xl text-white">¿Prefieres aprenderlo entrenando?</p>
    <p className="mt-2 text-lg">
      Entrenamos en grupo en las barras de la Vereda del Lago, de lunes a sábado. $35 al mes por tres sesiones a la semana.
    </p>
    <a
      href={waLink(WA_MESSAGES.entrenar)}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-flex items-center gap-2 font-bold text-fortis-gold underline underline-offset-4 hover:text-white"
    >
      <FaWhatsapp size={18} /> Consultar por WhatsApp
    </a>
  </aside>
);

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = getPost(slug);

  useEffect(() => {
    if (post) {
      applySeo({
        title: `${post.seoTitle || post.title}${post.seoTitle ? '' : ' | Fortis Workout'}`,
        description: post.description,
        path: `/blog/${slug}`,
      });
    } else {
      applySeo({ title: 'Post no encontrado | Fortis Workout', noindex: true });
    }
  }, [post, slug]);

  if (!post) {
    return (
      <div className="pt-16 text-center text-white font-sans min-h-[70vh] px-4">
        <h1 className="text-5xl font-heading">Este post no existe</h1>
        <p className="mt-4 text-lg text-stone-400">Puede que el enlace esté mal escrito o que el post se haya movido.</p>
        <Link to="/blog" className="mt-8 inline-block bg-fortis-gold text-black font-bold py-3 px-6 rounded-lg">
          Volver al blog
        </Link>
      </div>
    );
  }

  const related = posts.filter((p) => p.slug !== slug).slice(0, 3);
  const [firstHalf, secondHalf] = splitForMidCta(post.body);

  return (
    <div className="pt-8 pb-20 bg-black font-sans text-stone-300">
      <article className="max-w-3xl mx-auto px-4">
        <header className="mb-10">
          <Link to="/blog" className="text-stone-400 hover:text-white text-sm">Blog</Link>
          <h1 className="mt-3 font-heading text-5xl md:text-6xl text-white leading-[0.95]">{post.title}</h1>
          <p className="text-stone-400 mt-4 text-sm">
            {formatDate(post.date)} · {post.readingMinutes} min de lectura
          </p>
          {post.image && (
            <img
              src={post.image}
              alt={post.imageAlt || ''}
              className="mt-8 w-full h-64 md:h-96 object-cover rounded-lg"
              fetchpriority="high"
            />
          )}
        </header>

        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {firstHalf}
        </ReactMarkdown>
        {secondHalf && (
          <>
            <MidCta />
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {secondHalf}
            </ReactMarkdown>
          </>
        )}

        {Array.isArray(post.faq) && post.faq.length > 0 && (
          <section className="mt-14">
            <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">Preguntas frecuentes</h2>
            <dl className="divide-y divide-stone-800 border-y border-stone-800">
              {post.faq.map((f) => (
                <div key={f.q} className="py-5">
                  <dt className="font-heading text-2xl text-white">{f.q}</dt>
                  <dd className="mt-2 text-lg leading-relaxed">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <ShareBar
          title={post.title}
          description={post.description}
          image={post.image}
          url={canonicalFor(`/blog/${slug}`)}
        />

        <aside className="mt-14 rounded-lg bg-fortis-gold text-black p-6 md:p-8">
          <p className="font-heading text-3xl md:text-4xl leading-tight">Entrena con nosotros en la Vereda del Lago</p>
          <p className="mt-3 text-lg">
            Barras del Parque Vereda del Lago, diagonal a las gradas. {SCHEDULE}
          </p>
          <a
            href={waLink(WA_MESSAGES.entrenar)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 bg-black text-white font-bold py-3 px-6 rounded-md hover:bg-stone-800"
          >
            <FaWhatsapp size={22} />
            Quiero entrenar
          </a>
        </aside>
      </article>

      {related.length > 0 && (
        <nav className="max-w-3xl mx-auto px-4 mt-16" aria-label="Más artículos">
          <h2 className="font-heading text-3xl text-white mb-6">Sigue leyendo</h2>
          <ul className="divide-y divide-stone-800 border-y border-stone-800">
            {related.map((p) => (
              <li key={p.slug}>
                <Link to={`/blog/${p.slug}`} className="block py-4 group">
                  <span className="font-heading text-2xl text-white group-hover:text-fortis-gold">{p.title}</span>
                  {p.description && <span className="block mt-1 text-stone-400 line-clamp-2">{p.description}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default BlogPostPage;
