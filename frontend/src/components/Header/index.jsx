import React from "react";
import { Icon } from "@iconify/react";
import "./header.css";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import MenuAction from "./MenuAction";

function Header({ isShowAction = false }) {
  const user = useAuth();
  const navigate = useNavigate();

  const handleRedirectPage = () => {
    navigate("/event", { replace: true });
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <>
      <div className="header flex">
        <div className="header-item header-icon">
          <Icon icon="tabler:brand-facebook" fontSize={20} />
          <Icon icon="tabler:brand-x" fontSize={20} />
          <Icon icon="tabler:brand-linkedin" fontSize={20} />
        </div>
        <div className="header-item flex">
          <div className="header-item__contact">
            {user?.phone && (<Icon icon="tabler:phone" />)}
            <span>{user?.phone}</span>
          </div>
          <div className="header-item__contact">
            {user?.email && (<Icon icon="tabler:mail" />)}
            <span>{user?.email}</span>
          </div>
          {user.username ? (
            <div className="header-item__contact">
              <img src={user?.image} alt={user?.username} />
              <span>{user?.username}</span>
            </div>
          ) : (
            <div className="header-item__contact">
              <Icon icon="tabler:user" />
              <Button
                title={"Login"}
                type={"button"}
                color={"primary"}
                styles={{ padding: "5px 20px" }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="header-section">
        <div className="flex section">
          <div className="section-item">
            <h1 className="section-item__title">HTML EVENT</h1>
          </div>
          {!isShowAction && (
            <div className="section-item">
              <div className="header-item flex">
                <div className="header-item__contact">
                <Button
                  title={"Quản lý sự kiện"}
                  type={"button"}
                  onClick={handleRedirectPage}
                />
                </div>
                {user?.username && (
                  <div className="header-item__contact" style={{ marginLeft: '10px' }}>
                    <Button
                      title={"Đăng xuất"}
                      type={"button"}
                      onClick={handleLogout}
                    />
                  </div>)
                }
              </div>
            </div>
          )}
        </div>
        {isShowAction && (
          <MenuAction/>
        )}
      </div>
    </>
  );
}

export default Header;
