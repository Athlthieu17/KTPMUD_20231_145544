import React from "react";
import TextField from "../components/ui/TextField";
import "../assets/styles/profile.css";
import Button from "../components/ui/Button";
import { useState } from "react";
import ModalChangePass from "../components/modals/ModalChangePass";
import { useAuth } from "../components/AuthContext";
import axios from "axios";

const removeErrMsg = () => {
  document.querySelectorAll("#errmsg")?.forEach((e) => e.remove());
};

function Profile() {
  const user = useAuth();

  const [profile, setProfile] = useState({
    name: user?.fullname,
    gender: user?.gender ? "Nam" : "Nữ",
    dateOfBirth: user?.dateOfBirth,
    email: user?.email,
    nameLogin: user?.username,
    password: "password",
    address: user?.address,
    phone: user?.phone,
  });
  const [isOpen, setIsOpen] = useState(false);

  const onChangeText = (key, value) => {
    removeErrMsg();
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios
        .put(
          "http://localhost:8000/api/v1/users/update_info/",
          {
            email: profile.email,
            dateofbirth: profile.dateOfBirth,
            username: profile.nameLogin,
            fullname: profile.name,
            gender: profile.gender == "Nam" ? "True" : profile.gender == "Nữ" ? "False" : "",
            phonenumber: profile.phone,
            address: profile.address,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res?.statusText === "OK") {
            localStorage.setItem("updateuserSuccess", true);
            localStorage.setItem("id", res?.data.manguoidung);
            localStorage.setItem("username", res?.data.username);
            localStorage.setItem("email", res?.data.email);
            localStorage.setItem("fullname", res?.data.fullname);
            localStorage.setItem("gender", res?.data.gender);
            localStorage.setItem("dateOfBirth", res?.data.dateofbirth);
            localStorage.setItem("phone", res?.data.phonenumber);
            localStorage.setItem("address", res?.data.address);
            window.location.reload();
          } else {
            localStorage.setItem("updateuserSuccess", false);
          }
        });
    } catch (error) {
      localStorage.setItem("updateuserSuccess", false);
    }
  };

  return (
    <div className="profile-main">
      <h1>Thông tin cá nhân</h1>
      <div className="form-profile">
        <div className="flex-input">
          <div className="item-form">
            <TextField
              title={"Họ và tên"}
              value={profile.name}
              flexRow
              onChange={(e) => onChangeText("name", e.target.value)}
            />
            <TextField
              title={"Giới tính (Nam/Nữ)"}
              value={profile.gender}
              flexRow
              onChange={(e) => onChangeText("gender", e.target.value)}
            />
            <TextField
              title={"Date of birth"}
              value={profile.dateOfBirth}
              flexRow
              onChange={(e) => onChangeText("dateOfBirth", e.target.value)}
            />
            <TextField
              title={"Email"}
              value={profile.email}
              flexRow
              onChange={(e) => onChangeText("email", e.target.value)}
            />
          </div>
          <div className="item-form">
            <TextField
              title={"Tên đăng nhập"}
              value={profile.nameLogin}
              flexRow
              onChange={(e) => onChangeText("nameLogin", e.target.value)}
            />
            <TextField
              title={"Mật khẩu"}
              value={profile.password}
              flexRow
              type="password"
              onChange={(e) => onChangeText("password", e.target.value)}
            />
            <Button
              title={"Đổi mật khẩu "}
              type={"link"}
              styles={{
                textAlign: "right",
              }}
              onClick={() => setIsOpen(true)}
            />
            <TextField
              title={"Số điện thoại"}
              value={profile.phone}
              flexRow
              onChange={(e) => onChangeText("phone", e.target.value)}
            />
          </div>
        </div>
        <div className="full-width">
          <TextField
            title={"Địa chỉ"}
            value={profile.address}
            flexRow
            onChange={(e) => onChangeText("address", e.target.value)}
          />
        </div>
        <div className="action flex"  id="formupdate">
          <Button
            title={"Lưu"}
            type={"button"}
            styles={{
              backgroundColor: "#409FC8",
              color: "#fff",
              borderRadius: "10px",
            }}
            onClick={async () => await handleUpdate()}
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
          />
        </div>
      </div>
      {isOpen && (
        <ModalChangePass isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
}

export default Profile;
