import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import fm from 'front-matter';
import { formatDate } from '../utils/date';
import { applySeo } from '../hooks/usePageTitle';

// Define cómo se verán los elementos HTML generados por Markdown
const markdownComponents = {
  // El título del post ya es el H1 de la página; un "#" dentro del Markdown se muestra como H2.
  h1: ({ ...props }) => <h2 className="font-heading text-4xl md:text-5xl mt-8 mb-6" {...props} />,
  h2: ({ ...props }) => <h2 className="font-heading text-3xl md:text-4xl mt-6 mb-4" {...props} />,
  h3: ({ ...props }) => <h3 className="font-heading text-2xl md:text-3xl mt-4 mb-2" {...props} />,
  p: ({ ...props }) => <p className="mb-6 leading-relaxed text-lg" {...props} />,
  ul: ({ ...props }) => <ul className="list-disc list-inside mb-6 pl-4 space-y-2" {...props} />,
  li: ({ ...props }) => <li className="leading-relaxed" {...props} />,
  strong: ({ ...props }) => <strong className="font-bold text-white" {...props} />,
  img: ({ alt, ...props }) => <img alt={alt || ''} loading="lazy" className="w-full h-auto rounded-lg my-8" {...props} />,
};

const BlogPostPage = () => {
  const { slug } = useParams(); // Obtiene el 'slug' de la URL (ej. "primera-entrada")
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        // Importa el archivo .md específico basado en el slug de la URL
        const rawContent = await import(`../posts/${slug}.md?raw`);
        const { attributes, body } = fm(rawContent.default);
        setPost({ data: attributes, content: body });
        applySeo({
          title: `${attributes.title} | Fortis Workout`,
          description: attributes.description,
          path: `/blog/${slug}`,
        });
      } catch (err) {
        setHasError(true);
        applySeo({ title: 'Post no encontrado | Fortis Workout', noindex: true });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (isLoading) {
    return <div className="pt-16 min-h-[60vh] text-center text-stone-400 font-sans text-xl">Cargando…</div>;
  }

  if (hasError || !post) {
    return (
      <div className="pt-16 text-center text-white font-sans min-h-[70vh] px-4">
        <h1 className="text-5xl font-heading">Este post no existe</h1>
        <p className="mt-4 text-lg text-stone-400">Puede que el enlace esté mal escrito o que el post se haya movido.</p>
        <Link to="/blog" className="mt-8 inline-block bg-fortis-gold text-black font-bold py-3 px-6 rounded-lg">
          Volver al Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-8 pb-20 bg-black font-sans text-stone-300">
      <div className="max-w-3xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="font-heading text-5xl md:text-6xl text-white">{post.data.title}</h1>
          <p className="text-stone-400 mt-4 text-sm">
            {formatDate(post.data.date)}
          </p>
        </header>

        <article>
          <ReactMarkdown components={markdownComponents}>
            {post.content}
          </ReactMarkdown>
        </article>

        <div className="text-center mt-16 border-t border-stone-800 pt-8">
          <Link to="/blog" className="font-bold text-lg text-white hover:text-stone-400 transition-colors">
            Volver al blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
