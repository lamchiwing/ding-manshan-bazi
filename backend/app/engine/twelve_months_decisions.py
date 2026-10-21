from typing import Dict, Any, List, Optional

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
    "甲": {"title": "食神吐秀 · 專業立身與商機轉化", "desc": "未來12個月正逢丙火食神照耀，木火相生，象徵深層專業智慧與獨創想法轉化為實質商機的黃金週期。適合聚焦個人核心專長、研發拳頭產品或建立不可替代的專業壁壘，以才智生財。"},
    "乙": {"title": "傷官生財 · 破格創新與品牌聲譽躍升", "desc": "未來12個月靈感奔湧、表達力極強，是打破常規思維、進行商業破局與品牌對外傳播的高光年份。適合大膽跨界拓展、經營個人IP或爭取舞台聚光燈，但需留意職場口舌與合約嚴謹度。"},
    "丙": {"title": "比肩聚力 · 賽道重塑與強強聯合", "desc": "未來12個月自主魄力與前進動能極為充沛，是告別被動等待、主動召集優質合夥人並肩開拓新天地的進取之年。需強化利潤分配機制與團隊授權，避免單打獨鬥或比劫爭奪。"},
    "丁": {"title": "借勢騰飛 · 平台賦能與借力破局", "desc": "未來12個月歲君丙火光芒普照，適合借大平台之勢、傍強者之光，透過借力打力完成階層與業務躍升。需明確界定自身不可替代的深耕價值，防範成果遭同僚稀釋。"},
    "戊": {"title": "厚積薄發 · 專精技術與資產奠基", "desc": "未來12個月丙火烈烈生旺戊土，思維轉向深邃宏觀，是考取高門檻資質、沉澱獨門技術、深耕重資產或調整組織架構的沉潛積蓄之年。適合以靜制動，練好內功。"},
    "己": {"title": "正印護身 · 權柄歸心與制度信任確立", "desc": "未來12個月得歲君正印庇佑，長輩、官方或高層貴人暗中相扶，有利於在大型組織或核心機構中取得關鍵信任、確立正式管轄權限。凡事循規蹈矩，必能水到渠成。"},
    "庚": {"title": "七殺淬煉 · 逆境突破與開闢疆土", "desc": "火旺煉金，未來12個月是命主跳脫舒適圈、迎面接下高難度攻堅任務的英雄之年。壓力與機遇並存，每一次重大考驗都是權力擴張的墊腳石，極易在危機中脫穎而出。"},
    "辛": {"title": "正官合身 · 體制晉升與名望階梯確立", "desc": "未來12個月天干逢丙辛相合，官星來合我，象徵名正言順的晉升任命、跨部門主導權或與權威機構建立長期合約。利於走體制、晉級考評及確立不可撼動的行業名位。"},
    "壬": {"title": "偏財宏圖 · 資本運作與資源槓桿放大", "desc": "水火既濟，丙火偏財萬丈光芒，未來12個月對市場機會與商業脈搏極具嗅覺，適合大膽進行商業談判、股權投資、大宗交易或副業裂變。注意鎖定階段利潤，防範過度擴張。"},
    "癸": {"title": "正財潤局 · 業務深耕與現金流穩健擴增", "desc": "雨露得日光照耀，未來12個月財源脈絡清晰，主要收入、諮詢收益或商業訂單呈現持續攀升趨勢。適合深耕高價值付費用戶、打磨高毛利產品，將流量穩穩轉化為真金白銀。"}
}

DECISION_CONFIG_MAP = {
    "轉工／轉跑道": {"key": "job_change", "name": "轉工／轉跑道", "icon": "💼", "target_gods": ["正官", "七殺", "正印", "偏印"], "favorable_desc": "體制貴人相照，職位躍遷與薪資談判勝率顯著提高", "caution_desc": "月逢官殺相混或地支見沖，防承諾落空或新環境人事複雜"},
    "升職／爭取新職位": {"key": "promotion", "name": "升職／爭取新職位", "icon": "🎖️", "target_gods": ["正官", "正印", "比肩"], "favorable_desc": "印官相生，個人權威與管轄權利獲核心高層正式確立", "caution_desc": "比劫爭位或官星受制，爭奪激烈需低調蓄力防止被借題發揮"},
    "創業／開始新項目": {"key": "entrepreneurship", "name": "創業／開始新項目", "icon": "🚀", "target_gods": ["食神", "傷官", "偏財"], "favorable_desc": "才智與市場需求共鳴，利於輕資產破局與建立第一曲線", "caution_desc": "逢比劫奪財，資金鏈容易承壓，切忌盲目擴大初期固定開銷"},
    "擴張／開新市場": {"key": "expansion", "name": "擴張／開新市場", "icon": "🌍", "target_gods": ["偏財", "七殺", "傷官"], "favorable_desc": "外拓氣場高漲，利於跨區域合作、大客戶開發或裂變新渠道", "caution_desc": "市場節奏過熱或管理半徑過寬，易造成後端運維失衡"},
    "投資／重大財務決定": {"key": "investment", "name": "投資／重大財務決定", "icon": "💰", "target_gods": ["正財", "偏財", "食神"], "favorable_desc": "財源穩固有庫，適合佈局核心優質資產與中長線價值配置", "caution_desc": "偏印奪食或劫財耗損，高槓桿投機項目極易產生流動性陷阱"},
    "結婚／訂婚": {"key": "marriage", "name": "結婚／訂婚", "icon": "💍", "target_gods": ["正官", "正財", "六合"], "favorable_desc": "夫妻宮氣場和合，雙方家庭共識凝聚，締結良緣水到渠成", "caution_desc": "夫妻宮逢沖或情緒浮動，商討婚俗或瑣事宜包容退讓"},
    "分手／結束一段關係": {"key": "breakup", "name": "分手／結束一段關係", "icon": "🕊️", "target_gods": ["傷官", "七殺", "偏印"], "favorable_desc": "理智清明，利於和平劃定界限、解開彼此精神牽絆與財務切割", "caution_desc": "心境極端動盪之時容易口出惡言或激化矛盾，宜冷靜協商"},
    "搬屋／搬遷": {"key": "relocation", "name": "搬屋／搬遷", "icon": "🏠", "target_gods": ["正印", "偏印", "驛馬"], "favorable_desc": "驛馬吉神得生，新居藏風聚氣，能帶動健康與家庭人際提升", "caution_desc": "地支動盪逢破，搬遷過程中易有物品損毀或合約產權口舌"},
    "移民／海外發展": {"key": "immigration", "name": "移民／海外發展", "icon": "✈️", "target_gods": ["偏印", "七殺", "偏財"], "favorable_desc": "遠行大運臨門，跨國跨文化適應力強，利於落實簽證與定居手續", "caution_desc": "政策或文件流程易生延宕，需預留彈性預備期並核實手續"},
    "合夥／加入新合作": {"key": "partnership", "name": "合夥／加入新合作", "icon": "🤝", "target_gods": ["比肩", "正印", "食神"], "favorable_desc": "優勢互補、資源互通，利於以清晰股權架構達成雙贏成果", "caution_desc": "比劫奪財之月，權責邊界不清或財務記賬模糊最易埋下隱患"}
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
            if m["ten_god"] in target_gods: match_score += 1.2
            if m["is_harmony"] or m["is_stem_combine"]: match_score += 0.8
            if m["is_clash"]: match_score -= 1.8
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
            timing_fit_analysis = f"閣下已有具體規劃（預計進行時點：{expected_timing}）。經八字流月矩陣推算，建議將關鍵簽約、面試談判或公開發布之節點精準鎖定在【{best_month_item['period']}（{best_month_item['month_stem_branch']}月）】，而將前期溝通或法務合約校對安排在【{secondary_month_item['period']}】。請嚴格避開【{caution_month_item['period']}】之動盪窗口。"
        elif plan_status == "正在考慮":
            timing_fit_analysis = f"目前處於深度權衡階段（預期窗口：{expected_timing}）。此心態極度契合命理節奏，當前至【{secondary_month_item['period']}】為最佳沙盤推演期，可透過小步快跑驗證可行性；若各項要素齊備，於【{best_month_item['period']}】發力推進能取得倍增效果。"
        else:
            timing_fit_analysis = f"目前尚未下定決心。八字建議順應時令節奏，不急於盲動承諾。可先行關注【{best_month_item['period']}】前後出現之貴人引薦或外界契機，若信號明朗再作定奪。"

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
