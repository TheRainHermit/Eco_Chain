from pydantic import BaseModel
from datetime import datetime

class RecyclingEventBase(BaseModel):
    user_id: int
    event_type: str
    points_awarded: int
    timestamp: datetime

class RecyclingEventCreate(RecyclingEventBase):
    pass

class RecyclingEvent(RecyclingEventBase):
    id: int

    class Config:
        from_attributes = True  # Para Pydantic v2, reemplaza orm_mode