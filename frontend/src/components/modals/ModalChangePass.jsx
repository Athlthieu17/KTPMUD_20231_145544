import React, { useState } from "react";
import "./modalDetailEvent.css";
import "./modalLogin.css";
import TextField from "../ui/TextField";
import Button from "../ui/Button";
import axios from "axios";

localStorage.setItem("changepassSuccess", true);

var count = 0;

const removeErrMsg = () => {
  count = 0;
  document.querySelectorAll("#errmsg")?.forEach((e) => e.remove());
};

function ModalChangePass({ isOpen, onClose, ...other }) {
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
    if (form.cfpassnew !== form.passnew) {
      localStorage.setItem("changepassSuccess", false);
    } else {
      try {
        await axios
          .put(
            "http://localhost:8000/api/v1/users/change_password/",
            {
              password: form.passold,
              new_password: form.passnew,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            if (res?.statusText === "OK") {
              localStorage.setItem("changepassSuccess", true);
              window.location.reload();
              localStorage.removeItem("changepassSuccess");
            } else {
              localStorage.setItem("changepassSuccess", false);
            }
          });
      } catch (error) {
        localStorage.setItem("changepassSuccess", false);
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal modal-login">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">
          <h1>Thay đổi mật khẩu</h1>
          <div className="form-login" id="form">
            <TextField
              title={"Mật khẩu cũ"}
              type="password"
              value={form.username}
              onChange={(e) => handleOnChange("passold", e.target.value)}
            />
            <TextField
              title={"Mật khẩu mới"}
              type="password"
              value={form.username}
              onChange={(e) => handleOnChange("passnew", e.target.value)}
            />
            <TextField
              title={"Xác nhận mật khẩu mới"}
              type="password"
              value={form.username}
              onChange={(e) => handleOnChange("cfpassnew", e.target.value)}
            />
          </div>
          <div className="form-action-change-pass">
            <Button
              title={"Save"}
              type={"button"}
              styles={{
                backgroundColor: "#409FC8",
                color: "#fff",
                borderRadius: "10px",
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

export default ModalChangePass;
