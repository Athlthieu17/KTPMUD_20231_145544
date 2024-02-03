from typing import Annotated, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi import status


from app.schemas.user import UserOut, UserUpdate, UserCreateInfo, UserOutCreate, UserUpdateInfo
from app.database import get_db
from app.service.crud import userservice
from app.service import passwordservice


from ..dependencies.auth import get_current_user

router = APIRouter()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=UserOutCreate)
async def create_user(db: db_dependency, users: UserCreateInfo):
    hashed_password = passwordservice.get_password_hash(users.password)
    users.password = hashed_password

    if userservice.get_by_email(db_session=db, email=users.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email address already exists",
        )

    if userservice.get_by_username(db_session=db, username=users.username):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="username already exists",
        )
    if userservice.get_by_phonenumber(db_session=db, phonenumber=users.phonenumber):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="phonenumber already exists",
        )

    user = await userservice.create(db_session=db, user_in=users)
    return user

@router.get("/information", status_code= status.HTTP_200_OK)
async def get_info_user(user: user_dependency, db: db_dependency):
    user_get = userservice.get(db_session=db, manguoidung_=user.get('manguoidung'))
    return user_get


@router.get("/all_user_by_admin", status_code=status.HTTP_200_OK)
async def get_all_infor_user(user: user_dependency, db: db_dependency):
    if user.get('username') == "admin":
        return userservice.get_multiple(db_session=db)



@router.put("/change_password", status_code=status.HTTP_200_OK)
async def change_password(db: db_dependency, user: user_dependency, user_change: UserUpdate):
    return userservice.update_password(db_session=db, user_in=user, user_change=user_change)

@router.put("/update_info", status_code=status.HTTP_200_OK)
async def update_info(db: db_dependency, user: user_dependency, user_change: UserUpdateInfo):
    return userservice.update_info(db_session=db, user_change=user_change, manguoidung = user.get('manguoidung'))

