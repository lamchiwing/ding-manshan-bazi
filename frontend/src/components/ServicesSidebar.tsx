import React from 'react';
import { SIDEBAR_PRICE_LIST, ServiceItem, BOOKING_SERVICES } from '../data/services';

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
  return (
    <aside id="services" className="w-full bg-[#1E3A5F]/20 border border-[#1E3A5F] rounded-[3px] p-4 md:p-5">
      {/* Sidebar Header with prominent 預約 Button */}
      <div className="border-b border-[#1E3A5F]/40 pb-3 mb-3">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-xl font-serif font-bold text-[#F4EFEA]">線上服務收費</h2>
          <button
            onClick={onOpenBookingCards}
            className="bg-[#D97706] hover:bg-[#F4EFEA] text-[#F4EFEA] hover:text-[#2B2D2F] text-xs font-serif font-bold px-3.5 py-1.5 rounded-[2px] transition-all duration-200 shadow flex items-center space-x-1"
          >
            <span>📅</span>
            <span>預約諮詢項目 ({BOOKING_SERVICES.length})</span>
          </button>
        </div>
        <p className="text-[11px] text-[#A4B3C6] font-sans">
          即時分析與命理報告 (由平價至貴價順序排列 · 點擊直接生成)
        </p>
      </div>

      {/* Vertical Rows List (Non-booking services ordered from cheapest to most expensive: HK$128 -> HK$1,388) */}
      <div className="divide-y divide-[#1E3A5F]/30 max-h-[calc(100vh-220px)] lg:max-h-none overflow-y-auto pr-1">
        {SIDEBAR_PRICE_LIST.map((service, index) => {
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
                  <div className="font-serif text-sm font-medium tracking-wide truncate group-hover:text-[#D97706] transition-colors">
                    {service.title}
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
