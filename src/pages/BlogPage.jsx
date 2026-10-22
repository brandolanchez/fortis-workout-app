import { Link } from 'react-router-dom';
import { posts } from '../utils/posts';
import { useHivePosts } from '../hooks/useHivePosts';
import { formatDate } from '../utils/date';
import { usePageTitle } from '../hooks/usePageTitle';

const BlogPage = () => {
  usePageTitle('Blog');
  const { posts: hivePosts, loading } = useHivePosts('hive-148971'); // Using the Fortis tag

  // Combine and sort posts
  const allPosts = [...posts, ...hivePosts].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="pt-8 pb-20 bg-black font-sans text-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="font-heading text-6xl md:text-7xl">Blog</h1>
        <p className="mt-3 mb-12 text-lg text-stone-400 max-w-2xl">
          Calistenia, entrenamiento al aire libre y la vida de la comunidad Fortis en la Vereda del Lago, Maracaibo.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post) => {
            const CardContent = () => (
              <>
                {post.image && (
                  <div className="mb-4 overflow-hidden rounded-md h-48">
                    <img src={post.image} alt={post.imageAlt || ""} loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                )}
                <h2 className="font-heading text-xl md:text-2xl text-white leading-tight">{post.title}</h2>
                <p className="text-stone-400 mt-2 text-sm">
                  {formatDate(post.date)}
                  {post.author && <span className="text-fortis-gold ml-2 normal-case">por @{post.author}</span>}
                </p>
                <p className="text-stone-300 mt-3 text-sm line-clamp-3">{post.description}</p>
                <span className="mt-4 inline-block font-bold text-fortis-gold text-sm group-hover:text-white transition-colors">
                  {post.isHive ? 'Leer en la comunidad' : 'Leer más'}
                </span>
              </>
            );

            const cardClasses = "block bg-stone-900 p-6 rounded-lg border border-stone-800 hover:border-fortis-gold transition-all duration-300 group h-full flex flex-col justify-between";

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
        {loading && (
          <p className="text-center text-stone-500 mt-10">Cargando publicaciones de la comunidad…</p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
