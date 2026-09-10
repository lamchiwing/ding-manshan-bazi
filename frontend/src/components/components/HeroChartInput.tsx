import React, { useState } from 'react';

interface HeroChartInputProps {
  onCalculate: (params: { birthDate: string; birthTime: string; gender: string }) => void;
  isLoading?: boolean;
}

export const HeroChartInput: React.FC<HeroChartInputProps> = ({ onCalculate, isLoading }) => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [birthYear, setBirthYear] = useState('1990');
  const [birthMonth, setBirthMonth] = useState('05');
  const [birthDay, setBirthDay] = useState('20');
  const [birthTimeSlot, setBirthTimeSlot] = useState('21');

  // Time slots with explicit 早子時 (00:00 - 00:59) and 夜子時 (23:00 - 23:59)
  const timeSlots = [
    { label: "早子時 (00:00 - 00:59)", value: "00" },
    { label: "丑時 (01:00 - 02:59)", value: "01" },
    { label: "寅時 (03:00 - 04:59)", value: "03" },
    { label: "卯時 (05:00 - 06:59)", value: "05" },
    { label: "辰時 (07:00 - 08:59)", value: "07" },
    { label: "巳時 (09:00 - 10:59)", value: "09" },
    { label: "午時 (11:00 - 12:59)", value: "11" },
    { label: "未時 (13:00 - 14:59)", value: "13" },
    { label: "申時 (15:00 - 16:59)", value: "15" },
    { label: "酉時 (17:00 - 18:59)", value: "17" },
    { label: "戌時 (19:00 - 20:59)", value: "19" },
    { label: "亥時 (21:00 - 22:59)", value: "21" },
    { label: "夜子時 (23:00 - 23:59)", value: "23" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedMonth = birthMonth.padStart(2, '0');
    const formattedDay = birthDay.padStart(2, '0');
    const birthDate = `${birthYear}-${formattedMonth}-${formattedDay}`;
    const birthTime = `${birthTimeSlot.padStart(2, '0')}:30`;
    onCalculate({ birthDate, birthTime, gender });
  };

  return (
    <section className="w-full">
      <div className="w-full bg-[#1E3A5F]/20 p-6 md:p-8 rounded-[4px] border border-[#1E3A5F]">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-serif text-[#F4EFEA] font-bold tracking-wide">
            輸入出生資料
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Gender */}
          <div className="flex items-center space-x-6">
            <span className="text-xs text-[#A4B3C6] font-sans">性別：</span>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 text-xs cursor-pointer text-[#F4EFEA]">
                <input
                  type="radio"
                  name="gender"
                  checked={gender === 'male'}
                  onChange={() => setGender('male')}
                  className="accent-[#D97706]"
                />
                <span>男命（乾造）</span>
              </label>
              <label className="flex items-center space-x-2 text-xs cursor-pointer text-[#F4EFEA]">
                <input
                  type="radio"
                  name="gender"
                  checked={gender === 'female'}
                  onChange={() => setGender('female')}
                  className="accent-[#D97706]"
                />
                <span>女命（坤造）</span>
              </label>
            </div>
          </div>

          {/* Date & Time Selectors */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Year */}
            <div>
              <label className="block text-[11px] text-[#A4B3C6] mb-1 font-sans">出生年份 (陽曆)</label>
              <select
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                className="w-full bg-[#1E3A5F]/40 border border-[#1E3A5F] rounded px-3 py-2 text-xs text-[#F4EFEA] focus:outline-none focus:border-[#D97706]"
              >
                {Array.from({ length: 100 }, (_, i) => 1930 + i).map((y) => (
                  <option key={y} value={y} className="bg-[#2B2D2F] text-[#F4EFEA]">
                    {y} 年
                  </option>
                ))}
              </select>
            </div>

            {/* Month */}
            <div>
              <label className="block text-[11px] text-[#A4B3C6] mb-1 font-sans">出生月份</label>
              <select
                value={birthMonth}
                onChange={(e) => setBirthMonth(e.target.value)}
                className="w-full bg-[#1E3A5F]/40 border border-[#1E3A5F] rounded px-3 py-2 text-xs text-[#F4EFEA] focus:outline-none focus:border-[#D97706]"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={String(m).padStart(2, '0')} className="bg-[#2B2D2F] text-[#F4EFEA]">
                    {m} 月
                  </option>
                ))}
              </select>
            </div>

            {/* Day */}
            <div>
              <label className="block text-[11px] text-[#A4B3C6] mb-1 font-sans">出生日期</label>
              <select
                value={birthDay}
                onChange={(e) => setBirthDay(e.target.value)}
                className="w-full bg-[#1E3A5F]/40 border border-[#1E3A5F] rounded px-3 py-2 text-xs text-[#F4EFEA] focus:outline-none focus:border-[#D97706]"
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={String(d).padStart(2, '0')} className="bg-[#2B2D2F] text-[#F4EFEA]">
                    {d} 日
                  </option>
                ))}
              </select>
            </div>

            {/* Time Slot */}
            <div>
              <label className="block text-[11px] text-[#A4B3C6] mb-1 font-sans">出生時辰</label>
              <select
                value={birthTimeSlot}
                onChange={(e) => setBirthTimeSlot(e.target.value)}
                className="w-full bg-[#1E3A5F]/40 border border-[#1E3A5F] rounded px-3 py-2 text-xs text-[#F4EFEA] focus:outline-none focus:border-[#D97706]"
              >
                {timeSlots.map((ts) => (
                  <option key={ts.value} value={ts.value} className="bg-[#2B2D2F] text-[#F4EFEA]">
                    {ts.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto bg-[#D97706] hover:bg-[#b45309] text-white px-8 py-2.5 rounded font-serif text-sm font-semibold tracking-wider transition-colors shadow"
            >
              {isLoading ? "排盤推演中…" : "立即推演排盤"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
