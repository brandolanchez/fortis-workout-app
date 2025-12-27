import { Link } from 'react-router-dom';
import fm from 'front-matter';

// Importa dinámicamente todos los archivos .md de la carpeta /posts
const postModules = import.meta.glob('../posts/*.md', { as: 'raw', eager: true });

// Procesa cada archivo para extraer sus metadatos (título, fecha, etc.) y el 'slug' (URL)
const posts = Object.entries(postModules).map(([path, rawContent]) => {
  const { attributes } = fm(rawContent);
  const slug = path.split('/').pop().replace('.md', '');
  return {
    ...attributes,
    slug,
  };
});

// Ordena los posts por fecha, del más nuevo al más viejo
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

const BlogPage = () => {
  return (
    <div className="pt-32 pb-12 bg-black font-sans text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-heading text-6xl md:text-7xl text-center mb-12">
          Nuestro Blog
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              to={`/blog/${post.slug}`} 
              className="block bg-gray-900 p-8 rounded-lg border border-gray-800 hover:border-gray-600 transition-all duration-300"
            >
              <h2 className="font-heading text-3xl text-white">{post.title}</h2>
              <p className="text-gray-400 mt-2 text-sm">
                {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-gray-300 mt-4">{post.description}</p>
              <span className="mt-6 inline-block font-bold text-white group-hover:text-gray-200">
                Leer más &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
