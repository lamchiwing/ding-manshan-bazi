import React, { useState } from 'react';

interface HeroChartInputProps {
  onCalculate: (data: { birthDate: string; birthTime: string; gender: string }) => void;
  isLoading?: boolean;
}

const TIME_SHICHEN_OPTIONS = [
  { value: "00:30", label: "23:00–00:59 (子時)" },
  { value: "02:00", label: "01:00–02:59 (丑時)" },
  { value: "04:00", label: "03:00–04:59 (寅時)" },
  { value: "06:00", label: "05:00–06:59 (卯時)" },
  { value: "08:00", label: "07:00–08:59 (辰時)" },
  { value: "10:00", label: "09:00–10:59 (巳時)" },
  { value: "12:00", label: "11:00–12:59 (午時)" },
  { value: "14:00", label: "13:00–14:59 (未時)" },
  { value: "16:00", label: "15:00–16:59 (申時)" },
  { value: "18:00", label: "17:00–18:59 (酉時)" },
  { value: "20:00", label: "19:00–20:59 (戌時)" },
  { value: "22:00", label: "21:00–22:59 (亥時)" },
];

export const HeroChartInput: React.FC<HeroChartInputProps> = ({ onCalculate, isLoading }) => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [year, setYear] = useState('1990');
  const [month, setMonth] = useState('5');
  const [day, setDay] = useState('20');
  const [timeStr, setTimeStr] = useState('22:00'); // 21:00-22:59

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pad = (n: string) => n.padStart(2, '0');
    const formattedDate = `${year}-${pad(month)}-${pad(day)}`;
    onCalculate({
      birthDate: formattedDate,
      birthTime: timeStr,
      gender
    });
  };

  return (
    <section id="home" className="w-full bg-charcoal text-ivory pt-10 pb-12 border-b border-[#1E3A5F]/30">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24">
        {/* Subtle Celestial Ambient Header */}
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 text-xs tracking-widest text-[#A4B3C6] uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
            <span>Deterministic Metaphysics Engine · 現代八字排盤</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif tracking-tight text-[#F4EFEA]">
            八字排盤
          </h1>
          <p className="text-[#A4B3C6] text-base md:text-lg mt-2 font-sans font-light">
            輸入出生資料，探索你的命盤。
          </p>
        </div>

        {/* Input Box Card adhering to brief */}
        <form onSubmit={handleSubmit} className="bg-[#1E3A5F]/20 border border-[#1E3A5F] p-6 md:p-8 rounded-sm">
          {/* First Row: Gender Selection */}
          <div className="flex items-center space-x-8 mb-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                checked={gender === 'male'}
                onChange={() => setGender('male')}
                className="w-4 h-4 accent-[#D97706]"
              />
              <span className={`text-base ${gender === 'male' ? 'text-[#D97706] font-medium' : 'text-[#F4EFEA]'}`}>
                男命
              </span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                checked={gender === 'female'}
                onChange={() => setGender('female')}
                className="w-4 h-4 accent-[#D97706]"
              />
              <span className={`text-base ${gender === 'female' ? 'text-[#D97706] font-medium' : 'text-[#F4EFEA]'}`}>
                女命
              </span>
            </label>
          </div>

          {/* Second Row: Year, Month, Day, Time Inputs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            {/* Year */}
            <div>
              <label className="block text-xs text-[#A4B3C6] mb-1 font-sans">出生年份</label>
              <div className="flex items-center bg-[#F4EFEA] rounded-[3px] border border-[#1E3A5F] focus-within:border-[#D97706] transition-colors">
                <input
                  type="number"
                  min="1920"
                  max="2050"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full bg-transparent text-[#2B2D2F] px-3 py-2.5 text-base focus:outline-none font-medium"
                  required
                />
                <span className="bg-[#1E3A5F] text-[#F4EFEA] px-3 py-2.5 text-sm select-none">年</span>
              </div>
            </div>

            {/* Month */}
            <div>
              <label className="block text-xs text-[#A4B3C6] mb-1 font-sans">出生月份</label>
              <div className="flex items-center bg-[#F4EFEA] rounded-[3px] border border-[#1E3A5F] focus-within:border-[#D97706] transition-colors">
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full bg-transparent text-[#2B2D2F] px-3 py-2.5 text-base focus:outline-none font-medium"
                  required
                />
                <span className="bg-[#1E3A5F] text-[#F4EFEA] px-3 py-2.5 text-sm select-none">月</span>
              </div>
            </div>

            {/* Day */}
            <div>
              <label className="block text-xs text-[#A4B3C6] mb-1 font-sans">出生日期</label>
              <div className="flex items-center bg-[#F4EFEA] rounded-[3px] border border-[#1E3A5F] focus-within:border-[#D97706] transition-colors">
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="w-full bg-transparent text-[#2B2D2F] px-3 py-2.5 text-base focus:outline-none font-medium"
                  required
                />
                <span className="bg-[#1E3A5F] text-[#F4EFEA] px-3 py-2.5 text-sm select-none">日</span>
              </div>
            </div>

            {/* Time / Shichen */}
            <div>
              <label className="block text-xs text-[#A4B3C6] mb-1 font-sans">出生時間</label>
              <div className="flex items-center bg-[#F4EFEA] rounded-[3px] border border-[#1E3A5F] focus-within:border-[#D97706] transition-colors">
                <select
                  value={timeStr}
                  onChange={(e) => setTimeStr(e.target.value)}
                  className="w-full bg-transparent text-[#2B2D2F] px-3 py-2.5 text-sm focus:outline-none font-medium appearance-none cursor-pointer"
                >
                  {TIME_SHICHEN_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} className="text-[#2B2D2F]">
                      {opt.label}
                    </option>
                  ))}
                </select>
                <span className="bg-[#1E3A5F] text-[#F4EFEA] px-3 py-2.5 text-sm select-none">時</span>
              </div>
            </div>
          </div>

          {/* Primary CTA button */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-[160px] h-[48px] bg-[#D97706] hover:bg-[#F4EFEA] text-[#F4EFEA] hover:text-[#2B2D2F] font-serif text-lg tracking-wider font-semibold rounded-[3px] transition-all duration-200 shadow-sm flex items-center justify-center"
            >
              {isLoading ? '排盤中…' : '排盤'}
            </button>
            <div className="mt-3 sm:mt-0 text-xs text-[#A4B3C6] font-sans flex items-center space-x-3">
              <span>節氣精確定柱</span>
              <span>·</span>
              <span>100% Deterministic Engine</span>
              <span>·</span>
              <span>隱私安全保障</span>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
