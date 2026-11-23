// 結帳函式測試（價錢必須由伺服器決定）。
// 執行（在 repo 根目錄，Node 22+）：
//   node --experimental-strip-types --test tests/payment/create-checkout-session.test.mjs
// 測試檔刻意放在 functions/ 之外，否則 Cloudflare 會把它當成 API 路由。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const funcPath = process.env.FUNC_PATH || path.join(root, 'functions/api/v1/payment/create-checkout-session.js');
const src = readFileSync(funcPath, 'utf8');
const mod = await import('data:text/javascript;base64,' + Buffer.from(src).toString('base64'));
const { BOOKING_SERVICES, SIDEBAR_PRICE_LIST } = await import(path.join(root, 'frontend/src/data/services.ts'));

// ---- 模擬 Stripe：記錄送出的金額，不連網 ----
let stripeCalls = [];
globalThis.fetch = async (url, init) => {
  const p = new URLSearchParams(init.body);
  stripeCalls.push(p);
  return new Response(JSON.stringify({ id: 'cs_test_123', url: 'https://checkout.stripe.com/pay/cs_test_123' }), { status: 200 });
};
async function call(body, env = { STRIPE_SECRET_KEY: 'sk_test_x' }, raw) {
  stripeCalls = [];
  const request = new Request('https://www.tingmanshan.com/api/v1/payment/create-checkout-session', {
    method: 'POST', headers: { 'Content-Type': 'application/json', origin: 'https://www.tingmanshan.com' },
    body: raw ?? JSON.stringify(body),
  });
  const res = await mod.onRequestPost({ request, env });
  return { status: res.status, json: await res.json(), stripe: stripeCalls[0] };
}
const cents = (r) => Number(r.stripe.get('line_items[0][price_data][unit_amount]'));

const ONLINE = { 'srv-five-elements': 128, 'srv-love-3yr': 188, 'srv-career-3yr': 188, 'srv-startup-3yr': 288, 'srv-12-months': 368, 'srv-12-months-decisions': 488 };
const BOOKING = { 'srv-annual-inquiry': 2800, 'srv-inquiry-matter': 2800, 'srv-baby-naming': 2800, 'srv-auspicious-date': 2800, 'srv-company-naming': 3800 };

for (const [id, price] of Object.entries({ ...ONLINE, ...BOOKING })) {
  test(`${id}：瀏覽器傳來的金額 1 元也必須收 HK$${price}`, async () => {
    const r = await call({ service_id: id, service_title: '免費', amount_hkd: 1, client_name: 'A' });
    assert.equal(r.status, 200); assert.equal(cents(r), price * 100);
  });
  test(`${id}：沒有傳金額也收 HK$${price}（不再預設 2800）`, async () => {
    const r = await call({ service_id: id });
    assert.equal(r.status, 200); assert.equal(cents(r), price * 100);
  });
}

test('瀏覽器傳來的服務名稱不會顯示在付款頁', async () => {
  const r = await call({ service_id: 'srv-love-3yr', service_title: '白送一份', amount_hkd: 1 });
  assert.ok(!r.stripe.get('line_items[0][price_data][product_data][name]').includes('白送'));
  assert.ok(r.stripe.get('line_items[0][price_data][product_data][name]').includes('姻緣導航'));
});
test('未知服務編號：拒絕且不呼叫 Stripe', async () => {
  const r = await call({ service_id: 'srv-hacked', amount_hkd: 1 });
  assert.equal(r.status, 400); assert.equal(r.json.error, 'UNKNOWN_SERVICE'); assert.equal(r.stripe, undefined);
});
test('網址注入式服務編號：拒絕', async () => {
  const r = await call({ service_id: 'srv-love-3yr&payment_status=success' });
  assert.equal(r.status, 400); assert.equal(r.stripe, undefined);
});
for (const id of ['srv-bazi-navigation-3yr', 'srv-synastry', 'srv-house-fengshui']) {
  test(`${id}：即將登場，不可購買`, async () => {
    const r = await call({ service_id: id, amount_hkd: 1 });
    assert.equal(r.status, 400); assert.equal(r.json.error, 'SERVICE_NOT_AVAILABLE'); assert.equal(r.stripe, undefined);
  });
}
test('八字論命：固定收訂金 HK$2,400', async () => {
  const r = await call({ service_id: 'srv-master-bazi', amount_hkd: 1 });
  assert.equal(r.status, 200); assert.equal(cents(r), 240000);
});
test('風水佈局：家居 500 呎 = 最低消費 18,000；1000 呎 = 28,000；公司 600 呎 = 最低 28,000', async () => {
  assert.equal(cents(await call({ service_id: 'srv-home-fengshui-layout', sqft: 500, amount_hkd: 1 })), 1800000);
  assert.equal(cents(await call({ service_id: 'srv-home-fengshui-layout', sqft: 1000 })), 2800000);
  assert.equal(cents(await call({ service_id: 'srv-corp-fengshui-layout', sqft: 600 })), 2800000);
  assert.equal(cents(await call({ service_id: 'srv-corp-fengshui-layout', sqft: '1000' })), 3800000);
});
test('風水佈局：無效面積被拒絕（文字、負數、過大）', async () => {
  for (const sqft of ['abc', -5, 0, 1e9]) {
    const r = await call({ service_id: 'srv-home-fengshui-layout', sqft });
    assert.equal(r.status, 400, `sqft=${sqft}`); assert.equal(r.stripe, undefined);
  }
});
test('查宅：5 單位 2 地區 = 18,000 + 2×1,000 + 1×1,200', async () => {
  const units = [{ region: '港島' }, { region: '九龍' }, { region: '九龍' }, { region: '九龍' }, { region: '港島' }];
  assert.equal(cents(await call({ service_id: 'srv-home-inspection', inspection_units: units, amount_hkd: 1 })), 2120000);
});
test('公司查宅：4 單位 3 地區 = 28,000 + 1×1,300 + 2×1,800', async () => {
  const units = [{ region: 'A' }, { region: 'B' }, { region: 'C' }, { region: 'A' }];
  assert.equal(cents(await call({ service_id: 'srv-corp-inspection', inspection_units: units })), 3290000);
});
test('查宅：單位資料格式錯誤或過多被拒絕', async () => {
  for (const units of ['x', { a: 1 }, [1, 2], new Array(51).fill({ region: 'A' })]) {
    const r = await call({ service_id: 'srv-home-inspection', inspection_units: units });
    assert.equal(r.status, 400); assert.equal(r.stripe, undefined);
  }
});
test('無效電郵被拒絕；有效電郵被帶到 Stripe', async () => {
  assert.equal((await call({ service_id: 'srv-love-3yr', client_email: 'not-an-email' })).status, 400);
  const ok = await call({ service_id: 'srv-love-3yr', client_email: 'a@b.com' });
  assert.equal(ok.stripe.get('customer_email'), 'a@b.com');
});
test('付款返回網址只含已驗證的服務編號；metadata 記錄價錢來源', async () => {
  const r = await call({ service_id: 'srv-love-3yr' });
  assert.ok(r.stripe.get('success_url').endsWith('&service_id=srv-love-3yr'));
  assert.equal(r.stripe.get('metadata[price_source]'), 'server_catalog');
});
test('無效 JSON、沒有 Stripe 金鑰：維持原本的 400 回應', async () => {
  assert.equal((await call(null, undefined, '{bad')).status, 400);
  const r = await call({ service_id: 'srv-love-3yr' }, {});
  assert.equal(r.status, 400); assert.equal(r.json.error, 'STRIPE_SECRET_KEY_NOT_CONFIGURED');
});
test('回傳內容含 checkout_url 與實際金額', async () => {
  const r = await call({ service_id: 'srv-12-months', amount_hkd: 1 });
  assert.equal(r.json.amount_hkd, 368); assert.ok(r.json.checkout_url.startsWith('https://checkout.stripe.com'));
});

// ---- 前端資料與伺服器目錄必須一致 ----
test('services.ts：每項服務顯示價錢 = price_hkd', () => {
  for (const s of [...BOOKING_SERVICES, ...SIDEBAR_PRICE_LIST]) {
    assert.equal(s.price_display, 'HK$' + s.price_hkd.toLocaleString('en-US'), `${s.id}: ${s.price_display} vs ${s.price_hkd}`);
  }
});
test('services.ts 的 price_hkd 與伺服器價錢一致（固定價服務）', () => {
  for (const s of [...BOOKING_SERVICES, ...SIDEBAR_PRICE_LIST]) {
    const expected = { ...ONLINE, ...BOOKING }[s.id];
    if (expected !== undefined) assert.equal(s.price_hkd, expected, s.id);
  }
});
test('services.ts：開放購買的服務都能在伺服器結帳；即將登場的都被擋下', async () => {
  for (const s of [...BOOKING_SERVICES, ...SIDEBAR_PRICE_LIST]) {
    const r = await call({ service_id: s.id });
    if (s.isComingSoon) assert.equal(r.status, 400, `${s.id} 應被擋`); else assert.equal(r.status, 200, `${s.id} 應可結帳`);
  }
});
