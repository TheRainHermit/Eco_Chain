from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    username: str
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    points: int

    class Config:
        from_attributes = True  # Para Pydantic v2, reemplaza orm_mode

class UserInDB(UserBase):
    hashed_password: str

class UserLogin(BaseModel):
    username: str
    password: str