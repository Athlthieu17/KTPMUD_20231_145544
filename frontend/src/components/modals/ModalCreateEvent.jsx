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

function ModalCreateEvent({ isOpen, onClose, ...other }) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    dateStart: "",
    dateEnd: "",
    detail: "",
  });

  const handleOnChange = (key, value) => {
    removeErrMsg();
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleCreateEvent = async () => {
    try {
      await axios
        .post(
          "http://localhost:8000/api/v1/event",
          {
            mact: form.id,
            name: form.name,
            ngaybatdau: form.dateStart,
            ngayketthuc: form.dateEnd,
            detail: form.detail
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res?.statusText === "OK" || res?.statusText === "Created") {
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
      <div className="modal modal-login" styles={{ width: '700px' }}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">
          <h1>Tạo sự kiện</h1>
          <div className="form-login" id="form">
            <TextField
              title={"Mã sự kiện"}
              value={form.id}
              onChange={(e) => handleOnChange("id", e.target.value)}
            />
            <TextField
              title={"Tên sự kiện"}
              value={form.name}
              onChange={(e) => handleOnChange("name", e.target.value)}
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
              title={"Ghi chú"}
              value={form.detail}
              onChange={(e) => handleOnChange("detail", e.target.value)}
            />
            <div id="formCreateEvent"></div>
          </div>
          <div className="form-action-change-pass">
            <Button
              title={"Tạo"}
              type={"button"}
              styles={{
                backgroundColor: "#409FC8",
                color: "#fff",
                borderRadius: "10px",
                marginTop: '10px',
              }}
              onClick={async () => await handleCreateEvent()}
            />
            <Button
              title={"Hủy"}
              styles={{
                backgroundColor: "transparent",
                color: "#000",
                border: "1px solid",
                borderRadius: "10px",
                marginTop: '10px',
              }}
              type={"button"}
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCreateEvent;
