import React from 'react';
import { SERVICES_LIST, ServiceItem } from '../data/services';

interface ServicesSidebarProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenBookingCards: () => void;
  selectedServiceId?: string;
}

export const ServicesSidebar: React.FC<ServicesSidebarProps> = ({
  onSelectService,
  onOpenBookingCards,
  selectedServiceId
}) => {
  const bookingCount = SERVICES_LIST.filter(s => s.requires_booking).length;

  return (
    <aside id="services" className="w-full bg-[#1E3A5F]/20 border border-[#1E3A5F] rounded-[3px] p-4 md:p-5">
      {/* Sidebar Header with prominent 預約 Button */}
      <div className="border-b border-[#1E3A5F]/40 pb-3 mb-3">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-xl font-serif font-bold text-[#F4EFEA]">服務收費</h2>
          <button
            onClick={onOpenBookingCards}
            className="bg-[#D97706] hover:bg-[#F4EFEA] text-[#F4EFEA] hover:text-[#2B2D2F] text-xs font-serif font-bold px-3.5 py-1.5 rounded-[2px] transition-all duration-200 shadow flex items-center space-x-1"
          >
            <span>📅</span>
            <span>預約諮詢項目 ({bookingCount})</span>
          </button>
        </div>
        <p className="text-[11px] text-[#A4B3C6] font-sans">
          點選項目可查看詳情、預約及直接付款 (由高至低排列)
        </p>
      </div>

      {/* Vertical Rows List (Ordered strictly from most expensive to cheapest) */}
      <div className="divide-y divide-[#1E3A5F]/30 max-h-[calc(100vh-220px)] lg:max-h-none overflow-y-auto pr-1">
        {SERVICES_LIST.map((service, index) => {
          const isSelected = selectedServiceId === service.id;
          return (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              className={`group py-2 px-2 rounded-[2px] cursor-pointer transition-all duration-150 flex items-center justify-between gap-3 ${
                isSelected
                  ? 'bg-[#1E3A5F] text-[#F4EFEA]'
                  : 'hover:bg-[#F4EFEA]/10 text-[#F4EFEA]'
              }`}
            >
              {/* Left: Index + Title + Category */}
              <div className="flex items-center space-x-2 min-w-0">
                <span className="text-[10px] font-mono text-[#A4B3C6] w-4 text-right shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <div className="font-serif text-sm font-medium tracking-wide truncate group-hover:text-[#D97706] transition-colors flex items-center space-x-1.5">
                    <span>{service.title}</span>
                    {service.requires_booking && (
                      <span className="text-[9px] bg-[#D97706]/20 text-[#D97706] px-1 py-0.2 rounded font-sans shrink-0">
                        需預約
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-[#A4B3C6] font-sans truncate">
                    {service.category_name} · {service.turnaround.split('·')[0]}
                  </div>
                </div>
              </div>

              {/* Right: Price + Arrow */}
              <div className="flex items-center space-x-2 shrink-0 text-right">
                <span className="font-serif text-sm font-bold text-[#D97706] whitespace-nowrap">
                  {service.price_display}
                </span>
                <span className="text-xs text-[#A4B3C6] group-hover:text-[#D97706] group-hover:translate-x-0.5 transition-transform">
                  ›
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
