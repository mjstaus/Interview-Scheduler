import React from "react";

export default function DayListItem(props) {
  
  const day = props.name;

  return (
    <li onClick={() => props.setDay(day)}>
      <h2  className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );
}