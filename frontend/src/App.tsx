import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroChartInput } from './components/HeroChartInput';
import { ChartResult } from './components/ChartResult';
import { OnlineReading } from './components/OnlineReading';
import { ServicesSidebar } from './components/ServicesSidebar';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { LibrarySection } from './components/LibrarySection';
import { Footer } from './components/Footer';
import { calculateLocalBazi } from './utils/baziLocalEngine';
import { ServiceItem, SERVICES_LIST } from './data/services';

export function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [baziData, setBaziData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Selected Service for Modal (Details + Direct Pay & Book)
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleOpenService = (service: ServiceItem) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-charcoal text-ivory flex flex-col font-sans selection:bg-amber selection:text-white">
      {/* Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Two-Column Container */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Main Area: Chart Input, Result, Online Reading & Library (7 or 8 columns) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-2">
            {/* 1. Hero & Birth Chart Input */}
            <HeroChartInput onCalculate={handleCalculate} isLoading={isLoading} />

            {/* 2. Personal Chart Result */}
            {baziData && (
              <ChartResult 
                baziData={baziData} 
                onOpenReading={() => {
                  const el = document.getElementById('reading');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }} 
              />
            )}

            {/* 3. Online Reading */}
            <OnlineReading
              baziData={baziData}
              onOpenBooking={() => {
                // Open 1-on-1 consultation service (八字論命 or 問事求謀)
                const baziService = SERVICES_LIST.find(s => s.id === 'srv-master-bazi') || SERVICES_LIST[4];
                handleOpenService(baziService);
              }}
            />

            {/* 4. Library */}
            <LibrarySection />
          </div>

          {/* Right Sidebar: Services & Pricing List (Ordered from expensive to cheap) (5 or 4 columns) */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-24">
            <ServicesSidebar
              onSelectService={handleOpenService}
              selectedServiceId={selectedService?.id}
            />
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Service Detail & Direct Payment/Booking Modal */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedService(null);
        }}
      />
    </div>
  );
}

export default App;
