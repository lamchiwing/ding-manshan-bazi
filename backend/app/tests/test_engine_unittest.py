import unittest
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

from app.engine.bazi_calculator import calculate_bazi

class TestBaziCalculation(unittest.TestCase):
    def test_1990_sample(self):
        res = calculate_bazi("1990-05-20", "23:30", "male")
        self.assertEqual(res["pillars"]["year"]["gan_zhi"], "庚午")
        self.assertEqual(res["meta"]["engine_version"], "1.0.0")
        self.assertEqual(res["pillars"]["hour"]["branch"], "子")

    def test_1975_attachment_case(self):
        # Alison from attachment: 1975-03-21 12:59 female -> 乙卯 己卯 丙寅 甲午
        res = calculate_bazi("1975-03-21", "12:59", "female")
        self.assertEqual(res["pillars"]["year"]["gan_zhi"], "乙卯")
        self.assertEqual(res["pillars"]["month"]["gan_zhi"], "己卯")
        self.assertEqual(res["pillars"]["day"]["gan_zhi"], "丙寅")
        self.assertEqual(res["pillars"]["hour"]["gan_zhi"], "甲午")
        self.assertEqual(res["day_master"]["display"], "丙火")

    def test_ui_brief_2026_case(self):
        res = calculate_bazi("2026-07-14", "21:00", "male")
        self.assertEqual(res["pillars"]["year"]["gan_zhi"], "丙午")
        self.assertEqual(res["pillars"]["hour"]["branch"], "亥")
        self.assertTrue("elements" in res)
        self.assertTrue(len(res["luck_cycles"]) >= 8)

if __name__ == '__main__':
    unittest.main()
