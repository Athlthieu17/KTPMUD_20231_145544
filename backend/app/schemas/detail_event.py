from pydantic import BaseModel
from typing import Union, Optional
from pydantic.types import conint
from datetime import date
from .event import EventOutOfDetail

class DetailBase(BaseModel):
    mactct: Optional[str]
    songuoithamgia: conint(gt=0)
    start_date: Optional[date]
    end_date: Optional[date]
    location: Optional[str]



class DetailEventCreate(DetailBase):
    owner_event: Optional[str]

    class Config:
        from_attributes = True


class DetailOut(BaseModel):
    mactct: Optional[str]
    songuoithamgia: int
    start_date: date
    end_date: date
    location: str

    original: EventOutOfDetail

class FullDetailEvent(BaseModel):
    mactct: Optional[str]
    songuoithamgia: int = conint(gt=0)
    detail: str
    start_date: date
    end_date: date
    location: str

class DetailEventUpdate(BaseModel):
    songuoithamgia: conint(gt=0)
    start_date: date
    end_date: date
    location: str

    class Config:
        from_attributes = True




