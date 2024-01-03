from fastapi import APIRouter, status, HTTPException, Depends
from typing import Annotated
from sqlalchemy.orm import Session


from app.database import get_db
from app import models
from app.schemas import fee_event
from app.service.crud import feeservice

from ..dependencies.auth import get_current_user
from ..dependencies.get_404 import get_fee_or_404

router = APIRouter()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_fee(employee_role: user_dependency, db: db_dependency, fee_event: fee_event.FeeBase):
    if employee_role is None or employee_role.get('role') != 'employee':
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication Failed')
    fee_event = feeservice.create(db_session=db, fee_event=fee_event)

    return fee_event

@router.put("/{maphiphat}", status_code=status.HTTP_204_NO_CONTENT)
async def update_fee(employee_role: user_dependency, db: db_dependency, fee_update: fee_event.FeeUpdate, fee_get: models.PhiPhat = Depends(get_fee_or_404)):
    if employee_role is None or employee_role.get('role') != "employee":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Authentication Failed')


    """
        Update an individual fee.
    """

    return feeservice.update(db_session=db, fee_update=fee_update, maphiphat=fee_get.maphiphat)
