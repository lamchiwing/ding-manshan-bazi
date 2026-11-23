// 節氣查表（與 Python 引擎共用 shared/solar_terms_table.json 產生的同一份資料）
// 時間一律為「北京/香港時間 UTC+8 的民用時間」；尚未處理歷史時區、夏令時間與真太陽時。
import { JIE_TABLE, JIE_TABLE_META } from '../data/solarTermsTable.ts';

export const MONTH_BRANCH_ORDER = ['寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑'];
const FIRST_YEAR = JIE_TABLE_META.first_bazi_year;

export interface JieLookup {
  baziYear: number;      // 八字年（以立春換年）
  monthBranch: string;   // 月支（以節換月）
  prevJie: string;       // 本月令起點 YYYYMMDDHHMM
  nextJie: string;       // 下個節 YYYYMMDDHHMM
}

export function toStamp(y: number, m: number, d: number, hh: number, mm: number): string {
  const p = (n: number, w = 2) => String(n).padStart(w, '0');
  return `${p(y, 4)}${p(m)}${p(d)}${p(hh)}${p(mm)}`;
}

/** 在節氣表中找「不晚於出生時刻」的最後一個節（二分搜尋）。 */
export function lookupJie(y: number, m: number, d: number, hh: number, mm: number): JieLookup {
  if (y < 1900 || y > 2100) throw new RangeError('出生日期超出支援範圍（1900–2100）');
  const stamp = toStamp(y, m, d, hh, mm);
  let lo = 0, hi = JIE_TABLE.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (JIE_TABLE[mid] <= stamp) lo = mid; else hi = mid - 1;
  }
  if (JIE_TABLE[lo] > stamp || lo + 1 >= JIE_TABLE.length) throw new RangeError('節氣表範圍不足');
  return {
    baziYear: FIRST_YEAR + Math.floor(lo / 12),
    monthBranch: MONTH_BRANCH_ORDER[lo % 12],
    prevJie: JIE_TABLE[lo],
    nextJie: JIE_TABLE[lo + 1],
  };
}

export function stampToMinutes(s: string): number {
  return Date.UTC(+s.slice(0, 4), +s.slice(4, 6) - 1, +s.slice(6, 8), +s.slice(8, 10), +s.slice(10, 12)) / 60000;
}

/** 起運歲數：順行取「出生→下一節」、逆行取「上一節→出生」，三天折一歲，只做一次 half-up 四捨五入，至少 1 歲。 */
export function luckStartAge(lookup: JieLookup, birthStamp: string, isForward: boolean): number {
  const birthMin = stampToMinutes(birthStamp);
  const diffMin = isForward ? stampToMinutes(lookup.nextJie) - birthMin : birthMin - stampToMinutes(lookup.prevJie);
  const diffDays = diffMin / 1440;
  return Math.max(1, Math.floor(diffDays / 3 + 0.5));
}
