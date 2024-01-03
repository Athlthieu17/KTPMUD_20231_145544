from sqlalchemy.orm import Session

from app import models
from app.schemas.fee_event import FeeBase, FeeUpdate


def get(db_session: Session, maphiphat: str):
    return db_session.query(models.PhiPhat).filter(models.PhiPhat.maphiphat==maphiphat)



def get_multiple(db_session: Session, offset: int = 0, limit: int = 100, search: str = ""):
    return db_session.query(models.Phiphat).filter(models.Phiphat.maphiphat.contains(search)).offset(offset).limit(limit).all()



def create(db_session: Session, fee_event: FeeBase):
    db_obj = models.PhiPhat(**fee_event.model_dump())
    db_session.add(db_obj)
    db_session.commit()
    db_session.refresh(db_obj)
    return db_obj


def update(db_session: Session, fee_update: FeeUpdate, maphiphat: str):
    fee_event_query = db_session.query(models.PhiPhat).filter(models.PhiPhat.maphiphat == maphiphat)

    fee_event_query.update(fee_update.model_dump(), synchronize_session=False)
    db_session.commit()

    return fee_event_query.first()

def delete(db_session: Session, maphiphat: str):
    db_session.query(models.PhiPhat).filter(models.PhiPhat.maphiphat == maphiphat).delete()
    db_session.commit()
    return "Delete event have maphiphat = {maphiphat} success".format(maphiphat=maphiphat)