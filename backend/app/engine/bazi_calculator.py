"""
Deterministic Bazi Calculation Engine
Fully compliant with Bazi Calculation Engine Brief v1.0.0.
"""

from datetime import datetime, date, time, timedelta, timezone
import math
from .constants import (
    STEMS, BRANCHES, STEM_PROPERTIES, BRANCH_PROPERTIES,
    HIDDEN_STEMS, FIVE_TIGER_BASE, FIVE_RAT_BASE
)
from .solar_terms import (
    julian_day, get_lichun_datetime, get_all_jie_terms, get_solar_term_time, JIE_QI_MONTH_MAP
)
from .ten_gods import get_ten_god
from .changsheng import get_changsheng_stage
from .combinations import analyze_stem_relations, analyze_branch_relations
from .shensha import calculate_shen_sha

RULE_SET_VERSION = "1.0.0"
ENGINE_VERSION = "1.0.0"

def get_hour_branch(hour: int, minute: int) -> str:
    """Return hour branch based on 24-hour time"""
    total_mins = hour * 60 + minute
    # 23:00 to 00:59 is Zi (子)
    if total_mins >= 23 * 60 or total_mins < 1 * 60:
        return "子"
    branch_idx = (total_mins + 60) // 120
    return BRANCHES[branch_idx % 12]

def calculate_bazi(
    birth_date_str: str,
    birth_time_str: str,
    gender: str,
    day_boundary_rule: str = "ZI_START_NEXT_DAY",
    tz_offset_hours: float = 8.0
) -> dict:
    """
    Main deterministic calculation function.
    Returns complete standard JSON structure matching Brief v1.0.0.
    """
    tz = timezone(timedelta(hours=tz_offset_hours))
    
    # 1. Parse Input
    dt_parts = [int(p) for p in birth_date_str.split("-")]
    tm_parts = [int(p) for p in birth_time_str.split(":")]
    birth_dt = datetime(dt_parts[0], dt_parts[1], dt_parts[2], tm_parts[0], tm_parts[1], 0, tzinfo=tz)
    
    year_cal = birth_dt.year
    
    # 2. Solar Terms & Lichun check for Year Pillar
    lichun_current = get_lichun_datetime(year_cal, tz_offset_hours)
    lichun_next = get_lichun_datetime(year_cal + 1, tz_offset_hours)
    lichun_prev = get_lichun_datetime(year_cal - 1, tz_offset_hours)
    
    if birth_dt < lichun_current:
        bazi_year = year_cal - 1
        active_lichun = lichun_prev
    else:
        bazi_year = year_cal
        active_lichun = lichun_current
        
    year_stem_idx = (bazi_year - 4) % 10
    year_branch_idx = (bazi_year - 4) % 12
    year_stem = STEMS[year_stem_idx]
    year_branch = BRANCHES[year_branch_idx]
    
    # 3. Month Pillar Calculation
    # Find matching JieQi for the birth_year
    jie_terms = get_all_jie_terms(bazi_year, tz_offset_hours)
    # Find which interval birth_dt falls into
    month_branch = None
    curr_term_name = None
    next_term_dt = None
    prev_term_dt = None
    
    for i, jterm in enumerate(jie_terms):
        t_dt = jterm["local_datetime"]
        if i == len(jie_terms) - 1:
            # Last term is Xiaohan of bazi_year+1
            # Next would be Lichun of bazi_year+1
            next_t_dt = lichun_next if bazi_year == year_cal else get_lichun_datetime(bazi_year + 1, tz_offset_hours)
        else:
            next_t_dt = jie_terms[i + 1]["local_datetime"]
            
        if t_dt <= birth_dt < next_t_dt:
            month_branch = jterm["month_branch"]
            curr_term_name = jterm["term_name"]
            prev_term_dt = t_dt
            next_term_dt = next_t_dt
            break
            
    if not month_branch:
        # Fallback if before first jie_term (rare boundary)
        month_branch = "丑"
        curr_term_name = "小寒"
        prev_term_dt = active_lichun
        next_term_dt = jie_terms[0]["local_datetime"]

    # Month stem by 五虎遁
    tiger_base_stem = FIVE_TIGER_BASE[year_stem]
    tiger_stem_idx = STEMS.index(tiger_base_stem)
    # Month branch offset from 寅 (寅=0, 卯=1, 辰=2, ... 丑=11)
    month_branch_order = ["寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥", "子", "丑"]
    m_offset = month_branch_order.index(month_branch)
    month_stem = STEMS[(tiger_stem_idx + m_offset) % 10]

    # 4. Day Pillar Calculation (Sexagenary calculation using JDN)
    calc_date = date(dt_parts[0], dt_parts[1], dt_parts[2])
    # Check if hour >= 23:00 and rule is ZI_START_NEXT_DAY
    is_next_day_zi = (tm_parts[0] >= 23 and day_boundary_rule == "ZI_START_NEXT_DAY")
    if is_next_day_zi:
        calc_date = calc_date + timedelta(days=1)
        
    calc_dt_noon = datetime(calc_date.year, calc_date.month, calc_date.day, 12, 0, 0, tzinfo=timezone.utc)
    jd_day = julian_day(calc_dt_noon)
    day_stem_idx = int((math.floor(jd_day + 0.5) + 49) % 10)
    day_branch_idx = int((math.floor(jd_day + 0.5) + 49) % 12)
    day_stem = STEMS[day_stem_idx]
    day_branch = BRANCHES[day_branch_idx]

    # 5. Hour Pillar Calculation
    hour_branch = get_hour_branch(tm_parts[0], tm_parts[1])
    rat_base_stem = FIVE_RAT_BASE[day_stem]
    rat_stem_idx = STEMS.index(rat_base_stem)
    h_offset = BRANCHES.index(hour_branch)
    hour_stem = STEMS[(rat_stem_idx + h_offset) % 10]

    # 6. Hidden Stems & Ten Gods calculation
    four_pillars = {
        "year": {"stem": year_stem, "branch": year_branch, "pillar_name": "年柱"},
        "month": {"stem": month_stem, "branch": month_branch, "pillar_name": "月柱"},
        "day": {"stem": day_stem, "branch": day_branch, "pillar_name": "日柱"},
        "hour": {"stem": hour_stem, "branch": hour_branch, "pillar_name": "時柱"},
    }

    stems_list = [year_stem, month_stem, day_stem, hour_stem]
    branches_list = [year_branch, month_branch, day_branch, hour_branch]

    pillars_output = {}
    hidden_stems_output = {}
    ten_gods_output = {
        "stems": {},
        "hidden_stems": {}
    }
    changsheng_output = {}

    # Calculate for each pillar
    for p_key, p_val in four_pillars.items():
        s = p_val["stem"]
        b = p_val["branch"]
        
        # Ten God of main stem
        tg_main = "日主" if p_key == "day" else get_ten_god(day_stem, s)
        ten_gods_output["stems"][p_key] = tg_main
        
        # Hidden stems for branch
        h_stems = HIDDEN_STEMS[b]
        h_list = []
        for hs, pos, weight in h_stems:
            hs_tg = get_ten_god(day_stem, hs)
            h_list.append({
                "stem": hs,
                "position": pos,
                "weight": weight,
                "ten_god": hs_tg,
                "element": STEM_PROPERTIES[hs]["element"]
            })
        hidden_stems_output[p_key] = h_list
        
        # Changsheng stage for branch
        cs_info = get_changsheng_stage(day_stem, b)
        changsheng_output[p_key] = cs_info
        
        pillars_output[p_key] = {
            "stem": s,
            "branch": b,
            "gan_zhi": f"{s}{b}",
            "stem_element": STEM_PROPERTIES[s]["element"],
            "stem_yin_yang": STEM_PROPERTIES[s]["yin_yang"],
            "branch_element": BRANCH_PROPERTIES[b]["element"],
            "branch_yin_yang": BRANCH_PROPERTIES[b]["yin_yang"],
            "ten_god": tg_main,
            "hidden_stems": h_list,
            "changsheng": cs_info["stage"]
        }

    # 7. Five Elements Proportion Calculation
    # Weigh stems (1.0 each) and hidden stems (by weight)
    element_scores = {"木": 0.0, "火": 0.0, "土": 0.0, "金": 0.0, "水": 0.0}
    for s in stems_list:
        elem = STEM_PROPERTIES[s]["element"]
        element_scores[elem] += 1.0
    for b in branches_list:
        for hs, pos, weight in HIDDEN_STEMS[b]:
            elem = STEM_PROPERTIES[hs]["element"]
            element_scores[elem] += weight

    total_score = sum(element_scores.values()) or 1.0
    element_percentages = {k: round((v / total_score) * 100, 1) for k, v in element_scores.items()}
    # Dominant Element
    dominant_element = max(element_scores, key=element_scores.get)

    # 8. Relations
    stem_relations = analyze_stem_relations(stems_list)
    branch_relations = analyze_branch_relations(branches_list)

    # 9. Shen Sha
    shen_sha_result = calculate_shen_sha(
        year_stem, year_branch, month_branch, day_stem, day_branch, hour_branch
    )

    # 10. Da Yun (大運) Calculation
    # Gender: male / female
    is_male = (gender.lower() == "male")
    year_is_yang = (STEM_PROPERTIES[year_stem]["yin_yang"] == "陽")
    # Rule: Yang Male or Yin Female => Forward (順); Yin Male or Yang Female => Backward (逆)
    is_forward = (is_male and year_is_yang) or ((not is_male) and (not year_is_yang))
    
    # Calculate starting age (起運歲數)
    if prev_term_dt and next_term_dt:
        if is_forward:
            diff_secs = (next_term_dt - birth_dt).total_seconds()
        else:
            diff_secs = (birth_dt - prev_term_dt).total_seconds()
        diff_days = max(0.0, diff_secs / 86400.0)
        # 3 days = 1 year, 1 day = 4 months
        start_age = max(1, int(round(diff_days / 3.0)))
    else:
        start_age = 5

    # 8 steps of Da Yun
    luck_cycles = []
    curr_m_stem_idx = STEMS.index(month_stem)
    curr_m_branch_idx = BRANCHES.index(month_branch)
    
    for seq in range(1, 9):
        step = seq if is_forward else -seq
        dy_stem = STEMS[(curr_m_stem_idx + step) % 10]
        dy_branch = BRANCHES[(curr_m_branch_idx + step) % 12]
        c_age_start = start_age + (seq - 1) * 10
        c_age_end = c_age_start + 9
        c_year_start = year_cal + c_age_start
        c_year_end = c_year_start + 9
        
        luck_cycles.append({
            "sequence": seq,
            "start_age": c_age_start,
            "end_age": c_age_end,
            "start_year": c_year_start,
            "end_year": c_year_end,
            "stem": dy_stem,
            "branch": dy_branch,
            "gan_zhi": f"{dy_stem}{dy_branch}",
            "ten_god": get_ten_god(day_stem, dy_stem),
            "element": STEM_PROPERTIES[dy_stem]["element"],
            "changsheng": get_changsheng_stage(day_stem, dy_branch)["stage"]
        })

    # 11. Current Annual Cycles (Next 6 years: 2026, 2027, 2028, 2029, 2030, 2031)
    annual_cycles = []
    base_year = datetime.now().year
    for y in range(base_year, base_year + 6):
        y_stem_idx = (y - 4) % 10
        y_branch_idx = (y - 4) % 12
        y_stem = STEMS[y_stem_idx]
        y_branch = BRANCHES[y_branch_idx]
        annual_cycles.append({
            "year": y,
            "stem": y_stem,
            "branch": y_branch,
            "gan_zhi": f"{y_stem}{y_branch}",
            "ten_god": get_ten_god(day_stem, y_stem),
            "element": STEM_PROPERTIES[y_stem]["element"],
            "changsheng": get_changsheng_stage(day_stem, y_branch)["stage"]
        })

    # 12. Monthly Cycles for current year
    monthly_cycles = []
    curr_yr_stem_idx = (base_year - 4) % 10
    curr_yr_stem = STEMS[curr_yr_stem_idx]
    curr_yr_tiger_stem = FIVE_TIGER_BASE[curr_yr_stem]
    curr_yr_tiger_stem_idx = STEMS.index(curr_yr_tiger_stem)
    
    for m_idx, m_branch in enumerate(month_branch_order):
        m_stem = STEMS[(curr_yr_tiger_stem_idx + m_idx) % 10]
        monthly_cycles.append({
            "month_order": m_idx + 1,
            "month_branch": m_branch,
            "month_stem": m_stem,
            "gan_zhi": f"{m_stem}{m_branch}",
            "ten_god": get_ten_god(day_stem, m_stem),
            "element": STEM_PROPERTIES[m_stem]["element"],
            "changsheng": get_changsheng_stage(day_stem, m_branch)["stage"]
        })

    # Construct Final JSON structure
    output_json = {
        "input": {
            "birth_date": birth_date_str,
            "birth_time": birth_time_str,
            "gender": gender
        },
        "calendar": {
            "solar_date": birth_date_str,
            "solar_term": {
                "current_jie": curr_term_name,
                "lichun": active_lichun.strftime("%Y-%m-%d %H:%M:%S")
            },
            "year_boundary": "lichun",
            "month_boundary": "solar_term",
            "day_boundary": day_boundary_rule
        },
        "day_master": {
            "stem": day_stem,
            "element": STEM_PROPERTIES[day_stem]["element"],
            "yin_yang": STEM_PROPERTIES[day_stem]["yin_yang"],
            "display": f"{day_stem}{STEM_PROPERTIES[day_stem]['element']}"
        },
        "pillars": pillars_output,
        "elements": {
            "percentages": element_percentages,
            "scores": element_scores,
            "dominant_element": dominant_element
        },
        "hidden_stems": hidden_stems_output,
        "ten_gods": ten_gods_output,
        "changsheng": changsheng_output,
        "stem_relations": stem_relations,
        "branch_relations": branch_relations,
        "shen_sha": shen_sha_result,
        "luck_cycles": luck_cycles,
        "annual_cycles": annual_cycles,
        "monthly_cycles": monthly_cycles,
        "meta": {
            "rule_set_version": RULE_SET_VERSION,
            "engine_version": ENGINE_VERSION
        }
    }
    return output_json
