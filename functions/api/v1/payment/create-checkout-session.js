// Cloudflare Pages Function: /api/v1/payment/create-checkout-session
//
// 價錢一律由「伺服器端目錄」決定，不接受瀏覽器傳來的 amount_hkd，也不使用瀏覽器傳來的服務名稱。
// 這是過渡措施：目錄暫時寫在此檔；之後會改為由資料庫 services 表讀取（見 services catalog 設計）。
// 修改價錢時請同步更新 frontend/src/data/services.ts 的 price_hkd，測試會檢查兩者一致。

const CATALOG_VERSION = "2026-11-23-server-catalog-v1";

// 固定價錢服務（HK$）
const FIXED_PRICE = {
  // 線上報告
  "srv-five-elements":       { price: 128, name: "五行喜忌指南" },
  "srv-love-3yr":            { price: 188, name: "姻緣導航‧未來3年" },
  "srv-career-3yr":          { price: 188, name: "事業／財運‧未來3年" },
  "srv-startup-3yr":         { price: 288, name: "創業／拓展‧未來3年" },
  "srv-12-months":           { price: 368, name: "十二流月運程" },
  "srv-12-months-decisions": { price: 488, name: "十二流月運程＋重大決策" },
  // 預約類（原本由瀏覽器傳金額，現固定為目前實際收費）
  "srv-annual-inquiry":      { price: 2800, name: "流年問事" },
  "srv-inquiry-matter":      { price: 2800, name: "問事求謀" },
  "srv-baby-naming":         { price: 2800, name: "小兒定名" },
  "srv-auspicious-date":     { price: 2800, name: "吉時擇日" },
  "srv-company-naming":      { price: 3800, name: "公司定號" },
};
// 計價方式特殊的服務
const SPECIAL = new Set([
  "srv-master-bazi", "srv-home-fengshui-layout", "srv-corp-fengshui-layout",
  "srv-home-inspection", "srv-corp-inspection",
]);
// 尚未開放購買
const NOT_AVAILABLE = new Set(["srv-bazi-navigation-3yr", "srv-synastry", "srv-house-fengshui"]);

const JSON_HEADERS = { "Content-Type": "application/json" };
const fail = (status, error, message) =>
  new Response(JSON.stringify({ error, message }), { status, headers: JSON_HEADERS });

const clip = (v, n) => String(v ?? "").slice(0, n);
const isPlainNumber = (v) => (typeof v === "number" || (typeof v === "string" && v.trim() !== "")) && Number.isFinite(Number(v));

export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    let body;
    try { body = await request.json(); } catch { return fail(400, "INVALID_JSON", "請求內容不是有效的 JSON"); }
    if (!body || typeof body !== "object" || Array.isArray(body)) return fail(400, "INVALID_BODY", "請求內容格式錯誤");

    const stripeKey = env.STRIPE_SECRET_KEY || "";
    if (!stripeKey) {
      return fail(400, "STRIPE_SECRET_KEY_NOT_CONFIGURED",
        "請在 Cloudflare Pages 後台 Settings -> Variables and Secrets 中加入 STRIPE_SECRET_KEY");
    }

    const service_id = body.service_id;
    if (typeof service_id !== "string") return fail(400, "UNKNOWN_SERVICE", "缺少或無效的服務編號");
    if (NOT_AVAILABLE.has(service_id)) return fail(400, "SERVICE_NOT_AVAILABLE", "此服務尚未開放購買");
    if (!(service_id in FIXED_PRICE) && !SPECIAL.has(service_id)) return fail(400, "UNKNOWN_SERVICE", "未知的服務編號");

    const client_name = clip(body.client_name, 100);
    const client_phone = clip(body.client_phone, 40);
    const booking_date = clip(body.booking_date, 40);
    const time_slot = clip(body.time_slot, 40);
    const fengshui_address = clip(body.fengshui_address, 200);
    let client_email = "";
    if (body.client_email !== undefined && body.client_email !== null && body.client_email !== "") {
      client_email = clip(body.client_email, 254);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client_email)) return fail(400, "INVALID_EMAIL", "電郵格式不正確");
    }

    // ===== 伺服器端計價 =====
    let finalAmount, productName, productDesc;
    const who = `預約人：${client_name || "客人"} (${client_phone})`;

    if (service_id in FIXED_PRICE) {
      finalAmount = FIXED_PRICE[service_id].price;
      productName = `丁蔓山 · ${FIXED_PRICE[service_id].name}`;
      productDesc = who;
    } else if (service_id === "srv-master-bazi") {
      finalAmount = 2400;
      productName = "丁蔓山 · 八字論命（前事排查訂金）";
      productDesc = "先判前事，若資料有誤續談不果只收訂金。餘額 HK$2,400 於收取前事報告後 7 天內繳付。";
    } else if (service_id === "srv-home-fengshui-layout" || service_id === "srv-corp-fengshui-layout") {
      const isHome = service_id === "srv-home-fengshui-layout";
      let s = isHome ? 500 : 600;
      if (body.sqft !== undefined && body.sqft !== null && body.sqft !== "") {
        if (!isPlainNumber(body.sqft)) return fail(400, "INVALID_SQFT", "實用面積必須是數字");
        s = Number(body.sqft);
        if (s < 20 || s > 100000) return fail(400, "INVALID_SQFT", "實用面積超出合理範圍");
      }
      finalAmount = isHome ? Math.max(18000, s * 28) : Math.max(28000, s * 38);
      productName = `丁蔓山 · ${isHome ? "家居" : "公司"}風水佈局（${s} 平方呎）`;
      productDesc = `實用面積 ${s} 平方呎（HK$${isHome ? 28 : 38}/平方呎，最低消費 HK$${isHome ? "18,000" : "28,000"}）。${isHome ? "地址" : "公司地址"}：${fengshui_address || "已提供"}`;
    } else {
      // srv-home-inspection / srv-corp-inspection
      const isHome = service_id === "srv-home-inspection";
      const units = body.inspection_units === undefined || body.inspection_units === null ? [] : body.inspection_units;
      if (!Array.isArray(units) || units.length > 50 || units.some((u) => !u || typeof u !== "object" || Array.isArray(u))) {
        return fail(400, "INVALID_UNITS", "查宅單位資料格式不正確");
      }
      const uCount = Math.max(1, units.length);
      const extraU = Math.max(0, uCount - 3);
      const distinctR = new Set(units.map((u) => clip(u.region, 100).trim()).filter(Boolean)).size;
      const rCount = Math.max(1, distinctR);
      const extraR = Math.max(0, rCount - 1);
      const base = isHome ? 18000 : 28000, unitRate = isHome ? 1000 : 1300, regionRate = isHome ? 1200 : 1800;
      finalAmount = base + extraU * unitRate + extraR * regionRate;
      productName = `丁蔓山 · ${isHome ? "家居" : "公司"}查宅（${uCount} 單位 / ${rCount} 地區）`;
      productDesc = `${isHome ? "查宅服務包" : "公司查宅包"} 3 單位及 1 地區。額外單位 +HK$${extraU * unitRate}，跨區 +HK$${extraR * regionRate}。`;
    }

    const unitAmountCents = Math.round(finalAmount * 100);

    // 使用用戶目前瀏覽的網域作為付款後返回位址（測試站不使用 FRONTEND_URL）
    const requestOrigin = request.headers.get("origin") || new URL(request.url).origin;
    let frontendUrl = requestOrigin;
    if (env.FRONTEND_URL && !requestOrigin.includes("pages.dev")) frontendUrl = env.FRONTEND_URL;

    const formData = new URLSearchParams();
    formData.append("payment_method_types[0]", "card");
    formData.append("mode", "payment");
    if (client_email) {
      formData.append("customer_email", client_email);
      formData.append("payment_intent_data[receipt_email]", client_email);
    }
    formData.append("payment_intent_data[description]", `${productName} - 預約人: ${client_name}`);
    formData.append("client_reference_id", `bk_${service_id}_${Date.now()}`);

    formData.append("line_items[0][price_data][currency]", "hkd");
    formData.append("line_items[0][price_data][unit_amount]", unitAmountCents.toString());
    formData.append("line_items[0][price_data][product_data][name]", productName);
    formData.append("line_items[0][price_data][product_data][description]", productDesc);
    formData.append("line_items[0][quantity]", "1");

    formData.append("success_url", `${frontendUrl}/?payment_status=success&session_id={CHECKOUT_SESSION_ID}&service_id=${service_id}`);
    formData.append("cancel_url", `${frontendUrl}/?payment_status=cancelled&service_id=${service_id}`);

    formData.append("metadata[service_id]", service_id);
    formData.append("metadata[client_name]", client_name);
    formData.append("metadata[client_phone]", client_phone);
    formData.append("metadata[booking_date]", booking_date);
    formData.append("metadata[time_slot]", time_slot);
    formData.append("metadata[amount_hkd]", String(finalAmount));
    formData.append("metadata[price_source]", "server_catalog");
    formData.append("metadata[catalog_version]", CATALOG_VERSION);

    const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: { Authorization: `Bearer ${stripeKey}`, "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });
    const stripeData = await stripeRes.json();

    if (!stripeRes.ok || stripeData.error) {
      return new Response(
        JSON.stringify({ error: "STRIPE_API_ERROR", message: stripeData.error ? stripeData.error.message : "Stripe API error", detail: stripeData }),
        { status: 400, headers: JSON_HEADERS }
      );
    }

    return new Response(
      JSON.stringify({ checkout_url: stripeData.url, session_id: stripeData.id, amount_hkd: finalAmount }),
      { status: 200, headers: JSON_HEADERS }
    );
  } catch (err) {
    return fail(500, "SERVER_ERROR", err.message);
  }
}
