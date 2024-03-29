from pydantic import BaseModel, EmailStr
from datetime import datetime, date
from typing import Optional


class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    fullname: Optional[str]
    username: str
    password: str
    gender: Optional[bool]
    dateofbirth: Optional[date] = "2023-12-23"
    phonenumber: Optional[str]
    is_active: Optional[bool] = True


class UserCreateInfo(BaseModel):
    email: Optional[EmailStr] = None
    fullname: Optional[str]
    username: str
    password: str
    gender: Optional[bool]
    dateofbirth: Optional[date] = "2023-12-23"
    phonenumber: Optional[str]


class UserUpdateInfo(BaseModel):
    email: EmailStr
    fullname: str
    username: str
    password: str
    gender: bool
    dateofbirth: date
    phonenumber: str


class UserOutCreate(BaseModel):
    manguoidung: int
    username: str
    email: Optional[EmailStr] = None
    role: Optional[str] = None

class UserOut(BaseModel):
    email: EmailStr
    fullname: str
    username: str
    password: str
    gender: bool
    dateofbirth: date
    phonenumber: str

class UserCreate(UserBase):
    username: str
    password: str

class UserUpdate(BaseModel):
    password: str
    new_password: Optional[str] = None


class UserInDBBase(UserBase):
    manguoidung: Optional[int] = None
    created_at: datetime

    class Config:
        from_attributes = True


# Additional properties to return via API
class User(UserInDBBase):
    pass




# Additional properties stored in DB
class UserInDB(UserInDBBase):
    password: str