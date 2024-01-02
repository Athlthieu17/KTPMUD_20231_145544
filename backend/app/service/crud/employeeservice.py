from typing import List, Optional
from sqlalchemy.orm import Session

from app import models
from app.schemas.employee import EmployeeBase, EmployeeUpdate, EmployeeOut
from ..passwordservice import get_password_hash
def get(db_session: Session, manv: str):
    return db_session.query(models.Employee).filter(models.Employee.manv == manv).first()


def get_multiple(
    db_session: Session, *, offset: int = 0, limit: int = 100
) -> List[EmployeeOut]:
    return db_session.query(models.Employee).offset(offset).limit(limit).all()


def create(db_session: Session, employee_in: EmployeeBase, owner_user_get: int):
    db_obj = models.Employee(**employee_in.model_dump(), owner_user=owner_user_get)
    db_session.add(db_obj)
    db_session.commit()
    db_session.refresh(db_obj)
    return db_obj


def update(db_session: Session, employee_update: EmployeeUpdate, manv: str):
    employee_query = db_session.query(models.Employee).filter(models.Employee.manv == manv)

    employee_query.update(employee_update.model_dump(), synchronize_session=False)
    db_session.commit()

    return employee_query.first()

def delete(db_session: Session, manv: str):
    employee = get(db_session=db_session, manv=manv)
    db_session.query(models.User).filter(models.User.manguoidung == employee.owner_user).delete()
    db_session.commit()
    return "Delete employee manv = {manv} success".format(manv=manv)