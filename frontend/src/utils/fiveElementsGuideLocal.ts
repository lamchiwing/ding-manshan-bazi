/**
 * Client-Side Local Five Elements Guide Report Generator
 * 100% Dynamic Quantitative 100-Point Model + 6 Element DataBasic Matrix
 */

const BRANCH_HIDDEN_ELEMENTS: Record<string, [string, string][]> = {
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

const STEM_ELEMENT_MAP: Record<string, string> = {
  甲: "木", 乙: "木",
  丙: "火", 丁: "火",
  戊: "乾土", 己: "濕土",
  庚: "金", 辛: "金",
  壬: "水", 癸: "水"
};

const DAY_MASTER_QUOTES: Record<string, { dts: string; qtbj: string; zpzq: string }> = {
  甲: {
    dts: "甲木參天，脫胎要火，春不容金，秋不容土，火熾乘龍，水蕩騎虎，地潤天和，植立千古。",
    qtbj: "甲木生春，木旺宜火秀；生秋金旺，喜火制金。四時配合，皆取中和為美。",
    zpzq: "八字用神專求月令，甲生寅卯，木旺乘權，順生而化，富貴自顯。"
  },
  乙: {
    dts: "乙木雖柔，刲羊解牛，懷丁抱丙，跨鳳乘猴，虛濕之地，騎馬亦憂，藤蘿系甲，可春可秋。",
    qtbj: "乙木如卉木，春喜向陽，夏喜潤澤，秋喜火煉金，冬喜向陽暖土。",
    zpzq: "乙木用神，隨月而取，印綬生身，食傷吐秀，隨格成局。"
  },
  丙: {
    dts: "丙火猛烈，欺霜侮雪，能煆庚金，逢辛反怯，土眾成慈，水猖顯節，虎馬犬鄉，甲來焚滅。",
    qtbj: "丙為太陽之火，春令溫暖，夏令太燥，秋令柔和，冬令喜生扶以溫木。",
    zpzq: "八字用神專求月令，丙火生於春月，木火通明；生於夏令，水濟為貴。"
  },
  丁: {
    dts: "丁火柔中，內性昭融，抱乙而孝，合壬而化，旺而不烈，衰而不窮，如有嫡母，可秋可冬。",
    qtbj: "丁火昭融，喜甲木生扶，庚金劈甲引丁。四時無不相宜。",
    zpzq: "丁火用神，隨氣推移，木生火旺，金水相停，格成富貴。"
  },
  戊: {
    dts: "戊土固重，既中且正，靜翕動闢，萬物司合，水旺物生，火燥喜潤，若在坤艮，怕沖宜靜。",
    qtbj: "戊土城牆之土，春藉火以暖，夏喜水潤，秋喜金水相涵，冬喜火溫。",
    zpzq: "八字用神專求月令，戊土厚重，水火既濟，造化得中，貴不可言。"
  },
  己: {
    dts: "己土卑濕，中正蓄藏，不愁木盛，不畏水狂，火少火晦，金多金光，若要物旺，宜助宜幫。",
    qtbj: "己土田園之土，生春喜丙火，生夏喜癸水，生秋冬喜暖以培養。",
    zpzq: "己土柔和，隨令立格，生化有情，福澤綿長。"
  },
  庚: {
    dts: "庚金帶殺，剛健為最，得水而清，得火而銳，土潤則生，土乾則脆，能贏甲兄，輸於乙妹。",
    qtbj: "庚金剛健，喜丁火煆煉以成器，喜甲木引火，喜壬水淘洗。",
    zpzq: "庚金用神，月令真機，火煉秋金，水清冬骨，格有清奇。"
  },
  辛: {
    dts: "辛金軟弱，溫潤而清，畏土之疊，樂水之盈，能扶社稷，能救生靈，熱則喜母，寒則喜丁。",
    qtbj: "辛金珠玉之質，最愛壬水淘洗，清白照人，不喜厚土埋沒。",
    zpzq: "辛金取格，以清貴為上，食傷洩秀，財星相映，富貴自然。"
  },
  壬: {
    dts: "壬水通河，能洩金氣，剛中之德，周流不滯，通根癸水，沖天奔地，化則有情，從則相濟。",
    qtbj: "壬水汪洋，春喜土止，夏喜金生，秋喜流動，冬喜火暖以發其生機。",
    zpzq: "壬水天河，得位逢生，格局清純，智勇雙全。"
  },
  癸: {
    dts: "癸水至弱，達於津涯，得龍而運，功化斯神，不愁火土，不論庚辛，合戊見火，化象斯真。",
    qtbj: "癸水雨露之水，春潤萬物，夏澤旱苗，秋承金秀，冬化甘霜，最喜清透。",
    zpzq: "癸水純陰，潤澤四方，格局合和，大智若愚。"
  }
};

const LIFESTYLE_DIMENSIONS: Record<string, any> = {
  木: {
    helper: "木、水",
    avoid: "金、燥火",
    traits: "生長、發展、創意、規劃。重視長期發展、學習和進步，通常較適合由零開始建立事情，逐步培養客戶、品牌、團隊或專業能力。思考較著重未來方向及發展空間。",
    colors: "翠綠、青綠、森林綠、橄欖綠、原木色、竹青；綠色系、青綠色系、木色系。",
    avoidColors: "大面積銀白、金屬色、金黃色。",
    shapes: "長方形、長條形、向上延伸形、葉片形、自然曲線。",
    industries: "文化教育、創意設計、品牌策劃、傳播出版、環保綠色、醫療健康、高端諮詢。",
    roles: "策劃、品牌管理、產品研發、內容創作、教育培訓、組織規劃。",
    directions: "東面、東南面。",
    avoidDirections: "西面、西北面。",
    environment: "綠意充足、自然舒適、採光良好、富文化氣息之溫潤木質空間。",
    partner: "清爽、自然、有朝氣，重視理念與共同成長，性格溫暖且具責任感的人。"
  },
  火: {
    helper: "火、木",
    avoid: "水、濕土",
    traits: "熱情、表達、傳播、影響力。思維敏捷，極具表現力與感召力，擅長打造公眾形象、品牌行銷與人際連接。行動迅速，追求明朗果斷之決策。",
    colors: "暖紅、珊瑚橘、朱紅、粉紅、暖紫、活力橙；紅色系、橙色系、暖色系。",
    avoidColors: "大面積深黑、冷藍、灰黑。",
    shapes: "三角形、菱形、放射形、尖角多邊形、向上升騰形。",
    industries: "能源科技、傳媒影視、演藝公關、數字行銷、互聯網、餐飲文創、品牌傳播。",
    roles: "演講傳播、商務拓展、市場行銷、創意總監、公關發言人、活動統籌。",
    directions: "正南面、東南面。",
    avoidDirections: "正北面。",
    environment: "光線明亮、熱鬧繁華、動線流暢、充滿活力與藝術氣息之空間。",
    partner: "熱情直率、思維活躍、富有感染力，願意分享且積極進取的人。"
  },
  乾土: {
    helper: "火、乾土",
    avoid: "濕木、旺水",
    traits: "穩重、厚道、誠信、承載力。原則性強，具備強大包容力與資產管理定力，擅長穩扎穩打、制度建設與中長線實體經營。",
    colors: "暖駝、米黃、暖啡、沙色、赭石色、焦糖色；大地色系。",
    avoidColors: "大面積墨黑、深綠、濃藍。",
    shapes: "厚實正方形、梯形、寬厚長方、平頂多邊形。",
    industries: "房地產、基建工程、倉儲物流、實體製造、資產託管、農業礦產。",
    roles: "運營總監、資產管理、風險控制、項目監理、供應鏈負責人。",
    directions: "西南面、東北面。",
    avoidDirections: "正東面。",
    environment: "沉穩扎實、方正大器、溫馨厚實之大地色調開闊空間。",
    partner: "誠信守諾、沉穩可靠、注重長遠安定與信用的合作夥伴。"
  },
  濕土: {
    helper: "火、乾土",
    avoid: "水、木",
    traits: "包容、蓄藏、滋養、潤化。擅長在複雜環境中調和多方利益，善於沉澱資源與細水長流式的經營。",
    colors: "米黃、淺褐、灰泥色、燕麥色、藕荷色。",
    avoidColors: "大面積純黑、深青。",
    shapes: "圓潤平緩、飽滿厚實形。",
    industries: "自然保育、農業生技、生態園區、醫養護理、社工慈善。",
    roles: "人力資源、行政統籌、資產託管、後勤保障。",
    directions: "東北面、東南面。",
    avoidDirections: "正西面。",
    environment: "溫暖乾燥、通風採光良好、整潔不潮濕之空間。",
    partner: "性格溫和、細緻耐心、善於協調溝通的搭檔。"
  },
  金: {
    helper: "金、土",
    avoid: "火、燥熱",
    traits: "規則、精準、效率、果斷。界線分明，注重制度、流程與執行力，具備卓越的分析決策能力與風險控制力。",
    colors: "銀白、亮金、乳白、香檳金、金屬灰、雪白；白色系、金屬色系。",
    avoidColors: "大面積大紅、亮橙、艷紫。",
    shapes: "圓形、半圓形、金屬多邊形、嚴整幾何形。",
    industries: "金融投資、法務審計、精密工程、高新硬科技、機械製造、管理諮詢。",
    roles: "財務總監、法務合規、首席風控、技術架構師、高級管理。",
    directions: "正西面、西北面。",
    avoidDirections: "正南面。",
    environment: "整齊俐落、現代簡約、高科技感、明亮開揚之秩序空間。",
    partner: "重諾守信、講求效率、講道理且邊界清晰的成熟夥伴。"
  },
  水: {
    helper: "水、金",
    avoid: "燥土、燥火",
    traits: "智慧、流動、適應、靈活。極具市場敏銳度與資訊整合力，善於應變與跨界連接，追求自由與國際化視野。",
    colors: "純黑、深藍、藏青、海藍、墨色、霧灰；深色冷系。",
    avoidColors: "大面積土黃、磚紅、焦糖棕。",
    shapes: "波浪形、水滴形、流線形、動態曲線。",
    industries: "跨國貿易、國際物流、軟體數據、互聯網平臺、傳播諮詢、航運旅遊。",
    roles: "海外拓展、數據分析、商務外交、策略顧問、貿易採購。",
    directions: "正北面、西北面。",
    avoidDirections: "西南面、正南面。",
    environment: "視野開闊、親水近景、通風靈活、富有現代動態感之空間。",
    partner: "反應敏銳、思維靈活、消息靈通且視野開闊的搭檔。"
  }
};

export function generateLocalFiveElementsReport(
  baziData: any,
  birthDate: string = "1990-05-20",
  birthTime: string = "22:00",
  gender: string = "male"
): string {
  const genderLabel = gender === "male" ? "乾造（男）" : "坤造（女）";
  const p = baziData?.pillars || {};

  const yStem = p?.year?.stem || "甲";
  const yBranch = p?.year?.branch || "子";
  const mStem = p?.month?.stem || "丙";
  const mBranch = p?.month?.branch || "寅";
  const dStem = p?.day?.stem || "戊";
  const dBranch = p?.day?.branch || "午";
  const hStem = p?.hour?.stem || "壬";
  const hBranch = p?.hour?.branch || "戌";

  const yGz = `${yStem}${yBranch}`;
  const mGz = `${mStem}${mBranch}`;
  const dGz = `${dStem}${dBranch}`;
  const hGz = `${hStem}${hBranch}`;

  // 1. Calculate 100-point score dynamically
  const scores: Record<string, number> = {
    木: 0.0,
    火: 0.0,
    乾土: 0.0,
    濕土: 0.0,
    金: 0.0,
    水: 0.0
  };

  // Stems (36 pts)
  scores[STEM_ELEMENT_MAP[yStem] || "木"] += 8.0;
  scores[STEM_ELEMENT_MAP[mStem] || "火"] += 10.0;
  scores[STEM_ELEMENT_MAP[dStem] || "火"] += 10.0;
  scores[STEM_ELEMENT_MAP[hStem] || "水"] += 8.0;

  // Branches (64 pts)
  const assignBranch = (branch: string, total: number, mode: string) => {
    const list = BRANCH_HIDDEN_ELEMENTS[branch] || [["木", "本氣"]];
    if (list.length === 1) {
      scores[list[0][0]] += total;
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
  const strengthLabel = isStrong ? "【身強型】" : "【身弱型】";

  // Determine helper elements (喜用神)
  let primaryHelper = "金";
  let helperDesc = "";
  let avoidDesc = "";

  if (dElem === "火") {
    if (isStrong) {
      primaryHelper = "金";
      helperDesc = "金、濕土、水（原局木火太旺，喜金以制木、喜土以洩火、喜水以調候）";
      avoidDesc = "木、火（原局木火已過旺，日常中不宜過度堆疊）";
    } else {
      primaryHelper = "木";
      helperDesc = "木、火（原局火勢不足，喜木印生身、丙丁火比劫扶持）";
      avoidDesc = "水、濕土（克洩交加，不宜過多）";
    }
  } else if (dElem === "木") {
    if (isStrong) {
      primaryHelper = "金";
      helperDesc = "金、火、乾土（身強宜削克洩秀）";
      avoidDesc = "水、木（不宜過盛）";
    } else {
      primaryHelper = "水";
      helperDesc = "水、木（身弱宜生助）";
      avoidDesc = "金、土";
    }
  } else if (dElem === "乾土" || dElem === "濕土") {
    if (isStrong) {
      primaryHelper = "金";
      helperDesc = "金、水、木（身強喜洩秀生財、官殺疏土）";
      avoidDesc = "火、土";
    } else {
      primaryHelper = "火";
      helperDesc = "火、乾土（身弱喜印綬化生、比劫厚基）";
      avoidDesc = "水、木";
    }
  } else if (dElem === "金") {
    if (isStrong) {
      primaryHelper = "水";
      helperDesc = "水、木、火（身強喜金水相涵、火煉成器）";
      avoidDesc = "土、金";
    } else {
      primaryHelper = "乾土";
      helperDesc = "土、金（身弱喜土生金助）";
      avoidDesc = "火、水";
    }
  } else { // 水
    if (isStrong) {
      primaryHelper = "木";
      helperDesc = "木、火、乾土（身強喜木洩水氣、火暖調候、土防泛濫）";
      avoidDesc = "金、水";
    } else {
      primaryHelper = "金";
      helperDesc = "金、水（身弱喜金生水源、比劫相扶）";
      avoidDesc = "土、火";
    }
  }

  const dim = LIFESTYLE_DIMENSIONS[primaryHelper] || LIFESTYLE_DIMENSIONS["金"];
  const quotes = DAY_MASTER_QUOTES[dStem] || DAY_MASTER_QUOTES["丙"];

  return `# 丁｜蔓山 命理誌 · TingManShan.com
【五行生活指南 · 專屬個人開運全覽】

檔案編號：TMS-${birthDate.replace(/-/g, "")}
命造信息：${birthDate} ${birthTime} · ${genderLabel}
四柱格局：${yGz}年 · ${mGz}月 · ${dGz}日 · ${hGz}時

命局古籍定論：
依《滴天髓》云：「${quotes.dts}」
《窮通寶鑒》定論：「${quotes.qtbj}」
《子平真詮》指引：「${quotes.zpzq}」本局首重以【${primaryHelper}】為對你較有幫助之元素。

==================================================
一、 八字五行量化強弱分析（100分制 DataBasic 專利模型）
==================================================
• 天干（共36分）：年干8分、月干10分、日干10分、時干8分。
• 地支（共64分）：月令28分（本氣/中氣/餘氣權重）、日支16分、年支10分、時支10分。
• 六類五行量化精準得分：
  - 木：${scores["木"].toFixed(1)} 分
  - 火：${scores["火"].toFixed(1)} 分
  - 乾土（戌、未）：${scores["乾土"].toFixed(1)} 分
  - 濕土（辰、丑）：${scores["濕土"].toFixed(1)} 分
  - 金：${scores["金"].toFixed(1)} 分
  - 水：${scores["水"].toFixed(1)} 分
• 同黨得分（日主及生我之印星）：${sameScore.toFixed(1)} 分 ➜ 判定為 ${strengthLabel}（≥50分為身強，<50分為身弱）。

==================================================
二、 五行決策要素（客觀商業視角）
==================================================
【對你較有幫助的元素】：${helperDesc}
【不宜過多的元素】：${avoidDesc}

==================================================
三、 核心五行生活場景轉換（主力元素：${primaryHelper}）
==================================================
1. 個人特性：
${dim.traits}

2. 色彩調和方案：
• 適合顏色：${dim.colors}
• 少用顏色：${dim.avoidColors}

3. 形狀與視覺：
• 適合形狀：${dim.shapes}

==================================================
四、 事業、財富與空間環境規劃
==================================================
1. 行業與崗位：
• 適合行業：${dim.industries}
• 適合崗位：${dim.roles}

2. 方位配置：
• 有利方向：${dim.directions}
• 較少使用方向：${dim.avoidDirections}

3. 空間環境氣場：
${dim.environment}

==================================================
五、 人際關係與貴人協作矩陣
==================================================
• 適合夥伴類型：${dim.partner}

==================================================
六、 一頁式「我的五行行動指南」（HK$128 核心精華濃縮）
==================================================
• 對妳較有幫助的元素：${primaryHelper}
• 建議方位：${dim.directions}
• 生活色彩優先：${dim.colors}
• 空間氣質：${dim.environment}

✦ 給您的 3 項實際生活落地建議：
1. 日常環境中多引入【${dim.colors}】，加強有利五行氣場。
2. 重要工作桌或辦公方向優先面向【${dim.directions}】，提升專注力與工作決策效率。
3. 尋求事業合作或諮詢時，優先尋找具備【${primaryHelper}】屬性之專業人士與搭檔。

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
