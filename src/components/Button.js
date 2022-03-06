import React from "react";
import "components/Button.scss";
import classNames from "classnames";

export default function Button({confirm, danger, onClick, disabled, children, ...rest}) {
  let buttonClass = classNames("button", {
     "button--confirm": confirm,
     "button--danger": danger
   });

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
