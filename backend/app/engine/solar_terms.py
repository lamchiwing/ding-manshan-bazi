"""
Solar Terms (二十四節氣) Astronomical Calculation Engine
Accurate calculation of exact solar term transition datetimes.
"""

import math
from datetime import datetime, timezone, timedelta

# List of 24 Solar Terms in order starting with 立春 (Solar Longitude 315°)
SOLAR_TERMS_NAMES = [
    "立春", "雨水", "驚蟄", "春分", "清明", "穀雨",
    "立夏", "小滿", "芒種", "夏至", "小暑", "大暑",
    "立秋", "處暑", "白露", "秋分", "寒露", "霜降",
    "立冬", "小雪", "大雪", "冬至", "小寒", "大寒"
]

# The 12 Jie Qi that define the 12 Month Branches:
# Month Branch index: 寅=2, 卯=3, 辰=4, 巳=5, 午=6, 未=7, 申=8, 酉=9, 戌=10, 亥=11, 子=0, 丑=1
JIE_QI_MONTH_MAP = [
    ("立春", "寅", 315.0),
    ("驚蟄", "卯", 345.0),
    ("清明", "辰", 15.0),
    ("立夏", "巳", 45.0),
    ("芒種", "午", 75.0),
    ("小暑", "未", 105.0),
    ("立秋", "申", 135.0),
    ("白露", "酉", 165.0),
    ("寒露", "戌", 195.0),
    ("立冬", "亥", 225.0),
    ("大雪", "子", 255.0),
    ("小寒", "丑", 285.0),
]

def julian_day(dt: datetime) -> float:
    """Calculate Julian Day from UTC datetime"""
    y = dt.year
    m = dt.month
    d = dt.day + (dt.hour + dt.minute / 60.0 + dt.second / 3600.0) / 24.0
    if m <= 2:
        y -= 1
        m += 12
    a = math.floor(y / 100)
    b = 2 - a + math.floor(a / 4)
    jd = math.floor(365.25 * (y + 4716)) + math.floor(30.6001 * (m + 1)) + d + b - 1524.5
    return jd

def jd_to_datetime(jd: float) -> datetime:
    """Convert Julian Day back to UTC datetime"""
    z = math.floor(jd + 0.5)
    f = (jd + 0.5) - z
    if z < 2299161:
        a = z
    else:
        alpha = math.floor((z - 1867216.25) / 36524.25)
        a = z + 1 + alpha - math.floor(alpha / 4)
    b = a + 1524
    c = math.floor((b - 122.1) / 365.25)
    d = math.floor(365.25 * c)
    e = math.floor((b - d) / 30.6001)
    day = b - d - math.floor(30.6001 * e) + f
    month = e - 1 if e < 14 else e - 13
    year = c - 4716 if month > 2 else c - 4715

    day_int = int(day)
    frac_day = day - day_int
    hours = frac_day * 24.0
    h_int = int(hours)
    mins = (hours - h_int) * 60.0
    m_int = int(mins)
    secs = int(round((mins - m_int) * 60.0))
    if secs >= 60:
        secs -= 60
        m_int += 1
    if m_int >= 60:
        m_int -= 60
        h_int += 1
    if h_int >= 24:
        h_int -= 24
        day_int += 1

    return datetime(year, month, day_int, h_int, m_int, secs, tzinfo=timezone.utc)

def solar_apparent_longitude(jd: float) -> float:
    """Calculate Sun's apparent celestial longitude in degrees (0 to 360)"""
    t = (jd - 2451545.0) / 36525.0
    # Mean anomaly
    m = 357.5291092 + 35999.0502909 * t - 0.0001536 * t * t
    m = math.radians(m % 360.0)
    # Mean longitude
    l0 = 280.46646 + 36000.76983 * t + 0.0003032 * t * t
    # Equation of center
    c = (1.914602 - 0.004817 * t - 0.000014 * t * t) * math.sin(m) + \
        (0.019993 - 0.000101 * t) * math.sin(2 * m) + \
        0.000289 * math.sin(3 * m)
    # True longitude
    true_l = l0 + c
    # Nutation & aberration correction
    omega = math.radians(125.04 - 1934.136 * t)
    lambda_apparent = true_l - 0.00569 - 0.00478 * math.sin(omega)
    return lambda_apparent % 360.0

def get_solar_term_time(year: int, target_angle: float) -> datetime:
    """Find exact UTC datetime when solar longitude equals target_angle for given year"""
    # Estimate approximate day of year for the angle
    # 0 deg (Chunfen) is ~ March 20 (day 80)
    angle_offset = (target_angle - 315.0) % 360.0  # 315 deg is Lichun ~ Feb 4
    approx_days_from_feb4 = (angle_offset / 360.0) * 365.2422
    est_dt = datetime(year, 2, 4, 12, 0, 0, tzinfo=timezone.utc) + timedelta(days=approx_days_from_feb4)
    jd = julian_day(est_dt)

    # Newton-Raphson iteration
    for _ in range(8):
        cur_angle = solar_apparent_longitude(jd)
        diff = (target_angle - cur_angle + 180.0) % 360.0 - 180.0
        if abs(diff) < 0.00001:
            break
        # Sun moves roughly 360/365.2422 degrees per day
        jd += diff / (360.0 / 365.2422)

    return jd_to_datetime(jd)

def get_year_solar_terms(year: int, tz_offset_hours: float = 8.0):
    """
    Get all 24 solar terms for a given year in local timezone (default UTC+8)
    Returns list of dicts: { name, angle, local_datetime, utc_datetime }
    """
    tz = timezone(timedelta(hours=tz_offset_hours))
    results = []
    # 24 terms starting with Lichun (315°) through Dahan (300°)
    for i, name in enumerate(SOLAR_TERMS_NAMES):
        angle = (315.0 + i * 15.0) % 360.0
        calc_year = year if angle >= 300.0 or angle <= 285.0 else year
        # Note: Xiao Han and Da Han (Jan) belong to early calendar year
        if name in ["小寒", "大寒"]:
            calc_year = year + 1
        utc_dt = get_solar_term_time(calc_year, angle)
        local_dt = utc_dt.astimezone(tz)
        results.append({
            "term_name": name,
            "term_index": i,
            "angle": angle,
            "utc_datetime": utc_dt.isoformat(),
            "local_datetime": local_dt.strftime("%Y-%m-%d %H:%M:%S"),
            "datetime_obj": local_dt
        })
    return results

def get_lichun_datetime(year: int, tz_offset_hours: float = 8.0) -> datetime:
    """Get Lichun (立春) datetime in local timezone"""
    utc_dt = get_solar_term_time(year, 315.0)
    tz = timezone(timedelta(hours=tz_offset_hours))
    return utc_dt.astimezone(tz)

def get_all_jie_terms(year: int, tz_offset_hours: float = 8.0):
    """
    Get the 12 Jie (節) transitions that bound the Chinese Bazi Months for the year.
    Ordered from Lichun (寅月) of the year through Xiaohan (丑月) of the next year.
    """
    tz = timezone(timedelta(hours=tz_offset_hours))
    jie_terms = []
    for term_name, month_branch, angle in JIE_QI_MONTH_MAP:
        calc_year = year
        if term_name == "小寒":
            calc_year = year + 1
        utc_dt = get_solar_term_time(calc_year, angle)
        local_dt = utc_dt.astimezone(tz)
        jie_terms.append({
            "term_name": term_name,
            "month_branch": month_branch,
            "angle": angle,
            "local_datetime": local_dt
        })
    return jie_terms
