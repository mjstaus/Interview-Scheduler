import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js"
import Show from "components/Appointment/Show.js"
import Empty from "components/Appointment/Empty.js"

export default function Appointment({ interview={}, time }) {
  const { student, interviewer } = interview;


  return (
    <article className="appointment">
      <Header time={time}/>
      { student && interviewer ? <Show student={student} interviewer={interviewer}/> : <Empty/> }
    </article>
    
  )
}