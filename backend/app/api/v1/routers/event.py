from fastapi import APIRouter, status, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session


from app.database import get_db
from app import models
from app.schemas import event, detail_event
from app.service.crud import eventservice, detaileventservice

from ..dependencies.auth import get_current_user
from ..dependencies.get_404 import get_event_or_404

router = APIRouter()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]
@router.post("", status_code= status.HTTP_201_CREATED, response_model=event.EventCreate)
async def create_event(user_in: user_dependency, db: db_dependency, create_event_request: event.EventCreate):
    if eventservice.get(db_session=db, mact=create_event_request.mact):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Event address already exists",
        )
    event = eventservice.create(db_session=db, event=create_event_request, owner=user_in.get('manguoidung'))
    return event


@router.get("/information/{mact}", status_code= status.HTTP_200_OK, response_model= event.EventOut)
def get_event_by_mact(user_in: user_dependency, db: db_dependency, mact: str):
    if (user_in.get('username') == "admin"):
        event = eventservice.get_by_admin(db_session=db, mact=mact)
        if not event:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Specified event was not found.",
            )
    else:
        event = eventservice.get_by_user(db_session=db, mact=mact, owner=user_in.get('manguoidung'))
        if not event:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Specified event was not found.",
            )

    return event




@router.get("/all_event", status_code=status.HTTP_200_OK)
async def get_all_event(user_in: user_dependency, db: db_dependency):

    if (user_in.get('username') == "admin"):
        all_event = eventservice.get_multiple_by_admin(db_session=db)
    else:
        all_event = eventservice.get_multiple_by_user(db_session=db, owner=user_in.get('manguoidung'))

    return all_event


@router.put("/{mact}", status_code=status.HTTP_204_NO_CONTENT)
async def update_event(db: db_dependency, event_update: event.EventUpdate, mact: str):
    """
        Update an individual event.
    """

    return eventservice.update(db_session=db, event_update=event_update, mact=mact)

@router.delete("/{mact}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_event(user: user_dependency, db: db_dependency, mact: str):
    """
        Delete an individual event.
    """
    if user.get('username') == 'admin':
        return eventservice.delete(db_session=db, mact=mact)

