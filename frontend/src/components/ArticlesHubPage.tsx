import React, { useState } from 'react';
import { ARTICLES_DATA, ArticleItem, ArticleCategory } from '../data/articles';
import { 
  BookOpen, 
  ArrowLeft, 
  ExternalLink, 
  Clock, 
  Mail, 
  CheckCircle, 
  Sparkles, 
  X, 
  Youtube, 
  GraduationCap, 
  Compass, 
  Calendar, 
  Eye, 
  Flame, 
  Moon, 
  Share2 
} from 'lucide-react';

interface ArticlesHubPageProps {
  onNavigateHome: () => void;
  onSelectServiceById?: (serviceId: string) => void;
}

export const ArticlesHubPage: React.FC<ArticlesHubPageProps> = ({
  onNavigateHome,
  onSelectServiceById,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('全部');
  const [readingArticle, setReadingArticle] = useState<ArticleItem | null>(null);

  // 訂閱表格狀態 (Inline Form, 絕非 Pop-up)
  const [subName, setSubName] = useState('');
  const [subEmail, setSubEmail] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    '八字文章', '風水文章', '面相文章', '五行文章', '擇日文章', '流月文章'
  ]);
  const [isSubscribed, setIsSubscribed] = useState(() => {
    try {
      return !!localStorage.getItem('newsletter_subscribed_email');
    } catch {
      return false;
    }
  });
  const [subError, setSubError] = useState('');

  const targetCategories: { key: ArticleCategory; label: string; icon: any; desc: string }[] = [
    { key: '八字', label: '八字文章', icon: BookOpen, desc: '四柱排盤、日主強弱、十神生剋與生命格局底層邏輯' },
    { key: '風水', label: '風水文章', icon: Compass, desc: '三元九運玄空飛星、家居與商用空間氣場調理佈局' },
    { key: '面相', label: '面相文章', icon: Eye, desc: '三停五嶽、十二宮位氣色與即時行運流轉印驗' },
    { key: '五行', label: '五行文章', icon: Flame, desc: '金木水火土調候平衡、生活色彩方位與開運日常' },
    { key: '擇日', label: '擇日文章', icon: Calendar, desc: '天星建除十二神、嫁娶開張動土吉日良辰古法' },
    { key: '流月', label: '流月文章', icon: Moon, desc: '二十四節氣流月吉凶交替、重大決策避坑防範指引' },
  ];

  const handleToggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      if (selectedTopics.length > 1) {
        setSelectedTopics(selectedTopics.filter(t => t !== topic));
      }
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail || !subEmail.includes('@')) {
      setSubError('請輸入正確的電子郵件地址');
      return;
    }
    setSubError('');
    try {
      localStorage.setItem('newsletter_subscribed_email', subEmail);
      localStorage.setItem('newsletter_subscribed_name', subName);
      localStorage.setItem('newsletter_subscribed_topics', JSON.stringify(selectedTopics));
    } catch (err) {
      // ignore
    }
    setIsSubscribed(true);
  };

  const filterCategoryMap: Record<string, ArticleCategory> = {
    '八字文章': '八字',
    '風水文章': '風水',
    '面相文章': '面相',
    '五行文章': '五行',
    '擇日文章': '擇日',
    '流月文章': '流月',
  };

  const filteredArticles = selectedFilter === '全部'
    ? ARTICLES_DATA
    : ARTICLES_DATA.filter(a => {
        const catKey = filterCategoryMap[selectedFilter] || selectedFilter;
        return a.category === catKey;
      });

  return (
    <div className="w-full min-h-screen bg-[#121315] text-[#F4EFEA] font-sans pb-24">
      {/* Top Banner Navigation */}
      <div className="border-b border-[#1E3A5F]/40 bg-[#16181A]/95 sticky top-16 z-30 backdrop-blur">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 h-12 flex items-center justify-between text-xs">
          <button
            onClick={onNavigateHome}
            className="flex items-center space-x-1.5 text-[#D97706] hover:text-[#F4EFEA] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>返回網站首頁</span>
          </button>
          <div className="text-[#A4B3C6] font-serif">
            首頁 <span className="mx-1">/</span> <span className="text-[#F4EFEA]">命理誌專欄與社群全集</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 pt-8 space-y-12">
        
        {/* ========================================================= */}
        {/* SECTION 1: Page Header Title & Overview */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D97706]/10 border border-[#D97706]/40 text-[#D97706] text-xs font-mono">
            <BookOpen className="w-3.5 h-3.5" />
            <span>JOURNAL & MEDIA HUB · 專欄全集與社群</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-wide text-[#F4EFEA]">
            丁蔓山 命理誌 · 學術專欄與全集
          </h1>
          <p className="text-xs sm:text-sm text-[#A4B3C6] font-serif leading-relaxed">
            傳承正統子平命理古籍心得，匯聚八字、風水、面相、五行、擇日與流月深度文章，以及官方 Patreon 課程、YouTube 影音與 Threads 隨筆。
          </p>
        </div>

        {/* ========================================================= */}
        {/* SECTION 2: Official Social Media Links & Courses (3 Cards) */}
        {/* ========================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#1E3A5F]/40 pb-3">
            <div className="flex items-center space-x-2">
              <Share2 className="w-4 h-4 text-[#D97706]" />
              <h2 className="text-base sm:text-lg font-serif font-bold text-[#F4EFEA]">
                官方社交平台與深度課程
              </h2>
            </div>
            <span className="text-xs text-[#A4B3C6] font-mono">OFFICIAL CHANNELS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 1. Patreon 課程 */}
            <a
              href="https://www.patreon.com/c/tingmanshan"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#191C20] hover:bg-[#1E232A] border border-[#1E3A5F]/50 hover:border-[#D97706] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#D97706]/15 border border-[#D97706]/40 flex items-center justify-center text-[#D97706] group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-[#D97706]/20 text-[#D97706] border border-[#D97706]/40">
                    系統化課程
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-[#F4EFEA] group-hover:text-[#D97706] transition-colors">
                    Patreon 深度課程
                  </h3>
                  <div className="text-xs text-[#D97706] font-mono mt-0.5">
                    patreon.com/c/tingmanshan
                  </div>
                </div>
                <p className="text-xs text-[#A4B3C6] leading-relaxed font-serif">
                  系統化教授正統子平八字命理、《滴天髓》《子平真詮》古籍解讀、空間風水實戰案例，以及大師親筆批命筆記。
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#1E3A5F]/40 flex items-center justify-between text-xs font-serif font-bold text-[#D97706] group-hover:translate-x-0.5 transition-transform">
                <span>前往 Patreon 訂閱課程</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* 2. YouTube 頻道 */}
            <a
              href="https://www.youtube.com/@tingmanshan"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#191C20] hover:bg-[#1E232A] border border-[#1E3A5F]/50 hover:border-[#EF4444] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#EF4444]/15 border border-[#EF4444]/40 flex items-center justify-center text-[#EF4444] group-hover:scale-105 transition-transform">
                    <Youtube className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40">
                    影音專欄
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-[#F4EFEA] group-hover:text-[#EF4444] transition-colors">
                    YouTube 官方頻道
                  </h3>
                  <div className="text-xs text-[#EF4444] font-mono mt-0.5">
                    youtube.com/@tingmanshan
                  </div>
                </div>
                <p className="text-xs text-[#A4B3C6] leading-relaxed font-serif">
                  實地勘宅風水影片、名人生辰八字拆解、二十四節氣流月運程動態解析，以影音直觀呈現玄學空間磁場。
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#1E3A5F]/40 flex items-center justify-between text-xs font-serif font-bold text-[#EF4444] group-hover:translate-x-0.5 transition-transform">
                <span>前往 YouTube 觀看與訂閱</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* 3. Threads 專頁 */}
            <a
              href="https://www.threads.com/@ting.manshan"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#191C20] hover:bg-[#1E232A] border border-[#1E3A5F]/50 hover:border-[#D97706] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                    <span className="font-mono font-bold text-sm">@</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-white/10 text-white border border-white/20">
                    每日隨筆
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-[#F4EFEA] group-hover:text-[#D97706] transition-colors">
                    Threads 官方隨筆
                  </h3>
                  <div className="text-xs text-[#A4B3C6] font-mono mt-0.5">
                    threads.com/@ting.manshan
                  </div>
                </div>
                <p className="text-xs text-[#A4B3C6] leading-relaxed font-serif">
                  每日五行能量微觀察、生活開運靈感、即時解答讀者命理問題，與丁蔓山大師保持最親近的交流。
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#1E3A5F]/40 flex items-center justify-between text-xs font-serif font-bold text-[#D97706] group-hover:translate-x-0.5 transition-transform">
                <span>前往 Threads 追蹤交流</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 3: INLINE 訂閱表格 (絕非 Pop-up，純嵌入表單) */}
        {/* ========================================================= */}
        <div className="rounded-2xl bg-gradient-to-br from-[#1E242B] to-[#15181C] border border-[#D97706]/40 p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D97706]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#D97706]/15 border border-[#D97706]/30 text-[#D97706] text-xs font-mono">
                <Mail className="w-3.5 h-3.5" />
                <span>WEEKLY NEWSLETTER · 電子報專屬訂閱</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F4EFEA]">
                訂閱《丁蔓山命理誌》每週專欄與節氣運程
              </h2>
              <p className="text-xs sm:text-[13px] text-[#A4B3C6] font-serif leading-relaxed max-w-xl mx-auto">
                定期獲取最新八字案例深度解析、二十四節氣流月吉凶提醒與空間風水指南。絕無垃圾廣告郵件，可隨時一鍵取消訂閱。
              </p>
            </div>

            {isSubscribed ? (
              <div className="p-6 rounded-xl bg-[#142A1D] border border-[#22C55E]/40 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-[#22C55E] mx-auto" />
                <h3 className="text-base font-serif font-bold text-[#F4EFEA]">
                  感謝您的訂閱！
                </h3>
                <p className="text-xs text-[#86EFAC] font-serif leading-relaxed">
                  已成功登記您的郵箱。每週最新文章、節氣流月吉凶指引與獨家古籍心得將第一時間直送您的信箱。
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubscribed(false)}
                  className="text-xs text-[#A4B3C6] hover:text-white underline pt-2 cursor-pointer"
                >
                  登記另一個電子信箱
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubscribeSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#A4B3C6] mb-1.5">
                      您的稱呼 / 姓名 (選填)
                    </label>
                    <input
                      type="text"
                      value={subName}
                      onChange={(e) => setSubName(e.target.value)}
                      placeholder="例：陳先生 / Alice"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#121417] border border-[#1E3A5F]/60 text-xs text-[#F4EFEA] focus:border-[#D97706] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#A4B3C6] mb-1.5">
                      電子信箱 (必填) <span className="text-[#D97706]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={subEmail}
                      onChange={(e) => setSubEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#121417] border border-[#1E3A5F]/60 text-xs text-[#F4EFEA] focus:border-[#D97706] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Topics Selection */}
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-mono text-[#A4B3C6]">
                    想接收的專欄內容 (預設全選，可自由調整)：
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['八字文章', '風水文章', '面相文章', '五行文章', '擇日文章', '流月文章'].map((t) => {
                      const checked = selectedTopics.includes(t);
                      return (
                        <button
                          type="button"
                          key={t}
                          onClick={() => handleToggleTopic(t)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                            checked
                              ? 'bg-[#D97706]/20 border-[#D97706] text-[#F4EFEA]'
                              : 'bg-[#14171A] border-[#1E3A5F]/40 text-[#6B7280] hover:text-[#A4B3C6]'
                          }`}
                        >
                          {checked ? '✓ ' : '+ '} {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {subError && (
                  <div className="text-xs text-[#EF4444] font-mono">{subError}</div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-[#121315] font-serif font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#D97706]/20 cursor-pointer"
                  >
                    立即免費訂閱專欄週報
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 4: 6 大分類文章全集目錄與快速跳轉 */}
        {/* ========================================================= */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#1E3A5F]/40 pb-4 gap-4">
            <div>
              <div className="flex items-center space-x-2 text-[#D97706] text-xs font-mono uppercase tracking-widest mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>CATEGORIES DIRECTORY</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F4EFEA]">
                分類文章全集
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => setSelectedFilter('全部')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedFilter === '全部'
                    ? 'bg-[#D97706] text-[#121315] font-bold shadow'
                    : 'bg-[#1E232A] text-[#A4B3C6] hover:text-white border border-[#1E3A5F]/40'
                }`}
              >
                全部文章 ({ARTICLES_DATA.length})
              </button>
              {targetCategories.map((c) => {
                const count = ARTICLES_DATA.filter(a => a.category === c.key).length;
                const active = selectedFilter === c.label || selectedFilter === c.key;
                return (
                  <button
                    key={c.key}
                    onClick={() => setSelectedFilter(c.label)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      active
                        ? 'bg-[#D97706] text-[#121315] font-bold shadow'
                        : 'bg-[#1E232A] text-[#A4B3C6] hover:text-white border border-[#1E3A5F]/40'
                    }`}
                  >
                    {c.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Categories Overview Blocks (When '全部' is selected, show category cards overview) */}
          {selectedFilter === '全部' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {targetCategories.map((c) => {
                const IconComp = c.icon;
                const count = ARTICLES_DATA.filter(a => a.category === c.key).length;
                return (
                  <button
                    key={c.key}
                    onClick={() => setSelectedFilter(c.label)}
                    className="p-3.5 rounded-xl bg-[#191C20] hover:bg-[#20252C] border border-[#1E3A5F]/40 hover:border-[#D97706] text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <IconComp className="w-4 h-4 text-[#D97706] group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-mono text-[#A4B3C6]">{count} 篇</span>
                    </div>
                    <div className="text-xs font-serif font-bold text-[#F4EFEA] group-hover:text-[#D97706] transition-colors">
                      {c.label}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setReadingArticle(article)}
                className="group bg-[#181A1D] hover:bg-[#1E2227] border border-[#1E3A5F]/50 hover:border-[#D97706]/70 rounded-xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-[#A4B3C6]">
                    <span className="px-2.5 py-0.5 rounded bg-[#1E3A5F]/40 text-[#D97706] font-medium border border-[#D97706]/30">
                      {article.category}文章
                    </span>
                    <span className="flex items-center space-x-1 font-mono text-[11px]">
                      <Clock className="w-3 h-3 text-[#A4B3C6]" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-serif font-bold text-[#F4EFEA] group-hover:text-[#D97706] transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#A4B3C6] font-serif leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#1E3A5F]/30 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-[#6B7280]">
                    {article.publishedDate} · {article.author}
                  </span>
                  <span className="font-serif font-bold text-[#D97706] group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                    <span>閱讀文章</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* Full Article Reading Modal */}
      {/* ========================================================= */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#181A1E] border border-[#1E3A5F] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#1E3A5F]/40 pb-3">
              <span className="px-3 py-1 rounded-full bg-[#D97706]/15 border border-[#D97706]/40 text-[#D97706] text-xs font-serif font-bold">
                {readingArticle.category}文章 · 命理誌專欄
              </span>
              <button
                onClick={() => setReadingArticle(null)}
                className="p-1 rounded-lg text-[#A4B3C6] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F4EFEA] leading-snug">
                {readingArticle.title}
              </h2>
              <div className="flex items-center space-x-3 text-xs text-[#A4B3C6] font-mono pt-1">
                <span>作者：{readingArticle.author}</span>
                <span>•</span>
                <span>發布：{readingArticle.publishedDate}</span>
                <span>•</span>
                <span>{readingArticle.readTime}</span>
              </div>
            </div>

            <div className="text-xs sm:text-[13px] text-[#CBD5E1] font-serif leading-[1.8] space-y-4 border-t border-b border-[#1E3A5F]/30 py-4">
              <p className="font-medium text-[#F4EFEA] bg-[#121417] p-4 rounded-xl border border-[#1E3A5F]/40 italic">
                {readingArticle.summary}
              </p>
              {readingArticle.contentParagraphs && readingArticle.contentParagraphs.map((p, idx) => (
                <p key={idx} className="text-justify">
                  {p}
                </p>
              ))}
            </div>

            {/* Related Conversion CTA */}
            {readingArticle.conversionProduct && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#1E232A] to-[#16191D] border border-[#D97706]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="space-y-0.5 text-center sm:text-left">
                  <span className="text-[10px] font-mono text-[#D97706]">相關服務推薦</span>
                  <div className="text-xs font-serif font-bold text-[#F4EFEA]">
                    {readingArticle.conversionProduct.title}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const sid = readingArticle.conversionProduct.serviceId;
                    setReadingArticle(null);
                    if (onSelectServiceById) {
                      onSelectServiceById(sid);
                    } else {
                      onNavigateHome();
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-[#121315] font-serif font-bold text-xs shrink-0 transition-colors shadow cursor-pointer"
                >
                  {readingArticle.conversionProduct.ctaText} ({readingArticle.conversionProduct.price})
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
