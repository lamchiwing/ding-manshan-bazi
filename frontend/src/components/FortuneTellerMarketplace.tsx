import React from 'react';
import { MASTERS_LIST, MasterReader } from '../data/masters';

interface FortuneTellerMarketplaceProps {
  onBookReader: (reader: MasterReader) => void;
}

export const FortuneTellerMarketplace: React.FC<FortuneTellerMarketplaceProps> = ({ onBookReader }) => {
  return (
    <section id="booking" className="w-full bg-[#1E3A5F]/10 py-16 border-b border-[#1E3A5F]/30">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24">
        {/* Section Header */}
        <div className="mb-10">
          <span className="text-xs text-[#D97706] tracking-widest uppercase font-semibold">Verified Fortune Tellers</span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#F4EFEA] mt-1">預約命理師</h2>
          <p className="text-[#A4B3C6] text-base md:text-lg mt-2 font-sans font-light">
            與專業命理師進行一對一線上解讀 · Luxury Consultation & Hotel-like Booking.
          </p>
        </div>

        {/* Fortune Teller Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MASTERS_LIST.map((reader) => (
            <div
              key={reader.id}
              className="bg-[#F4EFEA] text-[#2B2D2F] rounded-[4px] border border-[#1E3A5F]/20 overflow-hidden flex flex-col justify-between hover:border-[#D97706] transition-all duration-300 shadow-md group"
            >
              <div>
                {/* Photo & Badge */}
                <div className="relative h-64 overflow-hidden bg-[#2B2D2F]">
                  <img
                    src={reader.avatar_url}
                    alt={reader.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-3 left-3 bg-[#2B2D2F]/80 backdrop-blur-sm text-[#F4EFEA] text-xs px-2.5 py-1 rounded">
                    {reader.region}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#D97706] text-white text-xs font-semibold px-2.5 py-1 rounded shadow">
                    ★ {reader.rating} · {reader.reading_count} 次鑑定
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-[#2B2D2F]">
                    {reader.name}
                  </h3>
                  <p className="text-xs text-[#1E3A5F] font-sans font-medium mt-0.5">
                    {reader.title}
                  </p>

                  <p className="text-xs text-[#2B2D2F]/80 font-sans mt-3 line-clamp-3 leading-relaxed">
                    {reader.bio}
                  </p>

                  {/* Specialties chips */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {reader.specialties.map((spec, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-[#1E3A5F]/10 text-[#1E3A5F] px-2 py-0.5 rounded font-sans"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer / CTA */}
              <div className="p-6 pt-0 border-t border-[#2B2D2F]/10 mt-4 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#A4B3C6] block font-sans">起價 (Starting from)</span>
                  <span className="font-serif text-lg font-bold text-[#D97706]">
                    {reader.sessions[0]?.price_display}
                  </span>
                </div>

                <button
                  onClick={() => onBookReader(reader)}
                  className="bg-[#1E3A5F] hover:bg-[#2B2D2F] text-[#F4EFEA] text-sm font-sans px-5 py-2.5 rounded-[3px] font-medium transition-colors"
                >
                  預約命理 →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
