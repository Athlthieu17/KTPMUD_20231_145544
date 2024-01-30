import React from "react";
import { Icon } from "@iconify/react";
import "./footer.css";
import Button from "../ui/Button";
import { useAuth } from "../AuthProvider";

function Footer() {
  const user = useAuth();

  console.log(user);

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
     
      </div>
    </div>
    </>
  );
}

export default Footer;
