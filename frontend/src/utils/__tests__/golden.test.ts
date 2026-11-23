// 黃金測試：TS 引擎對照 shared/golden_cases.json（與 Python 測試同一份資料）
// 執行（在 frontend/ 目錄，Node 22+）：node --experimental-strip-types --test src/utils/__tests__/golden.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { calculateLocalBazi } from '../baziLocalEngine.ts';

const DATA = JSON.parse(readFileSync(new URL('../../../../shared/golden_cases.json', import.meta.url), 'utf-8'));

test('TS 引擎符合黃金案例（asserted）', () => {
  const failures: string[] = [];
  for (const c of DATA.cases) {
    if (c.status !== 'asserted') continue;
    let got: any, first = '';
    try {
      const r: any = calculateLocalBazi(c.birth_date, c.birth_time, c.gender);
      got = Object.fromEntries(['year', 'month', 'day', 'hour'].map(k => [k, r.pillars[k].gan_zhi]));
      first = r.luck_cycles[0].gan_zhi;
    } catch (e: any) { failures.push(`${c.id}: 例外 ${e.message}`); continue; }
    const exp = c.expected;
    if (['year', 'month', 'day', 'hour'].some(k => got[k] !== exp[k]) || first !== c.expected_luck.first_pillar)
      failures.push(`${c.id} ${c.birth_date} ${c.birth_time} ${c.gender}: 得 ${JSON.stringify(got)} 首運${first} / 應為 ${JSON.stringify(exp)} 首運${c.expected_luck.first_pillar}`);
  }
  assert.equal(failures.length, 0, `${failures.length} 個案例不符:\n` + failures.slice(0, 15).join('\n'));
});

test('起運歲數不再是固定 5 歲', () => {
  const ages = new Set<number>();
  for (const [d, t, g] of [['1990-03-10', '10:00', 'male'], ['1985-11-20', '08:00', 'female'], ['2000-06-15', '15:00', 'male'], ['1977-01-25', '03:00', 'female']] as const) {
    const r: any = calculateLocalBazi(d, t, g);
    ages.add(r.luck_cycles[0].start_age);
  }
  assert.ok(ages.size > 1, `起運歲數全部相同: ${[...ages]}`);
});
