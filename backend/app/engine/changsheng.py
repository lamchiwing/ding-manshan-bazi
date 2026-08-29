"""
Twelve Changsheng (十二長生) Calculation Module
Calculates the life cycle stage of a heavenly stem in a earthly branch.
"""

from .constants import BRANCHES, CHANGSHENG_STAGES, CHANGSHENG_STARTS

def get_changsheng_stage(day_stem: str, branch: str) -> dict:
    """
    Given day_stem and earthly branch, return stage name and stage index (0-11).
    """
    if day_stem not in CHANGSHENG_STARTS or branch not in BRANCHES:
        return {"stage": "", "index": -1}
    
    start_branch, direction = CHANGSHENG_STARTS[day_stem]
    start_idx = BRANCHES.index(start_branch)
    target_idx = BRANCHES.index(branch)
    
    if direction == 1:
        step = (target_idx - start_idx) % 12
    else:
        step = (start_idx - target_idx) % 12
        
    stage_name = CHANGSHENG_STAGES[step]
    return {
        "stage": stage_name,
        "index": step
    }
