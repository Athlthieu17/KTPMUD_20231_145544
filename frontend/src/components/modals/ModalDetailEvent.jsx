import React, { useState } from "react";
import "./modalDetailEvent.css";
import TextField from "../ui/TextField";
import Button from "../ui/Button";
import axios from "axios";
import ModalCreateDetailEvent from "./ModalCreateDetailEvent";
import ModalUpdateDetailEvent from "./ModalUpdateDetailEvent";

var dataDetail = [];

const removeErrMsg = () => {
  document.querySelectorAll("#errmsg")?.forEach((e) => e.remove());
};

function ModalDetailEvent({ isOpen, onClose, ...other }) {
  const [isOpenCreateDetail, setIsOpenCreateDetail] = useState(false);
  const [isOpenUpdateDetail, setIsOpenUpdateDetail] = useState(false);

  const [form, setForm] = useState({
    note: other?.note,
    name: other?.name,
    id: other?.id,
    owner: other?.owner,
    dateStart: other?.dateStart,
    dateEnd: other?.dateEnd,
  });

  const handleOnChange = (key, value) => {
    removeErrMsg();
    setForm({
      ...form,
      [key]: value,
    });
  };

  axios
    .get("http://localhost:8000/api/v1/detail_event/" + form.id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => {
      res.data.forEach((e) => {
        dataDetail.push({
          end_date: e.end_date,
          mactct: e.mactct,
          detail: e.detail,
          location: e.location,
          songuoithamgia: e.songuoithamgia,
          start_date: e.start_date,
          owner_event: e.owner_event,
        });
      });
    });

  const handleUpdateEvent = async () => {
    try {
      await axios
        .put(
          "http://localhost:8000/api/v1/event/" + form.id,
          {
            name: form.name,
            ngaybatdau: form.dateStart,
            ngayketthuc: form.dateEnd,
            detail: form.note,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res?.statusText === "OK" || res?.statusText === "No Content") {
            localStorage.setItem("updateeventSuccess", true);
          } else {
            localStorage.setItem("updateeventSuccess", false);
          }
        });
    } catch (error) {
      localStorage.setItem("updateeventSuccess", false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">
          <div className="name-event">
            <h1>{form.name}</h1>
          </div>
          <div className="card-modal">
            <div className="card-modal__item">
              <img className="card-modal__img" alt="" src={other?.thumbnail} />
              <div className="card-detail card-address">
                <TextField
                  title={"Ghi chú"}
                  value={form.note}
                  onChange={(e) => handleOnChange("note", e.target.value)}
                />
              </div>
            </div>
            <div
              className="card-detail card-modal__item flex"
              style={{ gap: "40px", alignItems: "flex-start" }}
            >
              <div className="event-item">
                <TextField
                  title={"Chủ sở hữu"}
                  value={form.owner}
                  onChange={(e) => handleOnChange("owner", e.target.value)}
                />
                <TextField
                  title={"Mã sự kiện"}
                  value={form.id}
                  onChange={(e) => handleOnChange("id", e.target.value)}
                />
                <TextField
                  title={"Ngày bắt đầu"}
                  value={form.dateStart}
                  onChange={(e) => handleOnChange("dateStart", e.target.value)}
                />
                <TextField
                  title={"Ngày kết thúc"}
                  value={form.dateEnd}
                  onChange={(e) => handleOnChange("dateEnd", e.target.value)}
                />
              </div>
            </div>
          </div>
          <div id="formUpdateEvent"></div>
          <div className="list-button flex">
            <Button
              title={"Chi tiết"}
              styles={{
                backgroundColor: "green",
                color: "#fff",
                margin: "-456px",
              }}
              type={"button"}
              onClick={() => {
                if (dataDetail.length === 0) alert("Không có sự kiện con!");
                else setIsOpenUpdateDetail(true);
              }}
            />
            <Button
              title={"Thêm sự kiện con"}
              styles={{
                backgroundColor: "#409FC8",
                color: "#fff",
                margin: "-380px",
              }}
              type={"button"}
              onClick={() => {
                setIsOpenCreateDetail(true);
              }}
            />
            <Button
              title={"Hủy"}
              styles={{
                backgroundColor: "red",
                color: "#fff",
              }}
              type={"button"}
              onClick={onClose}
            />
            <Button
              title={"Lưu"}
              type={"button"}
              styles={{
                backgroundColor: "#409FC8",
                color: "#fff",
              }}
              onClick={() => handleUpdateEvent()}
            />
          </div>
        </div>
      </div>
      {isOpenCreateDetail && (
        <ModalCreateDetailEvent
          {...form}
          isOpen={isOpenCreateDetail}
          onClose={() => {
            setIsOpenCreateDetail(false);
            dataDetail = [];
            axios
              .get("http://localhost:8000/api/v1/detail_event/" + form.id, {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              })
              .then((res) => {
                res.data.forEach((e) => {
                  dataDetail.push({
                    end_date: e.end_date,
                    mactct: e.mactct,
                    detail: e.detail,
                    location: e.location,
                    songuoithamgia: e.songuoithamgia,
                    start_date: e.start_date,
                    owner_event: e.owner_event,
                  });
                });
              });
          }}
        />
      )}
      {isOpenUpdateDetail && (
        <ModalUpdateDetailEvent
          {...dataDetail}
          isOpen={isOpenUpdateDetail}
          onClose={() => {
            setIsOpenUpdateDetail(false);
          }}
        />
      )}
    </div>
  );
}

export default ModalDetailEvent;
