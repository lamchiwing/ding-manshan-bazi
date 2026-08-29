import React, { useState } from 'react';
import { SERVICES_LIST, ServiceItem } from '../data/services';

interface ServicesCatalogProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesCatalog: React.FC<ServicesCatalogProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'online_ai' | 'master_consult'>('all');

  const filteredServices = activeCategory === 'all' 
    ? SERVICES_LIST 
    : SERVICES_LIST.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="w-full bg-charcoal text-ivory py-16 border-b border-[#1E3A5F]/30">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#1E3A5F]/40">
          <div>
            <span className="text-xs text-[#D97706] tracking-widest uppercase font-semibold">Service Offerings & Pricing</span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#F4EFEA] mt-1">服務收費範圍</h2>
            <p className="text-[#A4B3C6] text-sm md:text-base mt-2 font-sans font-light">
              涵蓋線上即時 AI 數位推演、高階合盤、大師親算詳論及現場堪輿佈局。
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-[#1E3A5F]/30 p-1 rounded-[4px] border border-[#1E3A5F]/50">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 text-xs md:text-sm rounded transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#D97706] text-[#F4EFEA] font-medium'
                  : 'text-[#A4B3C6] hover:text-[#F4EFEA]'
              }`}
            >
              全部服務 ({SERVICES_LIST.length})
            </button>
            <button
              onClick={() => setActiveCategory('online_ai')}
              className={`px-3 py-1.5 text-xs md:text-sm rounded transition-all ${
                activeCategory === 'online_ai'
                  ? 'bg-[#D97706] text-[#F4EFEA] font-medium'
                  : 'text-[#A4B3C6] hover:text-[#F4EFEA]'
              }`}
            >
              線上 AI 分析 (12項)
            </button>
            <button
              onClick={() => setActiveCategory('master_consult')}
              className={`px-3 py-1.5 text-xs md:text-sm rounded transition-all ${
                activeCategory === 'master_consult'
                  ? 'bg-[#D97706] text-[#F4EFEA] font-medium'
                  : 'text-[#A4B3C6] hover:text-[#F4EFEA]'
              }`}
            >
              大師親算及風水 (10項)
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const isDigital = service.category === 'online_ai';
            return (
              <div
                key={service.id}
                className="bg-[#F4EFEA] text-[#2B2D2F] p-6 rounded-[4px] border border-[#1E3A5F]/20 hover:border-[#D97706] transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-sans tracking-wide text-[#1E3A5F] bg-[#1E3A5F]/10 px-2 py-0.5 rounded font-medium">
                      {service.category_name}
                    </span>
                    {service.badge && (
                      <span className="text-[11px] font-sans bg-[#D97706] text-white px-2 py-0.5 rounded font-semibold">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-bold text-[#2B2D2F] group-hover:text-[#1E3A5F] transition-colors mb-2">
                    {service.title}
                  </h3>

                  {/* Price Display adhering to brief */}
                  <div className="flex items-baseline space-x-2 my-2">
                    <span className="font-serif text-2xl md:text-3xl font-extrabold text-[#D97706]">
                      {service.price_display}
                    </span>
                    <span className="text-xs text-[#A4B3C6] font-sans font-normal">
                      / {service.turnaround}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-[#2B2D2F]/80 font-sans leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Features bullet points */}
                  <ul className="space-y-1.5 mb-6 text-xs text-[#2B2D2F]/90 font-sans">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <span className="text-[#D97706] font-bold">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Button */}
                <button
                  onClick={() => onSelectService(service)}
                  className={`w-full py-2.5 rounded-[3px] text-sm font-sans font-medium transition-all duration-200 ${
                    isDigital
                      ? 'bg-[#1E3A5F] hover:bg-[#2B2D2F] text-[#F4EFEA]'
                      : 'bg-[#D97706] hover:bg-[#2B2D2F] text-white'
                  }`}
                >
                  {isDigital ? '即時生成報告 →' : '預約專屬時段 →'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
