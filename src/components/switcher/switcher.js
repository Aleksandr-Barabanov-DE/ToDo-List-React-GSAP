import React from "react";
import "../variables.css";

export const Switch = ({ id, isChecked, onToggle }) => {
  return (
    <div className="switch">
      <input type="checkbox" id={id} checked={isChecked} onChange={onToggle} />
      <label htmlFor={id} className="task-label"></label>
    </div>
  );
};
