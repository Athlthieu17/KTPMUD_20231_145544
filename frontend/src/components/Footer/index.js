import React from "react";
import { Icon } from "@iconify/react";
import "./footer.css";
import Button from "../ui/Button";
import { useAuth } from "../AuthContext";

function Footer() {
  const user = useAuth();

  return (
    <>
    <div className="header flex">
      <div className="header-item header-icon">
        <Icon icon="tabler:brand-facebook" fontSize={20} />
        <Icon icon="tabler:brand-x" fontSize={20} />
        <Icon icon="tabler:brand-linkedin" fontSize={20} />
      </div>
      {user?.username && (<div className="header-item flex">
        <div className="header-item__contact">
          <Icon icon="tabler:phone" />
          <span>{user?.phone}</span>
        </div>
        <div className="header-item__contact">
          <Icon icon="tabler:mail" />
          <span>{user?.email}</span>
        </div>
      </div>)}
    </div>
    </>
  );
}

export default Footer;
