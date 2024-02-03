from typing import List, Optional
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app import models
from app.schemas.event import EventCreate, EventOut, EventUpdate

def get(db_session: Session, mact: str):
    return db_session.query(models.Event).filter(models.Event.mact == mact).all()


def get_by_user(db_session: Session, mact: str, owner: int):
    return db_session.query(models.Event).filter(models.Event.mact == mact).filter(models.Event.owner == owner).first()

def get_by_admin(db_session: Session, mact: str):
    return db_session.query(models.Event).filter(models.Event.mact == mact).first()


def get_multiple_by_user(db_session: Session, owner: int) -> List[EventCreate]:
    return db_session.query(models.Event).filter(models.Event.owner == owner).all()

def get_multiple_by_admin(db_session: Session) -> List[EventOut]:
    return db_session.query(models.Event).all()

def create(db_session: Session, event: EventCreate, owner: id):
    db_obj = models.Event(**event.model_dump(), owner = owner)
    db_session.add(db_obj)
    db_session.commit()
    db_session.refresh(db_obj)
    return db_obj


def update(db_session: Session, event_update: EventUpdate, mact: str):
    event_query = db_session.query(models.Event).filter(models.Event.mact == mact)

    event_query.update(event_update.model_dump(), synchronize_session=False)
    db_session.commit()

    return event_query.first()

def delete(db_session: Session, mact: str):
    db_session.query(models.Event).filter(models.Event.mact == mact).delete()
    db_session.commit()
    return "Delete event have mact = {mact} success".format(mact=mact)