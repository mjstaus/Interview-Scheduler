import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList({ interviewers, setInterviewer, interviewer}) {

  const interviewerList = interviewers.map(({ id, name, avatar }) => (
    <InterviewerListItem
    key={id}
    name={name}
    avatar={avatar} 
    selected={id === interviewer}
    setInterviewer={() => setInterviewer(id)}
    />
))

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"> {interviewerList}</ul>
    </section>
  );
}