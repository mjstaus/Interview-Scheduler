import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
import propTypes from 'prop-types';

function InterviewerList({ interviewers, onChange, value }) {

  const interviewerList = interviewers.map(({ id, name, avatar }) => {
    function onHandleSetInterviewer() {
      onChange(id)
    }
    
    return (
      <InterviewerListItem
        key={id}
        name={name}
        avatar={avatar} 
        selected={id === value}
        setInterviewer={onHandleSetInterviewer}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"> {interviewerList}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: propTypes.array.isRequired
};

export default InterviewerList
