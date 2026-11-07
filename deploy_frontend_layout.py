import os, subprocess, base64

print("==================================================")
print("🚀 開始部署新版首頁三大產品入口 ＋ 命理誌文章專區 ...")
print("==================================================")

# 1. 確保圖片目錄存在並寫入圖片
os.makedirs("frontend/public", exist_ok=True)

# 2. 建立 ThreeCoreProducts.tsx 組件
comp_path = "frontend/src/components/ThreeCoreProducts.tsx"
comp_code = '''import React from 'react';
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
'''
with open(comp_path, "w", encoding="utf-8") as f:
    f.write(comp_code)
print(f"✓ [1/5] {comp_path} 建立成功！")

# 3. 寫入包含 6 大類別與專屬產品導流錨點的 articles.ts
art_path = "frontend/src/data/articles.ts"
art_code = '''export interface ArticleConversionProduct {
  serviceId: string;
  badge: string;
  title: string;
  price: string;
  ctaText: string;
}

export interface ArticleItem {
  id: string;
  category: '八字' | '五行' | '風水' | '流月運程' | '流年運程' | '面相';
  title: string;
  readTime: string;
  summary: string;
  publishedDate: string;
  author: string;
  conversionProduct: ArticleConversionProduct;
  contentParagraphs?: string[];
}

export type LibraryArticle = ArticleItem;

export const ARTICLES_DATA: ArticleItem[] = [
  {
    id: "art-1",
    category: "八字",
    title: "解構四柱八字：年柱、月令、日柱與時柱所承載的生命底色",
    readTime: "4 分鐘閱讀",
    summary: "從根基祖業、青年奮鬥、自我本質到晚年歸宿，四柱如同時空座標般折射出一個人的能量流動與命運節律。",
    publishedDate: "2026.11",
    author: "丁蔓山",
    conversionProduct: {
      serviceId: "srv-12-months-decisions",
      badge: "人生決策必讀",
      title: "十二流月運程＋重大決策矩陣 (個人化決策版)",
      price: "HK$ 488",
      ctaText: "立即開始個人化推演"
    },
    contentParagraphs: [
      "在子平八字學說中，四柱（年、月、日、時）並非孤立的八個干支，而是一套嚴密的時間能量座標體系。年柱代表個人的根基、家族門第與童年稟賦；月柱為月令提綱，主宰全局五行氣候與青年時期的事業開拓；日柱日干代表真正的自我核心（日主），日支則為配偶宮與內心歸屬；時柱則主晚年造化、個人作品與潛在歸宿。",
      "很多人常問：相同八字的人是否會有一樣的人生？答案顯然是否定的。八字折射的是生命底層的五行格局與動能傾向，就如同航海圖標示了洋流與風向。真正決定航程終點的，是命主在面臨重大轉折時所做出的時空決策。"
    ]
  },
  {
    id: "art-2",
    category: "五行",
    title: "五行欠火或金水過旺？以空間、色彩與日常心念補足本命喜用神",
    readTime: "5 分鐘閱讀",
    summary: "五行並非抽象哲學，而是體現於生活作息、色彩光影與居住環境的氣場調和。極簡五行日常能量自調指南。",
    publishedDate: "2026.11",
    author: "丁蔓山",
    conversionProduct: {
      serviceId: "srv-five-elements",
      badge: "基礎五行精批",
      title: "八字五行與喜用神個人指南 (精準調候版)",
      price: "HK$ 128",
      ctaText: "解鎖個人五行指南"
    },
    contentParagraphs: [
      "人體與命盤皆是一個微型宇宙。當命中五行嚴重失衡，例如冬生水旺而滴火全無，人容易陷入情緒低落、缺乏開拓熱情；反之，若夏生火炎土燥，則往往思慮過急、容易衝動誤事。",
      "了解自己的喜用神，目的是學會在生活中『借力』。喜火者宜多引進晨光、多接觸南向開闊空間與明朗色彩；喜水者則宜臨水而居、保持沉潛思維。五行調和的核心不在於盲目配戴飾物，而在於從心態、作息到空間環境建立共振。"
    ]
  },
  {
    id: "art-3",
    category: "風水",
    title: "2024–2043 離九運大勢：家居與辦公室正神零神旺財佈局全解析",
    readTime: "7 分鐘閱讀",
    summary: "離九運二十年大運當令，玄空風水正神零神易位。住宅坐向與商務動線如何借南方火運之力順勢聚財避凶。",
    publishedDate: "2026.10",
    author: "丁蔓山",
    conversionProduct: {
      serviceId: "srv-master-bazi",
      badge: "大師深度批命",
      title: "丁蔓山大師 · 住宅／辦公室風水及八字深度諮詢",
      price: "HK$ 2,800 起",
      ctaText: "預約丁蔓山親批"
    },
    contentParagraphs: [
      "三元九運中，2024年至2043年正式步入離九火運。離為火、為麗、為明，代表文化、科技、人工智慧、身心靈與美學產業將迎來前所未有的繁榮，同時也代表虛火上升、躁動不安的社會氛圍。",
      "在玄空風水法則中，九運以『正神正位裝，零神零位裝』為核心。南方為正神方，宜見山、見高大建築以穩固氣場與人丁；北方為零神方，宜見水、見開闊動線以催動財祿。住宅若能順應九運理氣，自能居安得利。"
    ]
  },
  {
    id: "art-4",
    category: "流月運程",
    title: "流月吉凶交替規律：如何借月令十神避開職場暗礁與財務陷阱",
    readTime: "6 分鐘閱讀",
    summary: "年運定基調，月運見真章。每月節令交替之際，五行氣機轉變如何影響個人情緒、談判時機與合約簽署。",
    publishedDate: "2026.10",
    author: "丁蔓山",
    conversionProduct: {
      serviceId: "srv-12-months",
      badge: "全年流月全景",
      title: "流年＋十二流月運程全面解讀 (吉凶全覽)",
      price: "HK$ 368",
      ctaText: "解鎖 12 流月運程"
    },
    contentParagraphs: [
      "許多人在一年之中常有幾個月特別順風順水，也有幾個月諸事不順。這背後的原因正是『流月與原局日主的十神碰撞』。",
      "逢官殺之月，職場壓力與考核權責增加，適合向上匯報爭取責任，但不宜任性抗上；逢食傷之月，靈感迸發、業務擴張動能強烈，但需慎防口舌是非；逢比劫爭財之月，則要嚴守現金流，避免盲目借貸與非理性擴張。"
    ]
  },
  {
    id: "art-5",
    category: "流年運程",
    title: "丙午年歲君火旺天干相映：十天干日主流年機遇與重大決策矩陣",
    readTime: "8 分鐘閱讀",
    summary: "2026丙午歲君坐羊刃帝旺，烈火淬煉。十個天干日主在極陽之年中，如何確立攻守策略與關鍵轉折點。",
    publishedDate: "2026.10",
    author: "丁蔓山",
    conversionProduct: {
      serviceId: "srv-12-months-decisions",
      badge: "重大決策必看",
      title: "十二流月運程＋重大決策矩陣 (HK$ 488)",
      price: "HK$ 488",
      ctaText: "獲取專屬決策矩陣"
    },
    contentParagraphs: [
      "丙午流年，天干丙火、地支午火，純粹烈焰，氣勢浩大。對於命局喜火者而言，此年是破繭而出、聲名鵲起、跨越階級的絕佳跳板；但對於命局忌火、原局燥烈者，則恐面臨健康心血管負荷與財務劇烈波動。",
      "金水日主（庚、辛、壬、癸）與木火日主（甲、乙、丙、丁）將呈現截然不同的機遇走勢。掌握歲君的生剋節奏，便能在狂風巨浪中穩握舵盤。"
    ]
  },
  {
    id: "art-6",
    category: "面相",
    title: "面相十二宮與三停氣色：從額相、鼻翼與眼神洞悉個人行運走勢",
    readTime: "5 分鐘閱讀",
    summary: "相由心生，氣色隨運轉。上停天庭看少年貴人，中停鼻顴看中年財權，下停地閣看晚歲豐足。",
    publishedDate: "2026.09",
    author: "丁蔓山",
    conversionProduct: {
      serviceId: "srv-master-bazi",
      badge: "真人一對一",
      title: "丁蔓山大師 · 1對1 八字命理深度諮詢 (含面相氣色指引)",
      price: "HK$ 4,800",
      ctaText: "預約大師一對一"
    },
    contentParagraphs: [
      "古典相法有雲：『有其內必形諸外』。面相並非僵化不變的骨骼尺寸，而是一個人長期心念、健康狀態與當前行運氣色的即時投影儀。",
      "印堂發亮、雙目神藏者，往往處於即將突破的吉運期；反之，若印堂暗沉、鼻準發赤，則往往預示著近期財務支出過劇或面臨決策盲區。結合八字命盤與即時面相觀察，能大幅提高吉凶判斷的精準度。"
    ]
  },
  {
    id: "art-7",
    category: "八字",
    title: "夫妻宮逢沖逢合之年：親密關係的情緒溝通地圖與正緣引動",
    readTime: "5 分鐘閱讀",
    summary: "婚姻宮是內心情感的晴雨表。逢沖往往引動摩擦或異地分居，逢合則促成定局或正緣相遇。",
    publishedDate: "2026.09",
    author: "丁蔓山",
    conversionProduct: {
      serviceId: "srv-love-3yr",
      badge: "感情深度解析",
      title: "感情／姻緣・未來 3 年正緣解析 (36個月全覽)",
      price: "HK$ 188",
      ctaText: "立即解析正緣走勢"
    },
    contentParagraphs: [
      "日支為夫妻宮，也是個人情感安全感的居所。當流年地支與日支產生六合或三合時，往往是單身者最容易遇見心動對象、戀愛成熟步入婚姻的黃金窗口；然而，當夫妻宮逢六沖時，則容易因微小生活細節引發冷戰。",
      "合婚的目的不是非黑即白地判定『合或不合』，而是透過雙方的命理特質，看清彼此的情緒觸發點，學會在相生之處昇華默契，在相剋相沖之處給予對方空間。"
    ]
  },
  {
    id: "art-8",
    category: "八字",
    title: "打工還是創業？從八字七殺與食傷配置看人生黃金創業窗口期",
    readTime: "6 分鐘閱讀",
    summary: "並非所有人都適合開拓新局。七殺賦予冒險魄力，食傷賦予技術創新，身強財旺方能立足商海。",
    publishedDate: "2026.08",
    author: "丁蔓山",
    conversionProduct: {
      serviceId: "srv-startup-3yr",
      badge: "創業窗口評估",
      title: "八字創業／轉職・未來 3 年黃金窗口期 (個人化指南)",
      price: "HK$ 288",
      ctaText: "解鎖創業窗口評估"
    },
    contentParagraphs: [
      "創業是一場高強度的能量消耗戰。命帶正官正印者，天生具有制度感、信譽度與體制親和力，在大型企業或專業機構往往能走得更穩；而命帶七殺、偏財與傷官者，天生對商業利差敏感，勇於顛覆傳統，適合主導新創業務。",
      "但最重要的前提在於日主能量強弱。身弱逢財殺大運，貿然創業往往容易背負債務；唯有在日主得印比生扶、行運通達的黃金窗口期進場，才能事半功倍。"
    ]
  },
  {
    id: "art-9",
    category: "八字",
    title: "何謂「身強任財」與「財多身弱」？破除職場無效努力與虧損困局",
    readTime: "5 分鐘閱讀",
    summary: "八字中財星旺盛並不等於一定發財。為何有人拼命求財反而身心俱疲？深度解析命理財運底層邏輯。",
    publishedDate: "2026.08",
    author: "丁蔓山",
    conversionProduct: {
      serviceId: "srv-career-3yr",
      badge: "職涯財運精析",
      title: "事業／財運・未來 3 年深度解讀 (財運走勢全覽)",
      price: "HK$ 188",
      ctaText: "解讀事業財運走勢"
    },
    contentParagraphs: [
      "在子平八字中，『我剋者為財』。財星代表個人所掌控的資源、金錢、業務與慾望。既然是『我剋』，首先要求日主本身具有足夠的承擔力與抗壓性。",
      "若是『財多身弱』，眼前機會雖多，但個人精力與體制承載力不足，盲目承接大項目往往引發內耗甚至財務虧損。此時首要之務不是拼命追逐外部回報，而是以印星（深造、考證、養精蓄銳）與比劫（尋求可靠合夥人）強健本體。"
    ]
  },
  {
    id: "art-10",
    category: "風水",
    title: "現代都市大廈玄空納氣法：門窗朝向與動線對家運的深層影響",
    readTime: "6 分鐘閱讀",
    summary: "高層住宅如何判定向首？電梯井、走廊氣流與採光落地窗，如何共同構築現代都市住宅的吉凶氣場。",
    publishedDate: "2026.07",
    author: "丁蔓山",
    conversionProduct: {
      serviceId: "srv-master-bazi",
      badge: "大師深度批命",
      title: "丁蔓山大師 · 住宅／辦公室風水及八字深度諮詢",
      price: "HK$ 2,800 起",
      ctaText: "預約大師風水諮詢"
    },
    contentParagraphs: [
      "古代風水以大門為氣口，現代高樓大廈則以採光最足、動線最活躍的大面積落地窗與陽台為主要納氣面。",
      "住宅內部的『動線分佈』直接關係到居住者的健康與思考清晰度。避開門窗直通的『穿堂煞』、確保主臥床頭穩重靠實、以及客廳財位避免雜物堆積，都是現代人無需耗費巨資即可立即改善居家微氣候的實用原則。"
    ]
  }
];

export const LIBRARY_ARTICLES = ARTICLES_DATA;
'''
with open(art_path, "w", encoding="utf-8") as f:
    f.write(art_code)
print(f"✓ [2/5] {art_path} 寫入 10 篇高質量文章成功！")

# 4. 寫入支援 6 類別與專屬導流錨點的 LibrarySection.tsx
lib_path = "frontend/src/components/LibrarySection.tsx"
lib_code = '''import React, { useState } from 'react';
import { ARTICLES_DATA, ArticleItem } from '../data/articles';
import { BookOpen, Clock, ArrowRight, X, Sparkles, ChevronRight } from 'lucide-react';

interface LibrarySectionProps {
  onSelectArticle?: (article: ArticleItem) => void;
  onSelectServiceById?: (serviceId: string) => void;
}

export const LibrarySection: React.FC<LibrarySectionProps> = ({ 
  onSelectArticle,
  onSelectServiceById,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);

  // 類別標籤：[全部] [八字] [五行] [風水] [流月運程] [流年運程] [面相]
  const categories = ['全部', '八字', '五行', '風水', '流月運程', '流年運程', '面相'];

  const filteredArticles = selectedCategory === '全部'
    ? ARTICLES_DATA
    : ARTICLES_DATA.filter(a => a.category === selectedCategory);

  const handleRead = (art: ArticleItem) => {
    setActiveArticle(art);
    if (onSelectArticle) onSelectArticle(art);
  };

  return (
    <section id="magazine" className="w-full bg-[#181A1D]/90 text-ivory py-8 px-4 sm:px-6 rounded-2xl border border-[#1E3A5F]/40 font-sans my-6 shadow-xl">
      <div className="w-full max-w-[1440px] mx-auto">
        
        {/* Section Header: 命理誌 JOURNAL */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#1E3A5F]/50 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#D97706] text-xs font-mono uppercase tracking-widest mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>JOURNAL · 命理學術專欄</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#F4EFEA] tracking-wider">
              命理誌
            </h2>
            <p className="text-xs text-[#A4B3C6] mt-1 font-serif">
              傳承古法 · 洞察人生 ｜ 定期更新命理古籍心得、運程流轉與空間風水指南
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full transition-all text-xs font-medium cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#D97706] text-[#141618] font-bold shadow-md shadow-[#D97706]/20'
                    : 'bg-[#2A3B4C]/40 text-[#A4B3C6] hover:bg-[#1E3A5F]/60 hover:text-[#F4EFEA] border border-[#1E3A5F]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 9~10 Articles Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => handleRead(article)}
              className="group bg-[#1E2227] hover:bg-[#23282F] border border-[#1E3A5F]/50 hover:border-[#D97706]/70 rounded-xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            >
              <div>
                {/* Top Meta: Category & Read Time */}
                <div className="flex items-center justify-between text-[11px] mb-3 text-[#A4B3C6]">
                  <span className="px-2.5 py-0.5 rounded bg-[#1E3A5F]/40 text-[#D97706] font-medium border border-[#D97706]/30">
                    {article.category}
                  </span>
                  <span className="flex items-center space-x-1 font-mono text-[11px]">
                    <Clock className="w-3 h-3 text-[#A4B3C6]" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                {/* Article Title */}
                <h3 className="text-base font-serif font-bold text-[#F4EFEA] group-hover:text-[#D97706] transition-colors leading-snug line-clamp-2 mb-2.5">
                  {article.title}
                </h3>

                {/* Article Summary */}
                <p className="text-xs text-[#A4B3C6] leading-relaxed line-clamp-3 mb-4">
                  {article.summary}
                </p>
              </div>

              {/* Dedicated Product Conversion Anchor (導流錨點) */}
              <div className="mt-auto pt-3 border-t border-[#1E3A5F]/40">
                <div className="bg-[#141618] rounded-lg p-2.5 border border-[#1E3A5F]/60 hover:border-[#D97706]/60 transition-colors flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] text-[#D97706] font-mono flex items-center space-x-1">
                      <Sparkles className="w-2.5 h-2.5 shrink-0" />
                      <span className="truncate">{article.conversionProduct.badge}</span>
                    </div>
                    <div className="text-xs font-serif font-bold text-[#F4EFEA] truncate">
                      {article.conversionProduct.title}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectServiceById) {
                        onSelectServiceById(article.conversionProduct.serviceId);
                      } else {
                        handleRead(article);
                      }
                    }}
                    className="shrink-0 px-2.5 py-1 bg-[#D97706] hover:bg-[#B45309] text-[#141618] text-[11px] font-bold rounded flex items-center space-x-1 transition-colors cursor-pointer"
                  >
                    <span>{article.conversionProduct.price}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#A4B3C6] mt-2.5 px-0.5">
                  <span>文 / {article.author} · {article.publishedDate}</span>
                  <span className="text-[#D97706] group-hover:translate-x-0.5 transition-transform font-medium flex items-center space-x-0.5">
                    <span>閱讀全文</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Action: 查看全部命理誌文章 */}
        <div className="mt-10 pt-6 border-t border-[#1E3A5F]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A4B3C6]">
          <div className="font-serif text-[#F4EFEA]">
            ✦ 丁蔓山命理誌 · 融匯子平真詮、滴天髓與現代決策智慧
          </div>

          <a
            href="#magazine"
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategory('全部');
              const el = document.getElementById('magazine');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-2.5 rounded-full bg-[#1E3A5F] hover:bg-[#2A4D7A] text-[#F4EFEA] font-serif font-bold transition-all shadow-md flex items-center space-x-2 border border-[#38BDF8]/30"
          >
            <span>查看全部命理誌文章 ({ARTICLES_DATA.length} 篇)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* Article Detail Modal / Reader */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#1A1D20] border border-[#1E3A5F] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E3A5F]/50 bg-[#141618]">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#D97706]">
                <span className="px-2 py-0.5 rounded bg-[#D97706]/10 border border-[#D97706]/30">
                  {activeArticle.category}
                </span>
                <span>{activeArticle.publishedDate} · 文 / {activeArticle.author}</span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1.5 rounded-lg text-[#A4B3C6] hover:text-[#F4EFEA] hover:bg-[#2A3B4C]/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-5 text-[#F4EFEA]">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-[#F4EFEA] leading-snug">
                {activeArticle.title}
              </h2>

              <div className="p-3.5 rounded-xl bg-[#20252B] border-l-4 border-[#D97706] text-xs text-[#A4B3C6] leading-relaxed font-serif">
                {activeArticle.summary}
              </div>

              <div className="space-y-4 text-sm text-[#E2E8F0] leading-relaxed font-serif">
                {activeArticle.contentParagraphs?.map((p, idx) => (
                  <p key={idx} className="text-justify leading-loose">
                    {p}
                  </p>
                ))}
              </div>

              {/* Dedicated In-Article Conversion Banner (文章末端導流) */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-[#20252B] to-[#1A1D20] border border-[#D97706]/60 shadow-lg mt-6">
                <div className="flex items-center space-x-2 text-[#D97706] text-xs font-serif font-bold mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>探尋更深層的人生藍圖與專屬解析：</span>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-serif font-bold text-[#F4EFEA] text-base">
                      {activeArticle.conversionProduct.title}
                    </h4>
                    <p className="text-xs text-[#A4B3C6] mt-1">
                      依據您的生辰八字日主與節氣量化推演，獲取專屬批算建議。
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const sid = activeArticle.conversionProduct.serviceId;
                      setActiveArticle(null);
                      if (onSelectServiceById) {
                        onSelectServiceById(sid);
                      }
                    }}
                    className="shrink-0 px-4 py-2 bg-[#D97706] hover:bg-[#B45309] text-[#141618] font-serif font-bold text-xs rounded-lg transition-all shadow-md flex items-center space-x-1.5 cursor-pointer"
                  >
                    <span>{activeArticle.conversionProduct.ctaText} ({activeArticle.conversionProduct.price})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
};
'''
with open(lib_path, "w", encoding="utf-8") as f:
    f.write(lib_code)
print(f"✓ [3/5] {lib_path} 更新成功！")

# 5. 更新 Header.tsx
header_path = "frontend/src/components/Header.tsx"
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
  onScrollToSection 
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
        
        {/* Brand Logo: 丁蔓山 ｜ 命理誌 */}
        <div 
          onClick={() => onNavigate('home')}
          className="cursor-pointer text-xl md:text-2xl font-serif tracking-widest flex items-center select-none"
        >
          <span className="text-[#D97706] font-bold">丁</span>
          <span className="text-[#D97706] mx-1 font-light">｜</span>
          <span className="text-[#F4EFEA] font-semibold">蔓山</span>
          <span className="text-[#A4B3C6] text-xs sm:text-sm ml-2 font-sans font-light">命理誌</span>
        </div>

        {/* Navigation: [主頁] [關於丁蔓山] [預約丁蔓山] [A.I. 算命] [通勝 App] [命理誌] [我的命書] [Threads] */}
        <nav className="flex items-center space-x-3 sm:space-x-5 lg:space-x-6 text-xs sm:text-sm text-[#A4B3C6]">
          {/* 1. 主頁 */}
          <button
            onClick={() => onNavigate('home')}
            className={`hover:text-[#F4EFEA] transition-colors py-1 cursor-pointer ${
              currentView === 'home' ? 'text-[#D97706] font-semibold border-b-2 border-[#D97706]' : ''
            }`}
          >
            主頁
          </button>

          {/* 2. 關於丁蔓山 */}
          <button
            onClick={() => handleScroll('about')}
            className="hover:text-[#F4EFEA] transition-colors py-1 cursor-pointer hidden md:inline-block"
          >
            關於丁蔓山
          </button>

          {/* 3. 預約丁蔓山 */}
          <button
            onClick={() => onNavigate('booking-services')}
            className={`hover:text-[#F4EFEA] transition-colors py-1 cursor-pointer ${
              currentView === 'booking-services' ? 'text-[#D97706] font-semibold border-b-2 border-[#D97706]' : ''
            }`}
          >
            預約丁蔓山
          </button>

          {/* 4. A.I. 算命 */}
          <button
            onClick={() => onNavigate('online-services')}
            className={`hover:text-[#F4EFEA] transition-colors py-1 cursor-pointer ${
              currentView === 'online-services' ? 'text-[#D97706] font-semibold border-b-2 border-[#D97706]' : ''
            }`}
          >
            A.I. 算命
          </button>

          {/* 5. 通勝 App */}
          <button
            onClick={() => handleScroll('tung-shing')}
            className="hover:text-[#F4EFEA] transition-colors py-1 cursor-pointer hidden sm:inline-block"
          >
            通勝 App
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

          {/* 8. Threads */}
          <a
            href="https://www.threads.net/@ting.manshan"
            target="_blank"
            rel="noopener noreferrer"
            title="在 Threads 追蹤丁蔓山 (@ting.manshan)"
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#2A3B4C]/60 hover:bg-[#1E3A5F] text-[#F4EFEA] border border-[#4B5E71]/40 hover:border-[#D97706]/60 transition-all text-xs font-mono group"
          >
            <svg className="w-3.5 h-3.5 fill-current text-[#D97706] group-hover:scale-110 transition-transform" viewBox="0 0 192 192">
              <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4384 44.7443 97.3155 44.7443 97.193 44.745C75.8398 44.745 59.2064 57.5147 55.4386 76.7828C55.0569 78.7351 56.3262 80.6401 58.2721 81.034C60.218 81.4279 62.1154 80.1652 62.5022 78.2195C65.5562 62.6074 78.8953 52.338 97.193 52.338C97.2917 52.3373 97.3905 52.3373 97.4893 52.338C117.164 52.4639 129.542 64.9126 131.066 87.7121C122.951 88.3582 113.805 90.0767 104.093 92.9972C80.2014 100.187 67.2415 111.455 69.4589 127.348C70.6105 135.602 75.8778 142.348 83.7431 145.674C90.2882 148.444 98.2435 148.749 106.185 146.536C117.151 143.479 125.753 136.216 131.62 125.044C137.261 133.568 144.783 138.895 154.215 140.088C154.825 140.165 155.438 140.203 156.049 140.203C166.702 140.203 175.767 131.785 178.694 119.165C182.029 104.782 178.835 88.8927 169.704 74.4578C159.083 57.6698 141.488 47.4579 120.158 45.698C89.5432 43.1706 63.8569 58.7471 52.7937 83.1818C42.4776 105.968 45.6429 133.398 60.751 151.78C73.4939 167.28 92.2046 176.001 113.356 176.326C113.864 176.334 114.373 176.338 114.881 176.338C127.287 176.338 139.066 172.936 148.971 166.505C150.609 165.441 151.077 163.245 150.013 161.607C148.948 159.969 146.752 159.501 145.114 160.565C136.195 166.356 125.603 169.418 114.471 169.418C114.009 169.418 113.548 169.414 113.088 169.407C94.2057 169.117 77.4913 161.319 66.0827 147.433C52.4347 130.826 49.5694 106.012 58.8927 85.4056C68.9103 63.267 92.2227 49.0984 119.98 51.3892C138.865 52.9469 154.409 61.9687 163.784 76.7865C171.97 89.7289 174.832 103.957 171.868 116.732C169.584 126.577 162.593 133.284 154.269 133.284C153.866 133.284 153.46 133.255 153.053 133.204C144.331 132.1 137.378 126.155 133.626 116.516C137.893 108.318 140.71 98.9798 141.537 88.9883ZM131.785 96.0872C130.407 105.748 127.359 114.477 122.951 121.78C117.891 130.165 111.026 135.539 103.206 137.728C96.9016 139.49 90.7383 139.115 85.9922 136.684C80.8988 134.075 77.2917 129.288 76.438 123.18C74.6542 110.377 85.9084 100.751 106.398 94.5776C114.619 92.1009 122.936 90.5846 131.785 96.0872Z" />
            </svg>
            <span className="hidden sm:inline">Threads</span>
          </a>
        </nav>

      </div>
    </header>
  );
};
'''
with open(header_path, "w", encoding="utf-8") as f:
    f.write(header_code)
print(f"✓ [4/5] {header_path} 更新導航項目成功！")

# 6. 更新 App.tsx 首頁排版
app_path = "frontend/src/App.tsx"
with open(app_path, "r", encoding="utf-8") as f:
    app_text = f.read()

if "import { ThreeCoreProducts }" not in app_text:
    app_text = app_text.replace(
        "import { Header } from './components/Header';",
        "import { Header } from './components/Header';\nimport { ThreeCoreProducts } from './components/ThreeCoreProducts';"
    )

if "handleSelectServiceById" not in app_text:
    target_handler = "const handleSelectServiceSolo = (service: ServiceItem) => {"
    new_handler = '''  const handleSelectServiceById = (serviceId: string) => {
    const found = SIDEBAR_PRICE_LIST.find((s) => s.id === serviceId);
    if (found) {
      handleSelectServiceSolo(found);
    } else {
      handleNavigate('online-services');
    }
  };

  const handleSelectServiceSolo = (service: ServiceItem) => {'''
    app_text = app_text.replace(target_handler, new_handler)

new_home_block = """        {/* 1. Home Page View */}
        {currentView === 'home' && (
          <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-6 space-y-8">
            
            {/* 2. Brand Hero Tagline */}
            <div className="text-center py-2 border-b border-[#1E3A5F]/30 pb-3">
              <p className="text-xs sm:text-sm font-serif tracking-widest text-[#A4B3C6]">
                傳承古法 · 洞察人生 ｜ <span className="text-[#D97706]">結合中國命理古籍與現代演算法</span>
              </p>
            </div>

            {/* 3. THREE CORE PRODUCTS (三大核心銷售入口 · 3 欄並排 / 手機端上下堆疊) */}
            <ThreeCoreProducts
              onStartAIReading={() => {
                const el = document.getElementById('bazi-calculator');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  handleNavigate('online-services');
                }
              }}
              onOpenBooking={() => handleNavigate('booking-services')}
              onOpenOnlineServices={() => handleNavigate('online-services')}
            />

            {/* 4. 命理誌 JOURNAL（三大產品正下方 · 不斷 Update 的動態文章專區） */}
            <LibrarySection
              onSelectServiceById={handleSelectServiceById}
            />

            {/* 5. A.I. 算命與即時八字排盤專區 (點擊卡片1直達) */}
            <div id="bazi-calculator" className="pt-6 border-t border-[#1E3A5F]/40 space-y-6">
              <div className="text-center max-w-2xl mx-auto space-y-1.5">
                <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full border border-[#D97706]/40 bg-[#D97706]/10 text-[#D97706] text-xs font-mono">
                  <span>A.I. 實時算命引擎</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#F4EFEA] tracking-wide">
                  即時個人八字命盤排盤與分析
                </h3>
                <p className="text-xs text-[#A4B3C6] font-serif leading-relaxed">
                  輸入您的陽曆出生年月日時，即時生成個人命盤、十神強弱、五行分佈與專屬人生報告建議。
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-6">
                  <HeroChartInput onCalculate={handleCalculate} isLoading={isLoading} />

                  {baziData && (
                    <ChartResult
                      baziData={baziData}
                      onOpenOnlineServices={() => handleNavigate('online-services')}
                      onOpenOneOnOneBooking={() => handleNavigate('booking-services')}
                      onOpenFiveElementsReport={isPreviewDomain ? () => setIsFiveElementsModalOpen(true) : undefined}
                      onOpenLoveNavigationReport={isPreviewDomain ? () => setIsLoveNavigationModalOpen(true) : undefined}
                      onOpenCareerNavigationReport={isPreviewDomain ? () => setIsCareerNavigationModalOpen(true) : undefined}
                      onOpenStartupReport={isPreviewDomain ? () => setIsStartupModalOpen(true) : undefined}
                      onOpenTwelveMonthsReport={isPreviewDomain ? () => setIsTwelveMonthsModalOpen(true) : undefined}
                      onOpenTwelveMonthsDecisionsReport={isPreviewDomain ? () => setIsTwelveMonthsDecisionsModalOpen(true) : undefined}
                      onSelectFiveElementsService={() => fiveElementsService && handleSelectServiceSolo(fiveElementsService)}
                    />
                  )}
                </div>

                <div className="lg:col-span-4 sticky top-24">
                  <ServicesSidebar
                    onSelectService={handleSelectServiceSolo}
                    onOpenBookingCards={() => handleNavigate('booking-services')}
                    selectedServiceId={selectedService?.id}
                  />
                </div>
              </div>
            </div>

            {/* 6. ABOUT 丁蔓山 & 品牌理念 */}
            <div id="about" className="rounded-2xl bg-[#14171A] border border-[#1E3A5F]/40 p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-[#1E3A5F]/40 gap-4">
                <div>
                  <span className="text-xs font-mono text-[#D97706] tracking-widest uppercase">ABOUT TING MAN SHAN</span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F4EFEA] mt-0.5">
                    關於丁蔓山
                  </h3>
                </div>
                <div className="flex items-center space-x-3">
                  <a
                    href="https://www.threads.net/@ting.manshan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#2A3B4C]/60 hover:bg-[#1E3A5F] text-xs font-mono text-[#F4EFEA] border border-[#4B5E71]/40 hover:border-[#D97706] transition-all flex items-center space-x-1.5"
                  >
                    <span>Threads: @ting.manshan</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#A4B3C6] leading-relaxed font-serif">
                <div className="p-4 rounded-xl bg-[#1A1D20] border border-[#1E3A5F]/30 space-y-2">
                  <h4 className="text-sm font-bold text-[#D97706] font-sans">研習古籍 · 傳承正統</h4>
                  <p>
                    丁蔓山多年沉浸於《子平真詮》、《滴天髓》、《窮通寶鑑》、《三命通會》等命理經典，融會貫通明清以來正統子平命理精髓，去除江湖附會，還原易學哲學真諦。
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#1A1D20] border border-[#1E3A5F]/30 space-y-2">
                  <h4 className="text-sm font-bold text-[#D97706] font-sans">現代數據 · 確定算法</h4>
                  <p>
                    將數千個歷史命盤格局與十神生剋權重，轉化為現代計算機嚴謹算法，建立五行百分配比與流月決策矩陣，使傳統命理具備透明、嚴謹與可驗證的現代科學特質。
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#1A1D20] border border-[#1E3A5F]/30 space-y-2">
                  <h4 className="text-sm font-bold text-[#D97706] font-sans">務實指引 · 順天應時</h4>
                  <p>
                    命理非宿命宿縛，而是認清自我天賦與生命洋流的導航工具。旨在幫助現代人在事業轉折、婚姻抉擇、空間風水與人生關鍵期做出最佳時空決策。
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}"""

idx_start = app_text.find("{/* 1. Home Page View */}")
idx_end = app_text.find("{/* 2. Online Services Index Page View */}")
if idx_start != -1 and idx_end != -1:
    app_text = app_text[:idx_start] + new_home_block + "\n\n        " + app_text[idx_end:]

with open(app_path, "w", encoding="utf-8") as f:
    f.write(app_text)
print(f"✓ [5/5] {app_path} 首頁全佈局重構完成！")

# 7. 執行 Vite 打包編譯
print(">>> 正在執行 Vite 打包編譯 ...")
subprocess.run("cd frontend && npm run build", shell=True, check=True)
print("==================================================")
print("🎉 首頁三大產品與命理誌文章專區部署成功！")
print("==================================================")
