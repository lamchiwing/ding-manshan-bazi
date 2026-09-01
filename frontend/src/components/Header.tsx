import React from 'react';

interface HeaderProps {
  currentView: 'home' | 'online-services' | 'booking-services' | 'service-solo';
  onNavigate: (view: 'home' | 'online-services' | 'booking-services') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#1e2022]/95 backdrop-blur border-b border-[#1E3A5F]/40 font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('home')}
          className="cursor-pointer text-xl md:text-2xl font-serif tracking-widest flex items-center select-none"
        >
          <span className="text-[#D97706] font-bold">丁</span>
          <span className="text-[#D97706] mx-1 font-light">｜</span>
          <span className="text-[#F4EFEA] font-semibold">蔓山</span>
          <span className="text-[#A4B3C6] text-sm ml-2 font-sans font-light">命理誌</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-3 sm:space-x-7 text-xs sm:text-sm text-[#A4B3C6]">
          <button
            onClick={() => onNavigate('home')}
            className={`hover:text-[#F4EFEA] transition-colors py-1 ${
              currentView === 'home' ? 'text-[#D97706] font-semibold border-b-2 border-[#D97706]' : ''
            }`}
          >
            主頁
          </button>

          <button
            onClick={() => onNavigate('online-services')}
            className={`hover:text-[#F4EFEA] transition-colors py-1 ${
              currentView === 'online-services' ? 'text-[#D97706] font-semibold border-b-2 border-[#D97706]' : ''
            }`}
          >
            線上服務
          </button>

          <button
            onClick={() => onNavigate('booking-services')}
            className={`hover:text-[#F4EFEA] transition-colors py-1 ${
              currentView === 'booking-services' ? 'text-[#D97706] font-semibold border-b-2 border-[#D97706]' : ''
            }`}
          >
            預約服務
          </button>

          <a
            href="#magazine"
            onClick={(e) => {
              if (currentView !== 'home') {
                onNavigate('home');
                setTimeout(() => {
                  const el = document.getElementById('magazine');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                const el = document.getElementById('magazine');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="hover:text-[#F4EFEA] transition-colors py-1"
          >
            命理誌
          </a>

          {/* Direct One-on-One Booking button */}
          <button
            onClick={() => onNavigate('booking-services')}
            className="bg-[#D97706] hover:bg-[#b45309] text-white px-3 sm:px-4 py-1.5 rounded-[2px] text-xs font-serif font-bold transition-all shadow"
          >
            線上一對一預約
          </button>
        </nav>

      </div>
    </header>
  );
};
