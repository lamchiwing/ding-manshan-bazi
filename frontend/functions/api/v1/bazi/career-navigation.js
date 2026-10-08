export async function onRequestPost(context) {
  try {
    const { request } = context;
    const body = await request.json();
    const { birth_date, birth_time, gender = "male" } = body;
    if (!birth_date || !birth_time) {
      return new Response(JSON.stringify({ error: "Missing birth_date or birth_time" }), { status: 400 });
    }
    return new Response(JSON.stringify({
      success: true,
      service_id: "srv-career-3yr",
      title: "事業／財運・未來3年",
      price_hkd: 188,
      birth_date, birth_time, gender
    }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
