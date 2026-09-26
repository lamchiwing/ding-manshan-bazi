import { useState, useEffect } from 'react';
import { Header } from './components/Header';
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
import { calculateLocalBazi } from './utils/baziLocalEngine';
import { ServiceItem } from './data/services';

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
  const [currentInputParams, setCurrentInputParams] = useState({
    birthDate: '2008-11-14',
    birthTime: '10:00',
    gender: 'female'
  });

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

  // Initial calculation on load (Default to 2008-11-14 10:00 female)
  useEffect(() => {
    handleCalculate({
      birthDate: '2008-11-14',
      birthTime: '10:00',
      gender: 'female'
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

  const handleSelectServiceSolo = (service: ServiceItem) => {
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
          <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-6 md:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Birth Input + Chart Result + Magazine */}
              <div className="lg:col-span-7 xl:col-span-8 space-y-6">
                <HeroChartInput onCalculate={handleCalculate} isLoading={isLoading} />

                {baziData && (
                  <ChartResult 
                    baziData={baziData} 
                    onOpenOnlineServices={() => handleNavigate('online-services')}
                    onOpenOneOnOneBooking={() => handleNavigate('booking-services')}
                    onOpenFiveElementsReport={() => setIsFiveElementsModalOpen(true)}
                  />
                )}

                <LibrarySection />
              </div>

              {/* Right Sidebar: Services Quick List (Clicking opens Solo Page) */}
              <div className="lg:col-span-5 xl:col-span-4 sticky top-24">
                <ServicesSidebar
                  onSelectService={handleSelectServiceSolo}
                  onOpenBookingCards={() => handleNavigate('booking-services')}
                  selectedServiceId={selectedService?.id}
                />
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
            onOpenFiveElementsReport={() => setIsFiveElementsModalOpen(true)}
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

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;