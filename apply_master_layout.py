import os, subprocess, re

# 1. 寫入 100% 還原原稿的 ThreeCoreProducts.tsx
tcp_code = '''import React from 'react';
import { Download } from 'lucide-react';

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
        {/* 01 A.I. 算命 (黑底 · 橘黃標籤 · 5項定價清單 · 羅盤圖) */}
        {/* ========================================================= */}
        <div className="bg-[#1F2022] p-5 flex flex-col justify-between shadow-xl">
          <div className="flex flex-col sm:flex-row gap-4 h-full">
            {/* Left Content Column */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-sm sm:text-base font-serif font-bold text-[#D97706] mb-1.5">
                  A.I. 算命
                </h2>
                
                <h3 className="text-xs sm:text-[13px] font-bold text-[#F4EFEA] mb-2 leading-snug">
                  結合傳統命理與人工智能
                </h3>

                <div className="text-[10.5px] sm:text-[11px] text-[#A4B3C6] leading-[1.65] text-justify space-y-2">
                  <p>
                    結合丁蔓山多年研習中國命理古籍的心得、實際批算經驗及個人筆記，整理成專屬命理知識資料庫，融入人工智能技術，提供個人化八字及風水分析。
                  </p>
                  <p>
                    由五行喜忌、八字人生導航、姻緣、事業財運，到未來三年運程及住宅風水，讓傳統命理知識以更直接、方便的方式呈現。
                  </p>
                </div>

                {/* 5 項專屬方向定價列表 */}
                <div className="my-3 space-y-1 text-[11px] text-[#F4EFEA] font-medium font-serif">
                  <div>五行喜忌指南 HK$128</div>
                  <div>3年人生及流年 HK$388</div>
                  <div>姻緣及合盤 HK$388+</div>
                  <div>3年事業財運導航 HK$488</div>
                  <div>流月及重大決策 HK$488+</div>
                </div>
              </div>

              {/* Bottom Link: 探索所有 AI 命理產品 */}
              <div className="pt-2 mt-auto">
                <button
                  type="button"
                  onClick={onStartAIReading}
                  className="text-xs font-serif font-bold text-[#F4EFEA] hover:text-[#D97706] transition-colors cursor-pointer text-left"
                >
                  探索所有 AI 命理產品
                </button>
              </div>
            </div>

            {/* Right Column: Image (羅盤與青銅器) */}
            <div className="w-full sm:w-[44%] shrink-0 h-56 sm:h-auto overflow-hidden relative bg-[#0D0F11]">
              <img
                src="/ai_card_img.jpg"
                alt="A.I. 算命古籍與羅盤"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 02 預約 丁蔓山 (暖琥珀色底 · 白/淺色字 · 3項真人服務 · 茶具圖) */}
        {/* ========================================================= */}
        <div className="bg-[#C66D0F] p-5 flex flex-col justify-between shadow-xl">
          <div className="flex flex-col sm:flex-row gap-4 h-full">
            {/* Left Content Column */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-sm sm:text-base font-serif font-bold text-[#8A0000] mb-1.5">
                  預約 丁蔓山
                </h2>
                
                <h3 className="text-xs sm:text-[13px] font-bold text-[#FFF8F0] mb-2 leading-snug">
                  八字命理、擇日問事及家居商業風水專業諮詢
                </h3>

                <div className="text-[10.5px] sm:text-[11px] text-[#FFF8F0]/95 leading-[1.65] text-justify space-y-2">
                  <p>
                    丁蔓山多年研習命理及風水術數，結合傳統古籍理論與實際批算經驗，提供個人及企業專業諮詢服務。
                  </p>
                  <p>
                    服務涵蓋八字論命、流年問事、起卦求謀、嬰兒命名、吉時擇日，以及家居與商業風水布局。
                  </p>
                  <p>
                    每項諮詢均由丁蔓山親自批算及分析，按個別情況提供專業意見。
                  </p>
                </div>

                {/* 3 大真人諮詢定價列表 */}
                <div className="my-3 space-y-1 text-[11px] text-[#FFF8F0] font-medium font-serif">
                  <div>八字命理 | HK$2,800+</div>
                  <div>擇日問事 | HK$2,800+</div>
                  <div>家居及商業風水 | HK$18,00</div>
                </div>
              </div>

              {/* Bottom Link: 查看所有真人服務 */}
              <div className="pt-2 mt-auto">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="text-xs font-serif font-bold text-[#FFF8F0] hover:text-[#1A0D01] transition-colors cursor-pointer text-left"
                >
                  查看所有真人服務
                </button>
              </div>
            </div>

            {/* Right Column: Image (茶具古籍圖) */}
            <div className="w-full sm:w-[44%] shrink-0 h-56 sm:h-auto overflow-hidden relative bg-[#8E4B07]">
              <img
                src="/booking_card_img.jpg"
                alt="丁蔓山大師案頭茶具與古籍"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 03 通勝 App (米灰白底 · 大紅吉字與大紅3 · 大綠忌字) */}
        {/* ========================================================= */}
        <div id="tung-shing" className="bg-[#E5E3DD] text-[#1E293B] p-5 flex flex-col justify-between shadow-xl">
          <div className="flex flex-col h-full justify-between space-y-3">
            
            {/* Top Date Header */}
            <div className="text-center font-serif text-[#1F2937] pb-2">
              <div className="font-bold text-xs sm:text-sm tracking-wide">
                2026年11月3日
              </div>
              <div className="text-[10px] sm:text-[11px] text-[#4B5563] tracking-wider mt-0.5">
                丙午年 九月 廿五日 辛巳日
              </div>
            </div>

            {/* Middle Grid: 大紅吉 | 大紅3 中吉 犯沖肖豬 | 大綠忌 */}
            <div className="grid grid-cols-7 gap-1 items-stretch py-1">
              
              {/* Left Column: 大紅 吉 */}
              <div className="col-span-2 flex flex-col items-center">
                <div className="text-[#DC2626] font-serif font-bold text-2xl mb-1">
                  吉
                </div>
                <div className="flex flex-col items-center space-y-1 font-serif text-[11px] text-[#1E293B] tracking-wider">
                  <span>交易</span>
                  <span>動土</span>
                  <span>安床</span>
                  <span>栽種</span>
                  <span>移徙</span>
                  <span>納畜</span>
                </div>
              </div>

              {/* Center Column: Big Red 3 */}
              <div className="col-span-3 flex flex-col items-center justify-between text-center">
                <div className="font-serif font-bold text-6xl text-[#DC2626] leading-none my-auto pt-1">
                  3
                </div>
                <div className="w-full space-y-0.5 pb-1">
                  <div className="text-xs text-[#DC2626] font-serif font-bold">
                    中吉
                  </div>
                  <div className="text-[11px] text-[#1E293B] font-serif">
                    犯沖肖豬
                  </div>
                </div>
              </div>

              {/* Right Column: 大綠 忌 */}
              <div className="col-span-2 flex flex-col items-center">
                <div className="text-[#16A34A] font-serif font-bold text-2xl mb-1">
                  忌
                </div>
                <div className="flex flex-col items-center space-y-1 font-serif text-[11px] text-[#1E293B] tracking-wider">
                  <span>行程</span>
                  <span>取魚</span>
                  <span>醞釀</span>
                  <span>針灸</span>
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
                  className="text-xs font-serif font-bold text-[#DC2626] hover:underline flex items-center space-x-1 cursor-pointer"
                >
                  <span>每日通勝 免費下載</span>
                  <Download className="w-3.5 h-3.5" />
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
'''

with open("frontend/src/components/ThreeCoreProducts.tsx", "w", encoding="utf-8") as f:
    f.write(tcp_code)
print("✓ [1/3] ThreeCoreProducts.tsx 已完整還原原稿排位、字體大小與文字列表！")

# 2. 寫入跟足原稿選單的 Header.tsx
header_code = '''import React from 'react';

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
'''

with open("frontend/src/components/Header.tsx", "w", encoding="utf-8") as f:
    f.write(header_code)
print("✓ [2/3] Header.tsx (金橙色選單項目與原稿順序) 更新完成！")

# 3. 確保 App.tsx 移除橫幅標語
app_path = "frontend/src/App.tsx"
if os.path.exists(app_path):
    with open(app_path, "r", encoding="utf-8") as f:
        app_text = f.read()
    app_text = re.sub(r'\{/\* 2\. Brand Hero Tagline \*/\}[\s\S]*?</div>\s*', '', app_text)
    with open(app_path, "w", encoding="utf-8") as f:
        f.write(app_text)
    print("✓ [3/3] App.tsx 已移除「傳承古法...」標語！")

# 4. 執行 Vite 打包編譯
print(">>> 正在執行 Vite 打包編譯 ...")
subprocess.run("cd frontend && npm run build", shell=True, check=True)
print("==================================================")
print("🎉 原稿排版與圖片已全部編譯成功！")
print("==================================================")
