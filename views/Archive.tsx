
import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BLOG_POSTS } from '../constants';
import { Category } from '../types';
import { buildArchiveItemList } from '../schemaUtils';
import { ArrowLeft, Calendar } from 'lucide-react';

const Archive: React.FC = () => {
  const { cat } = useParams<{ cat: string }>();
  const [activeCategory, setActiveCategory] = useState<Category>((cat as Category) || Category.ALL);

  const filterCategories = [
    { name: 'All', value: Category.ALL },
    { name: 'Bitcoin', value: Category.BITCOIN },
    { name: 'Business', value: Category.BUSINESS },
    { name: 'Politics', value: Category.POLITICS },
    { name: 'Fitness', value: Category.FITNESS },
    { name: 'Religion', value: Category.RELIGION },
  ];

  const filteredPosts = useMemo(() => {
    if (activeCategory === Category.ALL) return BLOG_POSTS;
    return BLOG_POSTS.filter(post => post.category === activeCategory);
  }, [activeCategory]);

  const archiveSchema = useMemo(() => buildArchiveItemList(filteredPosts), [filteredPosts]);

  return (
    <div className="py-32 bg-white min-h-screen">
      <script type="application/ld+json">
        {JSON.stringify(archiveSchema)}
      </script>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <header className="mb-20 text-center">
            <h1 className="text-6xl md:text-8xl font-black mb-12 italic text-slate-900 tracking-tighter uppercase">
              The Archive
            </h1>
            
            {/* Taxonomy Filter Bar */}
            <div className="flex flex-wrap justify-center gap-4 border-y border-gray-100 py-8">
              {filterCategories.map((fCat) => (
                <button
                  key={fCat.value}
                  onClick={() => setActiveCategory(fCat.value)}
                  className={`px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all ${
                    activeCategory === fCat.value 
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/20' 
                    : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-slate-900'
                  }`}
                >
                  {fCat.name}
                </button>
              ))}
            </div>
          </header>
          
          <div className="space-y-32">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <article key={post.id} className="group grid lg:grid-cols-12 gap-12 items-center" itemScope itemType="http://schema.org/BlogPosting">
                  <div className="lg:col-span-5">
                    <Link to={`/post/${post.id}`}>
                      <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-100 group-hover:shadow-teal-500/10 transition-all duration-500 ring-1 ring-black/5">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" itemProp="image" />
                      </div>
                    </Link>
                  </div>
                  <div className="lg:col-span-7">
                    <span className="text-teal-600 font-bold text-[10px] tracking-widest uppercase mb-4 block">{post.tag}</span>
                    <Link to={`/post/${post.id}`}>
                      <h2 className="text-4xl font-black text-slate-900 leading-tight mb-6 group-hover:text-teal-600 transition-colors cursor-pointer" itemProp="headline">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-gray-500 mb-8 font-light leading-relaxed" itemProp="description">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-300 font-bold text-[10px] uppercase tracking-[0.2em]">
                        <Calendar size={12} />
                        <time dateTime={post.date}>{post.date}</time>
                      </div>
                      <Link 
                        to={`/post/${post.id}`}
                        className="text-amber-500 font-black uppercase tracking-widest text-xs border-b-2 border-amber-500 hover:border-teal-600 hover:text-teal-600 transition-all pb-1"
                      >
                        Read Article →
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="text-center py-40 text-gray-400 font-bold uppercase tracking-widest text-xs border-2 border-dashed border-gray-100 rounded-3xl">
                No entries found in this pillar.
              </div>
            )}
          </div>

          <Link to="/" className="inline-flex items-center gap-2 mt-40 text-gray-400 font-black uppercase tracking-widest text-sm hover:text-teal-600 transition-colors">
            <ArrowLeft size={16} /> Back to Homepage
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Archive;
