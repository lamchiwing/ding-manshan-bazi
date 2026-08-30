import React, { useState } from 'react';
import { LIBRARY_ARTICLES } from '../data/articles';

export const LibrarySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('全部');

  const categories = [
    '全部', '八字', '四柱推命', '九運風水', '十神', '五行', '合婚'
  ];

  const filtered = activeFilter === '全部'
    ? LIBRARY_ARTICLES
    : LIBRARY_ARTICLES.filter(a => a.category === activeFilter);

  return (
    <section id="library" className="w-full bg-charcoal text-ivory py-10 border-t border-[#1E3A5F]/30">
      <div className="w-full">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-serif text-[#F4EFEA]">命理圖書館</h2>
          <p className="text-[#A4B3C6] text-xs md:text-sm mt-1 font-sans font-light">
            研習筆記與命理雜記 · 梳理天干地支、五行十神與九運風水。
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-1.5 mb-6 pb-3 border-b border-[#1E3A5F]/30 font-sans">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1 rounded-[2px] text-xs transition-all ${
                activeFilter === cat
                  ? 'bg-[#1E3A5F] text-[#F4EFEA] font-bold border border-[#D97706]'
                  : 'bg-white/5 text-[#A4B3C6] hover:text-[#F4EFEA]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((art) => (
            <article
              key={art.id}
              className="bg-[#F4EFEA] text-[#2B2D2F] p-4 md:p-5 rounded-[3px] border border-[#1E3A5F]/20 hover:border-[#D97706] transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#1E3A5F] mb-2">
                  <span className="bg-[#1E3A5F]/10 px-2 py-0.5 rounded font-medium">{art.category}</span>
                  <span className="text-[#A4B3C6]">{art.readTime}</span>
                </div>
                <h3 className="font-serif text-base md:text-lg font-bold leading-snug group-hover:text-[#1E3A5F] transition-colors mb-2">
                  {art.title}
                </h3>
                <p className="text-xs text-[#2B2D2F]/80 font-sans leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#2B2D2F]/10 flex items-center justify-between text-[11px] text-[#A4B3C6] font-sans">
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
