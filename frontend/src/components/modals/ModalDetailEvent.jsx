import React, { useState } from "react";
import "./modalDetailEvent.css";
import TextField from "../ui/TextField";
import Button from "../ui/Button";
import axios from "axios";

const removeErrMsg = () => {
  document.querySelectorAll("#errmsg")?.forEach((e) => e.remove());
};

function ModalDetailEvent({ isOpen, onClose, ...other }) {
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

  const handleUpdateEvent = async () => {
    try {
      await axios
        .put(
          "http://localhost:8000/api/v1/event/" + form.id,
          {
            name: form.name,
            ngaybatdau: form.dateStart,
            ngayketthuc: form.dateEnd,
            detail: form.note
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res?.statusText === "OK") {
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
          <div id="formUpdateEvent">
            <h4 class="error-message" id="errmsg">
              Sai thông tin!
            </h4>
          </div>
          <div className="list-button flex">
            <Button
              title={"Cancel"}
              styles={{
                backgroundColor: "red",
                color: "#fff",
              }}
              type={"button"}
              onClick={onClose}
            />
            <Button
              title={"Save"}
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
    </div>
  );
}

export default ModalDetailEvent;
