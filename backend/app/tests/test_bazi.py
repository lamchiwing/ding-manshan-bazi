"""
Bazi Calculation Engine Unit Tests
Testing deterministic outputs across critical cases and edge boundaries.
"""

from app.engine.bazi_calculator import calculate_bazi
from app.engine.solar_terms import get_lichun_datetime

def test_1990_sample():
    # 1990-05-20 23:30 male (brief sample)
    res = calculate_bazi("1990-05-20", "23:30", "male")
    assert res["pillars"]["year"]["gan_zhi"] == "庚午"
    assert res["meta"]["engine_version"] == "1.0.0"
    assert res["pillars"]["hour"]["branch"] == "子"

def test_1975_attachment_case():
    # Alison from attachment: 1975-03-21 12:59 female -> 乙卯 己卯 丙寅 甲午
    res = calculate_bazi("1975-03-21", "12:59", "female")
    assert res["pillars"]["year"]["gan_zhi"] == "乙卯"
    assert res["pillars"]["month"]["gan_zhi"] == "己卯"
    assert res["pillars"]["day"]["gan_zhi"] == "丙寅"
    assert res["pillars"]["hour"]["gan_zhi"] == "甲午"
    assert res["day_master"]["display"] == "丙火"

def test_ui_brief_2026_case():
    # UI brief sample: 2026-07-14 21:00 -> 丙午 乙未 己酉 乙亥
    res = calculate_bazi("2026-07-14", "21:00", "male")
    assert res["pillars"]["year"]["gan_zhi"] == "丙午"
    assert res["pillars"]["hour"]["branch"] == "亥"
    assert "elements" in res
    assert "shen_sha" in res
