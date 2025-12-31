import { Link } from 'react-router-dom';
import fm from 'front-matter';
import { useHivePosts } from '../hooks/useHivePosts';

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
  const { posts: hivePosts, loading } = useHivePosts('hive-148971'); // Using the Fortis tag

  // Combine and sort posts
  const allPosts = [...posts, ...hivePosts].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="pt-32 pb-12 bg-black font-sans text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-heading text-6xl md:text-7xl text-center mb-12">
          Nuestro Blog
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post) => {
            const CardContent = () => (
              <>
                {post.image && (
                  <div className="mb-4 overflow-hidden rounded-md h-48">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                )}
                <h2 className="font-heading text-xl md:text-2xl text-white leading-tight">{post.title}</h2>
                <p className="text-gray-400 mt-2 text-xs uppercase tracking-wider">
                  {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                  {post.author && <span className="text-fortis-gold ml-2">by @{post.author}</span>}
                </p>
                <p className="text-gray-300 mt-3 text-sm line-clamp-3">{post.description}</p>
                <span className="mt-4 inline-block font-bold text-fortis-gold text-sm group-hover:text-white transition-colors">
                  {post.isHive ? 'Leer en Comunidad' : 'Leer más'} &rarr;
                </span>
              </>
            );

            const cardClasses = "block bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-fortis-gold transition-all duration-300 group h-full flex flex-col justify-between";

            if (post.isHive) {
              return (
                <a
                  key={post.slug}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClasses}
                >
                  <div className="flex-1">
                    <CardContent />
                  </div>
                </a>
              );
            }

            return (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className={cardClasses}
              >
                <div className="flex-1">
                  <CardContent />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
