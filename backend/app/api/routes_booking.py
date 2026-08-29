from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from app.schemas.bazi import BookingRequest
import uuid
from datetime import datetime

router = APIRouter(prefix="/booking", tags=["Fortune Teller Marketplace & Booking"])

READERS_DATABASE = [
    {
        "id": "reader-ding",
        "name": "丁蔓山",
        "title": "命理誌創辦人 · 三元玄空與子平八字宗師",
        "region": "香港 · Hong Kong",
        "languages": ["粵語", "普通話", "English"],
        "specialties": ["八字格局", "玄空九運風水", "商業謀劃", "家族傳承"],
        "rating": 5.0,
        "reading_count": 1420,
        "avatar_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        "bio": "研習子平八字與三元九運堪輿逾廿載，倡導以現代極簡邏輯解構傳統玄學，曾為逾百家上市公司高管及各界名流提供深度決策與命理顧問服務。",
        "sessions": [
            {"duration_min": 45, "price_display": "HK$2,800", "price_val": 2800, "label": "單項問事 / 45分鐘"},
            {"duration_min": 60, "price_display": "HK$4,800", "price_val": 4800, "label": "八字詳論 / 60分鐘"},
            {"duration_min": 90, "price_display": "HK$6,800", "price_val": 6800, "label": "深度人生導航與風水諮詢 / 90分鐘"}
        ],
        "available_dates": ["2026-08-30", "2026-08-31", "2026-09-01", "2026-09-02", "2026-09-03", "2026-09-04"],
        "available_slots": ["10:00", "11:30", "14:00", "15:30", "17:00", "20:00"]
    },
    {
        "id": "reader-yamada",
        "name": "山田 拓真 (Yuki Tanaka)",
        "title": "日本四柱推命學會理事 · 東洋命理研究者",
        "region": "京都 · 日本 / 線上",
        "languages": ["日本語", "English", "普通話"],
        "specialties": ["四柱推命", "事業轉折", "感情姻緣", "心理命理學"],
        "rating": 4.9,
        "reading_count": 328,
        "avatar_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        "bio": "畢業於京都大學哲學系，融合傳統日本四柱推命與現代心理學框架，專長於職場轉職評估、個人心靈調和與重大抉擇推演。",
        "sessions": [
            {"duration_min": 30, "price_display": "¥4,800 (約HK$280)", "price_val": 280, "label": "精準諮詢 / 30分鐘"},
            {"duration_min": 60, "price_display": "¥8,800 (約HK$520)", "price_val": 520, "label": "標準四柱推命 / 60分鐘"},
            {"duration_min": 90, "price_display": "¥12,800 (約HK$750)", "price_val": 750, "label": "全面深度鑑定 / 90分鐘"}
        ],
        "available_dates": ["2026-08-30", "2026-08-31", "2026-09-01", "2026-09-03"],
        "available_slots": ["13:00", "14:30", "16:00", "19:00", "20:30"]
    },
    {
        "id": "reader-lin",
        "name": "林承安 師傅",
        "title": "資深堪輿命理顧問 · 九運風水實戰名家",
        "region": "香港 · Hong Kong",
        "languages": ["粵語", "普通話"],
        "specialties": ["家居風水", "公司查宅", "小兒命名", "擇日吉課"],
        "rating": 4.9,
        "reading_count": 890,
        "avatar_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
        "bio": "師承嶺南玄學名家，精通玄空大卦與巒頭理氣合一，專攻中高端住宅及企業空間佈局，實戰案例遍及香港、大灣區及海外。",
        "sessions": [
            {"duration_min": 45, "price_display": "HK$2,800", "price_val": 2800, "label": "流年吉凶與起名擇日 / 45分鐘"},
            {"duration_min": 60, "price_display": "HK$4,800", "price_val": 4800, "label": "八字詳批 / 60分鐘"},
            {"duration_min": 180, "price_display": "HK$18,000+", "price_val": 18000, "label": "家居風水實地勘測 / 預約"}
        ],
        "available_dates": ["2026-08-31", "2026-09-02", "2026-09-04", "2026-09-05"],
        "available_slots": ["10:30", "14:00", "16:30"]
    }
]

BOOKINGS_STORAGE = []

@router.get("/readers", response_model=List[Dict[str, Any]])
def list_readers():
    """Get list of verified professional fortune tellers."""
    return READERS_DATABASE

@router.get("/readers/{reader_id}", response_model=Dict[str, Any])
def get_reader(reader_id: str):
    for r in READERS_DATABASE:
        if r["id"] == reader_id:
            return r
    raise HTTPException(status_code=404, detail="Reader not found")

@router.post("/create", response_model=Dict[str, Any])
def create_booking(req: BookingRequest):
    reader = next((r for r in READERS_DATABASE if r["id"] == req.reader_id), None)
    if not reader:
        raise HTTPException(status_code=404, detail="Reader not found")
        
    booking_id = f"BK-{uuid.uuid4().hex[:8].upper()}"
    booking_record = {
        "booking_id": booking_id,
        "reader_id": req.reader_id,
        "reader_name": reader["name"],
        "service_id": req.service_id,
        "date": req.date,
        "time_slot": req.time_slot,
        "client_name": req.client_name,
        "client_email": req.client_email,
        "client_phone": req.client_phone,
        "status": "confirmed",
        "created_at": datetime.now().isoformat(),
        "notes": req.notes
    }
    BOOKINGS_STORAGE.append(booking_record)
    return {
        "status": "success",
        "message": "預約申請已成功確認，專屬會議鏈接與命書準備指南已發送至您的電郵。",
        "booking": booking_record
    }
