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
async def create_detail_event(db: db_dependency, detail_create: detail_event.DetailEventCreate, user: user_dependency):

    detail_event = detaileventservice.create(db_session=db,detail_event=detail_create)

    return detail_event


@router.get("/{mact}", status_code=status.HTTP_200_OK)
def get_detail_of_event(db: db_dependency,
                        mact: str, user: user_dependency):

    return detaileventservice.get_by_mact(db_session=db, owner_event=mact)


@router.put("/update_info/{mactct}", status_code=status.HTTP_204_NO_CONTENT)
async def update_detail_event(db: db_dependency,
                              user: user_dependency,
                              detail_event_update: detail_event.DetailEventUpdate,
                              detail_event_get: models.DetailEvent = Depends(get_detail_event_or_404)
                              ):

    return detaileventservice.update(db_session=db, detail_event_update=detail_event_update ,mactct=detail_event_get.mactct)


@router.delete("/update_info/{mactct}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_detail_event(db: db_dependency,
                              user: user_dependency,
                              detail_event_get: models.DetailEvent = Depends(get_detail_event_or_404),
                              ):

    return detaileventservice.delete(db_session=db, mactct=detail_event_get.mactct)

