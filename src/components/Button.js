import React from "react";
import "components/Button.scss";
import classNames from "classnames";

export default function Button({confirm, danger, onClick, disabled, children}) {
  let buttonClass = classNames("button", {
     "button--confirm": confirm,
     "button--danger": danger
   });

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
