import React from "react";
import { Icon } from "@iconify/react";
import "./header.css";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import MenuAction from "./MenuAction";

function Header({ isShowAction = false }) {
  const user = useAuth();
  const navigate = useNavigate();

  const handleRedirectPage = () => {
    navigate("/event", { replace: true });
  };

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
            <Icon icon="tabler:phone" />
            <span>+84 987 654 321</span>
          </div>
          <div className="header-item__contact">
            <Icon icon="tabler:mail" />
            <span>html@gmail.com</span>
          </div>
          {user ? (
            <div className="header-item__contact">
              <img src={user?.image} alt={user?.userName} />
              <span>{user?.userName}</span>
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
              <Button
                title={"Quan ly su kien"}
                type={"button"}
                onClick={handleRedirectPage}
              />
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
