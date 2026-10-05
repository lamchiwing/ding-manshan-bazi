/**
 * Client-Side Local Five Elements Guide Report Generator
 * 100% Dynamic Quantitative 100-Point Model + 6 Element DataBasic Matrix
 * Strictly aligned with official DataBasic PDF specification & Supabase schema
 */

export const BRANCH_HIDDEN_ELEMENTS: Record<string, [string, string][]> = {
  子: [["水", "本氣"]],
  丑: [["濕土", "本氣"], ["水", "中氣"], ["金", "餘氣"]],
  寅: [["木", "本氣"], ["火", "中氣"], ["乾土", "餘氣"]],
  卯: [["木", "本氣"]],
  辰: [["濕土", "本氣"], ["木", "中氣"], ["水", "餘氣"]],
  巳: [["火", "本氣"], ["金", "中氣"], ["乾土", "餘氣"]],
  午: [["火", "本氣"], ["乾土", "中氣"]],
  未: [["乾土", "本氣"], ["火", "中氣"], ["木", "餘氣"]],
  申: [["金", "本氣"], ["水", "中氣"], ["濕土", "餘氣"]],
  酉: [["金", "本氣"]],
  戌: [["乾土", "本氣"], ["金", "中氣"], ["火", "餘氣"]],
  亥: [["水", "本氣"], ["木", "中氣"]]
};

export const STEM_ELEMENT_MAP: Record<string, string> = {
  甲: "木", 乙: "木",
  丙: "火", 丁: "火",
  戊: "乾土", 己: "濕土",
  庚: "金", 辛: "金",
  壬: "水", 癸: "水"
};

export const FIVE_ELEMENTS_MATRIX: Record<string, any> = {
  金: {
    primaryHelper: "金、濕土（辰、丑）",
    secondaryHelper: "乾土（戌、未）",
    neutralHelper: "水",
    secondaryAvoid: "木",
    primaryAvoid: "火",
    traits: "規則、結構、效率、判斷。重視秩序、標準和清晰界線，做事講求方法、流程和結果。擅長分析問題、控制風險及作出精準決定。適合處理需要紀律、專業判斷的事情，不太適應長期處於混亂、無章法或反覆變動的環境。",
    majorColors: "純白、冷銀、乳白、金屬灰、雪白；白色系、金屬色系",
    minorColors: "淺灰、米白、冷米色、霧銀",
    avoidColors: "大面積正紅、深紫、深綠、螢光暖色",
    shapes: "圓形、半圓形、金屬多邊形、嚴整幾何形",
    naturalElements: "金屬、礦石、晶體、岩石、精鋼、金屬表面",
    industries: "金融投資、精密製造、高階硬體、法律合規、黃金珠寶、機械工程、管理諮詢",
    roles: "財務總監、法務合規、首席風控、技術架構師、項目總監、高級管理",
    workEnvironment: "需要高度精準、規則明確、重秩序、流程嚴密與專業風險控制的工作環境",
    avoidWorkType: "環境混亂、缺乏明確流程或朝令夕改之工作",
    directions: "西方、西北面",
    neutralDirections: "北方、東北面",
    avoidDirections: "正南面",
    outdoorEnv: "現代都會、金融核心商圈、秩序分明之商業區、科技園區",
    indoorEnv: "整潔俐落、現代簡約、明亮乾爽、富有高度秩序感之空間",
    partnerPersonality: "理性、有原則、講信用、重承諾、界線清晰；合作時重視規則、效率及責任分工。",
    partnerType: "做事有制度、重視數據及風險控制，能夠清晰分工且執行力極強的人。"
  },
  水: {
    primaryHelper: "水、金",
    secondaryHelper: "濕土（辰、丑）",
    neutralHelper: "木",
    secondaryAvoid: "火",
    primaryAvoid: "乾土（戌、未）",
    traits: "智慧、流動、適應、靈活。極具市場敏銳度與資訊整合力，善於應變與跨界連接，在不確定情況下快速尋找出路，追求自由度與全球化視野。",
    majorColors: "純黑、深海藍、墨藍、藏青、午夜藍；深色冷系",
    minorColors: "天藍、冷灰、灰藍、冰藍",
    avoidColors: "大面積焦黃、深褐、正紅、燥土色",
    shapes: "波浪形、水滴形、流線形、圓潤動態曲線",
    naturalElements: "水、河流、海洋、雨露、水泉、冰川",
    industries: "跨境貿易、現代物流、旅遊水產、資訊數據、電子商務、軟體平臺、策略顧問",
    roles: "海外拓展、數據分析、商務外交、策略顧問、貿易採購、公關談判",
    workEnvironment: "需要彈性、資訊流動迅速、溝通頻繁、跨領域多工協調的工作環境",
    avoidWorkType: "封閉僵化、行動受限、資訊閉塞、無法彈性變通之傳統環境",
    directions: "北方、西北面",
    neutralDirections: "東方、東南面",
    avoidDirections: "南方、西南面",
    outdoorEnv: "靠海、臨湖水岸、港口城市、交通樞紐、資訊密集之自由貿易區",
    indoorEnv: "視野開闊、親水近景、通風靈活、富有現代動態感與自由度之空間",
    partnerPersonality: "靈活機智、反應迅速、懂得變通、消息靈通；善於協調溝通與應對突發變化。",
    partnerType: "人脈網絡廣、市場觸角敏銳、反應迅速，能夠帶來前沿資訊與商業機會的人。"
  },
  木: {
    primaryHelper: "木、水",
    secondaryHelper: "濕土（辰、丑）",
    neutralHelper: "火",
    secondaryAvoid: "乾土（戌、未）",
    primaryAvoid: "金",
    traits: "生長、發展、創意、規劃。重視長期發展、學習和進步，通常較適合由零開始建立事情，逐步培養客戶、品牌、團隊或專業能力。思考著重未來方向及發展空間。",
    majorColors: "墨綠、翠綠、森林綠、青綠、原木色、竹青；綠色系、青綠色系、木色系",
    minorColors: "薄荷綠、淺木色、橄欖灰、米綠",
    avoidColors: "大面積純白、亮金、金屬銀灰",
    shapes: "長方形、長條形、向上延伸形、葉片形、自然曲線",
    naturalElements: "樹木、植物、葉片、花草、森林、竹林、藤蔓",
    industries: "文教出版、綠色農業、健康醫療、永續環保、軟體開發、品牌策劃、創意設計",
    roles: "策劃總監、品牌管理、產品研發、內容創作、教育培訓、組織規劃",
    workEnvironment: "需要創意、策劃、持續學習成長、建立品牌、文化陶冶及自主性強的工作環境",
    avoidWorkType: "機械化重複、單一封閉、缺乏成長空間與文化感之工作",
    directions: "東方、東南面",
    neutralDirections: "北方、南方",
    avoidDirections: "西方、西北面",
    outdoorEnv: "綠化度高、林木公園旁、具文化氣息之學校、文教區、創意園區",
    indoorEnv: "自然舒適、通風採光良好、綠意充足、帶溫潤木質感之學習與工作空間",
    partnerPersonality: "重理念、重成長、開放溫和、願意互相支持；重視長遠發展及共同進步。",
    partnerType: "有長期視野、願意共同成長，擅長策劃、創意及開拓新項目的人。"
  },
  火: {
    primaryHelper: "火、木",
    secondaryHelper: "乾土（戌、未）",
    neutralHelper: "金",
    secondaryAvoid: "濕土（辰、丑）",
    primaryAvoid: "水",
    traits: "活力、熱情、曝光、行動。重視表達、影響力和即時成果，思維敏捷，極具表現力與感召力，擅長主動出擊、接觸客戶、推廣品牌與快速決策。",
    majorColors: "正紅、酒紅、暖紅、珊瑚橘、朱紅、活力橙；紅色系、橙色系、暖色系",
    minorColors: "亮橘、暖粉、珊瑚色、杏橙",
    avoidColors: "大面積深黑、深藍、冷暗灰黑",
    shapes: "三角形、菱形、放射形、尖角多邊形、向上升騰形",
    naturalElements: "太陽、火焰、燈光、陽光、晨曦、熱能",
    industries: "人工智慧、新媒體傳播、餐飲能源、美妝影視、品牌公關、數字行銷、演藝展覽",
    roles: "演講傳播、商務拓展、市場行銷、創意總監、公關發言人、活動統籌",
    workEnvironment: "需要對外曝光、銷售推廣、快速行動、直接面對市場與擴大影響力的環境",
    avoidWorkType: "陰暗封閉、節奏拖沓、缺乏人際互動與市場反饋之幕後環境",
    directions: "正南方、東南面",
    neutralDirections: "東北面、正西面",
    avoidDirections: "正北方、西北面",
    outdoorEnv: "陽光充足、採光極佳、熱鬧繁華之商業核心街區、娛樂文創區、展會中心",
    indoorEnv: "光線明亮、熱鬧活躍、動線流暢、充滿活力、互動與藝術氣息之空間",
    partnerPersonality: "熱情直率、思維活躍、富有感染力、主動果斷，合作時重視行動與效率。",
    partnerType: "具市場敏銳度、敢於出手、擅長銷售推廣，能快速把項目引爆推向市場的人。"
  },
  乾土: {
    primaryHelper: "乾土（戌、未）、火",
    secondaryHelper: "木",
    neutralHelper: "金",
    secondaryAvoid: "濕土（辰、丑）",
    primaryAvoid: "水",
    traits: "穩重、厚道、守成、承載力。原則性強，具備強大包容力與資產管理定力，擅長穩扎穩打、建立制度、經營長期生意，重視安全感與固定資產積累。",
    majorColors: "暖駝、卡其、焦糖、磚紅、暖啡、土黃；大地色系、暖褐色系",
    minorColors: "米黃、咖啡、沙色、暖灰",
    avoidColors: "大面積墨黑、深藍、冷灰、鐵灰",
    shapes: "厚實正方形、梯形、寬厚長方、平頂多邊形",
    naturalElements: "高山、岩石、乾土平原、石牆、磚石建築",
    industries: "房地產、基礎建設、倉儲物流、實體製造、資產託管、農業礦產、諮詢顧問",
    roles: "運營總監、資產管理、風險控制、項目監理、供應鏈負責人、地產合夥人",
    workEnvironment: "制度健全、著重長期資產經營、穩步推進、需要責任擔當與風險控制的環境",
    avoidWorkType: "高頻投機、朝令夕改、毫無資產沈澱與制度規範之不穩定行業",
    directions: "西南面、東北面",
    neutralDirections: "正南面、正東面",
    avoidDirections: "正北方",
    outdoorEnv: "高地、乾爽平原、成熟穩定、生活配套完善之住宅區、建築與地產核心區",
    indoorEnv: "乾爽穩定、厚實沉穩、方正大器、溫馨耐用之大地色調開闊空間",
    partnerPersonality: "穩重可靠、重責任、重承諾、有承擔；做事穩健有耐性，重視實際成果。",
    partnerType: "穩健踏實、信譽卓著、具備長期資源與責任感，適合共同經營重資產項目的人。"
  },
  濕土: {
    primaryHelper: "濕土（辰、丑）、水",
    secondaryHelper: "金",
    neutralHelper: "火",
    secondaryAvoid: "木",
    primaryAvoid: "乾土（戌、未）",
    traits: "包容、蓄藏、滋養、整合。擅長在複雜環境中調和多方利益與資源，善於後勤保障、資料整理、流程梳理與細水長流式維護，是平台運作的核心基石。",
    majorColors: "米黃、淺褐、灰泥色、燕麥色、藕荷色；泥土色系、自然大地色系",
    minorColors: "冷米色、灰藍、霧藍、灰白、淺灰",
    avoidColors: "大面積焦糖深紫、大紅、強烈刺眼暖色",
    shapes: "圓潤平緩形、圓方形、低重心厚實幾何形",
    naturalElements: "水土交界、濕地、沃土、池塘、水田、天然石材",
    industries: "倉儲物流、農業生技、生態保育、物業管理、供應鏈服務、自然護理、社工慈善",
    roles: "運營經理、行政統籌、資產託管、後勤保障、供應鏈管理、客戶成功負責人",
    workEnvironment: "重視後勤支援、資源整合、流程管理、數據資料處理與跨部門協同的環境",
    avoidWorkType: "過度拋頭露面、爾虞我詐、缺乏後台支援機制之單打獨鬥崗位",
    directions: "東南面、東北面",
    neutralDirections: "正南面、正東面",
    avoidDirections: "正西面、西北面",
    outdoorEnv: "水土交界、濕潤平原、生態園區、資源集中且運作有序之物流與後勤園區",
    indoorEnv: "安靜穩定、收納充足、通風良好、功能分區清晰且溫暖舒適之空間",
    partnerPersonality: "溫和包容、細心耐性、善於協調溝通；不爭功諉過，默默在背後支持團隊。",
    partnerType: "細心、配合度高、善於後勤梳理，能夠處理大量複雜細節與資源整合的人。"
  }
};

export const STRENGTH_BUSINESS_PATTERNS = {
  strong: {
    workType: "前線操盤、戰略決策、開拓拓荒。適合扛業績指標、引領團隊擴張。",
    careerDirection: "適合主動出擊、項目拓展，承擔適度波動以爭取高回報率。適合自己做主，以個人決策為主導、外部資源協同為輔。",
    wealthMode: "適合按成果收費、項目抽成、高週轉業務。比起單純依靠固定收入，更適合透過主動業務拓展與超額成果獲利。",
    entrepreneurshipFit: "適合自主創業、擔任核心操盤手或合夥領軍人物。",
    riskWarning: "避免過快加槓桿、盲目擴張重資產或盲目追求規模導致現金流斷裂。",
    cooperationMode: "「你定方向與規則，對方管執行落地」（權責清晰分明）。",
    cooperationAdvantage: "執行推進力強、抗壓敢拼、具開拓號召力與戰略膽識。"
  },
  weak: {
    workType: "幕後策劃、專業技術、體系架構。適合憑藉專業深度、借力大平台穩定輸出。",
    careerDirection: "適合穩定累積、技能複利，依靠長期穩定資產與專業口碑持續增值。適合團隊合作，背靠強大平台與資源方，自己專注核心專業產出。",
    wealthMode: "適合長期顧問合約制、穩定訂閱制、專業技術授權、諮詢費與版稅。適合透過專業能力、知識、技術專長與個人品牌建立穩定長遠收入。",
    entrepreneurshipFit: "適合受僱於大型成熟機構、擔任核心智囊顧問或團隊專家合夥人。",
    riskWarning: "嚴禁為他人人情作保、避免高風險短線投機、盲目槓桿與代持資產。",
    cooperationMode: "「對方提供平台與資金，你提供專業與技術」（借力打力、互惠共贏）。",
    cooperationAdvantage: "心思細密、專注專業深度、協調配合度高、風險控制與保護意識極強。"
  }
};

export function generateLocalFiveElementsReport(
  baziData: any,
  birthDate: string = "1990-05-20",
  birthTime: string = "22:00",
  gender: string = "male"
): string {
  const genderLabel = gender === "male" ? "乾造（男）" : "坤造（女）";
  const pronoun = gender === "male" ? "你" : "妳";
  const p = baziData?.pillars || {};

  const yStem = p?.year?.stem || "甲";
  const yBranch = p?.year?.branch || "子";
  const mStem = p?.month?.stem || "丙";
  const mBranch = p?.month?.branch || "寅";
  const dStem = p?.day?.stem || "丙";
  const dBranch = p?.day?.branch || "寅";
  const hStem = p?.hour?.stem || "甲";
  const hBranch = p?.hour?.branch || "午";

  const yGz = `${yStem}${yBranch}`;
  const mGz = `${mStem}${mBranch}`;
  const dGz = `${dStem}${dBranch}`;
  const hGz = `${hStem}${hBranch}`;

  // Initialize scores
  const scores: Record<string, number> = {
    木: 0.0,
    火: 0.0,
    乾土: 0.0,
    濕土: 0.0,
    金: 0.0,
    水: 0.0
  };

  // Add Stem scores (36 total)
  if (STEM_ELEMENT_MAP[yStem]) scores[STEM_ELEMENT_MAP[yStem]] += 8.0;
  if (STEM_ELEMENT_MAP[mStem]) scores[STEM_ELEMENT_MAP[mStem]] += 10.0;
  if (STEM_ELEMENT_MAP[dStem]) scores[STEM_ELEMENT_MAP[dStem]] += 10.0;
  if (STEM_ELEMENT_MAP[hStem]) scores[STEM_ELEMENT_MAP[hStem]] += 8.0;

  // Add Branch scores (64 total)
  const assignBranch = (b: string, totalWeight: number, mode: "month" | "day" | "other") => {
    const list = BRANCH_HIDDEN_ELEMENTS[b] || [["木", "本氣"]];
    if (list.length === 1) {
      scores[list[0][0]] += totalWeight;
    } else if (list.length === 2) {
      if (mode === "month") {
        scores[list[0][0]] += 20.0;
        scores[list[1][0]] += 8.0;
      } else if (mode === "day") {
        scores[list[0][0]] += 12.0;
        scores[list[1][0]] += 4.0;
      } else {
        scores[list[0][0]] += 7.0;
        scores[list[1][0]] += 3.0;
      }
    } else if (list.length === 3) {
      if (mode === "month") {
        scores[list[0][0]] += 16.0;
        scores[list[1][0]] += 8.0;
        scores[list[2][0]] += 4.0;
      } else if (mode === "day") {
        scores[list[0][0]] += 10.0;
        scores[list[1][0]] += 4.0;
        scores[list[2][0]] += 2.0;
      } else {
        scores[list[0][0]] += 6.0;
        scores[list[1][0]] += 3.0;
        scores[list[2][0]] += 1.0;
      }
    }
  };

  assignBranch(mBranch, 28.0, "month");
  assignBranch(dBranch, 16.0, "day");
  assignBranch(yBranch, 10.0, "year");
  assignBranch(hBranch, 10.0, "hour");

  // Determine strength
  const dElem = STEM_ELEMENT_MAP[dStem] || "火";
  const resourceMap: Record<string, string[]> = {
    木: ["水"],
    火: ["木"],
    乾土: ["火"],
    濕土: ["火"],
    金: ["乾土", "濕土"],
    水: ["金"]
  };
  const sameElems = (dElem === "乾土" || dElem === "濕土") ? ["乾土", "濕土"] : [dElem];
  const resources = resourceMap[dElem] || [];
  let sameScore = 0;
  for (const e of sameElems) sameScore += scores[e] || 0;
  for (const e of resources) sameScore += scores[e] || 0;

  const isStrong = sameScore >= 50.0;
  const strengthLabel = isStrong ? "身強" : "身弱";
  const bizPattern = isStrong ? STRENGTH_BUSINESS_PATTERNS.strong : STRENGTH_BUSINESS_PATTERNS.weak;

  // Determine favorable elements (喜忌)
  let primaryHelper = "金";
  const isWinter = mBranch === "亥" || mBranch === "子" || mBranch === "丑";
  const isSummer = mBranch === "巳" || mBranch === "午" || mBranch === "未";

  // 調候優先
  if (isWinter && (dStem === "壬" || dStem === "癸")) {
    primaryHelper = "火";
  } else if (isSummer && (dStem === "丙" || dStem === "丁")) {
    primaryHelper = "水";
  } else if (["申", "酉", "戌"].includes(mBranch) && (dStem === "庚" || dStem === "辛")) {
    primaryHelper = "木";
  } else if (["寅", "卯", "辰"].includes(mBranch) && (dStem === "甲" || dStem === "乙")) {
    primaryHelper = "金";
  } else if (isStrong) {
    const party = ["水", "金"].includes(dElem) ? ["水", "金"] :
                  ["木", "水"].includes(dElem) ? ["木", "水"] :
                  ["火", "木"].includes(dElem) ? ["火", "木"] :
                  ["金", "乾土", "濕土"].includes(dElem) ? ["金", "乾土", "濕土"] :
                  ["乾土", "濕土", "火"];
    const otherScores = Object.entries(scores).filter(([k]) => !party.includes(k));
    otherScores.sort((a, b) => a[1] - b[1]);
    primaryHelper = otherScores[0] ? otherScores[0][0] : "金";
  } else {
    primaryHelper = (dStem === "壬" || dStem === "癸") ? "金" :
                    (dStem === "甲" || dStem === "乙") ? "水" :
                    (dStem === "丙" || dStem === "丁") ? "木" :
                    (dStem === "庚" || dStem === "辛") ? "乾土" : "火";
  }

  const dim = FIVE_ELEMENTS_MATRIX[primaryHelper] || FIVE_ELEMENTS_MATRIX["金"];

  const cleanColors = dim.majorColors.split('；')[0].replace(/。$/, "");
  const cleanAvoidColors = dim.avoidColors.replace(/。$/, "");
  const cleanDirections = dim.directions.replace(/。$/, "");
  const cleanEnv = dim.indoorEnv.replace(/。$/, "");

  return `# 丁｜蔓山 命理誌 · TingManShan.com
【五行生活指南 · 專屬個人開運全覽】

檔案編號：TMS-${birthDate.replace(/-/g, "")}
命造信息：${birthDate} ${birthTime} · ${genderLabel}
四柱格局：${yGz}年 · ${mGz}月 · ${dGz}日 · ${hGz}時

==================================================
一、 八字五行量化強弱分析（100分制 DataBasic 專利模型）
==================================================
• 天干權重（共 36 分）：年干8分、月干10分、日干10分、時干8分。
• 地支權重（共 64 分）：月令28分（本氣/中氣/餘氣精算）、日支16分、年支10分、時支10分。
• 六類五行量化精準得分：
  - 木：${scores["木"].toFixed(1)} 分
  - 火：${scores["火"].toFixed(1)} 分
  - 乾土（戌、未）：${scores["乾土"].toFixed(1)} 分
  - 濕土（辰、丑）：${scores["濕土"].toFixed(1)} 分
  - 金：${scores["金"].toFixed(1)} 分
  - 水：${scores["水"].toFixed(1)} 分
• 同黨得分（日主及生我之印星）：${sameScore.toFixed(1)} 分 ➜ 判定為 【${strengthLabel}型】（≥50分為身強，<50分為身弱）。

> 判斷簡析：${isStrong ? `本命局同黨得分達 ${sameScore.toFixed(1)} 分（≥50分），能量充沛剛健，適宜取異黨五行（克洩耗）以引導能量順暢生發、轉化為現實成果。` : `本命局同黨得分為 ${sameScore.toFixed(1)} 分（<50分），適宜取生助日主之元素以充盈基底、借力蓄勢。`}

==================================================
二、 五行決策要素（客觀商業視角）
==================================================
• 對${pronoun}較有幫助的元素（主要有利）：【${primaryHelper}】（命局最核心之開運調候與平衡能量，日常生活與關鍵工作中優先借力）
• 次要有利元素：${dim.secondaryHelper}
• 中性元素：${dim.neutralHelper}（順其自然，不刻意強求亦無大礙）
• 較少使用元素：${dim.secondaryAvoid}（日常環境中無需刻意加強）
• 不宜過多的元素（主要不利）：${dim.primaryAvoid}（原局已過盛或生克不利，不宜過度堆疊）

==================================================
三、 核心五行生活場景轉換（主力元素：${primaryHelper}）
==================================================
1. 開運特質賦能（後天借力與行為調動）：
（註：本局原局以日主天賦為主導，主力元素【${primaryHelper}】為平衡命局之核心用神。日常在重大決策與事業拓展時，建議刻意調動及展現以下特質，以達後天開運平衡）：
${dim.traits}

2. 色彩調和方案：
• 適合顏色：${dim.majorColors}
• 次要顏色：${dim.minorColors}
• 少用顏色：${dim.avoidColors}

3. 方位配置：
• 有利方向：${dim.directions}
• 中性方向：${dim.neutralDirections}
• 較少使用方向：${dim.avoidDirections}

4. 空間環境氣場：
• 適合地方／城市環境：${dim.outdoorEnv}
• 適合室內辦公／居住環境：${dim.indoorEnv}
• 適合視覺與形狀：${dim.shapes}

==================================================
四、 適合工作環境與行業方向
==================================================
• 較適合${pronoun}的工作環境：${dim.workEnvironment}
• 可優先考慮行業：${dim.industries}
• 適合崗位：${dim.roles}
• 較少建議工作類型：${dim.avoidWorkType}

==================================================
五、 事業方向與收入模式（基於【${strengthLabel}型】特質轉化）
==================================================
• 工作型態：${bizPattern.workType}
• 事業方向：${bizPattern.careerDirection}
• 財運方向（${pronoun}的收入模式）：${bizPattern.wealthMode}
• 創業取向：${bizPattern.entrepreneurshipFit}
• 財務避坑重點：${bizPattern.riskWarning}

==================================================
六、 人際關係與合作模式（基於【${strengthLabel}型】特質轉化）
==================================================
• 適合合作的人：八字帶有${pronoun}【${primaryHelper}】能量充沛的人。
• 適合的合作模式：${bizPattern.cooperationMode}
• ${pronoun}的合作優勢：${bizPattern.cooperationAdvantage}
• 容易相處的人（性格）：${dim.partnerPersonality}
• 適合合作夥伴類型：${dim.partnerType}
• 較容易出現衝突的類型：八字滿盤皆是${pronoun}【${dim.primaryAvoid}】、性格極端相剋的人。

==================================================
七、 一頁式「我的五行行動指南」（HK$128 核心精華濃縮）
==================================================
• 對${pronoun}較有幫助的元素：【${primaryHelper}】
• 不宜過多的元素：【${dim.primaryAvoid}】
• 生活色彩優先：${cleanColors}
• 少用顏色：${cleanAvoidColors}
• 工作方位：${cleanDirections}
• 環境特質：${cleanEnv}
• 適合工作特點：${dim.workEnvironment}
• 收入模式：${bizPattern.wealthMode}
• 合作夥伴特點：${dim.partnerType}

✦ 給${pronoun}的 3 項實際生活落地建議：
1. 工作位置優先朝向【${cleanDirections.split('、')[0]}】，善用有利氣場，提升專注力與工作決策效率。
2. 日常生活與辦公環境中多引入【${cleanColors}】，優化空間氣質，增強有利五行能量支持。
3. 推進業務合作與尋求合夥諮詢時，優先尋找具備【${primaryHelper}】屬性之專業夥伴，發揮互補協同效應。

--------------------------------------------------
*分析參考：傳統子平八字典籍及五行理論，經整理後轉換成現代生活及工作建議。*

✦ 探尋更深層的人生藍圖與流年機遇：
💼 事業／財運・未來 3 年深度解讀 (HK$ 188)：https://tingmanshan.com/services/career-wealth
💖 感情／姻緣・未來 3 年正緣解析 (HK$ 188)：https://tingmanshan.com/services/love-marriage
🧭 八字人生導航・未來 3 年全覽手冊 (HK$ 588)：https://tingmanshan.com/services/life-navigator
🗓 十二流月吉凶＋重大決策矩陣 (HK$ 488)：https://tingmanshan.com/services/monthly-calendar
🍵 丁蔓山大師 · 1對1 八字命理深度諮詢 (HK$ 4,800)：https://tingmanshan.com/services/master-consultation
`;
}
