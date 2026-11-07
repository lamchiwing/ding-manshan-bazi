import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ThreeCoreProducts } from './components/ThreeCoreProducts';
import { HeroChartInput } from './components/HeroChartInput';
import { ChartResult } from './components/ChartResult';
import { ServicesSidebar } from './components/ServicesSidebar';
import { OnlineServicesIndexPage } from './components/OnlineServicesIndexPage';
import { BookingServicesIndexPage } from './components/BookingServicesIndexPage';
import { ServiceSoloPage } from './components/ServiceSoloPage';
import { LibrarySection } from './components/LibrarySection';
import { LegalPage } from './components/LegalPages';
import { Footer } from './components/Footer';
import { FiveElementsReportModal } from './components/FiveElementsReportModal';
import { LoveNavigationModal } from './components/LoveNavigationModal';
import { CareerNavigationModal } from './components/CareerNavigationModal';
import { StartupNavigationModal } from './components/StartupNavigationModal';
import { TwelveMonthsReportModal } from './components/TwelveMonthsReportModal';
import { TwelveMonthsDecisionsModal } from './components/TwelveMonthsDecisionsModal';
import { MyReportsModal } from './components/MyReportsModal';
import { calculateLocalBazi } from './utils/baziLocalEngine';
import { ServiceItem, SIDEBAR_PRICE_LIST } from './data/services';

type ViewMode =
  | 'home'
  | 'online-services'
  | 'booking-services'
  | 'service-solo'
  | 'privacy-policy'
  | 'terms-of-service'
  | 'contact-us';

export function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [previousView, setPreviousView] = useState<ViewMode>('home');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const [baziData, setBaziData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFiveElementsModalOpen, setIsFiveElementsModalOpen] = useState(false);
  const [isLoveNavigationModalOpen, setIsLoveNavigationModalOpen] = useState(false);
  const [isCareerNavigationModalOpen, setIsCareerNavigationModalOpen] = useState(false);
  const [isStartupModalOpen, setIsStartupModalOpen] = useState(false);
  const [isTwelveMonthsModalOpen, setIsTwelveMonthsModalOpen] = useState(false);
  const [isTwelveMonthsDecisionsModalOpen, setIsTwelveMonthsDecisionsModalOpen] = useState(false);
  const [isMyReportsModalOpen, setIsMyReportsModalOpen] = useState(false);
  const [currentInputParams, setCurrentInputParams] = useState({
    birthDate: '1990-05-20',
    birthTime: '22:00',
    gender: 'male'
  });

  // 方案 A：環境隔離判斷（僅在 *.pages.dev 或本地開放免費測試彈窗；正式域名 www.tingmanshan.com 保持收費）
  const isPreviewDomain = typeof window !== 'undefined' && (
    window.location.hostname.includes('pages.dev') ||
    window.location.hostname.includes('localhost') ||
    window.location.hostname.includes('127.0.0.1')
  );

  const fiveElementsService = SIDEBAR_PRICE_LIST.find(s => s.id === 'srv-five-elements');

  // Payment Return State
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [paymentSessionId, setPaymentSessionId] = useState<string | null>(null);
  const [paymentServiceId, setPaymentServiceId] = useState<string | null>(null);

  // Check URL search params, pathname and hash for routing
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const paymentStatus = searchParams.get('payment_status');
      const sessionId = searchParams.get('session_id');
      const serviceId = searchParams.get('service_id');
      const pageParam = searchParams.get('page');
      const pathname = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (paymentStatus === 'success' || sessionId) {
        setPaymentSuccess(true);
        if (sessionId) setPaymentSessionId(sessionId);
        if (serviceId) setPaymentServiceId(serviceId);
      }

      // Check Direct Legal & Service Links
      if (
        pageParam === 'privacy' ||
        pageParam === 'privacy-policy' ||
        pathname.includes('privacy') ||
        hash.includes('privacy')
      ) {
        setCurrentView('privacy-policy');
      } else if (
        pageParam === 'terms' ||
        pageParam === 'terms-of-service' ||
        pathname.includes('terms') ||
        hash.includes('terms')
      ) {
        setCurrentView('terms-of-service');
      } else if (
        pageParam === 'contact' ||
        pageParam === 'contact-us' ||
        pathname.includes('contact') ||
        hash.includes('contact')
      ) {
        setCurrentView('contact-us');
      } else if (pageParam === 'online' || pageParam === 'online-services' || pathname.includes('online')) {
        setCurrentView('online-services');
      } else if (pageParam === 'booking' || pageParam === 'booking-services' || pathname.includes('booking')) {
        setCurrentView('booking-services');
      }
    } catch (e) {
      console.error('Error parsing URL routing params', e);
    }
  }, []);

  const handleDismissPaymentSuccess = () => {
    setPaymentSuccess(false);
    // Clean URL query parameters smoothly without reloading
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('payment_status');
      url.searchParams.delete('session_id');
      url.searchParams.delete('service_id');
      window.history.replaceState({}, document.title, url.pathname + (url.search ? url.search : ''));
    } catch (e) {
      console.error('Error updating URL', e);
    }
  };

  // Dynamic SEO Title & Description per View
  useEffect(() => {
    try {
      let title = "丁蔓山｜命理誌 — 現代極簡命理、專業八字排盤與風水環境哲學";
      let desc = "丁蔓山命理誌（tingmanshan.com）為生活提供清晰、冷靜與務實的命理與環境哲學指引。提供精確八字排盤、一對一專業論命諮詢、流年問事、家居與公司風水佈局。";

      if (currentView === 'online-services') {
        title = "線上服務清單 — 丁蔓山｜命理誌 (五行分析、流月吉凶、合盤)";
        desc = "探索丁蔓山線上命理服務：五行生活指南、感情與事業三年運勢、十二流月吉凶、雙人合盤及相片風水分析。";
      } else if (currentView === 'booking-services') {
        title = "線上一對一預約服務 — 丁蔓山｜命理誌 (八字論命、流年問事、風水勘察)";
        desc = "預約丁蔓山老師線上一對一視訊諮詢與風水規劃：八字論命前事排查、流年問事、問事求謀、家居風水佈局與查宅。";
      } else if (currentView === 'service-solo' && selectedService) {
        title = `${selectedService.title} — 丁蔓山｜命理誌 專業服務預約`;
        desc = `${selectedService.description || ''} 專業一對一解答與環境規劃。`;
      } else if (currentView === 'privacy-policy') {
        title = "隱私權政策 (Privacy Policy) — 丁蔓山｜命理誌";
        desc = "丁蔓山命理誌（tingmanshan.com）隱私權政策，說明我們如何保護您的八字資料、排盤數據與付款資訊安全。";
      } else if (currentView === 'terms-of-service') {
        title = "服務條款 (Terms of Service) — 丁蔓山｜命理誌";
        desc = "丁蔓山命理誌（tingmanshan.com）服務條款、八字排盤使用規範、預約付款與電子收據說明。";
      } else if (currentView === 'contact-us') {
        title = "聯絡我們 (Contact Us) — 丁蔓山｜命理誌 (inquiry@tingmanshan.com)";
        desc = "聯絡丁蔓山命理誌官方客戶支援與商務合作，電郵：inquiry@tingmanshan.com，週一至週五 09:00-18:00。";
      }

      document.title = title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', desc);
    } catch (e) {
      console.error('Error updating SEO title', e);
    }
  }, [currentView, selectedService]);

  // Initial calculation on load
  useEffect(() => {
    handleCalculate({
      birthDate: '1990-05-20',
      birthTime: '22:00',
      gender: 'male'
    });
  }, []);

  const handleCalculate = async (params: { birthDate: string; birthTime: string; gender: string }) => {
    setCurrentInputParams(params);
    setIsLoading(true);
    try {
      const res = await fetch('/api/v1/bazi/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          birth_date: params.birthDate,
          birth_time: params.birthTime,
          gender: params.gender,
          day_boundary_rule: "ZI_START_NEXT_DAY"
        })
      });

      if (res.ok) {
        const data = await res.json();
        setBaziData(data);
      } else {
        throw new Error('API Calculation fallback to local');
      }
    } catch (err) {
      const localResult = calculateLocalBazi(params.birthDate, params.birthTime, params.gender);
      setBaziData(localResult);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = (view: ViewMode) => {
    setPreviousView(currentView);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const url = new URL(window.location.href);
      if (view === 'home') {
        url.searchParams.delete('page');
      } else if (view === 'privacy-policy') {
        url.searchParams.set('page', 'privacy');
      } else if (view === 'terms-of-service') {
        url.searchParams.set('page', 'terms');
      } else if (view === 'contact-us') {
        url.searchParams.set('page', 'contact');
      } else if (view === 'online-services') {
        url.searchParams.set('page', 'online');
      } else if (view === 'booking-services') {
        url.searchParams.set('page', 'booking');
      }
      window.history.pushState({}, document.title, url.pathname + (url.search ? url.search : ''));
    } catch (e) {
      console.error('Error syncing navigation URL', e);
    }
  };

    const handleSelectServiceById = (serviceId: string) => {
    const found = SIDEBAR_PRICE_LIST.find((s) => s.id === serviceId);
    if (found) {
      handleSelectServiceSolo(found);
    } else {
      handleNavigate('online-services');
    }
  };

  const handleSelectServiceSolo = (service: ServiceItem) => {
    // 方案 A：僅在測試網域 (*.pages.dev / localhost) 直接彈窗看報告；正式網址 (tingmanshan.com) 走標準付款流程
    if (service.id === 'srv-five-elements' && isPreviewDomain) {
      setIsFiveElementsModalOpen(true);
      return;
    }
    if (service.id === 'srv-love-3yr' && isPreviewDomain) {
      setIsLoveNavigationModalOpen(true);
      return;
    }
    if (service.id === 'srv-career-3yr' && isPreviewDomain) {
      setIsCareerNavigationModalOpen(true);
      return;
    }
    if (service.id === 'srv-12-months' && isPreviewDomain) {
      setIsTwelveMonthsModalOpen(true);
      return;
    }
    if (service.id === 'srv-startup-3yr' && isPreviewDomain) {
      setIsStartupModalOpen(true);
      return;
    }
    if (service.id === 'srv-12-months-decisions' && isPreviewDomain) {
      setIsTwelveMonthsDecisionsModalOpen(true);
      return;
    }
    setPreviousView(currentView === 'service-solo' ? 'home' : currentView);
    setSelectedService(service);
    setCurrentView('service-solo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-charcoal text-ivory flex flex-col font-sans selection:bg-amber selection:text-white">
      {/* Top Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenMyReports={() => setIsMyReportsModalOpen(true)}
      />

      {/* Payment Success Notification Banner */}
      {paymentSuccess && (
        <div className="w-full bg-[#1E3A5F]/40 border-b border-[#D97706]/40 text-[#F4EFEA] py-4 px-4 sm:px-8 transition-all animate-fadeIn">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#D97706]/20 border border-[#D97706] flex items-center justify-center text-[#D97706] text-lg font-bold shrink-0 mt-0.5">
                ✓
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-serif font-bold text-[#F4EFEA] text-base sm:text-lg">
                    預約付款已成功完成！
                  </span>
                  <span className="text-xs bg-[#D97706]/20 text-[#D97706] px-2 py-0.5 rounded border border-[#D97706]/40 font-mono">
                    Payment Confirmed
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#A4B3C6] leading-relaxed">
                  📧 <strong className="text-[#F4EFEA]">官方電子收據與預約確認信</strong> 已自動發送至您於付款時填寫的電子郵件信箱。
                </p>
                <p className="text-xs text-[#8A99AD] leading-relaxed">
                  💡 提示：若數分鐘內未見郵件，請留意檢查「<span className="text-[#F4EFEA]">垃圾郵件匣 (Spam)</span>」或「<span className="text-[#F4EFEA]">宣傳/促銷郵件匣</span>」。
                  {paymentSessionId && (
                    <span className="ml-2 font-mono text-[11px] text-[#A4B3C6]">
                      [ 訂單編號: {paymentSessionId.slice(0, 16)}... ]
                    </span>
                  )}
                </p>
                {paymentServiceId === 'srv-master-bazi' && (
                  <div className="mt-1 text-xs text-[#D97706] bg-[#D97706]/10 px-2.5 py-1.5 rounded border border-[#D97706]/30">
                    🔔 本次收取為預約訂金 HK$2,400；餘款 HK$1,400 將於正式論命會面前 7 天透過電郵通知繳付。
                  </div>
                )}
                {['srv-five-elements', 'srv-love-3yr', 'srv-career-3yr', 'srv-startup-3yr', 'srv-12-months', 'srv-12-months-decisions'].includes(paymentServiceId || '') && (
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        if (paymentServiceId === 'srv-five-elements') setIsFiveElementsModalOpen(true);
                        else if (paymentServiceId === 'srv-love-3yr') setIsLoveNavigationModalOpen(true);
                        else if (paymentServiceId === 'srv-career-3yr') setIsCareerNavigationModalOpen(true);
                        else if (paymentServiceId === 'srv-startup-3yr') setIsStartupModalOpen(true);
                        else if (paymentServiceId === 'srv-12-months') setIsTwelveMonthsModalOpen(true);
                        else if (paymentServiceId === 'srv-12-months-decisions') setIsTwelveMonthsDecisionsModalOpen(true);
                      }}
                      className="px-5 py-2 bg-[#D97706] hover:bg-[#b45309] text-white text-xs font-serif font-bold rounded shadow transition-all cursor-pointer flex items-center space-x-1.5"
                    >
                      <span>📜 立即查看已解鎖之專屬命書報告</span>
                      <span>→</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleDismissPaymentSuccess}
              className="self-end md:self-center px-4 py-1.5 rounded bg-[#2A3B4C] hover:bg-[#34495E] text-xs text-[#F4EFEA] border border-[#4B5E71] transition-colors whitespace-nowrap cursor-pointer shadow-sm"
            >
              ✕ 關閉提醒
            </button>
          </div>
        </div>
      )}
      
      {/* Main Views Container (All Full-Page Views, ZERO Pop-ups) */}
      <main className="flex-1 w-full flex flex-col">
                {/* 1. Home Page View */}
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
        )}

        {/* 2. Online Services Index Page View */}
        {currentView === 'online-services' && (
          <OnlineServicesIndexPage
            onSelectService={handleSelectServiceSolo}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateBooking={() => handleNavigate('booking-services')}
          />
        )}

        {/* 3. Booking Services Index Page View */}
        {currentView === 'booking-services' && (
          <BookingServicesIndexPage
            onSelectService={handleSelectServiceSolo}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateOnlineServices={() => handleNavigate('online-services')}
          />
        )}

        {/* 4. Solo Service Page View (Full Page with A-E breakdowns, direct booking & payment) */}
        {currentView === 'service-solo' && selectedService && (
          <ServiceSoloPage
            service={selectedService}
            onBack={() => {
              setCurrentView(previousView || 'home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateHome={() => handleNavigate('home')}
            onOpenFiveElementsReport={isPreviewDomain ? () => setIsFiveElementsModalOpen(true) : undefined}
                    onOpenLoveNavigationReport={isPreviewDomain ? () => setIsLoveNavigationModalOpen(true) : undefined}
                    onOpenCareerNavigationReport={isPreviewDomain ? () => setIsCareerNavigationModalOpen(true) : undefined}
                    onOpenStartupReport={isPreviewDomain ? () => setIsStartupModalOpen(true) : undefined}
                    onOpenTwelveMonthsReport={isPreviewDomain ? () => setIsTwelveMonthsModalOpen(true) : undefined}
                    onOpenTwelveMonthsDecisionsReport={isPreviewDomain ? () => setIsTwelveMonthsDecisionsModalOpen(true) : undefined}
            baziData={baziData}
          />
        )}

        {/* 5. Privacy Policy Page View */}
        {currentView === 'privacy-policy' && (
          <LegalPage
            type="privacy"
            onNavigateHome={() => handleNavigate('home')}
            onNavigateBooking={() => handleNavigate('booking-services')}
            onSwitchLegalTab={(tab) => {
              if (tab === 'privacy') handleNavigate('privacy-policy');
              else if (tab === 'terms') handleNavigate('terms-of-service');
              else if (tab === 'contact') handleNavigate('contact-us');
            }}
          />
        )}

        {/* 6. Terms of Service Page View */}
        {currentView === 'terms-of-service' && (
          <LegalPage
            type="terms"
            onNavigateHome={() => handleNavigate('home')}
            onNavigateBooking={() => handleNavigate('booking-services')}
            onSwitchLegalTab={(tab) => {
              if (tab === 'privacy') handleNavigate('privacy-policy');
              else if (tab === 'terms') handleNavigate('terms-of-service');
              else if (tab === 'contact') handleNavigate('contact-us');
            }}
          />
        )}

        {/* 7. Contact Us Page View */}
        {currentView === 'contact-us' && (
          <LegalPage
            type="contact"
            onNavigateHome={() => handleNavigate('home')}
            onNavigateBooking={() => handleNavigate('booking-services')}
            onSwitchLegalTab={(tab) => {
              if (tab === 'privacy') handleNavigate('privacy-policy');
              else if (tab === 'terms') handleNavigate('terms-of-service');
              else if (tab === 'contact') handleNavigate('contact-us');
            }}
          />
        )}
      </main>

      {/* Five Elements Report Modal (HK$128) */}
      <FiveElementsReportModal
        isOpen={isFiveElementsModalOpen}
        onClose={() => setIsFiveElementsModalOpen(false)}
        baziData={baziData}
        birthDate={currentInputParams.birthDate}
        birthTime={currentInputParams.birthTime}
        gender={currentInputParams.gender}
      />

      {/* Love Navigation Report Modal (HK$188) */}
      <LoveNavigationModal
        isOpen={isLoveNavigationModalOpen}
        onClose={() => setIsLoveNavigationModalOpen(false)}
        baziData={baziData}
        birthDate={currentInputParams.birthDate}
        birthTime={currentInputParams.birthTime}
        gender={currentInputParams.gender}
      />

      {/* Career & Wealth Navigation Report Modal (HK$188) */}
      <CareerNavigationModal
        isOpen={isCareerNavigationModalOpen}
        onClose={() => setIsCareerNavigationModalOpen(false)}
        baziData={baziData}
        birthDate={currentInputParams.birthDate}
        birthTime={currentInputParams.birthTime}
        gender={currentInputParams.gender}
      />
      {/* Startup Navigation Report Modal (HK$288) */}
      {isStartupModalOpen && (
        <StartupNavigationModal
          isOpen={isStartupModalOpen}
          onClose={() => setIsStartupModalOpen(false)}
          baziData={baziData}
          birthDate={currentInputParams.birthDate}
          birthTime={currentInputParams.birthTime}
          gender={currentInputParams.gender}
        />
      )}
      {/* Twelve Months + Major Decisions Report Modal (HK$488) */}
      {isTwelveMonthsDecisionsModalOpen && (
        <TwelveMonthsDecisionsModal
          isOpen={isTwelveMonthsDecisionsModalOpen}
          onClose={() => setIsTwelveMonthsDecisionsModalOpen(false)}
          baziData={baziData}
          birthDate={currentInputParams.birthDate}
          birthTime={currentInputParams.birthTime}
          gender={currentInputParams.gender}
        />
      )}

      {/* Twelve Months Fortune Navigation Report Modal (HK$368) */}
      {isTwelveMonthsModalOpen && (
        <TwelveMonthsReportModal
          isOpen={isTwelveMonthsModalOpen}
          onClose={() => setIsTwelveMonthsModalOpen(false)}
          baziData={baziData}
          birthDate={currentInputParams.birthDate}
          birthTime={currentInputParams.birthTime}
          gender={currentInputParams.gender}
        />
      )}

            {/* User Purchased Reports History Archive Modal */}
      {isMyReportsModalOpen && (
        <MyReportsModal
          isOpen={isMyReportsModalOpen}
          onClose={() => setIsMyReportsModalOpen(false)}
          onOpenReport={(sid) => {
            if (sid === 'srv-five-elements') setIsFiveElementsModalOpen(true);
            else if (sid === 'srv-love-3yr') setIsLoveNavigationModalOpen(true);
            else if (sid === 'srv-career-3yr') setIsCareerNavigationModalOpen(true);
            else if (sid === 'srv-startup-3yr') setIsStartupModalOpen(true);
            else if (sid === 'srv-12-months') setIsTwelveMonthsModalOpen(true);
            else if (sid === 'srv-12-months-decisions') setIsTwelveMonthsDecisionsModalOpen(true);
          }}
        />
      )}

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;