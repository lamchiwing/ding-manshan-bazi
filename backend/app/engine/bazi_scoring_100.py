"""
Ding Manshan Bazi - Quantitative 100-Point Five Elements & Lifestyle Engine
丁蔓山｜命理誌 · 八字五行量化計分法（100分制，含地支餘氣與乾濕土拆分）
100% 依據官方 DataBasic 規範：
- 天干佔 36 分（年干 8，月干 10，日干 10，時干 8）
- 地支佔 64 分（月令 28，日支 16，年支 10，時支 10）
- 土拆分為「乾土（戌、未）」與「濕土（辰、丑）」
- 同黨得分 >= 50 為身強，< 50 為身弱
- 產出極具商業價值、客觀理性的「一頁式行動指南」
"""

from typing import Dict, Any, Tuple, List

# 地支藏干（本氣、中氣、餘氣）五行對照表
BRANCH_HIDDEN_ELEMENTS = {
    "子": [("水", "本氣")],
    "丑": [("濕土", "本氣"), ("水", "中氣"), ("金", "餘氣")],
    "寅": [("木", "本氣"), ("火", "中氣"), ("乾土", "餘氣")],
    "卯": [("木", "本氣")],
    "辰": [("濕土", "本氣"), ("木", "中氣"), ("水", "餘氣")],
    "巳": [("火", "本氣"), ("金", "中氣"), ("乾土", "餘氣")],
    "午": [("火", "本氣"), ("乾土", "中氣")],
    "未": [("乾土", "本氣"), ("火", "中氣"), ("木", "餘氣")],
    "申": [("金", "本氣"), ("水", "中氣"), ("濕土", "餘氣")],
    "酉": [("金", "本氣")],
    "戌": [("乾土", "本氣"), ("金", "中氣"), ("火", "餘氣")],
    "亥": [("水", "本氣"), ("木", "中氣")]
}

STEM_ELEMENT_MAP = {
    "甲": "木", "乙": "木",
    "丙": "火", "丁": "火",
    "戊": "乾土", "己": "濕土",
    "庚": "金", "辛": "金",
    "壬": "水", "癸": "水"
}

# 五行相生關係 (生我者為印)
RESOURCE_ELEMENT = {
    "木": ["水"],
    "火": ["木"],
    "乾土": ["火"],
    "濕土": ["火"],
    "金": ["乾土", "濕土"],
    "水": ["金"]
}

def calculate_bazi_100_points(pillars: Dict[str, Any], day_stem: str) -> Dict[str, Any]:
    """
    八字五行量化計分法（含地支餘氣，100分制）：
    - 天干（4個字，共36分）：年干8，月干10，日干10，時干8
    - 地支（4個字，共64分）：
      * 月令（28分）：本氣16、中氣8、餘氣4（純本氣28分；只有中氣則20/8）
      * 日支（16分）：本氣10、中氣4、餘氣2（純本氣16分；只有中氣則12/4）
      * 年支（10分）：本氣6、中氣3、餘氣1（純本氣10分；只有中氣則7/3）
      * 時支（10分）：本氣6、中氣3、餘氣1（純本氣10分；只有中氣則7/3）
    """
    scores = {"木": 0.0, "火": 0.0, "乾土": 0.0, "濕土": 0.0, "金": 0.0, "水": 0.0}

    # 1. 天干計分 (36分)
    scores[STEM_ELEMENT_MAP[pillars["year"]["stem"]]] += 8.0
    scores[STEM_ELEMENT_MAP[pillars["month"]["stem"]]] += 10.0
    scores[STEM_ELEMENT_MAP[pillars["day"]["stem"]]] += 10.0
    scores[STEM_ELEMENT_MAP[pillars["hour"]["stem"]]] += 8.0

    # 2. 地支計分 (64分)
    def assign_branch_scores(branch: str, total_points: float, mode: str):
        hidden = BRANCH_HIDDEN_ELEMENTS[branch]
        if len(hidden) == 1:
            scores[hidden[0][0]] += total_points
        elif len(hidden) == 2:
            if mode == "month":
                scores[hidden[0][0]] += 20.0
                scores[hidden[1][0]] += 8.0
            elif mode == "day":
                scores[hidden[0][0]] += 12.0
                scores[hidden[1][0]] += 4.0
            else: # year or hour (10 pts)
                scores[hidden[0][0]] += 7.0
                scores[hidden[1][0]] += 3.0
        elif len(hidden) == 3:
            if mode == "month":
                scores[hidden[0][0]] += 16.0
                scores[hidden[1][0]] += 8.0
                scores[hidden[2][0]] += 4.0
            elif mode == "day":
                scores[hidden[0][0]] += 10.0
                scores[hidden[1][0]] += 4.0
                scores[hidden[2][0]] += 2.0
            else: # year or hour
                scores[hidden[0][0]] += 6.0
                scores[hidden[1][0]] += 3.0
                scores[hidden[2][0]] += 1.0

    assign_branch_scores(pillars["month"]["branch"], 28.0, "month")
    assign_branch_scores(pillars["day"]["branch"], 16.0, "day")
    assign_branch_scores(pillars["year"]["branch"], 10.0, "year")
    assign_branch_scores(pillars["hour"]["branch"], 10.0, "hour")

    # 3. 身強身弱判斷
    day_elem = STEM_ELEMENT_MAP[day_stem]
    same_elements = [day_elem]
    if day_elem in ["乾土", "濕土"]:
        same_elements = ["乾土", "濕土"]
    
    resource_elems = RESOURCE_ELEMENT.get(day_elem, [])
    same_party_score = sum(scores[e] for e in same_elements) + sum(scores[e] for e in resource_elems)
    is_strong = same_party_score >= 50.0

    return {
        "scores": scores,
        "same_party_score": round(same_party_score, 1),
        "is_strong": is_strong,
        "strength_label": "身強" if is_strong else "身弱"
    }
