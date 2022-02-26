import React from "react";
import "components/Appointment/styles.scss";
import classNames from "classnames";

export default function Appointment({time}) {

  return (
    <article className="appointment">{time}</article>
  )
}