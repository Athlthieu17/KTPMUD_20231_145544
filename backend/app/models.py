from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, DATE
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.orm import relationship
from .database import Base


class User(Base):
    __tablename__ = "users"

    manguoidung = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    email = Column(String(255), nullable=False, unique=True)
    fullname = Column(String(255), nullable=False)
    username = Column(String(255), nullable=False, unique=True)
    password = Column(String(255), nullable=False)
    gender = Column(Boolean, nullable=False)
    dateofbirth = Column(DATE, nullable=False)
    phonenumber = Column(String(20), nullable=False, unique=True)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    role = Column(String, nullable=False)
    is_active = Column(Boolean, default=False)

class Employee(Base):
    __tablename__ = "employee"

    manv = Column(String(20), primary_key=True, nullable=False)
    salary = Column(Integer, nullable=False)
    ngaybatdaucongtac = Column(DATE, nullable=False)
    ngayketthuccongtac = Column(DATE)
    owner_user = Column(Integer, ForeignKey("users.id", ondelete= "CASCADE"), nullable=False)

    owner = relationship("User")

class Client(Base):
    __tablename__ = "client"

    makh = Column(String(20), primary_key=True, nullable=False)
    address = Column(String(255))
    owner_user = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    owner = relationship("User")

class Event(Base):
    __tablename__ = "event"

    mact = Column(String(20), primary_key=True, nullable=False)
    name = Column(String(50), nullable=False)
    detail = Column(String(100))
    ngaybatdau = Column(DATE, nullable=False)
    ngayketthuc = Column(DATE, nullable=False)
    owner = Column(String(20), ForeignKey("client.makh", ondelete="CASCADE"), nullable=False)

    owner_event = relationship("Client")

class DetailEvent(Base):
    __tablename__ = "detail_event"

    mactct = Column(String(20), primary_key=True, nullable=False, unique=True)
    songuoithamgia = Column(Integer, nullable=False)
    start_date = Column(DATE, nullable=False)
    end_date = Column(DATE, nullable=False)
    detail = Column(String)
    location = Column(String(100), nullable=False)

    owner_event = Column(String(20), ForeignKey("event.mact", ondelete="CASCADE"), nullable=False)

    original = relationship("Event")

class HopDong(Base):
    __tablename__ = "contract"

    mahopdong = Column(String(20), primary_key=True, nullable=False)
    phithanhtoan = Column(Integer,nullable=False)
    motaphi = Column(String(100))
    pt_thanhtoan = Column(String(50), nullable=False)
    ngaytttheohd = Column(DATE, nullable=False)
    ngayttthucte = Column(DATE, nullable=False)
    giaidoan = Column(Integer, nullable=False)

    owner = Column(String(20), ForeignKey("event.mact", ondelete="CASCADE"), nullable=False, unique=True)

    event = relationship("Event")

class PhiPhat(Base):
    __tablename__ = "phiphat"

    maphiphat = Column(String(20), primary_key=True, nullable=False)
    phiphat = Column(Integer)
    lydo = Column(String, nullable=False)
    owner_detail = Column(String(20), ForeignKey("detail_event.mactct", ondelete="CASCADE"), nullable=False)

    detail_event = relationship("DetailEvent")