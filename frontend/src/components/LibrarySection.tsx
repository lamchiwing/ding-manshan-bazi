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

        {/* Threads Community & Social Callout */}
        <div className="mt-8 p-5 sm:p-6 rounded-xl bg-gradient-to-r from-[#1E3A5F]/40 via-[#141618] to-[#1E3A5F]/20 border border-[#1E3A5F]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-[#D97706]/15 border border-[#D97706]/40 flex items-center justify-center text-[#D97706] shrink-0">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 192 192">
                <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4384 44.7443 97.3155 44.7443 97.193 44.745C75.8398 44.745 59.2064 57.5147 55.4386 76.7828C55.0569 78.7351 56.3262 80.6401 58.2721 81.034C60.218 81.4279 62.1154 80.1652 62.5022 78.2195C65.5562 62.6074 78.8953 52.338 97.193 52.338C97.2917 52.3373 97.3905 52.3373 97.4893 52.338C117.164 52.4639 129.542 64.9126 131.066 87.7121C122.951 88.3582 113.805 90.0767 104.093 92.9972C80.2014 100.187 67.2415 111.455 69.4589 127.348C70.6105 135.602 75.8778 142.348 83.7431 145.674C90.2882 148.444 98.2435 148.749 106.185 146.536C117.151 143.479 125.753 136.216 131.62 125.044C137.261 133.568 144.783 138.895 154.215 140.088C154.825 140.165 155.438 140.203 156.049 140.203C166.702 140.203 175.767 131.785 178.694 119.165C182.029 104.782 178.835 88.8927 169.704 74.4578C159.083 57.6698 141.488 47.4579 120.158 45.698C89.5432 43.1706 63.8569 58.7471 52.7937 83.1818C42.4776 105.968 45.6429 133.398 60.751 151.78C73.4939 167.28 92.2046 176.001 113.356 176.326C113.864 176.334 114.373 176.338 114.881 176.338C127.287 176.338 139.066 172.936 148.971 166.505C150.609 165.441 151.077 163.245 150.013 161.607C148.948 159.969 146.752 159.501 145.114 160.565C136.195 166.356 125.603 169.418 114.471 169.418C114.009 169.418 113.548 169.414 113.088 169.407C94.2057 169.117 77.4913 161.319 66.0827 147.433C52.4347 130.826 49.5694 106.012 58.8927 85.4056C68.9103 63.267 92.2227 49.0984 119.98 51.3892C138.865 52.9469 154.409 61.9687 163.784 76.7865C171.97 89.7289 174.832 103.957 171.868 116.732C169.584 126.577 162.593 133.284 154.269 133.284C153.866 133.284 153.46 133.255 153.053 133.204C144.331 132.1 137.378 126.155 133.626 116.516C137.893 108.318 140.71 98.9798 141.537 88.9883ZM131.785 96.0872C130.407 105.748 127.359 114.477 122.951 121.78C117.891 130.165 111.026 135.539 103.206 137.728C96.9016 139.49 90.7383 139.115 85.9922 136.684C80.8988 134.075 77.2917 129.288 76.438 123.18C74.6542 110.377 85.9084 100.751 106.398 94.5776C114.619 92.1009 122.936 90.5846 131.785 96.0872Z" />
              </svg>
            </div>
            <div>
              <div className="font-serif font-bold text-[#F4EFEA] text-sm sm:text-base flex items-center gap-2">
                <span>在 Threads 上追蹤 丁蔓山</span>
                <span className="text-xs text-[#D97706] font-mono font-normal">@ting.manshan</span>
              </div>
              <p className="text-xs text-[#A4B3C6] leading-relaxed mt-0.5">
                每日定期分享干支曆法、流月吉凶提點與生活風水哲學心得。
              </p>
            </div>
          </div>

          <a
            href="https://www.threads.net/@ting.manshan"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold whitespace-nowrap transition-all shadow-md self-end sm:self-center"
          >
            ＋ 前往追蹤 ➜
          </a>
        </div>
      </div>
    </section>
  );
};