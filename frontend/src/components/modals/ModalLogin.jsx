import React, { useState } from "react";
import "./modalDetailEvent.css";
import "./modalLogin.css";
import Button from "../ui/Button";
import TextField from "../ui/TextField";

const FormLogin = (setStatus) =>{

    const [form, setForm] = useState({
        email: '',
        password: ''
    })


    const handleOnChange = (key, value) => {
        setForm({
         ...form,
            [key]: value
        })
    }
    return (
        <div className="modal-content">
          <h1>Đăng nhập</h1>
          <div className="form-login">
            <TextField title={"Name"} value={form.email} onChange={(e) => handleOnChange('email', e.target.value)} />
            <TextField title={"Password"} value={form.password} type="password" onChange={(e) => handleOnChange('password', e.target.value)} />
          </div>
          <div className="form-action">
            <Button
              title={"Save"}
              type={"button"}
              styles={{
                backgroundColor: "#F1E040",
                  color: "#000",
                  borderRadius: '10px',
                  width :'100px'
              }}
            />
            <div className="flex">
              Chưa có tài khoản?{" "}
              <Button
                title={"Đăng ký "}
                type={"link"}
                styles={{
                  
                }}
                onClick={() => setStatus('register')}
              />
            </div>
          </div>
        </div>
    )
}

const FormRegister = (setStatus) =>{

    const [form, setForm] = useState({
        email: '',
        password: ''
    })


    const handleOnChange = (key, value) => {
        setForm({
         ...form,
            [key]: value
        })
    }
    return (
        <div className="modal-content">
          <h1>Đăng ký</h1>
          <div className="form-login">
            <TextField title={"Tên đăng nhập "} value={form.email} onChange={(e) => handleOnChange('email', e.target.value)} />
            <TextField title={"Email"} value={form.password}  onChange={(e) => handleOnChange('password', e.target.value)} />
            <TextField title={"Số điện thoại"} value={form.password}  onChange={(e) => handleOnChange('password', e.target.value)} />
            <TextField title={"Địa chỉ"} value={form.password}  onChange={(e) => handleOnChange('password', e.target.value)} />
            <TextField title={"Giới tính"} value={form.password}  onChange={(e) => handleOnChange('password', e.target.value)} />
            <TextField title={"Mật khẩu"} value={form.password} type="password" onChange={(e) => handleOnChange('password', e.target.value)} />
            <TextField title={"Xác nhận mật khẩu"} value={form.password} type="password" onChange={(e) => handleOnChange('password', e.target.value)} />
          </div>
          <div className="form-action">
            <Button
              title={"Save"}
              type={"button"}
              styles={{
                backgroundColor: "#F1E040",
                  color: "#000",
                  borderRadius: '10px',
                  width :'100px'
              }}
            />
            <div className="flex">
              <Button
                title={"Đăng nhập"}
                type={"link"}
                styles={{
                  
                }}
                onClick={() => setStatus('login')}
              />
            </div>
          </div>
        </div>
    )
}

const ModalLogin = () => {
    const [status , setStatus] = useState('login');

    const renderForm = () =>{
        switch (status) {
            case 'login':
                return FormLogin(setStatus);
            case 'register':
                return FormRegister(setStatus);
            default:
                return FormLogin(setStatus);
        }
    }

  return (
    <div className="modal-overlay">
      <div className="modal modal-login">
        {renderForm()}
      </div>
    </div>
  );
}

export default ModalLogin;
