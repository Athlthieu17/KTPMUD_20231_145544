from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional
from .user import UserOut


# Shared properties
class EventBase(BaseModel):
    mact: Optional[str] = None
    name: Optional[str] = None
    ngaybatdau: Optional[date]
    ngayketthuc: Optional[date]


class EventCreate(EventBase):
    detail: Optional[str] = None
    class Config:
        from_attributes = True

class EventInDB(EventBase):
    detail: str

class EventUpdate(BaseModel):
    name: str
    ngaybatdau: date
    ngayketthuc: date
    detail: str

class EventOut(BaseModel):
    mact: str
    name: str
    ngaybatdau: date
    ngayketthuc: date
    owner_event: UserOut

class EventOutOfDetail(BaseModel):
    mact: str
    name: str
    ngaybatdau: date
    ngayketthuc: date
