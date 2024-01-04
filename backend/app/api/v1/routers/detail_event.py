from fastapi import APIRouter, status, HTTPException, Depends
from typing import Annotated
from sqlalchemy.orm import Session


from app.database import get_db
from app import models
from app.schemas import detail_event
from app.service.crud import detaileventservice

from ..dependencies.auth import get_current_user
from ..dependencies.get_404 import get_detail_event_or_404

router = APIRouter()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

@router.post("", status_code=status.HTTP_201_CREATED, response_model=detail_event.DetailOut)
async def create_detail_event(db: db_dependency, employee_role: user_dependency, detail_create: detail_event.DetailEventCreate):
    if employee_role is None or employee_role.get('role') != 'employee':
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication Failed')
    detail_event = detaileventservice.create(db_session=db,detail_event=detail_create)

    return detail_event


@router.get("/{mactct}", status_code=status.HTTP_200_OK, response_model=detail_event.DetailOut)
def get_detail_of_event(db: db_dependency,
                        user_role: user_dependency,
                        detail_event_get: models.DetailEvent = Depends(get_detail_event_or_404)):
    if user_role is None or user_role.get('role') != 'employee' or user_role:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication Failed')

    return detaileventservice.get(db_session=db, mactct=detail_event_get.mactct)


@router.put("/update_info/{mactct}", status_code=status.HTTP_204_NO_CONTENT)
async def update_detail_event(db: db_dependency,
                              employee_role: user_dependency,
                              detail_event_update: detail_event.DetailEventUpdate,
                              detail_event_get: models.DetailEvent = Depends(get_detail_event_or_404)
                              ):
    if employee_role is None or employee_role.get('role') != "employee":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication Failed')

    return detaileventservice.update(db_session=db, detail_event_update=detail_event_update ,mactct=detail_event_get.mactct)


@router.delete("/update_info/{mactct}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_detail_event(db: db_dependency,
                              employee_role: user_dependency,
                              detail_event_get: models.DetailEvent = Depends(get_detail_event_or_404),
                              ):
    if employee_role is None or employee_role.get('role') != "employee":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication Failed')

    return detaileventservice.delete(db_session=db, mactct=detail_event_get.mactct)


