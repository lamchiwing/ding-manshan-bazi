import os
import subprocess

print("==================================================")
print("🚀 開始部署十二流月運程＋重大決策 (HK$488) ...")
print("==================================================")

# 1. 寫入 Supabase SQL Schema
supabase_sql = '''-- ==============================================================================
-- 十二流月運程＋重大決策 (HK$488 個人化決策版) - Supabase 資料庫架構
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.bazi_twelve_months_decision_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    decision_key VARCHAR(50) UNIQUE NOT NULL,
    decision_name VARCHAR(100) NOT NULL,
    core_gods VARCHAR(100) NOT NULL,
    favorable_conditions TEXT NOT NULL,
    caution_conditions TEXT NOT NULL,
    recommendation_logic TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.bazi_twelve_months_decision_configs 
(decision_key, decision_name, core_gods, favorable_conditions, caution_conditions, recommendation_logic)
VALUES
('job_change', '轉工／轉跑道', '正官、七殺、正印、偏印、驛馬', '官印相生、天干合官或地支驛馬逢吉時', '傷官見官、官殺混雜或地支劇烈逢沖時', '依官殺印星之氣數評估，身旺逢官殺得位最宜主動出擊，身弱逢官殺則需先備妥退路。'),
('promotion', '升職／爭取新職位', '正官、正印、祿神', '歲月逢印綬相生、官星得地、考核主管星臨門', '官星受傷、比劫爭官爭功之月', '把握印官相照之月主動承攬核心專案，確立不可替代之權限。'),
('entrepreneurship', '創業／開始新項目', '食神、傷官、偏財', '食傷生財、財星有庫、大局生旺之月', '比劫爭財、空亡、破財煞透出之月', '食傷引導商業創新，重視第一期現金流回本週期，避開資金緊縮月份。'),
('expansion', '擴張／開新市場', '偏財、七殺、驛馬', '偏財透干、七殺化印、外拓能量鼎盛之月', '歲破動盪、伏吟停滯、市場能量萎縮之月', '順應驛馬外向能量開闢邊疆，鎖定高毛利賽道。'),
('investment', '投資／重大財務決定', '正財、偏財、食神', '財星合命、庫位開啟、穩健現金流支撐之時', '劫財分奪、梟神奪食、投機偏財受損之月', '以價值投資為基石，防範高槓桿盲動，於財星入庫月鎖定利潤。'),
('marriage', '結婚／訂婚', '正官（女）、正財（男）、天喜、紅鸞、六合', '夫妻宮逢六合、喜用星臨月、桃花合入主位', '夫妻宮逢劇烈刑沖、自刑或孤辰寡宿加會', '選取天地和合、生旺夫妻宮之吉月締結良緣，避開刑沖口舌波段。'),
('breakup', '分手／結束一段關係', '傷官、七殺、比劫', '氣場沉澱、理智回歸、印星護身化解恩怨之時', '激化相剋、羊刃交加的情緒失控之月', '以長遠人生清淨為目標，平和協議劃定界限，避免在情緒極端時撕破臉。'),
('relocation', '搬屋／搬遷', '驛馬、印星、地支合相', '驛馬得生、印星生旺象徵居所安穩之月', '坐向相沖、太歲臨門或三煞破宅之月', '擇生旺印星與日支和合之月安宅進伙，以聚氣安神。'),
('immigration', '移民／海外發展', '驛馬、偏印、水木長生', '驛馬遠行星動、天干透偏印開拓新界之月', '困頓閉塞、逢墓絕之地或出行逢沖受阻之月', '借助外向驛馬氣機辦理簽證與移居手續，順勢融入新環境。'),
('partnership', '合夥／加入新合作', '比肩、食神、正印', '比肩生食神、互通資源且權責協議清晰之月', '比劫奪財、相害相刑、利益分配模糊之月', '合作前務必白紙黑字立約，於彼此五行互補、互利共贏之時入局。')
ON CONFLICT (decision_key) DO UPDATE
SET favorable_conditions = EXCLUDED.favorable_conditions,
    caution_conditions = EXCLUDED.caution_conditions,
    recommendation_logic = EXCLUDED.recommendation_logic;

CREATE TABLE IF NOT EXISTS public.bazi_twelve_months_decisions_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id VARCHAR(100),
    user_birth_date VARCHAR(50) NOT NULL,
    user_birth_time VARCHAR(20) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    selected_decisions JSONB NOT NULL,
    plan_status VARCHAR(50) DEFAULT '正在考慮',
    expected_timing VARCHAR(50) DEFAULT '未確定',
    annual_theme VARCHAR(200),
    report_data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
'''

with open("backend/supabase_twelve_months_decisions_schema.sql", "w", encoding="utf-8") as f:
    f.write(supabase_sql)
print("✓ [1/7] backend/supabase_twelve_months_decisions_schema.sql 寫入完成！")

# 2. 寫入後端 Python 引擎十二流月重大決策演算法
engine_py = '''from typing import Dict, Any, List, Optional

STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

STEM_ELEMENT = {
    "甲": "木", "乙": "木", "丙": "火", "丁": "火", "戊": "土",
    "己": "土", "庚": "金", "辛": "金", "壬": "水", "癸": "水"
}

BRANCH_ELEMENT = {
    "子": "水", "丑": "土", "寅": "木", "卯": "木", "辰": "土", "巳": "火",
    "午": "火", "未": "土", "申": "金", "酉": "金", "戌": "土", "亥": "水"
}

GENERATING_ELEMENT = {"木": "火", "火": "土", "土": "金", "金": "水", "水": "木"}
CONTROLLED_ELEMENT = {"木": "土", "土": "水", "水": "火", "火": "金", "金": "木"}
CONTROLLING_ELEMENT = {"木": "金", "火": "水", "土": "木", "金": "火", "水": "土"}

SIX_HARMONIES = {
    "子": "丑", "丑": "子", "寅": "亥", "亥": "寅", "卯": "戌", "戌": "卯",
    "辰": "酉", "酉": "辰", "巳": "申", "申": "巳", "午": "未", "未": "午"
}

SIX_CLASHES = {
    "子": "午", "午": "子", "丑": "未", "未": "丑", "寅": "申", "申": "寅",
    "卯": "酉", "酉": "卯", "辰": "戌", "戌": "辰", "巳": "亥", "亥": "巳"
}

STEM_COMBINATIONS = {
    "甲": "己", "己": "甲", "乙": "庚", "庚": "乙", "丙": "辛", "辛": "丙",
    "丁": "壬", "壬": "丁", "戊": "癸", "癸": "戊"
}

SOLAR_TERM_NAMES = [
    "立春～驚蟄", "驚蟄～清明", "清明～立夏", "立夏～芒種",
    "芒種～小暑", "小暑～立秋", "立秋～白露", "白露～寒露",
    "寒露～立冬", "立冬～大雪", "大雪～小寒", "小寒～立春"
]

ANNUAL_THEME_CATALOG = {
    "甲": {
        "title": "食神吐秀 · 專業立身與商機轉化",
        "desc": "未來12個月正逢丙火食神照耀，木火相生，象徵深層專業智慧與獨創想法轉化為實質商機的黃金週期。適合聚焦個人核心專長、研發拳頭產品或建立不可替代的專業壁壘，以才智生財。"
    },
    "乙": {
        "title": "傷官生財 · 破格創新與品牌聲譽躍升",
        "desc": "未來12個月靈感奔湧、表達力極強，是打破常規思維、進行商業破局與品牌對外傳播的高光年份。適合大膽跨界拓展、經營個人IP或爭取舞台聚光燈，但需留意職場口舌與合約嚴謹度。"
    },
    "丙": {
        "title": "比肩聚力 · 賽道重塑與強強聯合",
        "desc": "未來12個月自主魄力與前進動能極為充沛，是告別被動等待、主動召集優質合夥人並肩開拓新天地的進取之年。需強化利潤分配機制與團隊授權，避免單打獨鬥或比劫爭奪。"
    },
    "丁": {
        "title": "借勢騰飛 · 平台賦能與借力破局",
        "desc": "未來12個月歲君丙火光芒普照，適合借大平台之勢、傍強者之光，透過借力打力完成階層與業務躍升。需明確界定自身不可替代的深耕價值，防範成果遭同僚稀釋。"
    },
    "戊": {
        "title": "厚積薄發 · 專精技術與資產奠基",
        "desc": "未來12個月丙火烈烈生旺戊土，思維轉向深邃宏觀，是考取高門檻資質、沉澱獨門技術、深耕重資產或調整組織架構的沉潛積蓄之年。適合以靜制動，練好內功。"
    },
    "己": {
        "title": "正印護身 · 權柄歸心與制度信任確立",
        "desc": "未來12個月得歲君正印庇佑，長輩、官方或高層貴人暗中相扶，有利於在大型組織或核心機構中取得關鍵信任、確立正式管轄權限。凡事循規蹈矩，必能水到渠成。"
    },
    "庚": {
        "title": "七殺淬煉 · 逆境突破與開闢疆土",
        "desc": "火旺煉金，未來12個月是命主跳脫舒適圈、迎面接下高難度攻堅任務的英雄之年。壓力與機遇並存，每一次重大考驗都是權力擴張的墊腳石，極易在危機中脫穎而出。"
    },
    "辛": {
        "title": "正官合身 · 體制晉升與名望階梯確立",
        "desc": "未來12個月天干逢丙辛相合，官星來合我，象徵名正言順的晉升任命、跨部門主導權或與權威機構建立長期合約。利於走體制、晉級考評及確立不可撼動的行業名位。"
    },
    "壬": {
        "title": "偏財宏圖 · 資本運作與資源槓桿放大",
        "desc": "水火既濟，丙火偏財萬丈光芒，未來12個月對市場機會與商業脈搏極具嗅覺，適合大膽進行商業談判、股權投資、大宗交易或副業裂變。注意鎖定階段利潤，防範過度擴張。"
    },
    "癸": {
        "title": "正財潤局 · 業務深耕與現金流穩健擴增",
        "desc": "雨露得日光照耀，未來12個月財源脈絡清晰，主要收入、諮詢收益或商業訂單呈現持續攀升趨勢。適合深耕高價值付費用戶、打磨高毛利產品，將流量穩穩轉化為真金白銀。"
    }
}

DECISION_CONFIG_MAP = {
    "轉工／轉跑道": {
        "key": "job_change",
        "name": "轉工／轉跑道",
        "icon": "💼",
        "target_gods": ["正官", "七殺", "正印", "偏印"],
        "favorable_desc": "體制貴人相照，職位躍遷與薪資談判勝率顯著提高",
        "caution_desc": "月逢官殺相混或地支見沖，防承諾落空或新環境人事複雜"
    },
    "升職／爭取新職位": {
        "key": "promotion",
        "name": "升職／爭取新職位",
        "icon": "🎖️",
        "target_gods": ["正官", "正印", "比肩"],
        "favorable_desc": "印官相生，個人權威與管轄權利獲核心高層正式確立",
        "caution_desc": "比劫爭位或官星受制，爭奪激烈需低調蓄力防止被借題發揮"
    },
    "創業／開始新項目": {
        "key": "entrepreneurship",
        "name": "創業／開始新項目",
        "icon": "🚀",
        "target_gods": ["食神", "傷官", "偏財"],
        "favorable_desc": "才智與市場需求共鳴，利於輕資產破局與建立第一曲線",
        "caution_desc": "逢比劫奪財，資金鏈容易承壓，切忌盲目擴大初期固定開銷"
    },
    "擴張／開新市場": {
        "key": "expansion",
        "name": "擴張／開新市場",
        "icon": "🌍",
        "target_gods": ["偏財", "七殺", "傷官"],
        "favorable_desc": "外拓氣場高漲，利於跨區域合作、大客戶開發或裂變新渠道",
        "caution_desc": "市場節奏過熱或管理半徑過寬，易造成後端運維失衡"
    },
    "投資／重大財務決定": {
        "key": "investment",
        "name": "投資／重大財務決定",
        "icon": "💰",
        "target_gods": ["正財", "偏財", "食神"],
        "favorable_desc": "財源穩固有庫，適合佈局核心優質資產與中長線價值配置",
        "caution_desc": "偏印奪食或劫財耗損，高槓桿投機項目極易產生流動性陷阱"
    },
    "結婚／訂婚": {
        "key": "marriage",
        "name": "結婚／訂婚",
        "icon": "💍",
        "target_gods": ["正官", "正財", "六合"],
        "favorable_desc": "夫妻宮氣場和合，雙方家庭共識凝聚，締結良緣水到渠成",
        "caution_desc": "夫妻宮逢沖或情緒浮動，商討婚俗或瑣事宜包容退讓"
    },
    "分手／結束一段關係": {
        "key": "breakup",
        "name": "分手／結束一段關係",
        "icon": "🕊️",
        "target_gods": ["傷官", "七殺", "偏印"],
        "favorable_desc": "理智清明，利於和平劃定界限、解開彼此精神牽絆與財務切割",
        "caution_desc": "心境極端動盪之時容易口出惡言或激化矛盾，宜冷靜協商"
    },
    "搬屋／搬遷": {
        "key": "relocation",
        "name": "搬屋／搬遷",
        "icon": "🏠",
        "target_gods": ["正印", "偏印", "驛馬"],
        "favorable_desc": "驛馬吉神得生，新居藏風聚氣，能帶動健康與家庭人際提升",
        "caution_desc": "地支動盪逢破，搬遷過程中易有物品損毀或合約產權口舌"
    },
    "移民／海外發展": {
        "key": "immigration",
        "name": "移民／海外發展",
        "icon": "✈️",
        "target_gods": ["偏印", "七殺", "偏財"],
        "favorable_desc": "遠行大運臨門，跨國跨文化適應力強，利於落實簽證與定居手續",
        "caution_desc": "政策或文件流程易生延宕，需預留彈性預備期並核實手續"
    },
    "合夥／加入新合作": {
        "key": "partnership",
        "name": "合夥／加入新合作",
        "icon": "🤝",
        "target_gods": ["比肩", "正印", "食神"],
        "favorable_desc": "優勢互補、資源互通，利於以清晰股權架構達成雙贏成果",
        "caution_desc": "比劫奪財之月，權責邊界不清或財務記賬模糊最易埋下隱患"
    }
}

def get_ten_god(day_stem: str, target_stem: str) -> str:
    day_elem = STEM_ELEMENT.get(day_stem, "木")
    target_elem = STEM_ELEMENT.get(target_stem, "木")
    is_same = (STEMS.index(day_stem) % 2) == (STEMS.index(target_stem) % 2)

    if day_elem == target_elem:
        return "比肩" if is_same else "劫財"
    if GENERATING_ELEMENT.get(day_elem) == target_elem:
        return "食神" if is_same else "傷官"
    if CONTROLLED_ELEMENT.get(day_elem) == target_elem:
        return "偏財" if is_same else "正財"
    if CONTROLLING_ELEMENT.get(day_elem) == target_elem:
        return "七殺" if is_same else "正官"
    return "偏印" if is_same else "正印"

def generate_twelve_months_decisions_report(
    bazi: Dict[str, Any],
    selected_decisions: List[str],
    plan_status: str = "正在考慮",
    expected_timing: str = "未確定"
) -> Dict[str, Any]:
    sanitized_decisions = [d for d in selected_decisions if d in DECISION_CONFIG_MAP][:3]
    if not sanitized_decisions:
        sanitized_decisions = ["轉工／轉跑道"]

    day_stem = bazi.get("day_master", {}).get("stem", "甲")
    day_elem = STEM_ELEMENT.get(day_stem, "木")
    day_branch = bazi.get("pillars", {}).get("day", {}).get("branch", "子")
    month_branch = bazi.get("pillars", {}).get("month", {}).get("branch", "寅")
    dominant_elem = bazi.get("elements", {}).get("dominant_element", day_elem)

    wealth_elem = CONTROLLED_ELEMENT.get(day_elem, "土")
    officer_elem = CONTROLLING_ELEMENT.get(day_elem, "金")

    start_year = 2026
    start_month = 10
    monthly_breakdown = []

    for idx in range(12):
        total = start_year * 12 + (start_month - 1) + idx
        y = total // 12
        m = (total % 12) + 1
        period_str = f"{y}/{str(m).zfill(2)}"

        y_stem = STEMS[(y - 4) % 10]
        y_branch = BRANCHES[(y - 4) % 12]
        m_branch = BRANCHES[(m + 1) % 12]
        m_stem = STEMS[((y % 5) * 2 + m + 1) % 10]
        month_stem_branch = f"{m_stem}{m_branch}"
        ten_god = get_ten_god(day_stem, m_stem)

        is_harmony = SIX_HARMONIES.get(day_branch) == m_branch or SIX_HARMONIES.get(month_branch) == m_branch
        is_clash = SIX_CLASHES.get(day_branch) == m_branch or SIX_CLASHES.get(month_branch) == m_branch
        is_stem_combine = STEM_COMBINATIONS.get(day_stem) == m_stem

        base = 6.8
        if is_harmony: base += 1.8
        if is_stem_combine: base += 1.3
        if is_clash: base -= 2.2
        if STEM_ELEMENT.get(m_stem) in [wealth_elem, officer_elem]: base += 0.5

        pseudo_seed = (ord(day_stem[0]) * 11 + ord(m_branch[0]) * 7 + idx * 5) % 9 - 4
        score = round(max(3.8, min(9.8, base + pseudo_seed * 0.15)), 1)

        level = "平順 · 蓄力積累"
        if score >= 8.8: level = "大吉 · 乘勢進取"
        elif score >= 7.8: level = "次吉 · 穩步上升"
        elif score <= 5.2: level = "守成 · 防守為先"

        monthly_breakdown.append({
            "month_index": idx + 1,
            "period": period_str,
            "lunar_range": SOLAR_TERM_NAMES[idx % 12],
            "year_stem_branch": f"{y_stem}{y_branch}",
            "month_stem_branch": month_stem_branch,
            "ten_god": ten_god,
            "score": score,
            "level": level,
            "is_clash": is_clash,
            "is_harmony": is_harmony,
            "is_stem_combine": is_stem_combine
        })

    theme_info = ANNUAL_THEME_CATALOG.get(day_stem, ANNUAL_THEME_CATALOG["甲"])

    decision_reports = []
    for dec_name in sanitized_decisions:
        cfg = DECISION_CONFIG_MAP[dec_name]
        target_gods = cfg["target_gods"]

        scored_months = []
        for m in monthly_breakdown:
            match_score = m["score"]
            if m["ten_god"] in target_gods:
                match_score += 1.2
            if m["is_harmony"] or m["is_stem_combine"]:
                match_score += 0.8
            if m["is_clash"]:
                match_score -= 1.8
            scored_months.append((match_score, m))

        scored_months.sort(key=lambda x: x[0], reverse=True)
        best_month_item = scored_months[0][1]
        secondary_month_item = scored_months[1][1] if len(scored_months) > 1 else scored_months[0][1]
        caution_month_item = min(monthly_breakdown, key=lambda m: (m["score"] - (3.0 if m["is_clash"] else 0)))

        avg_target_score = sum(m["score"] for m in monthly_breakdown if m["ten_god"] in target_gods) / max(1, len([m for m in monthly_breakdown if m["ten_god"] in target_gods]))
        if avg_target_score >= 7.6 or best_month_item["score"] >= 8.6:
            tendency = "較有利"
            tendency_color = "emerald"
            tendency_desc = f"流年氣場生旺【{cfg['name']}】關鍵星宿，原局受助良多，主動籌謀大有可為。"
        elif caution_month_item["is_clash"] and avg_target_score < 6.8:
            tendency = "較需審慎"
            tendency_color = "rose"
            tendency_desc = f"當前歲月干支有相沖之氣，推進過程阻力稍多，需嚴格控制邊際風險，以防守蓄力為上策。"
        else:
            tendency = "適合觀察"
            tendency_color = "amber"
            tendency_desc = f"氣候平穩，宜先進行調研摸底與前期鋪陳，待吉神到位再正式全面啟動。"

        if plan_status == "已有明確計劃":
            timing_fit_analysis = (
                f"閣下已有具體規劃（預計進行時點：{expected_timing}）。經八字流月矩陣推算，"
                f"建議將關鍵簽約、面試談判或公開發布之節點精準鎖定在【{best_month_item['period']}（{best_month_item['month_stem_branch']}月）】，"
                f"而將前期溝通或法務合約校對安排在【{secondary_month_item['period']}】。請嚴格避開【{caution_month_item['period']}】之動盪窗口。"
            )
        elif plan_status == "正在考慮":
            timing_fit_analysis = (
                f"目前處於深度權衡階段（預期窗口：{expected_timing}）。此心態極度契合命理節奏，"
                f"當前至【{secondary_month_item['period']}】為最佳沙盤推演期，可透過小步快跑驗證可行性；"
                f"若各項要素齊備，於【{best_month_item['period']}】發力推進能取得倍增效果。"
            )
        else:
            timing_fit_analysis = (
                f"目前尚未下定決心。八字建議順應時令節奏，不急於盲動承諾。"
                f"可先行關注【{best_month_item['period']}】前後出現之貴人引薦或外界契機，若信號明朗再作定奪。"
            )

        decision_reports.append({
            "decision_name": cfg["name"],
            "icon": cfg["icon"],
            "tendency": tendency,
            "tendency_color": tendency_color,
            "tendency_desc": tendency_desc,
            "best_month": f"{best_month_item['period']}（{best_month_item['month_stem_branch']}月 · {best_month_item['score']}分）",
            "best_month_stars": "★★★★★",
            "best_month_analysis": f"此月逢【{best_month_item['ten_god']}】得地，{cfg['favorable_desc']}。宜重拳出擊，落實關鍵決定。",
            "secondary_month": f"{secondary_month_item['period']}（{secondary_month_item['month_stem_branch']}月 · {secondary_month_item['score']}分）",
            "secondary_month_stars": "★★★★☆",
            "secondary_month_analysis": f"氣場漸進上揚，適合作為【{cfg['name']}】的籌備、私下接觸或小規模測試期。",
            "caution_month": f"{caution_month_item['period']}（{caution_month_item['month_stem_branch']}月 · {caution_month_item['score']}分）",
            "caution_month_stars": "★★☆☆☆",
            "caution_month_analysis": f"此月逢【{caution_month_item['ten_god']}】與原局氣場激盪，{cfg['caution_desc']}。切忌在該月做出衝動式重大承諾。",
            "timing_fit_analysis": timing_fit_analysis,
            "strategies": [
                f"【主動借力】：在【{best_month_item['period']}】善用五行喜用神方位的貴人與資源，確立主導話語權。",
                f"【風險鎖定】：避開【{caution_month_item['period']}】簽署長期硬性合約，凡事需保留二次談判退路。",
                f"【執行閉環】：落實「先謀而後動」，在【{secondary_month_item['period']}】做好資源底牌盤點。"
            ]
        })

    sorted_m = sorted(monthly_breakdown, key=lambda x: x["score"], reverse=True)
    turning_points = [
        f"第 1 階段（{monthly_breakdown[0]['period']} - {monthly_breakdown[3]['period']} · 摸底籌備期）：重點在於理清過往責任，梳理【{'、'.join(sanitized_decisions)}】所需資源。",
        f"第 2 階段（{monthly_breakdown[4]['period']} - {monthly_breakdown[7]['period']} · 決策突破期）：全年度能量峰值顯現於【{sorted_m[0]['period']}（{sorted_m[0]['score']}分）】，為推動重大決策之黃金窗口。",
        f"第 3 階段（{monthly_breakdown[8]['period']} - {monthly_breakdown[11]['period']} · 固化驗收期）：轉入成果收割，防範尾部波動，鎖定既得收益。"
    ]

    return {
        "success": True,
        "day_master": bazi.get("day_master", {}).get("display", f"{day_stem}{day_elem}"),
        "dominant_element": dominant_elem,
        "four_pillars": f"{bazi.get('pillars', {}).get('year', {}).get('gan_zhi', '')}年 / {bazi.get('pillars', {}).get('month', {}).get('gan_zhi', '')}月 / {bazi.get('pillars', {}).get('day', {}).get('gan_zhi', '')}日 / {bazi.get('pillars', {}).get('hour', {}).get('gan_zhi', '')}時",
        "annual_theme": theme_info["title"],
        "annual_theme_desc": theme_info["desc"],
        "user_input": {
            "selected_decisions": sanitized_decisions,
            "plan_status": plan_status,
            "expected_timing": expected_timing
        },
        "decision_reports": decision_reports,
        "monthly_breakdown": monthly_breakdown,
        "turning_points": turning_points
    }
'''

with open("backend/app/engine/twelve_months_decisions.py", "w", encoding="utf-8") as f:
    f.write(engine_py)
print("✓ [2/7] backend/app/engine/twelve_months_decisions.py 演算法寫入完成！")

# 3. 更新 backend/app/schemas/bazi.py
with open("backend/app/schemas/bazi.py", "r", encoding="utf-8") as f:
    schemas_code = f.read()

if "TwelveMonthsDecisionsInput" not in schemas_code:
    schemas_code += '''

class TwelveMonthsDecisionsInput(BaseModel):
    birth_date: str = Field(..., example="1990-05-20", description="YYYY-MM-DD solar calendar")
    birth_time: str = Field(..., example="21:30", description="HH:mm 24-hour format")
    gender: str = Field("male", example="male", description="'male' or 'female'")
    selected_decisions: List[str] = Field(default=["轉工／轉跑道"], description="Max 3 selected major decisions")
    plan_status: Optional[str] = Field("正在考慮", description="已有明確計劃 / 正在考慮 / 尚未決定")
    expected_timing: Optional[str] = Field("未確定", description="2026年內 / 2027年 / 1–3個月內 / 3–6個月內 / 6–12個月內 / 未確定")
'''
    with open("backend/app/schemas/bazi.py", "w", encoding="utf-8") as f:
        f.write(schemas_code)
print("✓ [3/7] backend/app/schemas/bazi.py 更新完成！")

# 4. 更新 backend/app/api/routes_bazi.py
with open("backend/app/api/routes_bazi.py", "r", encoding="utf-8") as f:
    routes_code = f.read()

if "TwelveMonthsDecisionsInput" not in routes_code:
    routes_code = routes_code.replace(
        "from app.schemas.bazi import BaziInput, AIChatInput",
        "from app.schemas.bazi import BaziInput, AIChatInput, TwelveMonthsDecisionsInput"
    )

if "/twelve-months-decisions" not in routes_code:
    routes_code += '''

@router.post("/twelve-months-decisions", response_model=Dict[str, Any])
def api_twelve_months_decisions(payload: TwelveMonthsDecisionsInput):
    """
    12 Months + Major Decisions Personalized Engine (HK$488)
    Based on Ding Manshan Metaphysics Framework.
    """
    try:
        from app.engine.twelve_months_decisions import generate_twelve_months_decisions_report
        bazi = calculate_bazi(
            birth_date_str=payload.birth_date,
            birth_time_str=payload.birth_time,
            gender=payload.gender,
            day_boundary_rule="ZI_START_NEXT_DAY"
        )
        report = generate_twelve_months_decisions_report(
            bazi=bazi,
            selected_decisions=payload.selected_decisions,
            plan_status=payload.plan_status or "正在考慮",
            expected_timing=payload.expected_timing or "未確定"
        )
        return report
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Twelve Months Decisions Error: {str(e)}")
'''
    with open("backend/app/api/routes_bazi.py", "w", encoding="utf-8") as f:
        f.write(routes_code)
print("✓ [4/7] backend/app/api/routes_bazi.py API 端點配置完成！")

# 5. 寫入前端本地引擎與 Modal (十二流月＋重大決策)
with open("frontend/src/utils/twelveMonthsDecisionsLocal.ts", "w", encoding="utf-8") as f:
    f.write('''import { calculateLocalBazi } from './baziLocalEngine';

const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

const STEM_ELEMENT: Record<string, string> = {
  "甲": "木", "乙": "木", "丙": "火", "丁": "火", "戊": "土",
  "己": "土", "庚": "金", "辛": "金", "壬": "水", "癸": "水"
};

const GENERATING_ELEMENT: Record<string, string> = {
  "木": "火", "火": "土", "土": "金", "金": "水", "水": "木"
};

const CONTROLLED_ELEMENT: Record<string, string> = {
  "木": "土", "土": "水", "水": "火", "火": "金", "金": "木"
};

const CONTROLLING_ELEMENT: Record<string, string> = {
  "木": "金", "火": "水", "土": "木", "金": "火", "水": "土"
};

const SIX_HARMONIES: Record<string, string> = {
  "子": "丑", "丑": "子", "寅": "亥", "亥": "寅", "卯": "戌", "戌": "卯",
  "辰": "酉", "酉": "辰", "巳": "申", "申": "巳", "午": "未", "未": "午"
};

const SIX_CLASHES: Record<string, string> = {
  "子": "午", "午": "子", "丑": "未", "未": "丑", "寅": "申", "申": "寅",
  "卯": "酉", "酉": "卯", "辰": "戌", "戌": "辰", "巳": "亥", "亥": "巳"
};

const STEM_COMBINATIONS: Record<string, string> = {
  "甲": "己", "己": "甲", "乙": "庚", "庚": "乙", "丙": "辛", "辛": "丙",
  "丁": "壬", "壬": "丁", "戊": "癸", "癸": "戊"
};

const SOLAR_TERM_NAMES = [
  "立春～驚蟄", "驚蟄～清明", "清明～立夏", "立夏～芒種",
  "芒種～小暑", "小暑～立秋", "立秋～白露", "白露～寒露",
  "寒露～立冬", "立冬～大雪", "大雪～小寒", "小寒～立春"
];

export const ANNUAL_THEME_CATALOG: Record<string, { title: string; desc: string }> = {
  "甲": {
    title: "食神吐秀 · 專業立身與商機轉化",
    desc: "未來12個月正逢丙火食神照耀，木火相生，象徵深層專業智慧與獨創想法轉化為實質商機的黃金週期。適合聚焦個人核心專長、研發拳頭產品或建立不可替代的專業壁壘，以才智生財。"
  },
  "乙": {
    title: "傷官生財 · 破格創新與品牌聲譽躍升",
    desc: "未來12個月靈感奔湧、表達力極強，是打破常規思維、進行商業破局與品牌對外傳播的高光年份。適合大膽跨界拓展、經營個人IP或爭取舞台聚光燈，但需留意職場口舌與合約嚴謹度。"
  },
  "丙": {
    title: "比肩聚力 · 賽道重塑與強強聯合",
    desc: "未來12個月自主魄力與前進動能極為充沛，是告別被動等待、主動召集優質合夥人並肩開拓新天地的進取之年。需強化利潤分配機制與團隊授權，避免單打獨鬥或比劫爭奪。"
  },
  "丁": {
    title: "借勢騰飛 · 平台賦能與借力破局",
    desc: "未來12個月歲君丙火光芒普照，適合借大平台之勢、傍強者之光，透過借力打力完成階層與業務躍升。需明確界定自身不可替代的深耕價值，防範成果遭同僚稀釋。"
  },
  "戊": {
    title: "厚積薄發 · 專精技術與資產奠基",
    desc: "未來12個月丙火烈烈生旺戊土，思維轉向深邃宏觀，是考取高門檻資質、沉澱獨門技術、深耕重資產或調整組織架構的沉潛積蓄之年。適合以靜制動，練好內功。"
  },
  "己": {
    title: "正印護身 · 權柄歸心與制度信任確立",
    desc: "未來12個月得歲君正印庇佑，長輩、官方或高層貴人暗中相扶，有利於在大型組織或核心機構中取得關鍵信任、確立正式管轄權限。凡事循規蹈矩，必能水到渠成。"
  },
  "庚": {
    title: "七殺淬煉 · 逆境突破與開闢疆土",
    desc: "火旺煉金，未來12個月是命主跳脫舒適圈、迎面接下高難度攻堅任務的英雄之年。壓力與機遇並存，每一次重大考驗都是權力擴張的墊腳石，極易在危機中脫穎而出。"
  },
  "辛": {
    title: "正官合身 · 體制晉升與名望階梯確立",
    desc: "未來12個月天干逢丙辛相合，官星來合我，象徵名正言順的晉升任命、跨部門主導權或與權威機構建立長期合約。利於走體制、晉級考評及確立不可撼動的行業名位。"
  },
  "壬": {
    title: "偏財宏圖 · 資本運作與資源槓桿放大",
    desc: "水火既濟，丙火偏財萬丈光芒，未來12個月對市場機會與商業脈搏極具嗅覺，適合大膽進行商業談判、股權投資、大宗交易或副業裂變。注意鎖定階段利潤，防範過度擴張。"
  },
  "癸": {
    title: "正財潤局 · 業務深耕與現金流穩健擴增",
    desc: "雨露得日光照耀，未來12個月財源脈絡清晰，主要收入、諮詢收益或商業訂單呈現持續攀升趨勢。適合深耕高價值付費用戶、打磨高毛利產品，將流量穩穩轉化為真金白銀。"
  }
};

export interface DecisionConfigItem {
  key: string;
  name: string;
  icon: string;
  targetGods: string[];
  favorableDesc: string;
  cautionDesc: string;
}

export const DECISION_CONFIG_MAP: Record<string, DecisionConfigItem> = {
  "轉工／轉跑道": {
    key: "job_change",
    name: "轉工／轉跑道",
    icon: "💼",
    targetGods: ["正官", "七殺", "正印", "偏印"],
    favorableDesc: "體制貴人相照，職位躍遷與薪資談判勝率顯著提高",
    cautionDesc: "月逢官殺相混或地支見沖，防承諾落空或新環境人事複雜"
  },
  "升職／爭取新職位": {
    key: "promotion",
    name: "升職／爭取新職位",
    icon: "🎖️",
    targetGods: ["正官", "正印", "比肩"],
    favorableDesc: "印官相生，個人權威與管轄權利獲核心高層正式確立",
    cautionDesc: "比劫爭位或官星受制，爭奪激烈需低調蓄力防止被借題發揮"
  },
  "創業／開始新項目": {
    key: "entrepreneurship",
    name: "創業／開始新項目",
    icon: "🚀",
    targetGods: ["食神", "傷官", "偏財"],
    favorableDesc: "才智與市場需求共鳴，利於輕資產破局與建立第一曲線",
    cautionDesc: "逢比劫奪財，資金鏈容易承壓，切忌盲目擴大初期固定開銷"
  },
  "擴張／開新市場": {
    key: "expansion",
    name: "擴張／開新市場",
    icon: "🌍",
    targetGods: ["偏財", "七殺", "傷官"],
    favorableDesc: "外拓氣場高漲，利於跨區域合作、大客戶開發或裂變新渠道",
    cautionDesc: "市場節奏過熱或管理半徑過寬，易造成後端運維失衡"
  },
  "投資／重大財務決定": {
    key: "investment",
    name: "投資／重大財務決定",
    icon: "💰",
    targetGods: ["正財", "偏財", "食神"],
    favorableDesc: "財源穩固有庫，適合佈局核心優質資產與中長線價值配置",
    cautionDesc: "偏印奪食或劫財耗損，高槓桿投機項目極易產生流動性陷阱"
  },
  "結婚／訂婚": {
    key: "marriage",
    name: "結婚／訂婚",
    icon: "💍",
    targetGods: ["正官", "正財", "六合"],
    favorableDesc: "夫妻宮氣場和合，雙方家庭共識凝聚，締結良緣水到渠成",
    cautionDesc: "夫妻宮逢沖或情緒浮動，商討婚俗或瑣事宜包容退讓"
  },
  "分手／結束一段關係": {
    key: "breakup",
    name: "分手／結束一段關係",
    icon: "🕊️",
    targetGods: ["傷官", "七殺", "偏印"],
    favorableDesc: "理智清明，利於和平劃定界限、解開彼此精神牽絆與財務切割",
    cautionDesc: "心境極端動盪之時容易口出惡言或激化矛盾，宜冷靜協商"
  },
  "搬屋／搬遷": {
    key: "relocation",
    name: "搬屋／搬遷",
    icon: "🏠",
    targetGods: ["正印", "偏印", "驛馬"],
    favorableDesc: "驛馬吉神得生，新居藏風聚氣，能帶動健康與家庭人際提升",
    cautionDesc: "地支動盪逢破，搬遷過程中易有物品損毀或合約產權口舌"
  },
  "移民／海外發展": {
    key: "immigration",
    name: "移民／海外發展",
    icon: "✈️",
    targetGods: ["偏印", "七殺", "偏財"],
    favorableDesc: "遠行大運臨門，跨國跨文化適應力強，利於落實簽證與定居手續",
    cautionDesc: "政策或文件流程易生延宕，需預留彈性預備期並核實手續"
  },
  "合夥／加入新合作": {
    key: "partnership",
    name: "合夥／加入新合作",
    icon: "🤝",
    targetGods: ["比肩", "正印", "食神"],
    favorableDesc: "優勢互補、資源互通，利於以清晰股權架構達成雙贏成果",
    cautionDesc: "比劫奪財之月，權責邊界不清或財務記賬模糊最易埋下隱患"
  }
};

export const ALL_DECISION_OPTIONS = Object.keys(DECISION_CONFIG_MAP);

function getTenGod(dayStem: string, targetStem: string): string {
  const dayElem = STEM_ELEMENT[dayStem] || "木";
  const targetElem = STEM_ELEMENT[targetStem] || "木";
  const isSamePolarity = (STEMS.indexOf(dayStem) % 2) === (STEMS.indexOf(targetStem) % 2);

  if (dayElem === targetElem) return isSamePolarity ? "比肩" : "劫財";
  if (GENERATING_ELEMENT[dayElem] === targetElem) return isSamePolarity ? "食神" : "傷官";
  if (CONTROLLED_ELEMENT[dayElem] === targetElem) return isSamePolarity ? "偏財" : "正財";
  if (CONTROLLING_ELEMENT[dayElem] === targetElem) return isSamePolarity ? "七殺" : "正官";
  return isSamePolarity ? "偏印" : "正印";
}

export interface DecisionTimingResult {
  decisionName: string;
  icon: string;
  tendency: "較有利" | "較需審慎" | "適合觀察";
  tendencyColor: "emerald" | "rose" | "amber";
  tendencyDesc: string;
  bestMonth: string;
  bestMonthStars: string;
  bestMonthAnalysis: string;
  secondaryMonth: string;
  secondaryMonthStars: string;
  secondaryMonthAnalysis: string;
  cautionMonth: string;
  cautionMonthStars: string;
  cautionMonthAnalysis: string;
  timingFitAnalysis: string;
  strategies: string[];
}

export interface TwelveMonthsDecisionsReportResult {
  dayMaster: string;
  dominantElement: string;
  fourPillarsText: string;
  annualTheme: string;
  annualThemeDesc: string;
  userInput: {
    selectedDecisions: string[];
    planStatus: string;
    expectedTiming: string;
  };
  decisionReports: DecisionTimingResult[];
  monthlyBreakdown: Array<{
    monthIndex: number;
    period: string;
    lunarRange: string;
    yearStemBranch: string;
    monthStemBranch: string;
    tenGod: string;
    score: number;
    level: string;
    isClash: boolean;
    isHarmony: boolean;
  }>;
  turningPoints: string[];
}

export function computeTwelveMonthsDecisionsReport(
  birthDate: string,
  birthTime: string,
  gender: string = "male",
  selectedDecisions: string[] = ["轉工／轉跑道"],
  planStatus: string = "正在考慮",
  expectedTiming: string = "未確定",
  baziDataInput?: any
): TwelveMonthsDecisionsReportResult {
  const bazi = baziDataInput || calculateLocalBazi(birthDate, birthTime, gender);
  const dayStem = bazi?.day_master?.stem || "甲";
  const dayElem = STEM_ELEMENT[dayStem] || "木";
  const dayBranch = bazi?.pillars?.day?.branch || "子";
  const monthBranch = bazi?.pillars?.month?.branch || "寅";
  const dominantElement = bazi?.elements?.dominant_element || dayElem;

  const sanitizedDecisions = selectedDecisions.filter(d => DECISION_CONFIG_MAP[d]).slice(0, 3);
  const effectiveDecisions = sanitizedDecisions.length > 0 ? sanitizedDecisions : ["轉工／轉跑道"];

  const wealthElem = CONTROLLED_ELEMENT[dayElem] || "土";
  const officerElem = CONTROLLING_ELEMENT[dayElem] || "金";

  const fourPillarsText = bazi?.pillars
    ? `${bazi.pillars.year.stem}${bazi.pillars.year.branch}年 / ${bazi.pillars.month.stem}${bazi.pillars.month.branch}月 / ${bazi.pillars.day.stem}${bazi.pillars.day.branch}日 / ${bazi.pillars.hour.stem}${bazi.pillars.hour.branch}時`
    : "排盤推演中";

  const startYear = 2026;
  const startMonth = 10;
  const monthlyBreakdown = [];

  for (let idx = 0; idx < 12; idx++) {
    const total = startYear * 12 + (startMonth - 1) + idx;
    const y = Math.floor(total / 12);
    const m = (total % 12) + 1;
    const periodStr = `${y}/${String(m).padStart(2, "0")}`;

    const yStem = STEMS[(y - 4) % 10];
    const yBranch = BRANCHES[(y - 4) % 12];
    const mBranch = BRANCHES[(m + 1) % 12];
    const mStem = STEMS[((y % 5) * 2 + m + 1) % 10];
    const monthStemBranch = `${mStem}${mBranch}`;
    const tenGod = getTenGod(dayStem, mStem);

    const isHarmony = SIX_HARMONIES[dayBranch] === mBranch || SIX_HARMONIES[monthBranch] === mBranch;
    const isClash = SIX_CLASHES[dayBranch] === mBranch || SIX_CLASHES[monthBranch] === mBranch;
    const isStemCombine = STEM_COMBINATIONS[dayStem] === mStem;

    let base = 6.8;
    if (isHarmony) base += 1.8;
    if (isStemCombine) base += 1.3;
    if (isClash) base -= 2.2;
    if ([wealthElem, officerElem].includes(STEM_ELEMENT[mStem])) base += 0.5;

    const pseudoSeed = (dayStem.charCodeAt(0) * 11 + mBranch.charCodeAt(0) * 7 + idx * 5) % 9 - 4;
    const score = Math.round(Math.max(3.8, Math.min(9.8, base + pseudoSeed * 0.15)) * 10) / 10;

    let level = "平順 · 蓄力積累";
    if (score >= 8.8) level = "大吉 · 乘勢進取";
    else if (score >= 7.8) level = "次吉 · 穩步上升";
    else if (score <= 5.2) level = "守成 · 防守為先";

    monthlyBreakdown.push({
      monthIndex: idx + 1,
      period: periodStr,
      lunarRange: SOLAR_TERM_NAMES[idx % 12],
      yearStemBranch: `${yStem}${yBranch}`,
      monthStemBranch,
      tenGod,
      score,
      level,
      isClash,
      isHarmony,
      isStemCombine
    });
  }

  const themeCandidate = ANNUAL_THEME_CATALOG[dayStem] || ANNUAL_THEME_CATALOG["甲"];

  const decisionReports: DecisionTimingResult[] = effectiveDecisions.map((decName) => {
    const cfg = DECISION_CONFIG_MAP[decName];
    const targetGods = cfg.targetGods;

    const scoredMonths = monthlyBreakdown.map((m) => {
      let matchScore = m.score;
      if (targetGods.includes(m.tenGod)) matchScore += 1.2;
      if (m.isHarmony || m.isStemCombine) matchScore += 0.8;
      if (m.isClash) matchScore -= 1.8;
      return { matchScore, m };
    });

    scoredMonths.sort((a, b) => b.matchScore - a.matchScore);
    const bestMonthItem = scoredMonths[0].m;
    const secondaryMonthItem = scoredMonths.length > 1 ? scoredMonths[1].m : scoredMonths[0].m;
    
    const cautionMonthItem = [...monthlyBreakdown].sort((a, b) => {
      const aRisk = a.score - (a.isClash ? 3.0 : 0);
      const bRisk = b.score - (b.isClash ? 3.0 : 0);
      return aRisk - bRisk;
    })[0];

    const targetMonths = monthlyBreakdown.filter(m => targetGods.includes(m.tenGod));
    const avgTarget = targetMonths.length > 0
      ? targetMonths.reduce((acc, x) => acc + x.score, 0) / targetMonths.length
      : 7.0;

    let tendency: "較有利" | "較需審慎" | "適合觀察" = "適合觀察";
    let tendencyColor: "emerald" | "rose" | "amber" = "amber";
    let tendencyDesc = `氣候平穩，宜先進行調研摸底與前期鋪陳，待吉神到位再正式全面啟動。`;

    if (avgTarget >= 7.6 || bestMonthItem.score >= 8.6) {
      tendency = "較有利";
      tendencyColor = "emerald";
      tendencyDesc = `流年氣場生旺【${cfg.name}】關鍵星宿，原局受助良多，主動籌謀大有可為。`;
    } else if (cautionMonthItem.isClash && avgTarget < 6.8) {
      tendency = "較需審慎";
      tendencyColor = "rose";
      tendencyDesc = `當前歲月干支有相沖之氣，推進過程阻力稍多，需嚴格控制邊際風險，以防守蓄力為上策。`;
    }

    let timingFitAnalysis = "";
    if (planStatus === "已有明確計劃") {
      timingFitAnalysis = `閣下已有具體規劃（預計進行時點：${expectedTiming}）。經八字流月矩陣推算，建議將關鍵簽約、面試談判或公開發布之節點精準鎖定在【${bestMonthItem.period}（${bestMonthItem.monthStemBranch}月）】，而將前期溝通或法務合約校對安排在【${secondaryMonthItem.period}】。請嚴格避開【${cautionMonthItem.period}】之動盪窗口。`;
    } else if (planStatus === "正在考慮") {
      timingFitAnalysis = `目前處於深度權衡階段（預期窗口：${expectedTiming}）。此心態極度契合命理節奏，當前至【${secondaryMonthItem.period}】為最佳沙盤推演期，可透過小步快跑驗證可行性；若各項要素齊備，於【${bestMonthItem.period}】發力推進能取得倍增效果。`;
    } else {
      timingFitAnalysis = `目前尚未下定決心。八字建議順應時令節奏，不急於盲動承諾。可先行關注【${bestMonthItem.period}】前後出現之貴人引薦或外界契機，若信號明朗再作定奪。`;
    }

    return {
      decisionName: cfg.name,
      icon: cfg.icon,
      tendency,
      tendencyColor,
      tendencyDesc,
      bestMonth: `${bestMonthItem.period}（${bestMonthItem.monthStemBranch}月 · ${bestMonthItem.score}分）`,
      bestMonthStars: "★★★★★",
      bestMonthAnalysis: `此月逢【${bestMonthItem.tenGod}】得地，${cfg.favorableDesc}。宜重拳出擊，落實關鍵決定。`,
      secondaryMonth: `${secondaryMonthItem.period}（${secondaryMonthItem.monthStemBranch}月 · ${secondaryMonthItem.score}分）`,
      secondaryMonthStars: "★★★★☆",
      secondaryMonthAnalysis: `氣場漸進上揚，適合作為【${cfg.name}】的籌備、私下接觸或小規模測試期。`,
      cautionMonth: `${cautionMonthItem.period}（${cautionMonthItem.monthStemBranch}月 · ${cautionMonthItem.score}分）`,
      cautionMonthStars: "★★☆☆☆",
      cautionMonthAnalysis: `此月逢【${cautionMonthItem.tenGod}】與原局氣場激盪，${cfg.cautionDesc}。切忌在該月做出衝動式重大承諾。`,
      timingFitAnalysis,
      strategies: [
        `【主動借力】：在【${bestMonthItem.period}】善用五行喜用神方位的貴人與資源，確立主導話語權。`,
        `【風險鎖定】：避開【${cautionMonthItem.period}】簽署長期硬性合約，凡事需保留二次談判退路。`,
        `【執行閉環】：落實「先謀而後動」，在【${secondaryMonthItem.period}】做好資源底牌盤點。`
      ]
    };
  });

  const sortedM = [...monthlyBreakdown].sort((a, b) => b.score - a.score);
  const turningPoints = [
    `第 1 階段（${monthlyBreakdown[0].period} - ${monthlyBreakdown[3].period} · 摸底籌備期）：重點在於理清過往責任，梳理【${effectiveDecisions.join("、")}】所需資源。`,
    `第 2 階段（${monthlyBreakdown[4].period} - ${monthlyBreakdown[7].period} · 決策突破期）：全年度能量峰值顯現於【${sortedM[0].period}（${sortedM[0].score}分）】，為推動重大決策之黃金窗口。`,
    `第 3 階段（${monthlyBreakdown[8].period} - ${monthlyBreakdown[11].period} · 固化驗收期）：轉入成果收割，防範尾部波動，鎖定既得收益。`
  ];

  return {
    dayMaster: bazi?.day_master?.display || `${dayStem}${dayElem}`,
    dominantElement,
    fourPillarsText,
    annualTheme: themeCandidate.title,
    annualThemeDesc: themeCandidate.desc,
    userInput: {
      selectedDecisions: effectiveDecisions,
      planStatus,
      expectedTiming
    },
    decisionReports,
    monthlyBreakdown,
    turningPoints
  };
}
''')

# 6. 寫入 TwelveMonthsDecisionsModal.tsx
with open("frontend/src/components/TwelveMonthsDecisionsModal.tsx", "w", encoding="utf-8") as f:
    f.write('''import React, { useState, useMemo } from 'react';
import {
  computeTwelveMonthsDecisionsReport,
  ALL_DECISION_OPTIONS,
  TwelveMonthsDecisionsReportResult
} from '../utils/twelveMonthsDecisionsLocal';
import { ReportFooterCrossSell } from './ReportFooterCrossSell';

interface TwelveMonthsDecisionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  baziData?: any;
  birthDate?: string;
  birthTime?: string;
  gender?: string;
}

export const TwelveMonthsDecisionsModal: React.FC<TwelveMonthsDecisionsModalProps> = ({
  isOpen,
  onClose,
  baziData,
  birthDate,
  birthTime,
  gender
}) => {
  const [selectedDecisions, setSelectedDecisions] = useState<string[]>([
    "轉工／轉跑道",
    "創業／開始新項目"
  ]);

  const [planStatus, setPlanStatus] = useState<string>("已有明確計劃");
  const [expectedTiming, setExpectedTiming] = useState<string>("3–6個月內");

  const toggleDecision = (option: string) => {
    if (selectedDecisions.includes(option)) {
      if (selectedDecisions.length > 1) {
        setSelectedDecisions(selectedDecisions.filter(d => d !== option));
      }
    } else {
      if (selectedDecisions.length < 3) {
        setSelectedDecisions([...selectedDecisions, option]);
      }
    }
  };

  const report: TwelveMonthsDecisionsReportResult = useMemo(() => {
    return computeTwelveMonthsDecisionsReport(
      birthDate || "1990-05-20",
      birthTime || "21:30",
      gender || "male",
      selectedDecisions,
      planStatus,
      expectedTiming,
      baziData
    );
  }, [birthDate, birthTime, gender, selectedDecisions, planStatus, expectedTiming, baziData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white animate-fadeIn">
      <div className="bg-[#FAF7F2] text-[#2B2D2F] w-full max-w-4xl max-h-[92vh] rounded shadow-2xl flex flex-col overflow-hidden border border-[#1E3A5F]/20 print:max-h-none print:shadow-none print:border-none print:w-full">
        
        {/* Header */}
        <div className="bg-[#1E3A5F] text-[#F4EFEA] px-6 py-4 flex items-center justify-between shrink-0 shadow-xs">
          <div>
            <div className="text-[11px] font-mono tracking-wider text-[#D97706] uppercase">
              Personalized Decision Timing Edition · HK$488
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold tracking-wide flex items-center gap-2">
              <span>🗓️ 十二流月吉凶 ＋ 重大決策矩陣</span>
              <span className="text-xs font-sans font-normal px-2 py-0.5 rounded bg-[#D97706]/20 text-[#D97706] border border-[#D97706]/40">
                測試預覽版
              </span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#F4EFEA]/70 hover:text-white text-2xl leading-none transition-colors cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Scrollable Report Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 font-sans text-sm print:p-0 print:overflow-visible">
          
          {/* 客製化決策選項調整區 (Step 2 & Step 3) */}
          <div className="bg-[#FAF7F2] border-2 border-[#D97706]/30 rounded p-4 sm:p-5 space-y-4 shadow-xs print:hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2B2D2F]/10 pb-3">
              <div>
                <span className="font-serif font-bold text-[#1E3A5F] text-base">
                  🎯 步驟一與二：自選未來 12 個月重大決策（限制最多選 3 項）
                </span>
                <p className="text-xs text-[#2B2D2F]/70 mt-0.5">
                  限制最多 3 項，以確保專項分析深度與針對性 Timing 精度（避免泛泛全包）。
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#1E3A5F]/10 text-[#1E3A5F] self-start sm:self-auto">
                已選：{selectedDecisions.length} / 3 項
              </span>
            </div>

            {/* 10 項重大決策按鈕網格 */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
              {ALL_DECISION_OPTIONS.map((opt) => {
                const isSelected = selectedDecisions.includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => toggleDecision(opt)}
                    className={`px-3 py-2 text-xs rounded border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-[#1E3A5F] text-white border-[#1E3A5F] font-bold shadow-xs"
                        : "bg-white text-[#2B2D2F] border-[#2B2D2F]/20 hover:border-[#D97706]/60"
                    }`}
                  >
                    <span className="truncate">{opt}</span>
                    <span className="text-xs ml-1 shrink-0">{isSelected ? "✓" : "+"}</span>
                  </button>
                );
              })}
            </div>

            {/* Step 3: 具體計劃與時程問答 */}
            <div className="pt-3 border-t border-[#2B2D2F]/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1E3A5F] mb-1.5">
                  📌 步驟三：你目前是否已有相關計劃？
                </label>
                <div className="flex flex-wrap gap-2">
                  {["已有明確計劃", "正在考慮", "尚未決定"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setPlanStatus(status)}
                      className={`px-3 py-1.5 text-xs rounded border transition-colors cursor-pointer ${
                        planStatus === status
                          ? "bg-[#D97706] text-white border-[#D97706] font-bold"
                          : "bg-white text-[#2B2D2F] border-[#2B2D2F]/20 hover:border-[#D97706]/50"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {planStatus === "已有明確計劃" && (
                <div className="animate-fadeIn">
                  <label className="block text-xs font-bold text-[#1E3A5F] mb-1.5">
                    ⏱️ 預計何時進行？
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {["2026年內", "2027年", "1–3個月內", "3–6個月內", "6–12個月內", "未確定"].map((tm) => (
                      <button
                        key={tm}
                        onClick={() => setExpectedTiming(tm)}
                        className={`px-2.5 py-1 text-xs rounded border transition-colors cursor-pointer ${
                          expectedTiming === tm
                            ? "bg-[#1E3A5F] text-white border-[#1E3A5F] font-bold"
                            : "bg-white text-[#2B2D2F] border-[#2B2D2F]/20 hover:border-[#1E3A5F]/50"
                        }`}
                      >
                        {tm}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 1. 命主八字與歲君大局 */}
          <div className="bg-white p-5 rounded border border-[#2B2D2F]/15 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2B2D2F]/10 pb-3">
              <div>
                <div className="text-xs text-[#2B2D2F]/70">命主日元八字排盤</div>
                <div className="text-base font-serif font-bold text-[#1E3A5F]">
                  日主：{report.dayMaster} · 主導五行：{report.dominantElement}
                </div>
              </div>
              <div className="text-xs font-mono text-[#2B2D2F]/70 bg-[#FAF7F2] px-3 py-1.5 rounded border border-[#2B2D2F]/10">
                {report.fourPillarsText}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-[#D97706] uppercase tracking-wider mb-1">
                2026/2027 流年歲君發展主軸
              </div>
              <h3 className="font-serif font-bold text-lg text-[#2B2D2F] mb-1.5">
                {report.annualTheme}
              </h3>
              <p className="text-xs sm:text-sm text-[#2B2D2F]/85 leading-relaxed">
                {report.annualThemeDesc}
              </p>
            </div>
          </div>

          {/* 2. 【核心重磅】自選重大決策專項 Timing 矩陣 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b-2 border-[#D97706] pb-2">
              <span className="text-xl">🎯</span>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1E3A5F]">
                重大決策專項 Timing 矩陣（已選 {report.decisionReports.length} 項）
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {report.decisionReports.map((dec, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded border border-[#2B2D2F]/15 p-5 shadow-xs space-y-4 hover:border-[#D97706]/70 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2B2D2F]/10 pb-3">
                    <div className="flex items-center space-x-2.5">
                      <span className="text-2xl">{dec.icon}</span>
                      <h4 className="font-serif font-bold text-lg text-[#1E3A5F]">
                        {dec.decisionName}
                      </h4>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-[#2B2D2F]/70">決策適合度：</span>
                      <span
                        className={`text-xs px-3 py-1 rounded font-bold border ${
                          dec.tendency === "較有利"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                            : dec.tendency === "較需審慎"
                            ? "bg-rose-50 text-rose-800 border-rose-300"
                            : "bg-amber-50 text-amber-800 border-amber-300"
                        }`}
                      >
                        {dec.tendency}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#2B2D2F]/85 italic bg-[#FAF7F2] p-3 rounded border border-[#2B2D2F]/10">
                    💡 命理總評：{dec.tendencyDesc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* 最佳月份 */}
                    <div className="bg-[#F0FDF4] border border-emerald-300/80 rounded p-3.5 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-900">
                          🌟 最佳月份（幾時做）
                        </span>
                        <span className="text-emerald-700 text-xs font-mono font-bold">
                          {dec.bestMonthStars}
                        </span>
                      </div>
                      <div className="font-mono font-bold text-sm text-emerald-800">
                        {dec.bestMonth}
                      </div>
                      <p className="text-[11px] text-emerald-950/80 leading-relaxed">
                        {dec.bestMonthAnalysis}
                      </p>
                    </div>

                    {/* 次佳／籌備月份 */}
                    <div className="bg-[#FFFBEB] border border-amber-300/80 rounded p-3.5 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-900">
                          ⏳ 次佳／籌備期
                        </span>
                        <span className="text-amber-700 text-xs font-mono font-bold">
                          {dec.secondaryMonthStars}
                        </span>
                      </div>
                      <div className="font-mono font-bold text-sm text-amber-800">
                        {dec.secondaryMonth}
                      </div>
                      <p className="text-[11px] text-amber-950/80 leading-relaxed">
                        {dec.secondaryMonthAnalysis}
                      </p>
                    </div>

                    {/* 不宜啟動月份 */}
                    <div className="bg-[#FEF2F2] border border-rose-300/80 rounded p-3.5 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-rose-900">
                          ⚠️ 風險窗口（幾時避免）
                        </span>
                        <span className="text-rose-700 text-xs font-mono font-bold">
                          {dec.cautionMonthStars}
                        </span>
                      </div>
                      <div className="font-mono font-bold text-sm text-rose-800">
                        {dec.cautionMonth}
                      </div>
                      <p className="text-[11px] text-rose-950/80 leading-relaxed">
                        {dec.cautionMonthAnalysis}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#1E3A5F]/5 border border-[#1E3A5F]/20 rounded p-3.5 space-y-1 text-xs">
                    <div className="font-bold text-[#1E3A5F] flex items-center space-x-1">
                      <span>🧭</span>
                      <span>客製化時程匹配剖析（針對「{report.userInput.planStatus} · {report.userInput.expectedTiming}」）：</span>
                    </div>
                    <p className="leading-relaxed text-[#2B2D2F]/90">
                      {dec.timingFitAnalysis}
                    </p>
                  </div>

                  <div className="pt-2">
                    <div className="text-xs font-bold text-[#1E3A5F] mb-1.5">
                      📋 丁蔓山大師 · 落地執行錦囊：
                    </div>
                    <ul className="space-y-1 text-xs text-[#2B2D2F]/85">
                      {dec.strategies.map((st, i) => (
                        <li key={i} className="flex items-start space-x-1.5">
                          <span className="text-[#D97706] font-bold">✦</span>
                          <span>{st}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. 未來 12 個月逐月運程評級總覽 */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-base text-[#1E3A5F] flex items-center space-x-1.5">
              <span>📅</span>
              <span>未來 12 個月逐月運勢總覽</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
              {report.monthlyBreakdown.map((m) => (
                <div
                  key={m.monthIndex}
                  className={`p-3 rounded border text-center flex flex-col justify-between ${
                    m.score >= 8.5
                      ? "bg-[#F0FDF4] border-emerald-300"
                      : m.score <= 5.5
                      ? "bg-[#FEF2F2] border-rose-300"
                      : "bg-white border-[#2B2D2F]/15"
                  }`}
                >
                  <div className="text-[11px] font-mono text-[#2B2D2F]/70 border-b border-[#2B2D2F]/10 pb-1">
                    {m.period}
                  </div>
                  <div className="my-1.5">
                    <div className="text-xs font-serif font-bold text-[#1E3A5F]">
                      {m.monthStemBranch}月
                    </div>
                    <div className="text-[11px] text-[#D97706] font-medium">
                      {m.tenGod}
                    </div>
                    <div className="text-lg font-mono font-bold text-[#2B2D2F] mt-0.5">
                      {m.score}
                    </div>
                  </div>
                  <div className="text-[10px] text-[#2B2D2F]/75 border-t border-[#2B2D2F]/10 pt-1">
                    {m.level.split(" · ")[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. 未來 12 個月三階段轉折點 */}
          <div className="bg-white p-5 rounded border border-[#2B2D2F]/15 space-y-2.5">
            <h3 className="font-serif font-bold text-base text-[#1E3A5F] flex items-center space-x-1.5">
              <span>📈</span>
              <span>年度重大決策推進三階段轉折</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#2B2D2F]/85 leading-relaxed">
              {report.turningPoints.map((tp, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-[#D97706] font-bold">▶</span>
                  <span>{tp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. 跨項目延伸推薦與防偽 */}
          <ReportFooterCrossSell currentProductId="monthly-calendar" />
        </div>

        {/* Modal Actions Footer */}
        <div className="bg-[#EFE9DF] border-t border-[#2B2D2F]/10 px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 print:hidden">
          <span className="text-xs text-[#2B2D2F]/75">
            丁蔓山｜命理誌 · 12個月流月＋重大決策專項命書 (測試預覽)
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-1.5 bg-white hover:bg-white/80 text-[#1E3A5F] border border-[#1E3A5F]/30 font-sans text-xs font-bold rounded shadow-xs transition-colors cursor-pointer"
            >
              🖨️ 列印報告
            </button>
            <button
              onClick={onClose}
              className="px-5 py-1.5 bg-[#1E3A5F] hover:bg-[#2B2D2F] text-white font-sans text-xs font-bold rounded shadow-xs transition-colors cursor-pointer"
            >
              關閉預覽
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
''')
print("✓ [5/7] TwelveMonthsDecisionsModal.tsx 及本地引擎建立完成！")

# 7. 更新前端 services.ts, ChartResult.tsx, OnlineServicesIndexPage.tsx, App.tsx
with open("frontend/src/data/services.ts", "r", encoding="utf-8") as f:
    srv_code = f.read()

srv_code = srv_code.replace(
    '  {\\n    id: "srv-12-months-decisions",\\n    title: "十二流月運程＋重大決策",\\n    price_hkd: 688,',
    '  {\\n    id: "srv-12-months-decisions",\\n    title: "十二流月運程＋重大決策",\\n    price_hkd: 488,'
).replace(
    'price_display: "HK$188",\\n    turnaround: "即將登場 · 決策矩陣",',
    'price_display: "HK$488",\\n    turnaround: "即時生成 · 個人化決策版",'
)
with open("frontend/src/data/services.ts", "w", encoding="utf-8") as f:
    f.write(srv_code)

with open("frontend/src/components/ChartResult.tsx", "r", encoding="utf-8") as f:
    cr_code = f.read()

if "onOpenTwelveMonthsDecisionsReport" not in cr_code:
    cr_code = cr_code.replace(
        "onOpenTwelveMonthsReport?: () => void;",
        "onOpenTwelveMonthsReport?: () => void;\\n  onOpenTwelveMonthsDecisionsReport?: () => void;"
    ).replace(
        "onOpenTwelveMonthsReport,\\n",
        "onOpenTwelveMonthsReport,\\n  onOpenTwelveMonthsDecisionsReport,\\n"
    ).replace(
        "<span>🌙 流年＋12流月 (HK$368)</span>\\n                </button>\\n              )}",
        "<span>🌙 流年＋12流月 (HK$368)</span>\\n                </button>\\n              )}\\n              {onOpenTwelveMonthsDecisionsReport && (\\n                <button\\n                  onClick={onOpenTwelveMonthsDecisionsReport}\\n                  className=\\"bg-[#D97706] hover:bg-[#b45309] text-white px-3.5 py-2 text-xs font-sans rounded transition-colors font-bold shadow-sm flex items-center space-x-1.5 cursor-pointer\\"\\n                >\\n                  <span>🎯 12流月＋重大決策 (HK$488)</span>\\n                </button>\\n              )}"
    )
    with open("frontend/src/components/ChartResult.tsx", "w", encoding="utf-8") as f:
        f.write(cr_code)

with open("frontend/src/components/OnlineServicesIndexPage.tsx", "r", encoding="utf-8") as f:
    os_code = f.read()

if "srv-12-months-decisions" not in os_code:
    os_code = os_code.replace(
        "<span>{service.id === 'srv-five-elements' && isPreviewDomain ? '📜 即時預覽完整報告 (測試版)' : `立即推演報告 (${service.price_display})`}</span>",
        "<span>{\\n                    service.id === 'srv-five-elements' && isPreviewDomain \\n                      ? '📜 即時預覽完整報告 (測試版)' \\n                      : service.id === 'srv-12-months-decisions' && isPreviewDomain\\n                      ? '🎯 即時預覽重大決策報告 (測試版)'\\n                      : `立即推演報告 (${service.price_display})`\\n                  }</span>"
    )
    with open("frontend/src/components/OnlineServicesIndexPage.tsx", "w", encoding="utf-8") as f:
        f.write(os_code)

with open("frontend/src/App.tsx", "r", encoding="utf-8") as f:
    app_code = f.read()

if "TwelveMonthsDecisionsModal" not in app_code:
    app_code = app_code.replace(
        "import { TwelveMonthsReportModal } from './components/TwelveMonthsReportModal';",
        "import { TwelveMonthsReportModal } from './components/TwelveMonthsReportModal';\\nimport { TwelveMonthsDecisionsModal } from './components/TwelveMonthsDecisionsModal';"
    ).replace(
        "const [isTwelveMonthsModalOpen, setIsTwelveMonthsModalOpen] = useState(false);",
        "const [isTwelveMonthsModalOpen, setIsTwelveMonthsModalOpen] = useState(false);\\n  const [isTwelveMonthsDecisionsModalOpen, setIsTwelveMonthsDecisionsModalOpen] = useState(false);"
    ).replace(
        "if (service.id === 'srv-startup-3yr' && isPreviewDomain) {\\n      setIsStartupModalOpen(true);\\n      return;\\n    }",
        "if (service.id === 'srv-startup-3yr' && isPreviewDomain) {\\n      setIsStartupModalOpen(true);\\n      return;\\n    }\\n    if (service.id === 'srv-12-months-decisions' && isPreviewDomain) {\\n      setIsTwelveMonthsDecisionsModalOpen(true);\\n      return;\\n    }"
    ).replace(
        "onOpenTwelveMonthsReport={isPreviewDomain ? () => setIsTwelveMonthsModalOpen(true) : undefined}",
        "onOpenTwelveMonthsReport={isPreviewDomain ? () => setIsTwelveMonthsModalOpen(true) : undefined}\\n                    onOpenTwelveMonthsDecisionsReport={isPreviewDomain ? () => setIsTwelveMonthsDecisionsModalOpen(true) : undefined}"
    ).replace(
        "{/* Twelve Months Fortune Navigation Report Modal (HK",
        "{/* Twelve Months + Major Decisions Report Modal (HK$488) */}\\n      {isTwelveMonthsDecisionsModalOpen && (\\n        <TwelveMonthsDecisionsModal\\n          isOpen={isTwelveMonthsDecisionsModalOpen}\\n          onClose={() => setIsTwelveMonthsDecisionsModalOpen(false)}\\n          baziData={baziData}\\n          birthDate={currentInputParams.birthDate}\\n          birthTime={currentInputParams.birthTime}\\n          gender={currentInputParams.gender}\\n        />\\n      )}\\n\\n      {/* Twelve Months Fortune Navigation Report Modal (HK"
    )
    with open("frontend/src/App.tsx", "w", encoding="utf-8") as f:
        f.write(app_code)

print("✓ [6/7] 前端各介面關聯配置完成！")

# 8. 前端編譯與推送
print("\\n>>> 執行前端 Vite 打包 ...")
subprocess.run("cd frontend && npm run build", shell=True, check=True)

print("\\n>>> 提交與推送代碼至 GitHub ...")
subprocess.run("git add -A", shell=True, check=True)
subprocess.run('git commit -m "feat: add twelve-month major decisions backend calculation, supabase schema and frontend preview test area"', shell=True, check=True)
subprocess.run("git push origin main", shell=True, check=True)

print("\\n==================================================")
print("🎉 部署成功！Cloudflare Pages 將在數十秒內完成更新。")
print("==================================================")
