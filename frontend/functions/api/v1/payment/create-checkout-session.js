// Cloudflare Pages Function: /api/v1/payment/create-checkout-session
export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();

    const stripeKey = env.STRIPE_SECRET_KEY || "";
    if (!stripeKey) {
      return new Response(
        JSON.stringify({
          error: "STRIPE_SECRET_KEY_NOT_CONFIGURED",
          message: "請在 Cloudflare Pages 後台 Settings -> Variables and Secrets 中加入 STRIPE_SECRET_KEY",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const {
      service_id,
      service_title,
      amount_hkd,
      client_name,
      client_email,
      client_phone,
      booking_date,
      time_slot,
      sqft,
      fengshui_address,
      inspection_units,
      notes,
    } = body;

    // Calculate official amount
    let finalAmount = amount_hkd || 2800;
    let productName = `丁蔓山 · ${service_title}`;
    let productDesc = `預約人：${client_name || "客人"} (${client_phone || ""})`;

    if (service_id === "srv-master-bazi") {
      finalAmount = 2400;
      productName = "丁蔓山 · 八字論命（前事排查訂金）";
      productDesc = "先判前事，若資料有誤續談不果只收訂金。餘額 HK$2,400 於收取前事報告後 7 天內繳付。";
    } else if (service_id === "srv-home-fengshui-layout") {
      const s = sqft || 500;
      finalAmount = Math.max(18000, s * 28);
      productName = `丁蔓山 · 家居風水佈局（${s} 平方呎）`;
      productDesc = `實用面積 ${s} 平方呎（HK$28/平方呎，最低消費 HK$18,000）。地址：${fengshui_address || "已提供"}`;
    } else if (service_id === "srv-corp-fengshui-layout") {
      const s = sqft || 600;
      finalAmount = Math.max(28000, s * 38);
      productName = `丁蔓山 · 公司風水佈局（${s} 平方呎）`;
      productDesc = `實用面積 ${s} 平方呎（HK$38/平方呎，最低消費 HK$28,000）。公司地址：${fengshui_address || "已提供"}`;
    } else if (service_id === "srv-home-inspection") {
      const units = inspection_units || [];
      const uCount = Math.max(1, units.length);
      const extraU = Math.max(0, uCount - 3);
      const distinctR = new Set(units.map((u) => (u.region || "").trim()).filter(Boolean)).size;
      const rCount = Math.max(1, distinctR);
      const extraR = Math.max(0, rCount - 1);
      finalAmount = 18000 + extraU * 1000 + extraR * 1200;
      productName = `丁蔓山 · 家居查宅（${uCount} 單位 / ${rCount} 地區）`;
      productDesc = `查宅服務包 3 單位及 1 地區。額外單位 +HK$${extraU * 1000}，跨區 +HK$${extraR * 1200}。`;
    } else if (service_id === "srv-corp-inspection") {
      const units = inspection_units || [];
      const uCount = Math.max(1, units.length);
      const extraU = Math.max(0, uCount - 3);
      const distinctR = new Set(units.map((u) => (u.region || "").trim()).filter(Boolean)).size;
      const rCount = Math.max(1, distinctR);
      const extraR = Math.max(0, rCount - 1);
      finalAmount = 28000 + extraU * 1300 + extraR * 1800;
      productName = `丁蔓山 · 公司查宅（${uCount} 單位 / ${rCount} 地區）`;
      productDesc = `公司查宅包 3 單位及 1 地區。額外單位 +HK$${extraU * 1300}，跨區 +HK$${extraR * 1800}。`;
    }

    const unitAmountCents = Math.round(finalAmount * 100);
    const origin = new URL(request.url).origin;
    const frontendUrl = env.FRONTEND_URL || origin;

    // Build Stripe form URL-encoded payload
    const formData = new URLSearchParams();
    formData.append("payment_method_types[0]", "card");
    formData.append("mode", "payment");
    if (client_email) formData.append("customer_email", client_email);
    formData.append("client_reference_id", `bk_${service_id}_${Date.now()}`);

    formData.append("line_items[0][price_data][currency]", "hkd");
    formData.append("line_items[0][price_data][unit_amount]", unitAmountCents.toString());
    formData.append("line_items[0][price_data][product_data][name]", productName);
    formData.append("line_items[0][price_data][product_data][description]", productDesc);
    formData.append("line_items[0][quantity]", "1");

    formData.append(
      "success_url",
      `${frontendUrl}/?payment_status=success&session_id={CHECKOUT_SESSION_ID}&service_id=${service_id}`
    );
    formData.append(
      "cancel_url",
      `${frontendUrl}/?payment_status=cancelled&service_id=${service_id}`
    );

    formData.append("metadata[service_id]", service_id || "");
    formData.append("metadata[client_name]", client_name || "");
    formData.append("metadata[client_phone]", client_phone || "");
    formData.append("metadata[booking_date]", booking_date || "");
    formData.append("metadata[time_slot]", time_slot || "");
    formData.append("metadata[amount_hkd]", finalAmount.toString());

    // Call Stripe Official REST API directly from Cloudflare Edge
    const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const stripeData = await stripeRes.json();

    if (!stripeRes.ok || stripeData.error) {
      return new Response(
        JSON.stringify({
          error: "STRIPE_API_ERROR",
          message: stripeData.error ? stripeData.error.message : "Stripe API error",
          detail: stripeData,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        checkout_url: stripeData.url,
        session_id: stripeData.id,
        amount_hkd: finalAmount,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "SERVER_ERROR", message: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
