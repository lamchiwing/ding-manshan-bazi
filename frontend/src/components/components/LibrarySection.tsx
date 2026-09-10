import React, { useState } from 'react';
import { ARTICLES_DATA, ArticleItem } from '../data/articles';

interface LibrarySectionProps {
  onSelectArticle?: (article: ArticleItem) => void;
}

export const LibrarySection: React.FC<LibrarySectionProps> = ({ onSelectArticle }) => {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);

  const categories = ['全部', '八字', '四柱推命', '九運風水', '十神', '合婚'];

  const filteredArticles = selectedCategory === '全部'
    ? ARTICLES_DATA
    : ARTICLES_DATA.filter(a => a.category === selectedCategory);

  const handleRead = (art: ArticleItem) => {
    if (onSelectArticle) {
      onSelectArticle(art);
    } else {
      setActiveArticle(art);
      window.scrollTo({ top: 800, behavior: 'smooth' });
    }
  };

  return (
    <section id="magazine" className="w-full bg-charcoal text-ivory py-8 border-t border-[#1E3A5F]/30 font-sans">
      <div className="w-full">
        {/* Section Header: Pure clean '命理誌' title without small subtitles */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-[#1E3A5F]/40">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif text-[#F4EFEA]">命理誌</h2>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3 sm:mt-0 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-[2px] transition-all text-xs ${
                  selectedCategory === cat
                    ? 'bg-[#1E3A5F] text-[#F4EFEA] font-bold shadow-sm'
                    : 'bg-[#1E3A5F]/20 text-[#A4B3C6] hover:bg-[#1E3A5F]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* If an article is active in inline reading */}
        {activeArticle ? (
          <div className="bg-[#F4EFEA] text-[#2B2D2F] p-6 md:p-8 rounded-[4px] border border-[#1E3A5F]/30 shadow-lg animate-fade-in-up mb-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#2B2D2F]/10 mb-4">
              <span className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider">
                {activeArticle.category} · {activeArticle.publishedDate}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="text-xs text-[#A4B3C6] hover:text-[#2B2D2F] underline"
              >
                ← 返回文章列表
              </button>
            </div>

            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#2B2D2F] mb-3 leading-snug">
              {activeArticle.title}
            </h2>

            <div className="text-xs text-[#A4B3C6] mb-6">
              撰文：{activeArticle.author} · {activeArticle.readTime}
            </div>

            <div className="prose prose-sm text-[#2B2D2F]/90 leading-relaxed space-y-4 text-xs md:text-sm">
              <p className="font-serif text-sm md:text-base italic text-[#1E3A5F] bg-white/60 p-4 rounded border-l-2 border-[#D97706]">
                「{activeArticle.summary}」
              </p>
              <p>
                在命理學中，陰陽五行並非神秘迷信，而是古人總結宇宙運行與人體氣息關係之哲學模型。
                理解原局干支之生剋制化，意在知常達變，於進退之間保有清醒從容。
              </p>
              <p>
                天道貴在平衡，地道貴在安靜，人道貴在知止。無論身處順境逆境，順天應時、養心修德，皆為趨吉避凶之上策。
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#2B2D2F]/10 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="bg-[#1E3A5F] text-[#F4EFEA] px-5 py-2 rounded text-xs hover:bg-[#2B2D2F] transition-colors"
              >
                收起文章
              </button>
            </div>
          </div>
        ) : (
          /* Articles Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredArticles.map((art) => (
              <article
                key={art.id}
                onClick={() => handleRead(art)}
                className="bg-[#F4EFEA] text-[#2B2D2F] p-5 rounded-[3px] border border-[#1E3A5F]/20 hover:border-[#D97706] transition-all cursor-pointer shadow-sm group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#1E3A5F] mb-1.5">
                    <span className="font-semibold">{art.category}</span>
                    <span className="text-[#A4B3C6]">{art.publishedDate}</span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#2B2D2F] group-hover:text-[#1E3A5F] transition-colors leading-snug mb-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#2B2D2F]/80 leading-relaxed line-clamp-2">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#2B2D2F]/10 flex items-center justify-between text-[11px] text-[#A4B3C6] mt-3">
                  <span>{art.readTime}</span>
                  <span className="text-[#1E3A5F] group-hover:text-[#D97706] group-hover:translate-x-0.5 transition-all font-medium">
                    閱讀全文 →
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
