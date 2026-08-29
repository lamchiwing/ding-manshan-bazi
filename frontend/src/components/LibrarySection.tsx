import React, { useState } from 'react';
import { LIBRARY_ARTICLES } from '../data/articles';

export const LibrarySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('全部');

  const categories = [
    '全部', '八字', '四柱推命', '九運風水', '十神', '五行', '合婚', '大運', '流年', '事業', '財運', '感情'
  ];

  const filtered = activeFilter === '全部'
    ? LIBRARY_ARTICLES
    : LIBRARY_ARTICLES.filter(a => a.category === activeFilter);

  return (
    <section id="library" className="w-full bg-charcoal text-ivory py-16 border-b border-[#1E3A5F]/30">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24">
        {/* Header */}
        <div className="mb-10">
          <span className="text-xs text-[#D97706] tracking-widest uppercase font-semibold">Editorial Knowledge Base</span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#F4EFEA] mt-1">命理圖書館</h2>
          <p className="text-[#A4B3C6] text-base md:text-lg mt-2 font-sans font-light">
            Digital Editorial Library · 嚴謹解構天干地支、五行十神與九運風水義理。
          </p>
        </div>

        {/* Category Tags Bar */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-[#1E3A5F]/30 font-sans">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3.5 py-1 rounded-[3px] text-xs transition-all ${
                activeFilter === cat
                  ? 'bg-[#1E3A5F] text-[#F4EFEA] font-bold border border-[#D97706]'
                  : 'bg-white/5 text-[#A4B3C6] hover:text-[#F4EFEA] hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Editorial Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((art) => (
            <article
              key={art.id}
              className="bg-[#F4EFEA] text-[#2B2D2F] p-6 rounded-[4px] border border-[#1E3A5F]/20 hover:border-[#D97706] transition-all duration-300 flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#1E3A5F] mb-3">
                  <span className="bg-[#1E3A5F]/10 px-2 py-0.5 rounded font-medium">{art.category}</span>
                  <span className="text-[#A4B3C6]">{art.readTime}</span>
                </div>
                <h3 className="font-serif text-xl font-bold leading-snug group-hover:text-[#1E3A5F] transition-colors mb-3">
                  {art.title}
                </h3>
                <p className="text-xs md:text-sm text-[#2B2D2F]/80 font-sans leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2B2D2F]/10 flex items-center justify-between text-xs text-[#A4B3C6] font-sans">
                <span>文 / {art.author}</span>
                <span className="text-[#1E3A5F] group-hover:text-[#D97706] font-medium flex items-center">
                  閱讀全文 →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
