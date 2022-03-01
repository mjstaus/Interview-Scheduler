import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js"
import Show from "components/Appointment/Show.js"
import Empty from "components/Appointment/Empty.js"

export default function Appointment({ interview, time }) {

  return (
    <article className="appointment">
      <Header time={time}/>
      { interview && interview.student && interview.interviewer ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty/> }
    </article>
    
  )
}