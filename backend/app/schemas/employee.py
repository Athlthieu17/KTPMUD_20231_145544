from pydantic import BaseModel
from typing import Optional, Union
from datetime import date
from .user import UserOutCreate, UserCreateInfo, UserUpdateInfo, UserOut
class EmployeeBase(BaseModel):
    manv: str = "NV0001"
    salary: Optional[int]
    ngaybatdaucongtac: date
    ngayketthuccongtac: date
    # owner_id: int

    # owner: UserOut

class EmployeeUpdateInfo(BaseModel):
    salary: Optional[int]
    ngaybatdaucongtac: date
    ngayketthuccongtac: date



class EmployeeOutCreate(BaseModel):
    manv: str
    salary: int
    ngaybatdaucongtac: date

    owner: UserOutCreate
    class Config:
        from_attributes = True


class EmployeeOut(BaseModel):
    manv: str
    ngaybatdaucongtac: date
    ngayketthuccongtac: Union[date, None] = None

    owner: UserOut
    class Config:
        from_attributes = True


class EmployeeCreateInfo(BaseModel):
    manv: str = "NV0001"
    salary: int
    ngaybatdaucongtac: date



class EmployeeCreate(BaseModel):
    users: UserCreateInfo
    employee: EmployeeCreateInfo


class EmployeeUpdate(BaseModel):
    users: UserUpdateInfo
    employee: EmployeeUpdateInfo
