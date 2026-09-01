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
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-8 animate-fade-in-up font-sans">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between border-b border-[#1E3A5F]/40 pb-4 mb-6">
        <div className="flex items-center space-x-2 text-xs text-[#A4B3C6]">
          <button onClick={onNavigateHome} className="hover:text-[#F4EFEA] transition-colors">
            主頁
          </button>
          <span>/</span>
          <span className="text-[#D97706] font-semibold">線上一對一預約服務</span>
        </div>
        <button
          onClick={onNavigateOnlineServices}
          className="bg-[#1E3A5F] hover:bg-[#2B2D2F] text-[#F4EFEA] text-xs font-serif font-medium px-4 py-2 rounded-[2px] transition-all border border-[#1E3A5F]"
        >
          切換至：線上即時分析服務 →
        </button>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#F4EFEA] mb-2">
          丁蔓山 · 線上一對一預約服務項目
        </h1>
        <p className="text-xs md:text-sm text-[#A4B3C6] max-w-2xl leading-relaxed">
          所有諮詢項目均由丁蔓山親自對接，透過線上視像（Zoom / Google Meet）或語音深入探討，為您的人生關鍵決策把脈定向。
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BOOKING_SERVICES.map((service, index) => (
          <div
            key={service.id}
            className="bg-[#F4EFEA] text-[#2B2D2F] rounded-[3px] border border-[#1E3A5F]/20 p-6 flex flex-col justify-between hover:border-[#D97706] transition-all shadow-sm group hover:-translate-y-0.5"
          >
            <div>
              {/* Top Bar */}
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-mono text-xs font-bold text-[#D97706]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[11px] bg-[#D97706]/15 text-[#D97706] px-2 py-0.5 rounded font-medium">
                  需預約時段
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-lg md:text-xl font-bold text-[#2B2D2F] group-hover:text-[#1E3A5F] transition-colors mb-2">
                {service.title}
              </h3>

              {/* Price */}
              <div className="font-serif text-2xl font-extrabold text-[#D97706] mb-2">
                {service.price_display}
              </div>

              {/* Turnaround */}
              <div className="text-[11px] text-[#1E3A5F] font-medium mb-3">
                ⏱️ {service.turnaround}
              </div>

              <p className="text-xs text-[#2B2D2F]/85 leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Features List */}
              {service.indexFeatures && (
                <div className="mb-6">
                  <div className="text-[11px] font-bold text-[#1E3A5F] uppercase mb-1.5">
                    服務包括：
                  </div>
                  <ul className="space-y-1 text-xs text-[#2B2D2F]/90 bg-white/70 p-3 rounded border border-[#1E3A5F]/10">
                    {service.indexFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-[#D97706] font-bold">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Button */}
            <div className="pt-3 border-t border-[#2B2D2F]/10">
              <button
                onClick={() => onSelectService(service)}
                className="w-full bg-[#1E3A5F] hover:bg-[#D97706] text-[#F4EFEA] text-xs font-serif font-bold py-2.5 rounded-[2px] transition-colors shadow-sm"
              >
                選擇預約時段及詳情 (Solo Page) →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
