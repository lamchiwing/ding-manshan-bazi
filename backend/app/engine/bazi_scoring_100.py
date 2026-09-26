from typing import Dict, Any

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
    "甲": "木", "乙": "木", "丙": "火", "丁": "火",
    "戊": "乾土", "己": "濕土", "庚": "金", "辛": "金",
    "壬": "水", "癸": "水"
}

RESOURCE_ELEMENT = {
    "木": ["水"], "火": ["木"], "乾土": ["火"],
    "濕土": ["火"], "金": ["乾土", "濕土"], "水": ["金"]
}

def calculate_bazi_100_points(pillars: Dict[str, Any], day_stem: str) -> Dict[str, Any]:
    scores = {"木": 0.0, "火": 0.0, "乾土": 0.0, "濕土": 0.0, "金": 0.0, "水": 0.0}
    scores[STEM_ELEMENT_MAP[pillars["year"]["stem"]]] += 8.0
    scores[STEM_ELEMENT_MAP[pillars["month"]["stem"]]] += 10.0
    scores[STEM_ELEMENT_MAP[pillars["day"]["stem"]]] += 10.0
    scores[STEM_ELEMENT_MAP[pillars["hour"]["stem"]]] += 8.0

    def assign_branch_scores(branch: str, total_points: float, mode: str):
        hidden = BRANCH_HIDDEN_ELEMENTS[branch]
        if len(hidden) == 1:
            scores[hidden[0][0]] += total_points
        elif len(hidden) == 2:
            if mode == "month":
                scores[hidden[0][0]] += 20.0; scores[hidden[1][0]] += 8.0
            elif mode == "day":
                scores[hidden[0][0]] += 12.0; scores[hidden[1][0]] += 4.0
            else:
                scores[hidden[0][0]] += 7.0; scores[hidden[1][0]] += 3.0
        elif len(hidden) == 3:
            if mode == "month":
                scores[hidden[0][0]] += 16.0; scores[hidden[1][0]] += 8.0; scores[hidden[2][0]] += 4.0
            elif mode == "day":
                scores[hidden[0][0]] += 10.0; scores[hidden[1][0]] += 4.0; scores[hidden[2][0]] += 2.0
            else:
                scores[hidden[0][0]] += 6.0; scores[hidden[1][0]] += 3.0; scores[hidden[2][0]] += 1.0

    assign_branch_scores(pillars["month"]["branch"], 28.0, "month")
    assign_branch_scores(pillars["day"]["branch"], 16.0, "day")
    assign_branch_scores(pillars["year"]["branch"], 10.0, "year")
    assign_branch_scores(pillars["hour"]["branch"], 10.0, "hour")

    day_elem = STEM_ELEMENT_MAP[day_stem]
    same_elements = [day_elem] if day_elem not in ["乾土", "濕土"] else ["乾土", "濕土"]
    resource_elems = RESOURCE_ELEMENT.get(day_elem, [])
    same_party_score = sum(scores[e] for e in same_elements) + sum(scores[e] for e in resource_elems)
    is_strong = same_party_score >= 50.0

    return {
        "scores": scores,
        "same_party_score": round(same_party_score, 1),
        "is_strong": is_strong,
        "strength_label": "身強" if is_strong else "身弱"
    }
