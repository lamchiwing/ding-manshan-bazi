from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

class BaziInput(BaseModel):
    birth_date: str = Field(..., example="1990-05-20", description="YYYY-MM-DD solar calendar")
    birth_time: str = Field(..., example="21:30", description="HH:mm 24-hour format")
    gender: str = Field("male", example="male", description="'male' or 'female'")
    day_boundary_rule: Optional[str] = Field("ZI_START_NEXT_DAY", description="ZI_START_NEXT_DAY or ZI_START_SAME_DAY")

class AIChatInput(BaseModel):
    bazi_data: Optional[Dict[str, Any]] = None
    birth_date: Optional[str] = None
    birth_time: Optional[str] = None
    gender: Optional[str] = "male"
    question: str = Field(..., example="我今年適合轉工嗎？")
    history: Optional[List[Dict[str, str]]] = []

class BookingRequest(BaseModel):
    service_id: str
    reader_id: str
    date: str
    time_slot: str
    client_name: str
    client_email: str
    client_phone: str
    birth_date: Optional[str] = None
    birth_time: Optional[str] = None
    gender: Optional[str] = None
    notes: Optional[str] = None

class TwelveMonthsDecisionsInput(BaseModel):
    birth_date: str = Field(..., example="1990-05-20", description="YYYY-MM-DD solar calendar")
    birth_time: str = Field(..., example="21:30", description="HH:mm 24-hour format")
    gender: str = Field("male", example="male", description="'male' or 'female'")
    selected_decisions: List[str] = Field(default=["轉工／轉跑道"], description="Max 3 selected major decisions")
    plan_status: Optional[str] = Field("正在考慮", description="已有明確計劃 / 正在考慮 / 尚未決定")
    expected_timing: Optional[str] = Field("未確定", description="2026年內 / 2027年 / 1–3個月內 / 3–6個月內 / 6–12個月內 / 未確定")
