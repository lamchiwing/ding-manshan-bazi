"""
Ten Gods (十神) Calculation Module
Determines the relationship between the Day Master (日主) stem and any other stem.
"""

from .constants import STEM_PROPERTIES, ELEMENT_GENERATION, ELEMENT_RESTRICTION

TEN_GODS_TABLE = {
    # (Same/Generates/Restricted, Same_Polarity)
}

def get_ten_god(day_stem: str, target_stem: str) -> str:
    """
    Calculate the Ten God relationship of target_stem relative to day_stem.
    """
    if not day_stem or not target_stem:
        return ""
    
    day_prop = STEM_PROPERTIES.get(day_stem)
    tar_prop = STEM_PROPERTIES.get(target_stem)
    if not day_prop or not tar_prop:
        return ""
    
    day_elem = day_prop["element"]
    tar_elem = tar_prop["element"]
    same_polarity = (day_prop["yin_yang"] == tar_prop["yin_yang"])

    # 1. Same element (同我者)
    if day_elem == tar_elem:
        return "比肩" if same_polarity else "劫財"
    
    # 2. Day generates Target (我生者 - 食傷)
    if ELEMENT_GENERATION[day_elem] == tar_elem:
        return "食神" if same_polarity else "傷官"
    
    # 3. Day restricts Target (我剋者 - 財星)
    if ELEMENT_RESTRICTION[day_elem] == tar_elem:
        return "偏財" if same_polarity else "正財"
    
    # 4. Target restricts Day (剋我者 - 官殺)
    if ELEMENT_RESTRICTION[tar_elem] == day_elem:
        return "七殺" if same_polarity else "正官"
    
    # 5. Target generates Day (生我者 - 印星)
    if ELEMENT_GENERATION[tar_elem] == day_elem:
        return "偏印" if same_polarity else "正印"
    
    return ""
