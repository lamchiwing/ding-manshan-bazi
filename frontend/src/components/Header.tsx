import React from 'react';

interface HeaderProps {
  onOpenMyReports?: () => void;
  currentView: 'home' | 'online-services' | 'booking-services' | 'service-solo';
  onNavigate: (view: 'home' | 'online-services' | 'booking-services') => void;
  onScrollToSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentView, 
  onNavigate, 
  onOpenMyReports,
}) => {
  const handleScroll = (id: string) => {
    if (currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#16181A]/95 backdrop-blur border-b border-[#1E3A5F]/40 font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 h-16 flex items-center justify-between">
        
        {/* Brand Logo: 丁 ｜ 蔓山 命理誌 */}
        <div 
          onClick={() => onNavigate('home')}
          className="cursor-pointer text-xl md:text-2xl font-serif tracking-widest flex items-center select-none"
        >
          <span className="text-[#D97706] font-bold">丁</span>
          <span className="text-[#D97706] mx-1 font-light">｜</span>
          <span className="text-[#F4EFEA] font-semibold">蔓山</span>
          <span className="text-[#A4B3C6] text-xs sm:text-sm ml-2 font-sans font-light">命理誌</span>
        </div>

        {/* Clean Navigation: [關於 丁蔓山] [主頁] [通勝 App] [A.I. 算命] [預約丁蔓山] [命理誌] [我的命書] [threads] */}
        <nav className="flex items-center space-x-3 sm:space-x-5 lg:space-x-6 text-xs sm:text-sm text-[#D97706]">
          {/* 1. 關於 丁蔓山 */}
          <button
            onClick={() => handleScroll('about')}
            className="hover:text-[#F4EFEA] transition-colors py-1 cursor-pointer"
          >
            關於 丁蔓山
          </button>

          {/* 2. 主頁 */}
          <button
            onClick={() => onNavigate('home')}
            className={`hover:text-[#F4EFEA] transition-colors py-1 cursor-pointer ${
              currentView === 'home' ? 'font-bold border-b-2 border-[#D97706]' : ''
            }`}
          >
            主頁
          </button>

          {/* 3. 通勝 App */}
          <button
            onClick={() => handleScroll('tung-shing')}
            className="hover:text-[#F4EFEA] transition-colors py-1 cursor-pointer hidden sm:inline-block"
          >
            通勝 App
          </button>

          {/* 4. A.I. 算命 */}
          <button
            onClick={() => onNavigate('online-services')}
            className={`hover:text-[#F4EFEA] transition-colors py-1 cursor-pointer ${
              currentView === 'online-services' ? 'font-bold border-b-2 border-[#D97706]' : ''
            }`}
          >
            A.I. 算命
          </button>

          {/* 5. 預約丁蔓山 */}
          <button
            onClick={() => onNavigate('booking-services')}
            className={`hover:text-[#F4EFEA] transition-colors py-1 cursor-pointer ${
              currentView === 'booking-services' ? 'font-bold border-b-2 border-[#D97706]' : ''
            }`}
          >
            預約丁蔓山
          </button>

          {/* 6. 命理誌 */}
          <button
            onClick={() => handleScroll('magazine')}
            className="hover:text-[#F4EFEA] transition-colors py-1 cursor-pointer"
          >
            命理誌
          </button>

          {/* 7. 我的命書 (專屬歷史庫) */}
          <button
            type="button"
            onClick={() => onOpenMyReports && onOpenMyReports()}
            className="flex items-center space-x-1 text-xs text-[#D97706] hover:text-[#F4EFEA] px-2.5 py-1 rounded bg-[#D97706]/10 border border-[#D97706]/40 transition-colors font-medium cursor-pointer"
          >
            <span>📜 我的命書</span>
          </button>

          {/* 8. threads */}
          <a
            href="https://www.threads.net/@ting.manshan"
            target="_blank"
            rel="noopener noreferrer"
            title="在 Threads 追蹤丁蔓山 (@ting.manshan)"
            className="hover:text-[#F4EFEA] transition-colors py-1 lowercase font-mono text-xs sm:text-sm"
          >
            threads
          </a>
        </nav>

      </div>
    </header>
  );
};
