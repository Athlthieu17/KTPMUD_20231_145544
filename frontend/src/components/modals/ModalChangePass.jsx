import React from 'react';
import "./modalDetailEvent.css"
import "./modalLogin.css"
import TextField from '../ui/TextField';
import Button from '../ui/Button';

function ModalChangePass({isOpen, onClose, ...other}) {

  return (
    <div className="modal-overlay">
          <div className="modal modal-login">
            <button className="modal-close" onClick={onClose}>
              &times;
            </button>
            <div className="modal-content">
          <h1>Thay đổi mật khẩu</h1>
          <div className="form-login">
            <TextField title={"Mật khẩu cũ"} value={''} type="password" onChange={(e) => {}} />
            <TextField title={"Mật khẩu mới"} value={''} type="password" onChange={(e) => {}} />
            <TextField title={"Xác nhận mật khẩu mới"} value={''} type="password" onChange={(e) => {}} />
          </div>
          <div className="form-action-change-pass">
            <Button
              title={"Save"}
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
          </div>
    </div>
  )
}

export default ModalChangePass