import React from 'react';

interface FooterProps {
  onNavigate?: (view: 'home' | 'online-services' | 'booking-services' | 'privacy-policy' | 'terms-of-service' | 'contact-us') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#1e2022] text-[#A4B3C6] py-10 border-t border-[#1E3A5F]/40 font-sans">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-white/5">
          {/* Logo */}
          <div 
            onClick={() => onNavigate && onNavigate('home')}
            className="text-xl font-serif tracking-widest flex items-center cursor-pointer select-none"
          >
            <span className="text-[#D97706] font-bold">丁</span>
            <span className="text-[#D97706] mx-1 font-light">｜</span>
            <span className="text-[#F4EFEA] font-semibold">蔓山</span>
            <span className="text-[#A4B3C6] text-sm ml-2 font-sans">命理誌</span>
          </div>

          <p className="text-xs text-center md:text-right text-[#A4B3C6]/80 leading-relaxed font-light">
            為生活提供清晰、冷靜與務實的命理與環境哲學指引。
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] pt-4 text-[#A4B3C6]/60">
          <div>
            © {new Date().getFullYear()} 丁蔓山｜命理誌 (tingmanshan.com). All rights reserved.
          </div>
          <div className="flex space-x-5 mt-3 sm:mt-0">
            <button
              onClick={() => onNavigate && onNavigate('privacy-policy')}
              className="hover:text-[#D97706] transition-colors cursor-pointer"
            >
              隱私權政策
            </button>
            <button
              onClick={() => onNavigate && onNavigate('terms-of-service')}
              className="hover:text-[#D97706] transition-colors cursor-pointer"
            >
              服務條款
            </button>
            <button
              onClick={() => onNavigate && onNavigate('contact-us')}
              className="hover:text-[#D97706] transition-colors cursor-pointer"
            >
              聯絡我們
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
