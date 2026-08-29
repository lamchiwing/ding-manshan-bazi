import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#1e2022] text-[#A4B3C6] py-12 border-t border-[#1E3A5F]/40 font-sans">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Logo */}
          <div className="text-xl font-serif tracking-widest flex items-center">
            <span className="text-[#D97706] font-bold">丁</span>
            <span className="text-[#D97706] mx-1 font-light">｜</span>
            <span className="text-[#F4EFEA] font-semibold">蔓山</span>
            <span className="text-[#A4B3C6] text-sm ml-2 font-sans">命理誌</span>
          </div>

          <p className="text-xs text-center md:text-right max-w-lg leading-relaxed font-light">
            Modern Japanese Editorial × Chinese Metaphysics × Premium Digital Platform.<br />
            為現代人提供精微、理性、具備啟發性的人生推演與環境哲學指引。
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs pt-6 text-[#A4B3C6]/60">
          <div>
            © {new Date().getFullYear()} 丁蔓山｜命理誌. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <span className="hover:text-[#F4EFEA] cursor-pointer">隱私協議</span>
            <span className="hover:text-[#F4EFEA] cursor-pointer">服務條款</span>
            <span className="hover:text-[#F4EFEA] cursor-pointer">聯絡我們 (WhatsApp: +852 9123 4567)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
