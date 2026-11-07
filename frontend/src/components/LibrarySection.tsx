import React, { useState } from 'react';
import { ARTICLES_DATA, ArticleItem } from '../data/articles';
import { BookOpen, Clock, ArrowRight, X, Sparkles, ChevronRight } from 'lucide-react';

interface LibrarySectionProps {
  onSelectArticle?: (article: ArticleItem) => void;
  onSelectServiceById?: (serviceId: string) => void;
}

export const LibrarySection: React.FC<LibrarySectionProps> = ({ 
  onSelectArticle,
  onSelectServiceById,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);

  // 類別標籤：[全部] [八字] [五行] [風水] [流月運程] [流年運程] [面相]
  const categories = ['全部', '八字', '五行', '風水', '流月運程', '流年運程', '面相'];

  const filteredArticles = selectedCategory === '全部'
    ? ARTICLES_DATA
    : ARTICLES_DATA.filter(a => a.category === selectedCategory);

  const handleRead = (art: ArticleItem) => {
    setActiveArticle(art);
    if (onSelectArticle) onSelectArticle(art);
  };

  return (
    <section id="magazine" className="w-full bg-[#181A1D]/90 text-ivory py-8 px-4 sm:px-6 rounded-2xl border border-[#1E3A5F]/40 font-sans my-6 shadow-xl">
      <div className="w-full max-w-[1440px] mx-auto">
        
        {/* Section Header: 命理誌 JOURNAL */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#1E3A5F]/50 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#D97706] text-xs font-mono uppercase tracking-widest mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>JOURNAL · 命理學術專欄</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#F4EFEA] tracking-wider">
              命理誌
            </h2>
            <p className="text-xs text-[#A4B3C6] mt-1 font-serif">
              傳承古法 · 洞察人生 ｜ 定期更新命理古籍心得、運程流轉與空間風水指南
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full transition-all text-xs font-medium cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#D97706] text-[#141618] font-bold shadow-md shadow-[#D97706]/20'
                    : 'bg-[#2A3B4C]/40 text-[#A4B3C6] hover:bg-[#1E3A5F]/60 hover:text-[#F4EFEA] border border-[#1E3A5F]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 9~10 Articles Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => handleRead(article)}
              className="group bg-[#1E2227] hover:bg-[#23282F] border border-[#1E3A5F]/50 hover:border-[#D97706]/70 rounded-xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            >
              <div>
                {/* Top Meta: Category & Read Time */}
                <div className="flex items-center justify-between text-[11px] mb-3 text-[#A4B3C6]">
                  <span className="px-2.5 py-0.5 rounded bg-[#1E3A5F]/40 text-[#D97706] font-medium border border-[#D97706]/30">
                    {article.category}
                  </span>
                  <span className="flex items-center space-x-1 font-mono text-[11px]">
                    <Clock className="w-3 h-3 text-[#A4B3C6]" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                {/* Article Title */}
                <h3 className="text-base font-serif font-bold text-[#F4EFEA] group-hover:text-[#D97706] transition-colors leading-snug line-clamp-2 mb-2.5">
                  {article.title}
                </h3>

                {/* Article Summary */}
                <p className="text-xs text-[#A4B3C6] leading-relaxed line-clamp-3 mb-4">
                  {article.summary}
                </p>
              </div>

              {/* Dedicated Product Conversion Anchor (導流錨點) */}
              <div className="mt-auto pt-3 border-t border-[#1E3A5F]/40">
                <div className="bg-[#141618] rounded-lg p-2.5 border border-[#1E3A5F]/60 hover:border-[#D97706]/60 transition-colors flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] text-[#D97706] font-mono flex items-center space-x-1">
                      <Sparkles className="w-2.5 h-2.5 shrink-0" />
                      <span className="truncate">{article.conversionProduct.badge}</span>
                    </div>
                    <div className="text-xs font-serif font-bold text-[#F4EFEA] truncate">
                      {article.conversionProduct.title}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectServiceById) {
                        onSelectServiceById(article.conversionProduct.serviceId);
                      } else {
                        handleRead(article);
                      }
                    }}
                    className="shrink-0 px-2.5 py-1 bg-[#D97706] hover:bg-[#B45309] text-[#141618] text-[11px] font-bold rounded flex items-center space-x-1 transition-colors cursor-pointer"
                  >
                    <span>{article.conversionProduct.price}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#A4B3C6] mt-2.5 px-0.5">
                  <span>文 / {article.author} · {article.publishedDate}</span>
                  <span className="text-[#D97706] group-hover:translate-x-0.5 transition-transform font-medium flex items-center space-x-0.5">
                    <span>閱讀全文</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Action: 查看全部命理誌文章 */}
        <div className="mt-10 pt-6 border-t border-[#1E3A5F]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A4B3C6]">
          <div className="font-serif text-[#F4EFEA]">
            ✦ 丁蔓山命理誌 · 融匯子平真詮、滴天髓與現代決策智慧
          </div>

          <a
            href="#magazine"
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategory('全部');
              const el = document.getElementById('magazine');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-2.5 rounded-full bg-[#1E3A5F] hover:bg-[#2A4D7A] text-[#F4EFEA] font-serif font-bold transition-all shadow-md flex items-center space-x-2 border border-[#38BDF8]/30"
          >
            <span>查看全部命理誌文章 ({ARTICLES_DATA.length} 篇)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* Article Detail Modal / Reader */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#1A1D20] border border-[#1E3A5F] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E3A5F]/50 bg-[#141618]">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#D97706]">
                <span className="px-2 py-0.5 rounded bg-[#D97706]/10 border border-[#D97706]/30">
                  {activeArticle.category}
                </span>
                <span>{activeArticle.publishedDate} · 文 / {activeArticle.author}</span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1.5 rounded-lg text-[#A4B3C6] hover:text-[#F4EFEA] hover:bg-[#2A3B4C]/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-5 text-[#F4EFEA]">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-[#F4EFEA] leading-snug">
                {activeArticle.title}
              </h2>

              <div className="p-3.5 rounded-xl bg-[#20252B] border-l-4 border-[#D97706] text-xs text-[#A4B3C6] leading-relaxed font-serif">
                {activeArticle.summary}
              </div>

              <div className="space-y-4 text-sm text-[#E2E8F0] leading-relaxed font-serif">
                {activeArticle.contentParagraphs?.map((p, idx) => (
                  <p key={idx} className="text-justify leading-loose">
                    {p}
                  </p>
                ))}
              </div>

              {/* Dedicated In-Article Conversion Banner (文章末端導流) */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-[#20252B] to-[#1A1D20] border border-[#D97706]/60 shadow-lg mt-6">
                <div className="flex items-center space-x-2 text-[#D97706] text-xs font-serif font-bold mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>探尋更深層的人生藍圖與專屬解析：</span>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-serif font-bold text-[#F4EFEA] text-base">
                      {activeArticle.conversionProduct.title}
                    </h4>
                    <p className="text-xs text-[#A4B3C6] mt-1">
                      依據您的生辰八字日主與節氣量化推演，獲取專屬批算建議。
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const sid = activeArticle.conversionProduct.serviceId;
                      setActiveArticle(null);
                      if (onSelectServiceById) {
                        onSelectServiceById(sid);
                      }
                    }}
                    className="shrink-0 px-4 py-2 bg-[#D97706] hover:bg-[#B45309] text-[#141618] font-serif font-bold text-xs rounded-lg transition-all shadow-md flex items-center space-x-1.5 cursor-pointer"
                  >
                    <span>{activeArticle.conversionProduct.ctaText} ({activeArticle.conversionProduct.price})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
};
