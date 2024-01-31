from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, Path, status
from app.database import get_db
from app import models
from app.service.crud import userservice, eventservice, detaileventservice, contractservice, feeservice


def get_user_or_404(
    db_session: Session = Depends(get_db),
    manguoidung: int = Path(..., alias="id", ge=1),
) -> models.User:
    """
    Route dependency that retrieves a user by id or raises 404.
    """
    user = userservice.get(db_session=db_session, manguoidung_=manguoidung)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Specified user was not found.",
        )
    return user

def get_event_or_404(
    db_session: Session = Depends(get_db),
    mact: str = Path(..., alias="mact"),
):
    """
    Route dependency that retrieves a event by mact or raises 404.
    """
    event = eventservice.get(db_session=db_session, mact=mact)
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Specified event was not found.",
        )
    return event


def get_detail_event_or_404(
    db_session: Session = Depends(get_db),
    mactct: str = Path(..., alias="mactct")
):
    """
    Route dependency that retrieves a detail_event by mact and id or raises 404.
    """
    detail_event = detaileventservice.get(db_session=db_session, mactct=mactct)
    if not detail_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Specified detail event was not found.",
        )
    return detail_event



def get_contract_or_404(
    db_session: Session = Depends(get_db),
    mahopdong: str = Path(..., alias="mahopdong"),
):
    """
    Route dependency that retrieves a event by mact or raises 404.
    """
    contract = contractservice.get(db_session=db_session, mahopdong=mahopdong)
    if not contract:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Specified contract was not found.",
        )
    return contract

def get_fee_or_404(
    db_session: Session = Depends(get_db),
    maphiphat: str = Path(..., alias="maphiphat"),
):
    """
    Route dependency that retrieves a event by maphiphat or raises 404.
    """
    fee_event = feeservice.get(db_session=db_session, maphiphat=maphiphat)
    if not fee_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Specified fee was not found.",
        )
    return fee_event