import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem({ id, name, avatar, selected, setInterviewer}) {
  const interviewerClass = classNames("interviewers__item-image", {
    "interviewers__item--selected": selected
  });

  const formatSpots = (spots) => {
    if(!spots) {
      return "no spots remaining"
    } else if(spots === 1) {
      return "1 spot remaining"
    } else return `${spots} spots remaining`
  }

  return (
    <li 
      className="interviewers__item"
      onClick={() => setInterviewer(id)}>
      <img
        className={interviewerClass}
        src={avatar}
        alt={name}
      />
      {name}
    </li>
  );
}