import React from 'react';

interface ThreeCoreProductsProps {
  onStartAIReading: () => void;
  onOpenBooking: () => void;
  onOpenOnlineServices: () => void;
}

export const ThreeCoreProducts: React.FC<ThreeCoreProductsProps> = ({
  onStartAIReading,
  onOpenBooking,
}) => {
  return (
    <section className="w-full py-2 font-sans select-none">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        
        {/* ========================================================= */}
        {/* 01 A.I. 算命 (黑底 · 藍框元素 · 右側古籍羅盤圖) */}
        {/* ========================================================= */}
        <div className="bg-[#1F2022] border border-[#333538] p-4 sm:p-5 flex flex-col justify-between shadow-xl">
          <div className="flex flex-col sm:flex-row gap-3.5 h-full">
            {/* Left Column: Text */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                {/* Tag with blue outline box */}
                <div className="inline-block border border-[#3B82F6] px-2 py-0.5 mb-2.5">
                  <span className="text-[#38BDF8] text-xs font-sans font-medium tracking-wide">
                    A.I. 算命
                  </span>
                </div>

                {/* Subtitle */}
                <h3 className="text-xs sm:text-[13px] font-bold text-[#F4EFEA] tracking-wide mb-2">
                  結合傳統命理與人工智能
                </h3>

                {/* Paragraphs */}
                <div className="text-[10.5px] sm:text-[11px] text-[#A4B3C6] leading-[1.6] text-justify space-y-2">
                  <p>
                    丁蔓山根據多年研習命理古籍的心得、實際批算經驗及多年累積的個人筆記，整理出一套專屬的命理知識資料庫，將傳統命理的知熾、理論與分析方法，融入人工智能運算之中。
                  </p>
                  <p>
                    透過 A.I. 技術進行命理計算與分析，即時生成個人命盤及相關運勢，並生成一份個人化命理報告。
                  </p>
                  <p>
                    從五行喜忌、姻緣、事業財運，到未來流年與重要決策，讓傳統命理知識以更直接、方便的方式呈現。
                  </p>
                </div>
              </div>

              {/* Bottom Link: 詳細資料 */}
              <div className="pt-3 mt-auto">
                <button
                  type="button"
                  onClick={onStartAIReading}
                  className="border border-[#3B82F6] text-[#38BDF8] hover:text-white hover:bg-[#3B82F6]/20 px-2 py-0.5 text-[10.5px] transition-colors cursor-pointer inline-block"
                >
                  詳細資料
                </button>
              </div>
            </div>

            {/* Right Column: Image (占 40~45%) */}
            <div className="w-full sm:w-[44%] shrink-0 h-52 sm:h-auto overflow-hidden relative bg-[#0D0F11]">
              <img
                src="/ai_card_img.jpg"
                alt="A.I. 算命古籍與羅盤"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 02 預約丁蔓山 (暖琥珀色底 · 深褐字 · 右側案頭茶具圖) */}
        {/* ========================================================= */}
        <div className="bg-[#C66D0F] p-4 sm:p-5 flex flex-col justify-between shadow-xl">
          <div className="flex flex-col sm:flex-row gap-3.5 h-full">
            {/* Left Column: Text */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                {/* Tag with dark outline box */}
                <div className="inline-block border border-[#2B1602] px-2 py-0.5 mb-2.5">
                  <span className="text-[#1A0D01] text-xs font-sans font-bold tracking-wide">
                    預約丁蔓山
                  </span>
                </div>

                {/* Subtitle */}
                <h3 className="text-xs sm:text-[13px] font-bold text-[#1A0D01] tracking-wide mb-2">
                  八字 · 卜卦 · 風水
                </h3>

                {/* Paragraphs */}
                <div className="text-[10.5px] sm:text-[11px] text-[#2B1602] leading-[1.6] text-justify space-y-2.5 font-medium">
                  <p>
                    丁蔓山多年研習命理及風水術數，提供八字論命、流年問事、卜卦求謀及家居與商業風水等專業諮詢。無論是個人運程、商業發展、住宅與辦公室布局，均可按個別情況作深入分析。
                  </p>
                  <p>
                    每次諮詢均由丁蔓山親自批查，透過線上視像或語音方式進行，提供專業分析與建議。
                  </p>
                </div>
              </div>

              {/* Bottom Link: 詳細資料 */}
              <div className="pt-3 mt-auto">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="border border-[#2B1602] text-[#1A0D01] hover:bg-black/10 px-2 py-0.5 text-[10.5px] font-bold transition-colors cursor-pointer inline-block"
                >
                  詳細資料
                </button>
              </div>
            </div>

            {/* Right Column: Image (占 40~45%) */}
            <div className="w-full sm:w-[44%] shrink-0 h-52 sm:h-auto overflow-hidden relative bg-[#8E4B07]">
              <img
                src="/booking_card_img.jpg"
                alt="丁蔓山大師案頭茶具與古籍"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 03 通勝 App (宣紙白底 · 藍框紅字 · 經典撕曆視覺) */}
        {/* ========================================================= */}
        <div id="tung-shing" className="bg-[#DAD7D0] text-[#1E293B] p-4 sm:p-5 flex flex-col justify-between shadow-xl">
          <div className="flex flex-col h-full justify-between space-y-3">
            
            {/* Top Date Header Box */}
            <div className="border border-[#2563EB] p-1.5 text-center">
              <div className="font-serif font-bold text-[#1E3A8A] text-xs sm:text-[13px] tracking-wider">
                2026年11月3日
              </div>
              <div className="font-serif text-[#1E3A8A] text-[10px] sm:text-[11px] tracking-widest mt-0.5">
                丙午年 九月 廿五日 辛巳日
              </div>
            </div>

            {/* Middle Grid: 吉 (left) | 3 中吉 (center) | 忌 (right) */}
            <div className="grid grid-cols-7 gap-1.5 items-stretch py-1">
              
              {/* Left Column: 吉 */}
              <div className="col-span-2 flex flex-col items-center">
                <div className="border border-[#2563EB] text-[#2563EB] w-7 h-6 flex items-center justify-center font-serif text-xs font-bold mb-1">
                  吉
                </div>
                <div className="border border-[#2563EB] w-full p-1 flex flex-col items-center space-y-0.5 font-serif text-[11px] text-[#1E293B] flex-1 justify-around">
                  <span>交 易</span>
                  <span>動 土</span>
                  <span>安 床</span>
                  <span>栽 種</span>
                  <span>移 徙</span>
                  <span>納 畜</span>
                </div>
              </div>

              {/* Center Column: Big Red 3 */}
              <div className="col-span-3 border border-[#2563EB] p-1 flex flex-col items-center justify-between text-center bg-white/40">
                <div className="font-serif font-bold text-5xl sm:text-6xl text-[#DC2626] leading-none my-auto pt-1">
                  3
                </div>
                <div className="w-full space-y-1 pb-1">
                  <div className="text-xs text-[#DC2626] font-serif font-bold">
                    中吉
                  </div>
                  <div className="border border-[#2563EB] text-[10px] text-[#1E293B] font-serif py-0.5 mx-1">
                    犯沖肖豬
                  </div>
                </div>
              </div>

              {/* Right Column: 忌 */}
              <div className="col-span-2 flex flex-col items-center">
                <div className="border border-[#2563EB] text-[#2563EB] w-7 h-6 flex items-center justify-center font-serif text-xs font-bold mb-1">
                  忌
                </div>
                <div className="border border-[#2563EB] w-full p-1 flex flex-col items-center space-y-1 font-serif text-[11px] text-[#1E293B] flex-1 justify-around">
                  <span>行 程</span>
                  <span>取 魚</span>
                  <span>醞 釀</span>
                  <span>針 灸</span>
                </div>
              </div>

            </div>

            {/* Bottom Actions: 每日通勝 免費下載 & Badges */}
            <div className="pt-2 flex flex-col items-center space-y-2 text-center">
              <div>
                <a
                  href="#download"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('丁蔓山《每日通勝》App 即將開放下載！');
                  }}
                  className="border border-[#2563EB] text-[#1E3A8A] hover:bg-[#2563EB]/10 px-3 py-0.5 text-xs font-serif font-bold transition-colors inline-block cursor-pointer"
                >
                  每日通勝 免費下載
                </a>
              </div>

              <div className="flex items-center gap-2">
                <div 
                  onClick={() => alert('App Store 繁體中文版即將上架！')}
                  className="cursor-pointer px-2.5 py-1 bg-black text-white rounded text-[9px] font-mono flex items-center space-x-1 hover:bg-neutral-800 transition-colors shadow-sm"
                >
                  <span> App Store</span>
                </div>
                <div 
                  onClick={() => alert('Google Play 繁體中文版即將上架！')}
                  className="cursor-pointer px-2.5 py-1 bg-black text-white rounded text-[9px] font-mono flex items-center space-x-1 hover:bg-neutral-800 transition-colors shadow-sm"
                >
                  <span>▶ Google Play</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
