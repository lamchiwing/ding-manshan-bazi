import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroChartInput } from './components/HeroChartInput';
import { ChartResult } from './components/ChartResult';
import { OnlineAIReading } from './components/OnlineAIReading';
import { ServicesCatalog } from './components/ServicesCatalog';
import { FortuneTellerMarketplace } from './components/FortuneTellerMarketplace';
import { BookingModal } from './components/BookingModal';
import { LibrarySection } from './components/LibrarySection';
import { Footer } from './components/Footer';
import { calculateLocalBazi } from './utils/baziLocalEngine';
import { MasterReader } from './data/masters';
import { ServiceItem } from './data/services';

export function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [baziData, setBaziData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingReader, setBookingReader] = useState<MasterReader | null>(null);
  const [bookingService, setBookingService] = useState<ServiceItem | null>(null);

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
        throw new Error('API Calculation failed, using local engine');
      }
    } catch (err) {
      // Offline fallback
      const localResult = calculateLocalBazi(params.birthDate, params.birthTime, params.gender);
      setBaziData(localResult);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectService = (service: ServiceItem) => {
    setBookingService(service);
    setIsBookingOpen(true);
  };

  const handleBookReader = (reader: MasterReader) => {
    setBookingReader(reader);
    setBookingService(null);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-charcoal text-ivory flex flex-col font-sans">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1">
        {/* 1. Hero & Birth Chart Input */}
        <HeroChartInput onCalculate={handleCalculate} isLoading={isLoading} />

        {/* 2. Personal Chart Result */}
        {baziData && (
          <ChartResult 
            baziData={baziData} 
            onOpenAIDialog={() => {
              const el = document.getElementById('ai-reading');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} 
          />
        )}

        {/* 3. Online AI Fortune Reading */}
        <OnlineAIReading
          baziData={baziData}
          onOpenBooking={() => {
            setBookingReader(null);
            setIsBookingOpen(true);
          }}
        />

        {/* 4. Complete Services & Pricing Catalog (22 Services) */}
        <ServicesCatalog onSelectService={handleSelectService} />

        {/* 5. Fortune Teller Marketplace */}
        <FortuneTellerMarketplace onBookReader={handleBookReader} />

        {/* 6. Editorial Library */}
        <LibrarySection />
      </main>

      {/* 7. Footer */}
      <Footer />

      {/* 3-Step Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setBookingReader(null);
          setBookingService(null);
        }}
        initialReader={bookingReader}
        initialService={bookingService}
      />
    </div>
  );
}

export default App;
