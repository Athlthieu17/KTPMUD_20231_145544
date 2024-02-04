import React, { useState } from "react";
import "./modalDetailEvent.css";
import "./modalCreateEvent.css";
import TextField from "../ui/TextField";
import Button from "../ui/Button";
import axios from "axios";

localStorage.setItem("createeventSuccess", true);

const removeErrMsg = () => {
  document.querySelectorAll("#errmsg")?.forEach((e) => e.remove());
};

function ModalUpdateDetailEvent({ isOpen, onClose, ...other }) {
  const [index, setIndex] = useState(0);
  var size = 0;
  for (let i = 0; other[i] !== undefined; i++) {
    size = size + 1;
  }
  size = size / 2;

  const [form, setForm] = useState({
    id: other[index].mactct,
    soluong: other[index].songuoithamgia,
    dateStart: other[index].start_date,
    dateEnd: other[index].end_date,
    location: other[index].location,
    owner_event: other[index].owner_event,
    detail: other[index].detail,
  });

  const handleOnChange = (key, value) => {
    removeErrMsg();
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleUpdateDetailEvent = async () => {
    try {
      await axios
        .put(
          "http://localhost:8000/api/v1/detail_event/update_info/" + form.id,
          {
            songuoithamgia: form.soluong,
            start_date: form.dateStart,
            end_date: form.dateEnd,
            location: form.location,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res?.statusText === "OK" || res?.statusText === "No Content") {
            localStorage.setItem("createeventSuccess", true);
          } else {
            localStorage.setItem("createeventSuccess", false);
          }
        });
    } catch (error) {
      localStorage.setItem("createeventSuccess", false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal modal-login" styles={{ width: "700px" }}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">
          <div className="name-event">
            <h1>Mã sự kiện: {form.id}</h1>
          </div>
          <div className="form-login" id="form">
            <TextField
              title={"Sự kiện cha"}
              value={form.owner_event}
              onChange={(e) => handleOnChange("owner_event", e.target.value)}
            />
            <TextField
              title={"Số người tham gia"}
              value={form.soluong}
              onChange={(e) => handleOnChange("soluong", e.target.value)}
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
            <TextField
              title={"Địa điểm"}
              value={form.location}
              onChange={(e) => handleOnChange("location", e.target.value)}
            />
            <div id="formCreateEvent"></div>
          </div>
          <div className="form-action-change-pass button-update">
            <Button
              title={"<"}
              styles={{
                backgroundColor: "white",
                border: "1px solid",
                borderRadius: "10px",
                marginTop: "10px",
                marginRight: "70px",
              }}
              type={"button"}
              onClick={() => {
                if (index > 0) {
                  setIndex(index - 1);                
                  setForm({
                    id: other[index].mactct,
                    soluong: other[index].songuoithamgia,
                    dateStart: other[index].start_date,
                    dateEnd: other[index].end_date,
                    location: other[index].location,
                    owner_event: other[index].owner_event,
                    detail: other[index].detail,
                  });
                }
              }}
            />
            <Button
              title={"Hủy"}
              styles={{
                backgroundColor: "red",
                color: "#fff",
                border: "1px solid",
                borderRadius: "10px",
                marginTop: "10px",
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
                borderRadius: "10px",
                marginTop: "10px",
              }}
              onClick={async () => await handleUpdateDetailEvent()}
            />
            <Button
              title={">"}
              styles={{
                backgroundColor: "white",
                border: "1px solid",
                borderRadius: "10px",
                marginTop: "10px",
                marginLeft: "70px",
              }}
              type={"button"}
              onClick={() => {
                if (index < size - 1) {
                  setIndex(index + 1);
                  setForm({
                    id: other[index].mactct,
                    soluong: other[index].songuoithamgia,
                    dateStart: other[index].start_date,
                    dateEnd: other[index].end_date,
                    location: other[index].location,
                    owner_event: other[index].owner_event,
                    detail: other[index].detail,
                  });
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalUpdateDetailEvent;
