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
import { LoveNavigationModal } from './components/LoveNavigationModal';
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

  // Core Bazi State
  const [baziData, setBaziData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFiveElementsModalOpen, setIsFiveElementsModalOpen] = useState(false);
  const [isLoveNavigationModalOpen, setIsLoveNavigationModalOpen] = useState(false);
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
  const [paymentCanceled, setPaymentCanceled] = useState<boolean>(false);

  // Check URL query parameters for payment return or direct routing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment_success') === 'true') {
      setPaymentSuccess(true);
      const serviceId = params.get('service_id');
      if (serviceId) {
        const matched = SIDEBAR_PRICE_LIST.find(s => s.id === serviceId);
        if (matched) {
          setSelectedService(matched);
          setCurrentView('service-solo');
        }
      }
    } else if (params.get('payment_canceled') === 'true') {
      setPaymentCanceled(true);
      const serviceId = params.get('service_id');
      if (serviceId) {
        const matched = SIDEBAR_PRICE_LIST.find(s => s.id === serviceId);
        if (matched) {
          setSelectedService(matched);
          setCurrentView('service-solo');
        }
      }
    }
  }, []);

  // Update Browser URL & History without reloading
  const updateUrl = (path: string, searchParams?: Record<string, string>) => {
    const url = new URL(window.location.href);
    url.pathname = path;
    if (searchParams) {
      Object.entries(searchParams).forEach(([k, v]) => {
        if (v) url.searchParams.set(k, v);
        else url.searchParams.delete(k);
      });
    } else {
      url.search = '';
    }
    window.history.pushState({}, '', url.toString());
  };

  // Sync state with Browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/' || path === '') {
        setCurrentView('home');
        setSelectedService(null);
      } else if (path === '/services' || path === '/services/') {
        setCurrentView('online-services');
        setSelectedService(null);
      } else if (path === '/booking' || path === '/booking/') {
        setCurrentView('booking-services');
        setSelectedService(null);
      } else if (path.startsWith('/services/')) {
        const slug = path.replace('/services/', '').replace('/', '');
        const matched = SIDEBAR_PRICE_LIST.find(s => s.slug === slug || s.id === slug);
        if (matched) {
          setSelectedService(matched);
          setCurrentView('service-solo');
        }
      } else if (path === '/privacy') {
        setCurrentView('privacy-policy');
      } else if (path === '/terms') {
        setCurrentView('terms-of-service');
      } else if (path === '/contact') {
        setCurrentView('contact-us');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync URL when currentView / selectedService changes
  useEffect(() => {
    if (currentView === 'home') {
      updateUrl('/');
    } else if (currentView === 'online-services') {
      updateUrl('/services');
    } else if (currentView === 'booking-services') {
      updateUrl('/booking');
    } else if (currentView === 'service-solo' && selectedService) {
      updateUrl(`/services/${selectedService.slug || selectedService.id}`);
    } else if (currentView === 'privacy-policy') {
      updateUrl('/privacy');
    } else if (currentView === 'terms-of-service') {
      updateUrl('/terms');
    } else if (currentView === 'contact-us') {
      updateUrl('/contact');
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
    setIsLoading(true);
    setCurrentInputParams({
      birthDate: params.birthDate,
      birthTime: params.birthTime,
      gender: params.gender as any
    });

    try {
      const response = await fetch('/api/v1/bazi/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          solar_date: params.birthDate,
          solar_time: params.birthTime,
          gender: params.gender === 'female' ? 0 : 1,
          sect: 2
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setBaziData(data.data || data);
      } else {
        const localData = calculateLocalBazi(params.birthDate, params.birthTime, params.gender);
        setBaziData(localData);
      }
    } catch (err) {
      const localData = calculateLocalBazi(params.birthDate, params.birthTime, params.gender);
      setBaziData(localData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = (view: ViewMode) => {
    setPreviousView(currentView);
    setCurrentView(view);
    setSelectedService(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceSolo = (service: ServiceItem) => {
    if (service.id === 'srv-five-elements' && isPreviewDomain) {
      setIsFiveElementsModalOpen(true);
      return;
    }
    if (service.id === 'srv-love-3yr' && isPreviewDomain) {
      setIsLoveNavigationModalOpen(true);
      return;
    }
    setPreviousView(currentView === 'service-solo' ? 'home' : currentView);
    setSelectedService(service);
    setCurrentView('service-solo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F4EFEA] text-[#2B2D2F] font-sans antialiased selection:bg-[#D97706]/20 selection:text-[#2B2D2F] flex flex-col justify-between">
      {/* Top Header */}
      <Header onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Payment Return Notification Banners */}
        {paymentSuccess && (
          <div className="bg-[#1E3A5F] text-[#F4EFEA] py-3.5 px-4 text-center text-sm font-medium border-b border-[#D97706]/30 flex items-center justify-center space-x-2">
            <span>✨ 感謝您的信任。訂單已支付成功！丁蔓山大師團隊將於承諾時間內為您完成推演。</span>
            <button 
              onClick={() => setPaymentSuccess(false)}
              className="text-xs bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 px-2 py-0.5 rounded cursor-pointer ml-2"
            >
              關閉
            </button>
          </div>
        )}
        {paymentCanceled && (
          <div className="bg-[#D97706]/10 text-[#2B2D2F] py-3 px-4 text-center text-sm font-medium border-b border-[#D97706]/20 flex items-center justify-center space-x-2">
            <span>您已取消付款。如有任何疑問，歡迎隨時洽詢客服。</span>
            <button 
              onClick={() => setPaymentCanceled(false)}
              className="text-xs bg-[#2B2D2F]/10 hover:bg-[#2B2D2F]/20 px-2 py-0.5 rounded cursor-pointer ml-2"
            >
              關閉
            </button>
          </div>
        )}

        {/* 1. Home View */}
        {currentView === 'home' && (
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-8 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Main Column: Form + Four Pillars + Da Yun / Liu Nian */}
              <div className="lg:col-span-8 space-y-8">
                {/* Hero Form */}
                <HeroChartInput onCalculate={handleCalculate} isLoading={isLoading} />

                {/* Four Pillars Chart + Banner + Da Yun Tables */}
                {baziData && (
                  <ChartResult 
                    baziData={baziData} 
                    onOpenOnlineServices={() => handleNavigate('online-services')}
                    onOpenOneOnOneBooking={() => handleNavigate('booking-services')}
                    onOpenFiveElementsReport={isPreviewDomain ? () => setIsFiveElementsModalOpen(true) : undefined}
                    onOpenLoveNavigationReport={isPreviewDomain ? () => setIsLoveNavigationModalOpen(true) : undefined}
                    onSelectFiveElementsService={() => fiveElementsService && handleSelectServiceSolo(fiveElementsService)}
                  />
                )}

                {/* Library Articles Showcase */}
                <LibrarySection />
              </div>

              {/* Right Column: Sticky Services Sidebar */}
              <div className="lg:col-span-4 lg:sticky lg:top-24">
                <ServicesSidebar 
                  onSelectService={handleSelectServiceSolo}
                  onOpenOnlineServices={() => handleNavigate('online-services')}
                  onOpenBookingServices={() => handleNavigate('booking-services')}
                />
              </div>
            </div>
          </div>
        )}

        {/* 2. Online Services Index View */}
        {currentView === 'online-services' && (
          <OnlineServicesIndexPage 
            onSelectService={handleSelectServiceSolo}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateBooking={() => handleNavigate('booking-services')}
          />
        )}

        {/* 3. Booking Services Index View */}
        {currentView === 'booking-services' && (
          <BookingServicesIndexPage 
            onSelectService={handleSelectServiceSolo}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {/* 4. Single Service Solo View */}
        {currentView === 'service-solo' && selectedService && (
          <ServiceSoloPage
            service={selectedService}
            onBack={() => {
              setCurrentView(previousView);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateHome={() => handleNavigate('home')}
            onOpenFiveElementsReport={isPreviewDomain ? () => setIsFiveElementsModalOpen(true) : undefined}
            onOpenLoveNavigationReport={isPreviewDomain ? () => setIsLoveNavigationModalOpen(true) : undefined}
            baziData={baziData}
          />
        )}

        {/* 5. Legal Pages */}
        {(currentView === 'privacy-policy' || currentView === 'terms-of-service' || currentView === 'contact-us') && (
          <LegalPage type={currentView} onBack={() => handleNavigate('home')} />
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

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
