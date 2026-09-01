import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroChartInput } from './components/HeroChartInput';
import { ChartResult } from './components/ChartResult';
import { ServicesSidebar } from './components/ServicesSidebar';
import { OnlineServicesIndexPage } from './components/OnlineServicesIndexPage';
import { BookingServicesIndexPage } from './components/BookingServicesIndexPage';
import { ServiceSoloPage } from './components/ServiceSoloPage';
import { LibrarySection } from './components/LibrarySection';
import { Footer } from './components/Footer';
import { calculateLocalBazi } from './utils/baziLocalEngine';
import { ServiceItem } from './data/services';

type ViewMode = 'home' | 'online-services' | 'booking-services' | 'service-solo';

export function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [previousView, setPreviousView] = useState<ViewMode>('home');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const [baziData, setBaziData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleNavigate = (view: 'home' | 'online-services' | 'booking-services') => {
    setPreviousView(currentView);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
