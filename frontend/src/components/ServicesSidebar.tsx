import React from 'react';
import { SERVICES_LIST, ServiceItem } from '../data/services';

interface ServicesSidebarProps {
  onSelectService: (service: ServiceItem) => void;
  selectedServiceId?: string;
}

export const ServicesSidebar: React.FC<ServicesSidebarProps> = ({ onSelectService, selectedServiceId }) => {
  return (
    <aside id="services" className="w-full bg-[#1E3A5F]/20 border border-[#1E3A5F] rounded-[3px] p-4 md:p-5">
      {/* Sidebar Header */}
      <div className="border-b border-[#1E3A5F]/40 pb-3 mb-3 flex items-baseline justify-between">
        <div>
          <h2 className="text-xl font-serif font-bold text-[#F4EFEA]">服務收費</h2>
          <p className="text-[11px] text-[#A4B3C6] font-sans mt-0.5">
            點選項目可查看詳情、預約及直接付款
          </p>
        </div>
        <span className="text-[10px] text-[#D97706] font-mono font-medium">
          由高至低 ({SERVICES_LIST.length}項)
        </span>
      </div>

      {/* Vertical Rows List (Ordered strictly from most expensive to cheapest) */}
      <div className="divide-y divide-[#1E3A5F]/30 max-h-[calc(100vh-160px)] lg:max-h-none overflow-y-auto pr-1">
        {SERVICES_LIST.map((service, index) => {
          const isSelected = selectedServiceId === service.id;
          return (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              className={`group py-2.5 px-2 rounded-[2px] cursor-pointer transition-all duration-150 flex items-center justify-between gap-3 ${
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
