from pydantic import BaseModel
from typing import Optional

class PointsBase(BaseModel):
    user_id: int
    points: int

class PointsCreate(PointsBase):
    pass

class PointsUpdate(BaseModel):
    points: Optional[int] = None

class Points(PointsBase):
    id: int

    class Config:
        orm_mode = True