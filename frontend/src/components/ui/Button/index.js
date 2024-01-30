import React from "react";
import "./style.css";
import { COLOR } from "../../../utils/constants";

function Button({
  title,
  className = "",
  disabled = false,
  type,
  styles,
  color,
  onClick,
}) {
  const renderButton = () => {
    switch (type) {
      case "link":
        return (
          <a className={className} href="#" style={{...styles}} disabled={disabled} onClick={(e) => onClick && !disabled && onClick(e)}>
            {title}
          </a>
        );
      case "button":
        return (
          <div className="button-container" onClick={(e) => onClick && !disabled && onClick(e)}>
            <button
              style={{
                backgroundColor: !disabled ? COLOR[color] : COLOR['disabled'],
                color: color === "primary" ? "#fff" : "#000",
                ...styles,
              }}
              className={className}
              disabled={disabled}
              onClick={onClick}
            >
              {title}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderButton()}</>;
}

export default Button;
