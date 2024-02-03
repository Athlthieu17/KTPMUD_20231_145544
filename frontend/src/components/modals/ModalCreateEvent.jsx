import React, { useState } from "react";
import "./modalDetailEvent.css";
import "./modalCreateEvent.css";
import TextField from "../ui/TextField";
import Button from "../ui/Button";
import axios from "axios";

localStorage.setItem("changepassSuccess", true);

const removeErrMsg = () => {
  document.querySelectorAll("#errmsg")?.forEach((e) => e.remove());
};

function ModalCreateEvent({ isOpen, onClose, ...other }) {
  const [form, setForm] = useState({
    passold: "",
    passnew: "",
    cfpassnew: "",
  });

  const handleOnChange = (key, value) => {
    removeErrMsg();
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleChangePass = async () => {
    // if (form.cfpassnew !== form.passnew) {
    //   localStorage.setItem("changepassSuccess", false);
    // } else {
    //   try {
    //     await axios
    //       .put(
    //         "http://localhost:8000/api/v1/users/change_password/",
    //         {
    //           password: form.passold,
    //           new_password: form.passnew,
    //         },
    //         {
    //           headers: {
    //             Authorization: "Bearer " + localStorage.getItem("token"),
    //           },
    //         }
    //       )
    //       .then((res) => {
    //         if (res?.statusText === "OK") {
    //           localStorage.setItem("changepassSuccess", true);
    //           window.location.reload();
    //           localStorage.removeItem("changepassSuccess");
    //         } else {
    //           localStorage.setItem("changepassSuccess", false);
    //         }
    //       });
    //   } catch (error) {
    //     localStorage.setItem("changepassSuccess", false);
    //   }
    // }
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
              value={form.username}
              onChange={(e) => handleOnChange("passold", e.target.value)}
            />
            <TextField
              title={"Tên sự kiện"}
              value={form.username}
              onChange={(e) => handleOnChange("passold", e.target.value)}
            />
            <TextField
              title={"Ngày bắt đầu"}
              value={form.username}
              onChange={(e) => handleOnChange("passold", e.target.value)}
            />
            <TextField
              title={"Ngày kết thúc"}
              value={form.username}
              onChange={(e) => handleOnChange("passold", e.target.value)}
            />
            <TextField
              title={"Ghi chú"}
              value={form.username}
              onChange={(e) => handleOnChange("cfpassnew", e.target.value)}
            />
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
              onClick={async () => await handleChangePass()}
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
