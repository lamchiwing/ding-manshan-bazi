// Cloudflare Pages Function: /api/v1/bazi/five-elements-guide
// 丁蔓山｜命理誌 · 五行生活指南 API
export async function onRequestPost(context) {
  try {
    const { request } = context;
    const body = await request.json();
    const { birth_date, birth_time, gender = "male" } = body;

    if (!birth_date || !birth_time) {
      return new Response(JSON.stringify({ error: "Missing birth_date or birth_time" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Call backend bazi calculator or return deterministic report
    return new Response(JSON.stringify({
      success: true,
      service_id: "srv-five-elements",
      title: "五行喜忌指南",
      price_hkd: 128,
      birth_date,
      birth_time,
      gender
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
