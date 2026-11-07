import React from 'react';
import { Sparkles, UserCheck, ArrowRight, Download } from 'lucide-react';

interface ThreeCoreProductsProps {
  onStartAIReading: () => void;
  onOpenBooking: () => void;
  onOpenOnlineServices: () => void;
}

export const ThreeCoreProducts: React.FC<ThreeCoreProductsProps> = ({
  onStartAIReading,
  onOpenBooking,
  onOpenOnlineServices,
}) => {
  return (
    <section className="w-full py-2 font-sans select-none">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        
        {/* ========================================================= */}
        {/* 01 A.I. 算命及風水 */}
        {/* ========================================================= */}
        <div className="rounded-xl bg-[#14171A] border border-[#233547] hover:border-[#38BDF8]/60 transition-all p-5 flex flex-col justify-between shadow-lg relative overflow-hidden group">
          <div className="flex flex-col sm:flex-row gap-4 h-full">
            {/* Left Content Column */}
            <div className="flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded border border-[#38BDF8]/40 bg-[#38BDF8]/10 text-[#38BDF8] text-xs font-serif font-bold tracking-wider mb-2">
                  <Sparkles className="w-3 h-3" />
                  <span>A.I. 算命</span>
                </div>
                
                <h3 className="text-base font-serif font-bold text-[#F4EFEA] tracking-wide mb-2">
                  結合傳統命理與人工智能
                </h3>

                <p className="text-xs text-[#A4B3C6] leading-relaxed text-justify line-clamp-6 sm:line-clamp-none">
                  丁蔓山根據多年研習命理古籍的心得、實際批算經驗及多年累積的個人筆記，整理出一套專屬的命理知識資料庫，將傳統命理的知識、理論與分析方法，融入人工智能運算之中。
                  <br className="hidden sm:inline" />
                  透過 A.I. 技術進行命理計算與分析，即時生成個人命盤及相關運勢，並生成一份個人化命理報告。
                  <br className="hidden sm:inline" />
                  從五行喜忌、姻緣、事業財運，到未來流年與重要決策，讓傳統命理知識以更直接、方便的方式呈現。
                </p>
              </div>

              <div className="pt-2 border-t border-[#233547]/60 flex items-center justify-between text-xs">
                <span className="text-[#38BDF8] font-mono text-[11px]">HK$ 128 起 · 5大方向</span>
                <button
                  onClick={onStartAIReading}
                  className="text-xs text-[#38BDF8] hover:text-white font-medium flex items-center space-x-1 underline underline-offset-4 decoration-[#38BDF8]/40 hover:decoration-[#38BDF8] transition-all cursor-pointer"
                >
                  <span>詳細資料</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Right Image Column (40~45%) */}
            <div className="w-full sm:w-[42%] shrink-0 h-48 sm:h-auto rounded-lg overflow-hidden border border-[#233547] relative bg-[#0D0F11]">
              <img
                src="/ai_card_img.jpg"
                alt="A.I. 算命古籍與羅盤"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <button
                onClick={onStartAIReading}
                className="absolute bottom-2 left-2 right-2 py-1.5 px-2 bg-[#1E3A5F]/90 hover:bg-[#2563EB] text-[#F4EFEA] text-[11px] font-semibold rounded text-center backdrop-blur-sm transition-colors shadow cursor-pointer"
              >
                立即開始八字分析
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 02 預約丁蔓山 */}
        {/* ========================================================= */}
        <div className="rounded-xl bg-[#231B10] border-2 border-[#D97706]/80 hover:border-[#F59E0B] transition-all p-5 flex flex-col justify-between shadow-xl relative overflow-hidden group">
          <div className="flex flex-col sm:flex-row gap-4 h-full">
            {/* Left Content Column */}
            <div className="flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded border border-[#D97706] bg-[#D97706]/20 text-[#F59E0B] text-xs font-serif font-bold tracking-wider mb-2">
                  <UserCheck className="w-3 h-3" />
                  <span>預約丁蔓山</span>
                </div>
                
                <h3 className="text-base font-serif font-bold text-[#F59E0B] tracking-wide mb-2">
                  八字 · 卜卦 · 風水
                </h3>

                <p className="text-xs text-[#E5D7C5] leading-relaxed text-justify line-clamp-6 sm:line-clamp-none">
                  丁蔓山多年研習命理及風水術數，提供八字論命、流年問事、卜卦求謀及家居與商業風水等專業諮詢。無論是個人運程、商業發展、住宅與辦公室布局，均可按個別情況作深入分析。
                  <br className="hidden sm:inline" />
                  每次諮詢均由丁蔓山親自批查，透過線上視像或語音方式進行，提供專業分析與建議。
                </p>
              </div>

              <div className="pt-2 border-t border-[#D97706]/30 flex items-center justify-between text-xs">
                <span className="text-[#F59E0B] font-mono text-[11px]">真人深度批命 · HK$ 2,800 起</span>
                <button
                  onClick={onOpenBooking}
                  className="text-xs text-[#F59E0B] hover:text-white font-medium flex items-center space-x-1 underline underline-offset-4 decoration-[#D97706]/60 hover:decoration-[#F59E0B] transition-all cursor-pointer"
                >
                  <span>詳細資料</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Right Image Column (40~45%) */}
            <div className="w-full sm:w-[42%] shrink-0 h-48 sm:h-auto rounded-lg overflow-hidden border border-[#D97706]/40 relative bg-[#1A1208]">
              <img
                src="/booking_card_img.jpg"
                alt="丁蔓山大師案頭茶具與古籍"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <button
                onClick={onOpenBooking}
                className="absolute bottom-2 left-2 right-2 py-1.5 px-2 bg-[#D97706] hover:bg-[#B45309] text-[#141618] text-[11px] font-bold rounded text-center transition-colors shadow cursor-pointer"
              >
                預約諮詢
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 03 通勝 App (經典撕曆視覺) */}
        {/* ========================================================= */}
        <div id="tung-shing" className="rounded-xl bg-[#FAF6F0] text-[#1F2937] border border-[#D1D5DB] shadow-lg p-5 flex flex-col justify-between relative overflow-hidden">
          {/* Calendar Paper Top Perforation */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#E5E0D6] border-b border-dashed border-[#BDB4A5] flex justify-around items-center px-4">
            <div className="w-2 h-2 rounded-full bg-[#374151]/30" />
            <div className="w-2 h-2 rounded-full bg-[#374151]/30" />
          </div>

          <div className="pt-2 space-y-3">
            {/* Header Dates */}
            <div className="border-b border-[#2563EB]/40 pb-2 text-center">
              <div className="font-serif font-bold text-[#1E3A8A] text-xs sm:text-sm tracking-wider">
                2026年11月3日
              </div>
              <div className="font-serif text-[#1E3A8A] text-[11px] tracking-widest mt-0.5">
                丙午年 九月 廿五日 辛巳日
              </div>
            </div>

            {/* Calendar Main Grid */}
            <div className="grid grid-cols-7 gap-1 items-stretch py-1">
              
              {/* Left Column: 吉 (2 cols) */}
              <div className="col-span-2 border border-[#0D9488] rounded p-1.5 flex flex-col items-center bg-[#F0FDF4]/60">
                <span className="w-5 h-5 rounded border border-[#0D9488] text-[#0D9488] font-serif font-bold text-xs flex items-center justify-center mb-1">
                  吉
                </span>
                <div className="font-serif text-[11px] text-[#166534] tracking-widest leading-loose flex flex-col items-center space-y-1 font-medium">
                  <span>交易</span>
                  <span>動土</span>
                  <span>安床</span>
                  <span>栽種</span>
                  <span>移徙</span>
                  <span>納畜</span>
                </div>
              </div>

              {/* Center Column: Big Red Date (3 cols) */}
              <div className="col-span-3 border border-[#2563EB]/40 rounded p-1 flex flex-col items-center justify-between text-center bg-white/70 shadow-sm">
                <div className="font-serif font-bold text-5xl sm:text-6xl text-[#DC2626] leading-none my-auto pt-2">
                  3
                </div>
                <div className="w-full space-y-0.5 pb-1">
                  <span className="inline-block px-2 py-0.5 bg-[#DC2626]/10 text-[#DC2626] text-[10px] font-bold rounded-full font-serif">
                    中吉
                  </span>
                  <div className="text-[10px] text-[#4B5563] font-serif">
                    犯沖肖豬
                  </div>
                </div>
              </div>

              {/* Right Column: 忌 (2 cols) */}
              <div className="col-span-2 border border-[#0D9488] rounded p-1.5 flex flex-col items-center bg-[#FEF2F2]/60">
                <span className="w-5 h-5 rounded border border-[#0D9488] text-[#0D9488] font-serif font-bold text-xs flex items-center justify-center mb-1">
                  忌
                </span>
                <div className="font-serif text-[11px] text-[#991B1B] tracking-widest leading-loose flex flex-col items-center space-y-1 font-medium">
                  <span>行程</span>
                  <span>取魚</span>
                  <span>醞釀</span>
                  <span>針灸</span>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Download Actions */}
          <div className="pt-3 border-t border-[#D1D5DB] flex flex-col items-center space-y-2">
            <a
              href="#download"
              onClick={(e) => {
                e.preventDefault();
                alert('丁蔓山《每日通勝》App 正在 App Store 及 Google Play 審批中，即將開放免費下載！');
              }}
              className="text-xs font-serif font-bold text-[#1E3A8A] hover:text-[#DC2626] underline underline-offset-4 decoration-[#1E3A8A]/40 transition-colors flex items-center space-x-1"
            >
              <span>每日通勝 免費下載</span>
              <Download className="w-3 h-3" />
            </a>

            {/* App Store & Google Play Badges */}
            <div className="flex items-center gap-2">
              <div 
                onClick={() => alert('App Store 繁體中文版即將上架！')}
                className="cursor-pointer px-2.5 py-1 bg-black text-white rounded text-[10px] font-mono flex items-center space-x-1 hover:bg-neutral-800 transition-colors shadow-sm"
              >
                <span> App Store</span>
              </div>
              <div 
                onClick={() => alert('Google Play 繁體中文版即將上架！')}
                className="cursor-pointer px-2.5 py-1 bg-black text-white rounded text-[10px] font-mono flex items-center space-x-1 hover:bg-neutral-800 transition-colors shadow-sm"
              >
                <span>▶ Google Play</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
