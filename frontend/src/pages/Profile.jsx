import React from "react";
import TextField from "../components/ui/TextField";
import "../assets/styles/profile.css";
import Button from "../components/ui/Button";
import { useState, useEffect } from "react";
import ModalChangePass from "../components/modals/ModalChangePass";

function Profile() {
    const [profile, setProfile] = useState({
        name : '',
        gender: '',
        dateOfBirth : '',
        email: '',
        nameLogin : '',
        password: '',
        address: '',
        phone : ''
    })
    const [isOpen, setIsOpen] = useState(false);

    const onChangeText = (key, value) => {
        setProfile({
            ...profile,
            [key]: value
        })
    }

    
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
              onChange={(e) => onChangeText('name', e.target.value)}
            />
            <TextField
              title={"Giới tính"}
              value={profile.gender}
              flexRow
              onChange={(e) => onChangeText('gender', e.target.value)}
            />
            <TextField
              title={"Date of birth"}
              value={profile.dateOfBirth}
              flexRow
              onChange={(e) => onChangeText('dateOfBirth', e.target.value)}
            />
            <TextField
              title={"Email"}
              value={profile.email}
              flexRow
              onChange={(e) => onChangeText('email', e.target.value)}
            />
          </div>
          <div className="item-form">
            <TextField
              title={"Tên đăng nhập"}
              value={profile.nameLogin}
              flexRow
              onChange={(e) => onChangeText('nameLogin', e.target.value)}
            />
            <TextField
              title={"Mật khẩu"}
              value={profile.password}
              flexRow
              type="password"
              onChange={(e) => onChangeText('password', e.target.value)}
            />
            <Button
                title={"Đổi mật khẩu "}
                type={"link"}
                styles={{
                  textAlign: 'right'
                }}
                onClick={() => setIsOpen(true)}
              />
            <TextField
              title={"Số điện thoại"}
              value={profile.phone}
              flexRow
              onChange={(e) => onChangeText('phone', e.target.value)}
            />
          </div>
        </div>
        <div className="full-width">
          <TextField
            title={"Địa chỉ"}
            value={profile.address}
            flexRow
            onChange={(e) => onChangeText('address', e.target.value)}
          />
        </div>
        <div className="action flex">
          <Button
            title={"Lưu"}
            type={"button"}
            styles={{
              backgroundColor: "#409FC8",
                color: "#fff",
                borderRadius: '10px',
            }}

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
      {
        isOpen && (
          <ModalChangePass isOpen={isOpen} onClose={()=> setIsOpen(false)}/>
        )
      }
    </div>
  );
}

export default Profile;
