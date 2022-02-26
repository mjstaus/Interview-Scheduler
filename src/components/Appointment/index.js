import React from "react";
import "components/Appointment/styles.scss";

export default function Appointment({time}) {

  return (
    <article className="appointment">{time}</article>
  )
}