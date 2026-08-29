// Client-side deterministic Bazi calculation engine matching backend logic exactly

const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

const STEM_PROPERTIES: Record<string, { yin_yang: string; element: string }> = {
  "甲": { yin_yang: "陽", element: "木" },
  "乙": { yin_yang: "陰", element: "木" },
  "丙": { yin_yang: "陽", element: "火" },
  "丁": { yin_yang: "陰", element: "火" },
  "戊": { yin_yang: "陽", element: "土" },
  "己": { yin_yang: "陰", element: "土" },
  "庚": { yin_yang: "陽", element: "金" },
  "辛": { yin_yang: "陰", element: "金" },
  "壬": { yin_yang: "陽", element: "水" },
  "癸": { yin_yang: "陰", element: "水" },
};

const BRANCH_PROPERTIES: Record<string, { yin_yang: string; element: string }> = {
  "子": { yin_yang: "陽", element: "水" },
  "丑": { yin_yang: "陰", element: "土" },
  "寅": { yin_yang: "陽", element: "木" },
  "卯": { yin_yang: "陰", element: "木" },
  "辰": { yin_yang: "陽", element: "土" },
  "巳": { yin_yang: "陰", element: "火" },
  "午": { yin_yang: "陽", element: "火" },
  "未": { yin_yang: "陰", element: "土" },
  "申": { yin_yang: "陽", element: "金" },
  "酉": { yin_yang: "陰", element: "金" },
  "戌": { yin_yang: "陽", element: "土" },
  "亥": { yin_yang: "陰", element: "水" },
};

const HIDDEN_STEMS: Record<string, Array<{ stem: string; position: string; weight: number }>> = {
  "子": [{ stem: "癸", position: "main", weight: 1.0 }],
  "丑": [{ stem: "己", position: "main", weight: 0.6 }, { stem: "癸", position: "middle", weight: 0.3 }, { stem: "辛", position: "residual", weight: 0.1 }],
  "寅": [{ stem: "甲", position: "main", weight: 0.6 }, { stem: "丙", position: "middle", weight: 0.3 }, { stem: "戊", position: "residual", weight: 0.1 }],
  "卯": [{ stem: "乙", position: "main", weight: 1.0 }],
  "辰": [{ stem: "戊", position: "main", weight: 0.6 }, { stem: "乙", position: "middle", weight: 0.3 }, { stem: "癸", position: "residual", weight: 0.1 }],
  "巳": [{ stem: "丙", position: "main", weight: 0.6 }, { stem: "庚", position: "middle", weight: 0.3 }, { stem: "戊", position: "residual", weight: 0.1 }],
  "午": [{ stem: "丁", position: "main", weight: 0.7 }, { stem: "己", position: "middle", weight: 0.3 }],
  "未": [{ stem: "己", position: "main", weight: 0.6 }, { stem: "丁", position: "middle", weight: 0.3 }, { stem: "乙", position: "residual", weight: 0.1 }],
  "申": [{ stem: "庚", position: "main", weight: 0.6 }, { stem: "壬", position: "middle", weight: 0.3 }, { stem: "戊", position: "residual", weight: 0.1 }],
  "酉": [{ stem: "辛", position: "main", weight: 1.0 }],
  "戌": [{ stem: "戊", position: "main", weight: 0.6 }, { stem: "辛", position: "middle", weight: 0.3 }, { stem: "丁", position: "residual", weight: 0.1 }],
  "亥": [{ stem: "壬", position: "main", weight: 0.7 }, { stem: "甲", position: "middle", weight: 0.3 }],
};

const FIVE_TIGER_BASE: Record<string, string> = {
  "甲": "丙", "己": "丙",
  "乙": "戊", "庚": "戊",
  "丙": "庚", "辛": "庚",
  "丁": "壬", "壬": "壬",
  "戊": "甲", "癸": "甲",
};

const FIVE_RAT_BASE: Record<string, string> = {
  "甲": "甲", "己": "甲",
  "乙": "丙", "庚": "丙",
  "丙": "戊", "辛": "戊",
  "丁": "庚", "壬": "庚",
  "戊": "壬", "癸": "壬",
};

const ELEMENT_GEN: Record<string, string> = {
  "木": "火", "火": "土", "土": "金", "金": "水", "水": "木"
};

const ELEMENT_REST: Record<string, string> = {
  "木": "土", "土": "水", "水": "火", "火": "金", "金": "木"
};

const CHANGSHENG_STAGES = ["長生", "沐浴", "冠帶", "臨官", "帝旺", "衰", "病", "死", "墓", "絕", "胎", "養"];

const CHANGSHENG_STARTS: Record<string, [string, number]> = {
  "甲": ["亥", 1], "乙": ["午", -1],
  "丙": ["寅", 1], "丁": ["酉", -1],
  "戊": ["寅", 1], "己": ["酉", -1],
  "庚": ["巳", 1], "辛": ["子", -1],
  "壬": ["申", 1], "癸": ["卯", -1],
};

function getTenGod(dayStem: string, targetStem: string): string {
  if (!dayStem || !targetStem) return "";
  const d = STEM_PROPERTIES[dayStem];
  const t = STEM_PROPERTIES[targetStem];
  if (!d || !t) return "";

  const samePol = d.yin_yang === t.yin_yang;
  if (d.element === t.element) return samePol ? "比肩" : "劫財";
  if (ELEMENT_GEN[d.element] === t.element) return samePol ? "食神" : "傷官";
  if (ELEMENT_REST[d.element] === t.element) return samePol ? "偏財" : "正財";
  if (ELEMENT_REST[t.element] === d.element) return samePol ? "七殺" : "正官";
  if (ELEMENT_GEN[t.element] === d.element) return samePol ? "偏印" : "正印";
  return "";
}

function getChangsheng(dayStem: string, branch: string): string {
  const info = CHANGSHENG_STARTS[dayStem];
  if (!info || !BRANCHES.includes(branch)) return "";
  const [startBranch, dir] = info;
  const startIdx = BRANCHES.indexOf(startBranch);
  const targetIdx = BRANCHES.indexOf(branch);
  const step = dir === 1 ? (targetIdx - startIdx + 12) % 12 : (startIdx - targetIdx + 12) % 12;
  return CHANGSHENG_STAGES[step];
}

function getJulianDay(year: number, month: number, day: number, hour: number, minute: number): number {
  let y = year;
  let m = month;
  const d = day + (hour + minute / 60) / 24;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + b - 1524.5;
}

export function calculateLocalBazi(birthDate: string, birthTime: string, gender: string = 'male') {
  const [yStr, mStr, dStr] = birthDate.split('-');
  const [hStr, minStr] = birthTime.split(':');
  const year = parseInt(yStr, 10);
  const month = parseInt(mStr, 10);
  const day = parseInt(dStr, 10);
  const hour = parseInt(hStr, 10);
  const min = parseInt(minStr, 10);

  const isBeforeLichun = month === 1 || (month === 2 && day < 4);
  const baziYear = isBeforeLichun ? year - 1 : year;
  const yearStemIdx = (baziYear - 4 + 60) % 10;
  const yearBranchIdx = (baziYear - 4 + 60) % 12;
  const yearStem = STEMS[yearStemIdx];
  const yearBranch = BRANCHES[yearBranchIdx];

  const monthBranches = ["丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥", "子"];
  const mBranch = monthBranches[(month - 1) % 12];
  const tigerBase = FIVE_TIGER_BASE[yearStem];
  const tigerIdx = STEMS.indexOf(tigerBase);
  const monthBranchOrder = ["寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥", "子", "丑"];
  const mOffset = monthBranchOrder.indexOf(mBranch);
  const monthStem = STEMS[(tigerIdx + mOffset) % 10];

  let calcDay = day;
  let calcMonth = month;
  let calcYear = year;
  if (hour >= 23) {
    const dt = new Date(year, month - 1, day + 1);
    calcYear = dt.getFullYear();
    calcMonth = dt.getMonth() + 1;
    calcDay = dt.getDate();
  }
  const jd = getJulianDay(calcYear, calcMonth, calcDay, 12, 0);
  const dayStemIdx = Math.floor((Math.floor(jd + 0.5) + 49) % 10);
  const dayBranchIdx = Math.floor((Math.floor(jd + 0.5) + 49) % 12);
  const dayStem = STEMS[dayStemIdx];
  const dayBranch = BRANCHES[dayBranchIdx];

  let hBranch = "子";
  const totalMins = hour * 60 + min;
  if (totalMins >= 23 * 60 || totalMins < 60) {
    hBranch = "子";
  } else {
    const bIdx = Math.floor((totalMins + 60) / 120);
    hBranch = BRANCHES[bIdx % 12];
  }
  const ratBase = FIVE_RAT_BASE[dayStem];
  const ratIdx = STEMS.indexOf(ratBase);
  const hOffset = BRANCHES.indexOf(hBranch);
  const hourStem = STEMS[(ratIdx + hOffset) % 10];

  const pillars = {
    year: {
      stem: yearStem,
      branch: yearBranch,
      gan_zhi: `${yearStem}${yearBranch}`,
      stem_element: STEM_PROPERTIES[yearStem].element,
      branch_element: BRANCH_PROPERTIES[yearBranch].element,
      ten_god: getTenGod(dayStem, yearStem),
      changsheng: getChangsheng(dayStem, yearBranch),
      hidden_stems: HIDDEN_STEMS[yearBranch].map(h => ({ ...h, ten_god: getTenGod(dayStem, h.stem), element: STEM_PROPERTIES[h.stem].element }))
    },
    month: {
      stem: monthStem,
      branch: mBranch,
      gan_zhi: `${monthStem}${mBranch}`,
      stem_element: STEM_PROPERTIES[monthStem].element,
      branch_element: BRANCH_PROPERTIES[mBranch].element,
      ten_god: getTenGod(dayStem, monthStem),
      changsheng: getChangsheng(dayStem, mBranch),
      hidden_stems: HIDDEN_STEMS[mBranch].map(h => ({ ...h, ten_god: getTenGod(dayStem, h.stem), element: STEM_PROPERTIES[h.stem].element }))
    },
    day: {
      stem: dayStem,
      branch: dayBranch,
      gan_zhi: `${dayStem}${dayBranch}`,
      stem_element: STEM_PROPERTIES[dayStem].element,
      branch_element: BRANCH_PROPERTIES[dayBranch].element,
      ten_god: "日主",
      changsheng: getChangsheng(dayStem, dayBranch),
      hidden_stems: HIDDEN_STEMS[dayBranch].map(h => ({ ...h, ten_god: getTenGod(dayStem, h.stem), element: STEM_PROPERTIES[h.stem].element }))
    },
    hour: {
      stem: hourStem,
      branch: hBranch,
      gan_zhi: `${hourStem}${hBranch}`,
      stem_element: STEM_PROPERTIES[hourStem].element,
      branch_element: BRANCH_PROPERTIES[hBranch].element,
      ten_god: getTenGod(dayStem, hourStem),
      changsheng: getChangsheng(dayStem, hBranch),
      hidden_stems: HIDDEN_STEMS[hBranch].map(h => ({ ...h, ten_god: getTenGod(dayStem, h.stem), element: STEM_PROPERTIES[h.stem].element }))
    }
  };

  const elementScores: Record<string, number> = { "木": 0, "火": 0, "土": 0, "金": 0, "水": 0 };
  [yearStem, monthStem, dayStem, hourStem].forEach(s => {
    elementScores[STEM_PROPERTIES[s].element] += 1.0;
  });
  [yearBranch, mBranch, dayBranch, hBranch].forEach(b => {
    HIDDEN_STEMS[b].forEach(h => {
      elementScores[STEM_PROPERTIES[h.stem].element] += h.weight;
    });
  });

  const totalScore = Object.values(elementScores).reduce((a, b) => a + b, 0) || 1;
  const elementPercentages: Record<string, number> = {};
  for (const [k, v] of Object.entries(elementScores)) {
    elementPercentages[k] = Math.round((v / totalScore) * 100);
  }

  let dominantElement = "木";
  let maxScore = -1;
  for (const [k, v] of Object.entries(elementScores)) {
    if (v > maxScore) {
      maxScore = v;
      dominantElement = k;
    }
  }

  const isMale = gender === 'male';
  const isYangYear = STEM_PROPERTIES[yearStem].yin_yang === '陽';
  const isForward = (isMale && isYangYear) || (!isMale && !isYangYear);
  const luckCycles = [];
  const currMStemIdx = STEMS.indexOf(monthStem);
  const currMBranchIdx = BRANCHES.indexOf(mBranch);

  for (let seq = 1; seq <= 8; seq++) {
    const step = isForward ? seq : -seq;
    const dyStem = STEMS[(currMStemIdx + step + 60) % 10];
    const dyBranch = BRANCHES[(currMBranchIdx + step + 60) % 12];
    const startAge = 5 + (seq - 1) * 10;
    luckCycles.push({
      sequence: seq,
      start_age: startAge,
      end_age: startAge + 9,
      start_year: year + startAge,
      end_year: year + startAge + 9,
      stem: dyStem,
      branch: dyBranch,
      gan_zhi: `${dyStem}${dyBranch}`,
      ten_god: getTenGod(dayStem, dyStem),
      element: STEM_PROPERTIES[dyStem].element,
      changsheng: getChangsheng(dayStem, dyBranch)
    });
  }

  return {
    input: { birth_date: birthDate, birth_time: birthTime, gender },
    day_master: {
      stem: dayStem,
      element: STEM_PROPERTIES[dayStem].element,
      yin_yang: STEM_PROPERTIES[dayStem].yin_yang,
      display: `${dayStem}${STEM_PROPERTIES[dayStem].element}`
    },
    pillars,
    elements: {
      percentages: elementPercentages,
      dominant_element: dominantElement
    },
    luck_cycles: luckCycles
  };
}
