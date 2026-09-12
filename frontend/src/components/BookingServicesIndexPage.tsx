import React from 'react';
import { BOOKING_SERVICES, ServiceItem } from '../data/services';

interface BookingServicesIndexPageProps {
  onSelectService: (service: ServiceItem) => void;
  onNavigateHome: () => void;
  onNavigateOnlineServices: () => void;
}

export const BookingServicesIndexPage: React.FC<BookingServicesIndexPageProps> = ({
  onSelectService,
  onNavigateHome,
  onNavigateOnlineServices
}) => {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-8 md:py-10 animate-fade-in-up font-sans">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between border-b border-[#1E3A5F]/40 pb-4 mb-6">
        <div className="flex items-center space-x-2 text-sm text-[#A4B3C6]">
          <button onClick={onNavigateHome} className="hover:text-[#F4EFEA] transition-colors">
            主頁
          </button>
          <span>/</span>
          <span className="text-[#D97706] font-semibold">線上一對一預約</span>
        </div>
        <button
          onClick={onNavigateOnlineServices}
          className="bg-[#1E3A5F] hover:bg-[#2B2D2F] text-[#F4EFEA] text-xs sm:text-sm font-serif font-medium px-4 py-2 rounded-[2px] transition-all border border-[#1E3A5F]"
        >
          切換至：線上即時分析服務 →
        </button>
      </div>

      {/* Page Header: Updated description and larger clean fonts */}
      <div className="mb-8 md:mb-10">
        <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-[#F4EFEA] mb-3">
          線上一對一預約服務項目
        </h1>
        <p className="text-sm md:text-base text-[#A4B3C6] max-w-2xl leading-relaxed">
          所有項目均由丁蔓山親自批查，透過線上視像或語音解讀。
        </p>
      </div>

      {/* Cards Grid: Clean cards without numbers, larger fonts, clear duration, '預約查詢' button */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {BOOKING_SERVICES.map((service) => (
          <div
            key={service.id}
            className="bg-[#F4EFEA] text-[#2B2D2F] rounded-[4px] border border-[#1E3A5F]/20 p-6 md:p-7 flex flex-col justify-between hover:border-[#D97706] transition-all shadow-sm group hover:-translate-y-0.5"
          >
            <div>
              {/* Top Tag */}
              <div className="flex items-center justify-end mb-3">
                <span className="text-xs bg-[#D97706]/15 text-[#D97706] px-2.5 py-0.5 rounded font-medium">
                  需預約時段
                </span>
              </div>

              {/* Title (Larger Font) */}
              <h3 className="font-serif text-xl md:text-2xl font-bold text-[#2B2D2F] group-hover:text-[#1E3A5F] transition-colors mb-2.5">
                {service.title}
              </h3>

              {/* Price (Larger Font) */}
              <div className="font-serif text-2xl md:text-3xl font-extrabold text-[#D97706] mb-1.5">
                {service.price_display}
              </div>

              {/* Pricing Note (if applicable) */}
              {service.pricing_note && (
                <div className="text-[11px] sm:text-xs text-[#2B2D2F]/80 whitespace-pre-line bg-[#D97706]/10 p-2 rounded border border-[#D97706]/20 font-sans mb-3 leading-relaxed">
                  {service.pricing_note}
                </div>
              )}

              {/* Turnaround / Duration (Clear larger text) */}
              <div className="text-xs sm:text-sm text-[#1E3A5F] font-semibold mb-3.5 flex items-center space-x-1.5">
                <span>⏱️</span>
                <span>{service.turnaround}</span>
              </div>

              {/* Description (Larger text) */}
              <p className="text-xs sm:text-sm text-[#2B2D2F]/85 leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Features List (Larger text) */}
              {service.indexFeatures && (
                <div className="mb-6">
                  <div className="text-xs font-bold text-[#1E3A5F] uppercase mb-2">
                    服務包括：
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#2B2D2F]/90 bg-white/70 p-3.5 rounded border border-[#1E3A5F]/10">
                    {service.indexFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-[#D97706] font-bold">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Button: '預約查詢' */}
            <div className="pt-4 border-t border-[#2B2D2F]/10">
              <button
                onClick={() => onSelectService(service)}
                className="w-full bg-[#1E3A5F] hover:bg-[#D97706] text-[#F4EFEA] text-sm font-serif font-bold py-3 rounded-[2px] transition-colors shadow-sm text-center"
              >
                預約查詢
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
