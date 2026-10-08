from typing import Dict, Any, List
from .bazi_scoring_100 import calculate_bazi_100_points

STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

STEM_ELEMENT = {
    "甲": "木", "乙": "木", "丙": "火", "丁": "火",
    "戊": "土", "己": "土", "庚": "金", "辛": "金",
    "壬": "水", "癸": "水"
}

BRANCH_ELEMENT = {
    "子": "水", "丑": "土", "寅": "木", "卯": "木",
    "辰": "土", "巳": "火", "午": "火", "未": "土",
    "申": "金", "酉": "金", "戌": "土", "亥": "水"
}

GENERATING_ELEMENT = {"木": "火", "火": "土", "土": "金", "金": "水", "水": "木"}
CONTROLLED_ELEMENT = {"木": "土", "土": "水", "水": "火", "火": "金", "金": "木"}
CONTROLLING_ELEMENT = {"木": "金", "火": "水", "土": "木", "金": "火", "水": "土"}

INDUSTRY_BY_ELEMENT = {
    "木": {
        "industries": "文化教育、傳媒出版、醫藥大健康、綠色環保、設計諮詢、農業林業",
        "roles": "內容研發、人才培養、品牌企劃、策略諮詢、非營利項目運作",
        "colors": "青綠色、翠綠、碧綠、原木色",
        "directions": "東方、東南方",
        "environment": "採光柔和、多綠植點綴、木質家具陳設、通風良好的清幽空間"
    },
    "火": {
        "industries": "人工智能（AI）、新能源、電子科技、文化娛樂、傳媒影視、餐飲品牌",
        "roles": "市場拓展、品牌公關、演講主持、創意設計、前沿科技推廣",
        "colors": "朱砂紅、紫羅蘭、暖橙色、亮粉紅",
        "directions": "南方",
        "environment": "光線充足、明亮大氣、視野開闊、活力充沛的高層現代化辦公空間"
    },
    "土": {
        "industries": "房地產建築、基礎建設、資產管理、倉儲物流、諮詢管理、農業土地",
        "roles": "財務風控、資產審計、後勤保障、大型物資調配、團隊中樞協調",
        "colors": "駝色、米黃色、咖啡色、大地棕",
        "directions": "本地、西南方、東北方",
        "environment": "厚重穩健、格局方正、靠山厚實（背有實牆）、安靜沈穩的辦公環境"
    },
    "金": {
        "industries": "金融證券、精密製造、五金硬體、法律稽核、高端鐘錶、硬體科技",
        "roles": "財務管理、法務合規、精算分析、質量把控、核心技術攻堅",
        "colors": "純白、銀灰、香檳金、金屬亮色",
        "directions": "西方、西北方",
        "environment": "極簡線條、金屬質感裝飾、整潔俐落、高效無雜亂的現代化格局"
    },
    "水": {
        "industries": "現代物流、跨國商貿、國際貿易、電子商務、諮詢顧問、水利海洋",
        "roles": "商務拓展（BD）、公關傳播、全球供應鏈協同、動態市場分析",
        "colors": "深海藍、墨黑、霧霾藍、深藍色",
        "directions": "北方",
        "environment": "動線靈活流暢、臨水或配備流動水景、空間靈動多變的開放式辦公格局"
    }
}

SIX_HARMONIES = {"子": "丑", "丑": "子", "寅": "亥", "亥": "寅", "卯": "戌", "戌": "卯", "辰": "酉", "酉": "辰", "巳": "申", "申": "巳", "午": "未", "未": "午"}
SIX_CLASHES = {"子": "午", "午": "子", "丑": "未", "未": "丑", "寅": "申", "申": "寅", "卯": "酉", "酉": "卯", "辰": "戌", "戌": "辰", "巳": "亥", "亥": "巳"}
STEM_COMBINATIONS = {"甲": "己", "己": "甲", "乙": "庚", "庚": "乙", "丙": "辛", "辛": "丙", "丁": "壬", "壬": "丁", "戊": "癸", "癸": "戊"}

def analyze_career_profile(bazi_result: Dict[str, Any]) -> Dict[str, Any]:
    day_stem = bazi_result["day_master"]["stem"]
    day_elem = STEM_ELEMENT.get(day_stem, "木")
    scoring = calculate_bazi_100_points(bazi_result["pillars"], day_stem)
    is_strong = scoring["is_strong"]
    favorable_element = scoring["favorable_element"]
    
    wealth_elem = CONTROLLED_ELEMENT.get(day_elem, "土")
    officer_elem = CONTROLLING_ELEMENT.get(day_elem, "金")
    
    if is_strong:
        if favorable_element == wealth_elem:
            pattern_name = "食傷生財 · 巨商拓殖格"
            work_mode = "合夥創業／商業操盤／自由職業商業化（商業變現型）"
            strengths = ["商業直覺極佳，善於發現市場藍海並轉化為具體利潤", "資源整合力強，擅長以小博大、商務談判具說服力", "執行節奏快，對現金流具備天生敏感度"]
            blind_spots = ["戰線容易拉得過長，耐性隨專案週期變長而減弱", "排斥常規行政審批流程，需搭配嚴謹細緻的二把手配合"]
        elif favorable_element == officer_elem:
            pattern_name = "官印雙全 · 貴氣統籌格"
            work_mode = "大型集團受薪高管／跨國企業中樞／體制內重要職能（權責管理型）"
            strengths = ["組織架構協調力強，善於制定標準與規章制度", "具備天然威信，深得上級與平台信任，善於推動複雜跨部門專案", "抗壓沉穩，具備戰略定力，在逆境中能保持冷靜決策"]
            blind_spots = ["過度重視合規與完美主義，有時決策偏向保守而略失先機", "對權責邊界過於敏感，容易在人事糾葛中產生內耗"]
        else:
            pattern_name = "建祿成格 · 開疆立業格"
            work_mode = "獨立創業／新業務項目總監（PM）／合夥打拼（先鋒開拓型）"
            strengths = ["執行力超群，敢打硬仗，面對逆境韌性極強", "行動力極快，開疆拓土先鋒，敢為人先", "團隊帶領具江湖義氣，凝聚核心骨幹力強"]
            blind_spots = ["容易獨攬重任不願分權，授權意識較弱", "性格剛烈直爽，需防職場暗流與人際口舌摩擦"]
    else:
        pattern_name = "印綬護身 · 專業威望格"
        work_mode = "獨立顧問／專業技術壁壘／文化傳媒／自由職業者（專業深度型）"
        strengths = ["專業技術專精深入，具有極高壁壘的知識儲備與研發創造力", "邏輯思維縝密，善於總結方法論，在垂直細分領域極受尊重", "處事謙遜穩健，具備良好的學術與品牌口碑"]
        blind_spots = ["對純商業博弈或人際宮鬥較為排斥，不擅長主動爭取利益曝光", "過度追求完美主義，容易在前期準備中拖延專案落地的最佳時機"]

    pillars = bazi_result["pillars"]
    wealth_count = sum(1 for p in pillars.values() if STEM_ELEMENT.get(p.get("stem")) == wealth_elem or BRANCH_ELEMENT.get(p.get("branch")) == wealth_elem)
    direct_stars = min(5, max(1, 2 + (1 if is_strong else 0) + (1 if wealth_count > 1 else 0)))
    indirect_stars = min(5, max(1, 2 + (2 if favorable_element == wealth_elem else 0)))
    fav_info = INDUSTRY_BY_ELEMENT.get(favorable_element, INDUSTRY_BY_ELEMENT["金"])

    return {
        "pattern_name": pattern_name,
        "industry_directions": fav_info["industries"],
        "functional_roles": fav_info["roles"],
        "work_mode": work_mode,
        "direct_wealth_stars": direct_stars,
        "indirect_wealth_stars": indirect_stars,
        "strengths": strengths,
        "blind_spots": blind_spots,
        "favorable_colors": fav_info["colors"],
        "favorable_directions": fav_info["directions"],
        "favorable_environment": fav_info["environment"]
    }

def generate_36m_career_matrix(bazi_result: Dict[str, Any]) -> List[Dict[str, Any]]:
    day_stem = bazi_result["day_master"]["stem"]
    day_branch = bazi_result["pillars"]["day"]["branch"]
    day_elem = STEM_ELEMENT.get(day_stem, "木")
    wealth_elem = CONTROLLED_ELEMENT.get(day_elem, "土")
    officer_elem = CONTROLLING_ELEMENT.get(day_elem, "金")

    matrix = []
    start_year, start_month = 2026, 10
    for idx in range(36):
        total_m = start_year * 12 + (start_month - 1) + idx
        y, m = total_m // 12, (total_m % 12) + 1
        y_stem, y_branch = STEMS[(y - 4) % 10], BRANCHES[(y - 4) % 12]
        m_branch = BRANCHES[(m + 1) % 12]
        m_stem = STEMS[((y % 5) * 2 + m + 1) % 10]

        career_score, wealth_score, promotion_score, job_change_score = 6.8, 6.6, 6.2, 5.5
        if SIX_HARMONIES.get(day_branch) == m_branch:
            career_score += 1.8; wealth_score += 1.5; promotion_score += 2.0; job_change_score += 1.2
        if STEM_COMBINATIONS.get(day_stem) == m_stem:
            career_score += 1.5; wealth_score += 1.8; promotion_score += 1.5
        if BRANCH_ELEMENT.get(m_branch) == wealth_elem or STEM_ELEMENT.get(m_stem) == wealth_elem:
            wealth_score += 1.6; career_score += 0.8
        if BRANCH_ELEMENT.get(m_branch) == officer_elem or STEM_ELEMENT.get(m_stem) == officer_elem:
            promotion_score += 2.2; career_score += 1.2
        if SIX_CLASHES.get(day_branch) == m_branch:
            career_score -= 1.8; wealth_score -= 1.2; job_change_score += 2.8

        wave = ((idx * 7 + ord(day_stem)) % 10 - 4.5) * 0.15
        matrix.append({
            "period": f"{y}/{m:02d}",
            "year_stem_branch": f"{y_stem}{y_branch}",
            "month_stem_branch": f"{m_stem}{m_branch}",
            "career_score": round(min(9.9, max(3.5, career_score + wave)), 1),
            "wealth_score": round(min(9.9, max(3.5, wealth_score + wave)), 1),
            "promotion_score": round(min(9.9, max(3.0, promotion_score + wave)), 1),
            "job_change_score": round(min(9.9, max(3.0, job_change_score + wave)), 1)
        })
    return matrix

def generate_career_navigation_report(bazi_result: Dict[str, Any]) -> str:
    profile = analyze_career_profile(bazi_result)
    matrix = generate_36m_career_matrix(bazi_result)
    top_career = [f"{x['period']} ({x['career_score']}分)" for x in sorted(matrix, key=lambda x: x["career_score"], reverse=True)[:3]]
    top_wealth = [f"{x['period']} ({x['wealth_score']}分)" for x in sorted(matrix, key=lambda x: x["wealth_score"], reverse=True)[:3]]
    top_change = [f"{x['period']} ({x['job_change_score']}分)" for x in sorted(matrix, key=lambda x: x["job_change_score"], reverse=True)[:3]]
    caution = [f"{x['period']} (防波折)" for x in sorted(matrix, key=lambda x: x["career_score"])[:3]]

    p = bazi_result["pillars"]
    return f"""# 丁蔓山｜命理誌 · 事業／財運・未來36個月
> 服務定價：官方深度手冊 (HK$188)
> 生辰八字：{p['year']['stem']}{p['year']['branch']}年 {p['month']['stem']}{p['month']['branch']}月 {p['day']['stem']}{p['day']['branch']}日 {p['hour']['stem']}{p['hour']['branch']}時

## A. 事業格局
- **命主事業格局**：{profile['pattern_name']}
- **適合的行業方向**：{profile['industry_directions']}
- **適合的職能方向**：{profile['functional_roles']}
- **適合的工作模式**：{profile['work_mode']}
- **正財運勢**：{'★' * profile['direct_wealth_stars']}
- **偏財運勢**：{'★' * profile['indirect_wealth_stars']}

## B. 未來36個月重點月份
- 事業最旺：{'、'.join(top_career)}
- 財運最旺：{'、'.join(top_wealth)}
- 適合轉工：{'、'.join(top_change)}
- 留意波折：{'、'.join(caution)}

## C. 事業有利因素
- 有利顏色：{profile['favorable_colors']}
- 有利方位：{profile['favorable_directions']}
- 有利環境：{profile['favorable_environment']}
"""
