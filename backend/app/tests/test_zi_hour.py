import unittest
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

from app.engine.bazi_calculator import calculate_bazi

class TestZiHourCalculation(unittest.TestCase):
    def test_specified_case_19721128_2355(self):
        """
        1972年11月28日23:55 (晚子時)：
        子初換日（23:00-23:59）：日柱不變（維持當日 1972年11月28日 癸亥日），
        時柱按翌日（1972年11月29日 甲子日，天干為甲）配合五鼠遁計算（甲己還加甲 -> 甲子時）。
        四柱精確為：壬子年、辛亥月、癸亥日、甲子時。
        """
        res = calculate_bazi("1972-11-28", "23:55", "male")
        self.assertEqual(res["pillars"]["year"]["gan_zhi"], "壬子")
        self.assertEqual(res["pillars"]["month"]["gan_zhi"], "辛亥")
        self.assertEqual(res["pillars"]["day"]["gan_zhi"], "癸亥")
        self.assertEqual(res["pillars"]["hour"]["gan_zhi"], "甲子")
        self.assertEqual(res["pillars"]["hour"]["branch"], "子")
        self.assertEqual(res["pillars"]["hour"]["stem"], "甲")

    def test_early_zi_hour_19900520_0030(self):
        """
        1990-05-20 00:30 (早子時)：屬當日 (1990-05-20) 乙酉日 丙子時。
        """
        res_early = calculate_bazi("1990-05-20", "00:30", "male")
        self.assertEqual(res_early["pillars"]["day"]["gan_zhi"], "乙酉")
        self.assertEqual(res_early["pillars"]["hour"]["stem"], "丙") # 乙庚丙作初 -> 丙子時
        self.assertEqual(res_early["pillars"]["hour"]["branch"], "子")

    def test_late_zi_hour_19900520_2330(self):
        """
        1990-05-20 23:30 (晚子時)：日柱維持當日 (1990-05-20) 乙酉日，
        時柱按翌日 (1990-05-21 丙戌日，天干丙) 配合五鼠遁 (丙辛從戊起 -> 戊子時)。
        """
        res_late = calculate_bazi("1990-05-20", "23:30", "male")
        self.assertEqual(res_late["pillars"]["day"]["gan_zhi"], "乙酉") # 當日 乙酉日
        self.assertEqual(res_late["pillars"]["hour"]["stem"], "戊") # 丙辛從戊起 -> 戊子時
        self.assertEqual(res_late["pillars"]["hour"]["branch"], "子")

if __name__ == '__main__':
    unittest.main()