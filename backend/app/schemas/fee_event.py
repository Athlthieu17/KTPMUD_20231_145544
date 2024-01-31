from pydantic import BaseModel
from typing import Optional
from .user import UserOut


# Shared properties
class FeeBase(BaseModel):
    maphiphat: Optional[str] = None
    phiphat: Optional[int] = None
    lydo: Optional[str]
    owner_detail: Optional[str]

class FeeUpdate(BaseModel):
    phiphat: int
    lydo: str

