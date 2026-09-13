import os
from fastapi import APIRouter, HTTPException, Request, Header
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

try:
    import stripe
except ImportError:
    stripe = None

router = APIRouter(prefix="/payment", tags=["Stripe Payment Integration"])

STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY", "")
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET", "")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

if stripe and STRIPE_SECRET_KEY:
    stripe.api_key = STRIPE_SECRET_KEY


class InspectionUnitSchema(BaseModel):
    country: Optional[str] = "香港"
    region: Optional[str] = ""
    building: Optional[str] = ""


class CreateCheckoutRequest(BaseModel):
    service_id: str
    service_title: str
    amount_hkd: int
    client_name: str
    client_email: str
    client_phone: str
    booking_date: Optional[str] = None
    time_slot: Optional[str] = None
    birth_date: Optional[str] = None
    birth_time: Optional[str] = None
    notes: Optional[str] = None
    
    # Dynamic options
    sqft: Optional[int] = None
    fengshui_address: Optional[str] = None
    inspection_units: Optional[List[InspectionUnitSchema]] = None
    is_deposit_payment: Optional[bool] = False


def calculate_official_amount(data: CreateCheckoutRequest) -> tuple[int, str, str, Dict[str, Any]]:
    sid = data.service_id
    metadata: Dict[str, Any] = {
        "service_id": sid,
        "service_title": data.service_title,
        "client_name": data.client_name,
        "client_email": data.client_email,
        "client_phone": data.client_phone,
        "booking_date": data.booking_date or "",
        "time_slot": data.time_slot or "",
        "notes": (data.notes or "")[:400]
    }

    if sid == "srv-master-bazi":
        # 八字論命: 繳付訂金 HK$2,400，餘額 HK$2,400 於 7 天內繳付
        amount = 2400
        title = "丁蔓山 · 八字論命（前事排查訂金）"
        desc = "先判前事，若資料有誤續談不果只收訂金。餘額 HK$2,400 於收取前事報告後 7 天內繳付。"
        metadata["is_deposit"] = "true"
        metadata["total_full_amount"] = "4800"
        metadata["deposit_amount"] = "2400"
        metadata["balance_due_amount"] = "2400"
        metadata["balance_due_policy"] = "7_days_after_report"
        return amount, title, desc, metadata

    elif sid == "srv-home-fengshui-layout":
        # 家居風水佈局: HK$28/平方呎, 最低消費 HK$18,000
        sqft = data.sqft or 500
        calculated = sqft * 28
        amount = max(18000, calculated)
        title = f"丁蔓山 · 家居風水佈局（{sqft} 平方呎）"
        desc = f"實用面積 {sqft} 平方呎（HK$28/平方呎，最低消費 HK$18,000）。詳細英文地址：{data.fengshui_address or '已提供'}"
        metadata["sqft"] = str(sqft)
        metadata["rate_per_sqft"] = "28"
        metadata["fengshui_address"] = (data.fengshui_address or "")[:200]
        return amount, title, desc, metadata

    elif sid == "srv-corp-fengshui-layout":
        # 公司風水佈局: HK$38/平方呎, 最低消費 HK$28,000
        sqft = data.sqft or 600
        calculated = sqft * 38
        amount = max(28000, calculated)
        title = f"丁蔓山 · 公司風水佈局（{sqft} 平方呎）"
        desc = f"實用面積 {sqft} 平方呎（HK$38/平方呎，最低消費 HK$28,000）。詳細英文地址：{data.fengshui_address or '已提供'}"
        metadata["sqft"] = str(sqft)
        metadata["rate_per_sqft"] = "38"
        metadata["fengshui_address"] = (data.fengshui_address or "")[:200]
        return amount, title, desc, metadata

    elif sid == "srv-home-inspection":
        # 家居查宅: 基礎 HK$18,000 (3單位/1區), 超過3單位每單位+HK$1,000, 跨區每區+HK$1,200
        units = data.inspection_units or []
        units_count = max(1, len(units))
        extra_units = max(0, units_count - 3)
        distinct_regions = set(u.region.strip() for u in units if u.region and u.region.strip())
        regions_count = max(1, len(distinct_regions))
        extra_regions = max(0, regions_count - 1)

        amount = 18000 + (extra_units * 1000) + (extra_regions * 1200)
        title = f"丁蔓山 · 家居查宅（{units_count} 個單位 / {regions_count} 個地區）"
        desc = f"首3單位+1地區包底 HK$18,000；額外 {extra_units} 個單位（+HK${extra_units * 1000}），跨超 {extra_regions} 個地區（+HK${extra_regions * 1200}）。"
        metadata["units_count"] = str(units_count)
        metadata["regions_count"] = str(regions_count)
        return amount, title, desc, metadata

    elif sid == "srv-corp-inspection":
        # 公司查宅: 基礎 HK$28,000 (3單位/1區), 超過3單位每單位+HK$1,300, 跨區每區+HK$1,800
        units = data.inspection_units or []
        units_count = max(1, len(units))
        extra_units = max(0, units_count - 3)
        distinct_regions = set(u.region.strip() for u in units if u.region and u.region.strip())
        regions_count = max(1, len(distinct_regions))
        extra_regions = max(0, regions_count - 1)

        amount = 28000 + (extra_units * 1300) + (extra_regions * 1800)
        title = f"丁蔓山 · 公司查宅（{units_count} 個單位 / {regions_count} 個地區）"
        desc = f"首3單位+1地區包底 HK$28,000；額外 {extra_units} 個單位（+HK${extra_units * 1300}），跨超 {extra_regions} 個地區（+HK${extra_regions * 1800}）。"
        metadata["units_count"] = str(units_count)
        metadata["regions_count"] = str(regions_count)
        return amount, title, desc, metadata

    elif sid in ["srv-annual-inquiry", "srv-inquiry-matter", "srv-baby-naming", "srv-auspicious-date"]:
        amount = 2800
        title = f"丁蔓山 · {data.service_title}"
        desc = f"線上 1 對 1 諮詢解讀。預約時間：{data.booking_date} {data.time_slot}"
        return amount, title, desc, metadata

    elif sid == "srv-company-naming":
        amount = 3800
        title = "丁蔓山 · 公司定號"
        desc = f"創辦人八字五行與商業吉名定制。預約時間：{data.booking_date} {data.time_slot}"
        return amount, title, desc, metadata

    else:
        amount = max(100, data.amount_hkd)
        title = f"丁蔓山 · {data.service_title}"
        desc = f"命理預約服務。預約人：{data.client_name}"
        return amount, title, desc, metadata


@router.post("/create-checkout-session")
async def create_checkout_session(request_data: CreateCheckoutRequest):
    amount_hkd, product_title, product_desc, metadata = calculate_official_amount(request_data)
    
    stripe_key = os.getenv("STRIPE_SECRET_KEY", "")
    if not stripe_key or not stripe:
        return {
            "mode": "simulation",
            "message": "Stripe API Key 尚未在後端 .env 設定，目前以模擬模式確認預約。",
            "service_id": request_data.service_id,
            "product_title": product_title,
            "amount_hkd": amount_hkd,
            "currency": "HKD",
            "metadata": metadata,
            "checkout_url": None
        }

    try:
        stripe.api_key = stripe_key
        unit_amount_cents = amount_hkd * 100
        frontend_base = os.getenv("FRONTEND_URL", "http://localhost:5173")
        
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[
                {
                    "price_data": {
                        "currency": "hkd",
                        "product_data": {
                            "name": product_title,
                            "description": product_desc,
                        },
                        "unit_amount": unit_amount_cents,
                    },
                    "quantity": 1,
                }
            ],
            mode="payment",
            customer_email=request_data.client_email,
            client_reference_id=f"bk_{request_data.service_id}_{request_data.client_phone[-4:] if request_data.client_phone else '0000'}",
            metadata=metadata,
            success_url=f"{frontend_base}/?payment_status=success&session_id={{CHECKOUT_SESSION_ID}}&service_id={request_data.service_id}",
            cancel_url=f"{frontend_base}/?payment_status=cancelled&service_id={request_data.service_id}",
        )

        return {
            "mode": "live",
            "session_id": session.id,
            "checkout_url": session.url,
            "amount_hkd": amount_hkd,
            "service_id": request_data.service_id
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Stripe Checkout Session Error: {str(e)}")


@router.post("/webhook")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None)):
    webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET", "")
    payload = await request.body()

    if webhook_secret and stripe_signature and stripe:
        try:
            event = stripe.Webhook.construct_event(
                payload, stripe_signature, webhook_secret
            )
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Webhook Error: {str(e)}")
    else:
        import json
        event = json.loads(payload.decode("utf-8"))

    if event.get("type") == "checkout.session.completed":
        session_obj = event.get("data", {}).get("object", {})
        meta = session_obj.get("metadata", {})
        customer_email = session_obj.get("customer_email") or meta.get("client_email")
        paid_amount_hkd = (session_obj.get("amount_total") or 0) / 100

        print(f"🎉 [Stripe 付款成功] 服務: {meta.get('service_title')} (ID: {meta.get('service_id')})")
        print(f"   客戶: {meta.get('client_name')} ({customer_email}) | 電話: {meta.get('client_phone')}")
        print(f"   實收金額: HK${paid_amount_hkd}")
        
        if meta.get("is_deposit") == "true":
            print(f"   📌 八字論命前事排查訂金已入帳 HK${meta.get('deposit_amount')}。系統已記錄：收取前事報告後 7 天內繳付餘額 HK${meta.get('balance_due_amount')}.")

    return {"status": "received"}
