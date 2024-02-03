import React, { useState } from "react";
import axios from "axios";
import "./modalDetailEvent.css";
import "./modalLogin.css";
import Button from "../ui/Button";
import TextField from "../ui/TextField";

localStorage.setItem("loginSuccess", true);
localStorage.setItem("registerSuccess", true);
localStorage.setItem("changepassSuccess", true);
localStorage.setItem("updateuserSuccess", true);
localStorage.setItem("updateeventSuccess", true);
localStorage.setItem("createeventSuccess", true);

const localStore = localStorage.setItem;

localStorage.setItem = function (key, value) {
  const event = new Event("localUpdated");
  event.key = key;
  event.value = value;

  document.dispatchEvent(event);
  localStore.apply(this, arguments);
};

var count = 0;
var count_changepass = 0;
var count_updateuser = 0;
var count_updateevent = 0;
var count_createevent = 0;

const removeErrMsg = (form = "loginSuccess") => {
  if (form === "loginSuccess") count = 0;
  if (form === "changepassSuccess") count_changepass = 0;
  if (form === "updateuserSuccess") count_updateuser = 0;
  if (form === "updateeventSuccess") count_updateevent = 0;
  if (form === "createeventSuccess") count_createevent = 0;
  document.querySelectorAll("#errmsg")?.forEach((e) => e.remove());
};

const localStoreHandler = function (e) {
  if (e.key === "createeventSuccess") {
    if (e.value === false) {
      console.log(count_createevent);
      count_createevent = count_createevent + 1;

      if (count_createevent === 2) {
        removeErrMsg("createeventSuccess");
        document
        .querySelector("#formCreateEvent")
        .insertAdjacentHTML(
          "afterbegin",
          `<h4 class="error-message" id="errmsg">Sai thông tin!</h4>`
        );
        count_createevent = 0;
      } else if (e.value === true) {
        removeErrMsg("createeventSuccess");
      }
    }
  }

  if (e.key === "updateeventSuccess") {
    if (e.value === false) {
      count_updateevent = count_updateevent + 1;
      
      if (count_updateevent === 2) {
        removeErrMsg("updateeventSuccess");
        document
        .querySelector("#formUpdateEvent")
        .insertAdjacentHTML(
          "afterbegin",
          `<h4 class="error-message" id="errmsg">Sai thông tin!</h4>`
        );
        count_updateevent = 0;
      } else if (e.value === true) {
        removeErrMsg("updateeventSuccess");
      }
    }
  }

  if (e.key === "updateuserSuccess") {
    if (e.value === false) {
      count_changepass = count_changepass + 1;

      if (count_changepass === 2) {
        removeErrMsg("updateuserSuccess");
        document
        .querySelector("#formupdate")
        .insertAdjacentHTML(
          "afterbegin",
          `<h4 class="error-message" id="errmsg">Sai thông tin!</h4>`
        );
        count_changepass = 0;
      } else if (e.value === true) {
        removeErrMsg("changepassSuccess");
      }
    }
  }

  if (e.key === "changepassSuccess") {
    if (e.value === false) {
      count_changepass = count_changepass + 1;

      if (count_changepass === 2) {
        removeErrMsg("changepassSuccess");
        document
        .querySelector("#form")
        .insertAdjacentHTML(
          "afterend",
          `<h4 class="error-message" id="errmsg">Sai thông tin!</h4>`
        );
        count_changepass = 0;
      } else if (e.value === true) {
        removeErrMsg("changepassSuccess");
      }
    }
  }

  if (e.key === "loginSuccess" && e.value === false) {
    count = count + 1;
    
    if (count === 1)
      document
        .querySelector("#loginForm")
        .insertAdjacentHTML(
          "afterend",
          `<h4 class="error-message" id="errmsg">Sai thông tin!</h4>`
        );
  } else if (e.key === "loginSuccess" && e.value === true) {
    removeErrMsg();
  }

  if (e.key === "registerSuccess") {
    if (e.value === false) {
      count = count + 1;
      
      if (count === 3) count = count + 1;
      if (count === 2) count = count + 1;
      if (count === 3) {
        document
          .querySelector("#registerForm")
          .insertAdjacentHTML(
            "afterend",
            `<h4 class="error-message" id="errmsg">Sai thông tin!</h4>`
          );
      }
    } else {
      removeErrMsg("registerSuccess");
    }
  } 
};

document.addEventListener("localUpdated", localStoreHandler, false);

export const getInfoUser = async (token) => {
  const authHeader = (token) => {
    if (token == null) return {};
    return { Authorization: "Bearer " + token };
  };

  try {
    await axios
      .get("http://localhost:8000/api/v1/users/information", {
        headers: authHeader(token),
      })
      .then((res) => {
        if (res?.statusText === "OK") {
          localStorage.setItem("id", res.data.manguoidung);
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("fullname", res.data.fullname);
          localStorage.setItem("gender", res.data.gender);
          localStorage.setItem("dateOfBirth", res.data.dateofbirth);
          localStorage.setItem("phone", res.data.phonenumber);
          localStorage.setItem("address", res.data.address);
          localStorage.setItem("loginSuccess", true);
          window.location.reload();
          localStorage.removeItem("loginSuccess");
        } else {
          localStorage.setItem("loginSuccess", false);
        }
      });
  } catch (error) {
    localStorage.setItem("loginSuccess", false);
  }
};

const submitLogin = async (username, password) => {
  try {
    await axios
      .post(
        "http://localhost:8000/api/v1/auth/login",
        JSON.stringify(
          `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`
        )
      )
      .then((response) => {
        if (response?.statusText === "OK") {
          localStorage.setItem("token", response.data.access_token);
          getInfoUser(response.data.access_token);
        } else {
          localStorage.setItem("loginSuccess", false);
        }
      });
  } catch (error) {
    localStorage.setItem("loginSuccess", false);
  }
};

const FormLogin = (setStatus) => {
  removeErrMsg();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleOnChange = (key, value) => {
    removeErrMsg();
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleLogin = async (username, password) => {
    try {
      await submitLogin(username, password);
    } catch (error) {
      localStorage.setItem("loginSuccess", false);
    }
  };

  return (
    <div className="modal-content">
      <h1>Đăng nhập</h1>
      <div className="form-login" id="loginForm">
        <TextField
          title={"Username"}
          value={form.username}
          onChange={(e) => handleOnChange("username", e.target.value)}
        />
        <TextField
          title={"Password"}
          value={form.password}
          type="password"
          onChange={(e) => handleOnChange("password", e.target.value)}
        />
      </div>
      <div className="form-action">
        <Button
          title={"Save"}
          type={"button"}
          styles={{
            backgroundColor: "#F1E040",
            color: "#000",
            borderRadius: "10px",
            width: "100px",
          }}
          onClick={async () => await handleLogin(form.username, form.password)}
        />
        <div className="flex">
          Chưa có tài khoản?{" "}
          <Button
            title={"Đăng ký "}
            type={"link"}
            onClick={() => setStatus("register")}
          />
        </div>
      </div>
    </div>
  );
};

const FormRegister = (setStatus) => {
  removeErrMsg("registerSuccess");

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    password: "",
    cfpassword: "",
  });

  const handleOnChange = (key, value) => {
    count = 0;
    removeErrMsg("registerSuccess");
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleRegister = async () => {
    if (form.password != form.cfpassword) {
      localStorage.setItem("registerSuccess", false);
    }
    try {
      await axios
        .post("http://localhost:8000/api/v1/users", {
          email: form.email,
          username: form.username,
          password: form.password,
          gender: form.gender == "Nam" ? "True" : form.gender == "Nữ" ? "False" : "",
          address: form.address,
          phonenumber: form.phone,
        })
        .then((response) => {
          if (response?.data.manguoidung) {
            localStorage.setItem("registerSuccess", true);
            setStatus("login");
          } else {
            localStorage.setItem("registerSuccess", false);
          }
        });
    } catch (error) {
      localStorage.setItem("registerSuccess", false);
    }
  };

  return (
    <div className="modal-content">
      <div className="flex-input">
        <div className="item-form">
          <div flexrow="true">
            <h1>Đăng ký</h1>
          </div>
        </div>
        <div className="item-form">
          <div flexrow="true" id="registerForm">
            
          </div>
        </div>
      </div>
      <div className="form-login">
        <TextField
          title={"Tên đăng nhập "}
          value={form.username}
          onChange={(e) => handleOnChange("username", e.target.value)}
        />
        <TextField
          title={"Email"}
          value={form.email}
          onChange={(e) => handleOnChange("email", e.target.value)}
        />
        <TextField
          title={"Số điện thoại"}
          value={form.phone}
          onChange={(e) => handleOnChange("phone", e.target.value)}
        />
        <TextField
          title={"Địa chỉ"}
          value={form.address}
          onChange={(e) => handleOnChange("address", e.target.value)}
        />
        <TextField
          title={"Giới tính (Nam/Nữ)"}
          value={form.gender}
          onChange={(e) => handleOnChange("gender", e.target.value)}
        />
        <TextField
          title={"Mật khẩu"}
          value={form.password}
          type="password"
          onChange={(e) => handleOnChange("password", e.target.value)}
        />
        <TextField
          title={"Xác nhận mật khẩu"}
          value={form.cfpassword}
          type="password"
          onChange={(e) => handleOnChange("cfpassword", e.target.value)}
        />
      </div>
      <div className="form-action">
        <Button
          title={"Save"}
          type={"button"}
          styles={{
            backgroundColor: "#F1E040",
            color: "#000",
            borderRadius: "10px",
            width: "100px",
          }}
          onClick={() => handleRegister()}
        />
        <div className="flex">
          <Button
            title={"Đăng nhập"}
            type={"link"}
            styles={{}}
            onClick={() => setStatus("login")}
          />
        </div>
      </div>
    </div>
  );
};

const ModalLogin = () => {
  const [status, setStatus] = useState("login");

  const renderForm = () => {
    switch (status) {
      case "login":
        return FormLogin(setStatus);
      case "register":
        return FormRegister(setStatus);
      default:
        return FormLogin(setStatus);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal modal-login">{renderForm()}</div>
    </div>
  );
};

export default ModalLogin;
