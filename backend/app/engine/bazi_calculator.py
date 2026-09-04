"""
Deterministic Bazi Calculation Engine
Fully compliant with Bazi Calculation Engine Brief v1.0.0.
Supports 早子時 (00:00 - 00:59) and 夜子時 (23:00 - 23:59).
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
    """Return hour branch based on 24-hour time.
    00:00-00:59 is 早子時, 23:00-23:59 is 夜子時, both branch = 子.
    """
    if hour == 23 or hour == 0:
        return "子"
    total_mins = hour * 60 + minute
    branch_idx = (total_mins + 60) // 120
    return BRANCHES[branch_idx % 12]

def get_zi_type_label(hour: int) -> str:
    """Return specific label if in Zi hour"""
    if hour == 0:
        return "早子時 (00:00-00:59)"
    elif hour == 23:
        return "夜子時 (23:00-23:59)"
    return ""

def calculate_bazi(
    birth_date_str: str,
    birth_time_str: str,
    gender: str,
    day_boundary_rule: str = "EARLY_LATE_ZI",
    tz_offset_hours: float = 8.0
) -> dict:
    """
    Main deterministic calculation function.
    Supports 早子時 (00:00-00:59) and 夜子時 (23:00-23:59) distinction.
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
    jie_terms = get_all_jie_terms(bazi_year, tz_offset_hours)
    month_branch = None
    curr_term_name = None
    next_term_dt = None
    prev_term_dt = None
    
    for i, jterm in enumerate(jie_terms):
        t_dt = jterm["local_datetime"]
        if i == len(jie_terms) - 1:
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
        month_branch = "丑"
        curr_term_name = "小寒"
        prev_term_dt = active_lichun
        next_term_dt = jie_terms[0]["local_datetime"]

    # Month stem by 五虎遁
    tiger_base_stem = FIVE_TIGER_BASE[year_stem]
    tiger_stem_idx = STEMS.index(tiger_base_stem)
    month_branch_order = ["寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥", "子", "丑"]
    m_offset = month_branch_order.index(month_branch)
    month_stem = STEMS[(tiger_stem_idx + m_offset) % 10]

    # 4. Day Pillar Calculation (Sexagenary calculation using JDN)
    calc_date = date(dt_parts[0], dt_parts[1], dt_parts[2])
    
    if day_boundary_rule == "ZI_START_NEXT_DAY" and tm_parts[0] >= 23:
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
    zi_label = get_zi_type_label(tm_parts[0])

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

    for p_key, p_val in four_pillars.items():
        s = p_val["stem"]
        b = p_val["branch"]
        
        tg_main = "日主" if p_key == "day" else get_ten_god(day_stem, s)
        ten_gods_output["stems"][p_key] = tg_main
        
        h_stems = HIDDEN_STEMS[b]
        h_list = []
        for h in h_stems:
            h_stem, h_pos, h_weight = h[0], h[1], h[2]
            h_tg = get_ten_god(day_stem, h_stem)
            h_list.append({
                "stem": h_stem,
                "position": h_pos,
                "weight": h_weight,
                "ten_god": h_tg,
                "element": STEM_PROPERTIES[h_stem]["element"]
            })
        hidden_stems_output[p_key] = h_list
        
        cs_stage = get_changsheng_stage(day_stem, b)
        changsheng_output[p_key] = cs_stage
        
        p_data = {
            "gan_zhi": f"{s}{b}",
            "stem": s,
            "branch": b,
            "stem_element": STEM_PROPERTIES[s]["element"],
            "branch_element": BRANCH_PROPERTIES[b]["element"],
            "stem_yin_yang": STEM_PROPERTIES[s]["yin_yang"],
            "branch_yin_yang": BRANCH_PROPERTIES[b]["yin_yang"],
            "ten_god": tg_main,
            "changsheng": cs_stage,
            "hidden_stems": h_list
        }
        if p_key == "hour" and zi_label:
            p_data["zi_type"] = zi_label
        pillars_output[p_key] = p_data

    # 7. Five Elements Energy Distribution
    element_weights = {"木": 0.0, "火": 0.0, "土": 0.0, "金": 0.0, "水": 0.0}
    for s in stems_list:
        elem = STEM_PROPERTIES[s]["element"]
        element_weights[elem] += 1.0
    for b in branches_list:
        for h in HIDDEN_STEMS[b]:
            h_stem, h_weight = h[0], h[2]
            elem = STEM_PROPERTIES[h_stem]["element"]
            element_weights[elem] += h_weight

    total_weight = sum(element_weights.values()) or 1.0
    element_percentages = {
        k: round((v / total_weight) * 100, 1) for k, v in element_weights.items()
    }
    dominant_element = max(element_weights, key=element_weights.get)

    # 8. Da Yun (Luck Cycles - 8 Decades)
    is_male = (gender.lower() == "male")
    is_yang_year = (STEM_PROPERTIES[year_stem]["yin_yang"] == "陽")
    is_forward = (is_male and is_yang_year) or (not is_male and not is_yang_year)

    curr_m_stem_idx = STEMS.index(month_stem)
    curr_m_branch_idx = BRANCHES.index(month_branch)

    if is_forward:
        diff_seconds = (next_term_dt - birth_dt).total_seconds()
    else:
        diff_seconds = (birth_dt - prev_term_dt).total_seconds()
        
    diff_days = diff_seconds / 86400.0
    start_age_years = round(diff_days / 3.0, 1)
    base_start_age = max(1, int(round(start_age_years)))

    luck_cycles = []
    for seq in range(1, 9):
        step = seq if is_forward else -seq
        dy_stem = STEMS[(curr_m_stem_idx + step) % 10]
        dy_branch = BRANCHES[(curr_m_branch_idx + step) % 12]
        cycle_start_age = base_start_age + (seq - 1) * 10
        cycle_end_age = cycle_start_age + 9
        cycle_start_year = bazi_year + cycle_start_age
        cycle_end_year = cycle_start_year + 9
        
        dy_tg = get_ten_god(day_stem, dy_stem)
        dy_cs = get_changsheng_stage(day_stem, dy_branch)
        
        luck_cycles.append({
            "sequence": seq,
            "start_age": cycle_start_age,
            "end_age": cycle_end_age,
            "start_year": cycle_start_year,
            "end_year": cycle_end_year,
            "stem": dy_stem,
            "branch": dy_branch,
            "gan_zhi": f"{dy_stem}{dy_branch}",
            "ten_god": dy_tg,
            "element": STEM_PROPERTIES[dy_stem]["element"],
            "changsheng": dy_cs
        })

    # 9. Annual Cycles (流年運勢盤 2026 - 2031+)
    annual_cycles = []
    current_year = datetime.now(tz).year
    for y in range(current_year, current_year + 6):
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
            "changsheng": get_changsheng_stage(day_stem, y_branch)
        })

    # 10. Monthly Cycles for current year
    monthly_cycles = []
    curr_yr_stem_idx = (current_year - 4) % 10
    curr_yr_stem = STEMS[curr_yr_stem_idx]
    curr_yr_tiger_stem = FIVE_TIGER_BASE[curr_yr_stem]
    curr_yr_tiger_idx = STEMS.index(curr_yr_tiger_stem)
    for m_idx in range(12):
        m_b = month_branch_order[m_idx]
        m_s = STEMS[(curr_yr_tiger_idx + m_idx) % 10]
        monthly_cycles.append({
            "month_order": m_idx + 1,
            "month_branch": m_b,
            "month_stem": m_s,
            "gan_zhi": f"{m_s}{m_b}",
            "ten_god": get_ten_god(day_stem, m_s),
            "element": STEM_PROPERTIES[m_s]["element"],
            "changsheng": get_changsheng_stage(day_stem, m_b)
        })

    # 11. Combinations & Clashes
    stem_relations = analyze_stem_relations(stems_list)
    branch_relations = analyze_branch_relations(branches_list)

    # 12. Shen Sha
    shen_sha_result = calculate_shen_sha(year_stem, year_branch, month_branch, day_stem, day_branch, hour_branch)

    meta_dict = {
        "engine_version": ENGINE_VERSION,
        "rule_set_version": RULE_SET_VERSION,
        "calculated_at_utc": datetime.now(timezone.utc).isoformat(),
        "day_boundary_rule": day_boundary_rule,
        "timezone_offset_hours": tz_offset_hours,
        "zi_hour_classification": zi_label or "平時辰"
    }

    elements_dict = {
        "weights": element_weights,
        "percentages": element_percentages,
        "dominant_element": dominantElement if 'dominantElement' in locals() else dominant_element
    }

    return {
        "meta": meta_dict,
        "metadata": meta_dict,
        "input": {
            "birth_date": birth_date_str,
            "birth_time": birth_time_str,
            "gender": gender
        },
        "day_master": {
            "stem": day_stem,
            "element": STEM_PROPERTIES[day_stem]["element"],
            "yin_yang": STEM_PROPERTIES[day_stem]["yin_yang"],
            "display": f"{day_stem}{STEM_PROPERTIES[day_stem]['element']}"
        },
        "pillars": pillars_output,
        "elements": elements_dict,
        "luck_cycles": luck_cycles,
        "annual_cycles": annual_cycles,
        "monthly_cycles": monthly_cycles,
        "combinations_and_clashes": {
            "stems": stem_relations,
            "branches": branch_relations
        },
        "shen_sha": shen_sha_result
    }
