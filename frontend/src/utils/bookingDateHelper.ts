/**
 * Dynamic Booking Dates & Slots Helper
 * Automatically rolls forward daily to provide dynamic booking options
 */

export interface AvailableDateOption {
  value: string;       // YYYY-MM-DD
  label: string;       // e.g. "9月1日 (二)"
  dayOfWeek: string;   // e.g. "星期二"
  isWeekend: boolean;
}

export function generateDynamicAvailableDates(daysAhead: number = 14): AvailableDateOption[] {
  const dates: AvailableDateOption[] = [];
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  
  const today = new Date();
  
  // Start from tomorrow
  for (let i = 1; i <= daysAhead; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    
    const dayIndex = d.getDay();
    const dayName = weekDays[dayIndex];
    const isWeekend = dayIndex === 0 || dayIndex === 6;
    
    dates.push({
      value: dateStr,
      label: `${d.getMonth() + 1}月${d.getDate()}日 (${dayName})`,
      dayOfWeek: `星期${dayName}`,
      isWeekend
    });
  }
  
  return dates;
}

export const DYNAMIC_TIME_SLOTS = [
  { time: "10:00", period: "上午" },
  { time: "11:30", period: "上午" },
  { time: "14:00", period: "下午" },
  { time: "15:30", period: "下午" },
  { time: "17:00", period: "下午" },
  { time: "19:00", period: "晚上" },
  { time: "20:30", period: "晚上" },
];
