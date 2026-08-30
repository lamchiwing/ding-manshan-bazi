import React from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: '主頁' },
    { id: 'reading', label: '線上命理' },
    { id: 'services', label: '服務收費' },
    { id: 'library', label: '圖書館' },
  ];

  return (
    <header className="w-full bg-charcoal border-b border-[#1E3A5F]/40 sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 h-18 flex items-center justify-between">
        {/* Brand Logo - Pure Text */}
        <div 
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="cursor-pointer select-none text-xl md:text-2xl font-serif tracking-widest flex items-center"
        >
          <span className="text-[#D97706] font-bold">丁</span>
          <span className="text-[#D97706] mx-1 font-light">｜</span>
          <span className="text-[#F4EFEA] font-semibold">蔓山</span>
          <span className="text-[#A4B3C6] text-sm md:text-base ml-2 tracking-normal font-sans font-normal">命理誌</span>
        </div>

        {/* Minimal Navigation */}
        <nav className="flex items-center space-x-6 md:space-x-8 text-sm md:text-base">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`transition-colors duration-200 py-1 relative font-sans ${
                  isActive 
                    ? 'text-[#F4EFEA] font-medium' 
                    : 'text-[#A4B3C6] hover:text-[#D97706]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D97706] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
