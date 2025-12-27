import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import fm from 'front-matter';

// Define cómo se verán los elementos HTML generados por Markdown
const markdownComponents = {
  h1: ({ ...props }) => <h1 className="font-heading text-4xl md:text-5xl mt-8 mb-6" {...props} />,
  h2: ({ ...props }) => <h2 className="font-heading text-3xl md:text-4xl mt-6 mb-4" {...props} />,
  h3: ({ ...props }) => <h3 className="font-heading text-2xl md:text-3xl mt-4 mb-2" {...props} />,
  p: ({ ...props }) => <p className="mb-6 leading-relaxed text-lg" {...props} />,
  ul: ({ ...props }) => <ul className="list-disc list-inside mb-6 pl-4 space-y-2" {...props} />,
  li: ({ ...props }) => <li className="leading-relaxed" {...props} />,
  strong: ({ ...props }) => <strong className="font-bold text-white" {...props} />,
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
      } catch (err) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (isLoading) {
    return <div className="pt-32 text-center text-white font-sans text-2xl">Cargando...</div>;
  }

  if (hasError || !post) {
    return (
      <div className="pt-32 text-center text-white font-sans min-h-screen">
        <h1 className="text-6xl font-heading">Error 404</h1>
        <p className="mt-4 text-xl">El post que buscas no existe.</p>
        <Link to="/blog" className="mt-8 inline-block bg-gray-100 text-black font-bold py-3 px-6 rounded-lg">
          Volver al Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-black font-sans text-gray-300">
      <div className="max-w-3xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="font-heading text-5xl md:text-6xl text-white">{post.data.title}</h1>
          <p className="text-gray-400 mt-4 text-sm">
            {new Date(post.data.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </header>

        <article>
          <ReactMarkdown components={markdownComponents}>
            {post.content}
          </ReactMarkdown>
        </article>

        <div className="text-center mt-16 border-t border-gray-800 pt-8">
          <Link to="/blog" className="font-bold text-lg text-white hover:text-gray-400 transition-colors">
            &larr; Volver a todos los posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
