// Traditional Chinese Perpetual Calendar (萬年曆 / 通勝) Helper

export interface DailyAlmanac {
  solarYear: number;
  solarMonth: number;
  solarDay: number;
  solarDateStr: string;
  lunarYearGanzhi: string;
  lunarMonthStr: string;
  lunarDayStr: string;
  dayGanzhi: string;
  lunarFullStr: string;
  luck: string;
  clash: string;
  auspicious: string[];
  inauspicious: string[];
}

const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const CLASH_MAP: Record<string, string> = {
  '子': '馬', '丑': '羊', '寅': '猴', '卯': '雞',
  '辰': '狗', '巳': '豬', '午': '鼠', '未': '牛',
  '申': '虎', '酉': '兔', '戌': '龍', '亥': '蛇'
};

const LUNAR_MONTH_NAMES = [
  '正月', '二月', '三月', '四月', '五月', '六月',
  '七月', '八月', '九月', '十月', '十一月', '十二月'
];

const LUNAR_DAY_NAMES = [
  '', '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
  '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'
];

const BRANCH_ALMANAC: Record<string, { luck: string; auspicious: string[]; inauspicious: string[] }> = {
  '巳': {
    luck: '中吉',
    auspicious: ['交易', '動土', '安床', '栽種', '移徙', '納畜'],
    inauspicious: ['行程', '取魚', '醞釀', '針灸']
  },
  '酉': {
    luck: '大吉',
    auspicious: ['祭祀', '祈福', '開光', '塑繪', '出行', '理髮'],
    inauspicious: ['嫁娶', '開市', '破土', '安葬']
  },
  '子': {
    luck: '大吉',
    auspicious: ['祈福', '酬神', '訂盟', '納采', '裁衣', '冠笄'],
    inauspicious: ['詞訟', '治病', '行喪', '破土']
  },
  '丑': {
    luck: '中吉',
    auspicious: ['嫁娶', '開市', '立券', '移徙', '安床', '出行'],
    inauspicious: ['動土', '安葬', '破土', '伐木']
  },
  '寅': {
    luck: '吉',
    auspicious: ['開光', '針灸', '治病', '會友', '納財', '交易'],
    inauspicious: ['祈福', '嫁娶', '安葬', '造屋']
  },
  '卯': {
    luck: '中吉',
    auspicious: ['祭祀', '開市', '交易', '納財', '納畜', '入宅'],
    inauspicious: ['嫁娶', '動土', '安床', '破土']
  },
  '辰': {
    luck: '平',
    auspicious: ['祭祀', '解除', '沐浴', '破屋', '壞垣', '啟攢'],
    inauspicious: ['開市', '交易', '移徙', '納財']
  },
  '午': {
    luck: '中吉',
    auspicious: ['祭祀', '祈福', '齋醮', '開光', '赴任', '移徙'],
    inauspicious: ['動土', '安葬', '破土', '開倉']
  },
  '未': {
    luck: '吉',
    auspicious: ['祭祀', '解除', '沐浴', '理髮', '掃舍', '修飾'],
    inauspicious: ['嫁娶', '開市', '安葬', '出火']
  },
  '申': {
    luck: '中吉',
    auspicious: ['訂盟', '納采', '赴任', '治病', '破土', '納財'],
    inauspicious: ['開市', '交易', '移徙', '造屋']
  },
  '戌': {
    luck: '平',
    auspicious: ['祭祀', '解除', '沐浴', '捕捉', '畋獵', '治病'],
    inauspicious: ['嫁娶', '動土', '開市', '交易']
  },
  '亥': {
    luck: '大吉',
    auspicious: ['嫁娶', '開市', '立券', '納財', '出行', '納畜'],
    inauspicious: ['治病', '破土', '行喪', '安葬']
  }
};

export function getDailyAlmanac(date: Date = new Date()): DailyAlmanac {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();

  const anchor = new Date(2026, 10, 3);
  const curMidnight = new Date(y, m - 1, d);
  const diffDays = Math.round((curMidnight.getTime() - anchor.getTime()) / (1000 * 60 * 60 * 24));

  const stemIdx = (((7 + diffDays) % 10) + 10) % 10;
  const branchIdx = (((5 + diffDays) % 12) + 12) % 12;
  const dayGanzhi = `${STEMS[stemIdx]}${BRANCHES[branchIdx]}日`;

  const branch = BRANCHES[branchIdx];
  const clashZodiac = CLASH_MAP[branch] || '豬';

  let lunarMonth = 9;
  let lunarDay = 25 + diffDays;
  while (lunarDay > 30) {
    lunarDay -= 30;
    lunarMonth += 1;
  }
  while (lunarDay < 1) {
    lunarDay += 30;
    lunarMonth -= 1;
  }

  const lunarYearGanzhi = '丙午年';
  const lunarMonthStr = LUNAR_MONTH_NAMES[(lunarMonth - 1 + 12) % 12] || '九月';
  const lunarDayStr = (LUNAR_DAY_NAMES[lunarDay] || '廿五') + '日';

  const details = BRANCH_ALMANAC[branch] || BRANCH_ALMANAC['巳'];

  return {
    solarYear: y,
    solarMonth: m,
    solarDay: d,
    solarDateStr: `${y}年${m}月${d}日`,
    lunarYearGanzhi,
    lunarMonthStr,
    lunarDayStr,
    dayGanzhi,
    lunarFullStr: `${lunarYearGanzhi} ${lunarMonthStr} ${lunarDayStr} ${dayGanzhi}`,
    luck: details.luck,
    clash: `犯沖肖${clashZodiac}`,
    auspicious: details.auspicious,
    inauspicious: details.inauspicious,
  };
}
