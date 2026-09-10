/**
 * Dynamic Booking Dates & Slots Helper
 * Starts from 1 week (7 days) after today, up to 1 year (365 days) in the future.
 */

export interface AvailableDateOption {
  value: string;       // YYYY-MM-DD
  label: string;       // e.g. "9月17日 (四)"
  dayOfWeek: string;   // e.g. "星期四"
  isWeekend: boolean;
}

export function getBookingDateBounds() {
  const today = new Date();
  
  const minDateObj = new Date(today);
  minDateObj.setDate(today.getDate() + 7); // 1 week after today

  const maxDateObj = new Date(today);
  maxDateObj.setDate(today.getDate() + 365); // 1 year after today

  const formatDate = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  return {
    minDate: formatDate(minDateObj),
    maxDate: formatDate(maxDateObj),
    defaultDate: formatDate(minDateObj)
  };
}

export function generateDynamicAvailableDates(daysAhead: number = 30, startOffset: number = 7): AvailableDateOption[] {
  const dates: AvailableDateOption[] = [];
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  
  const today = new Date();
  
  // Start from 7 days after today
  for (let i = startOffset; i < startOffset + daysAhead; i++) {
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
