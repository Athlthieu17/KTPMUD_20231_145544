import React from "react";
import "./select.css";

function SelectField({
  options,
  value,
  onChange,
  className = "",
  styles = {},
  disabled = false,
  title = "",
  isShowTitle = false,
  ...other
}) {
  return (
    <div className="select-field">
      <select id={isShowTitle ? title : ""} value={value} onChange={onChange} {...other}>
        {
            options.map((option, index) => {
              return (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              );
            })
        }
      </select>
      {isShowTitle && <label htmlFor={title}>{title}</label>}
    </div>
  );
}

export default SelectField;
