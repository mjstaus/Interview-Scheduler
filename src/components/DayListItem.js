import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const day = props.name;
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  return (
    <li 
      className={ dayClass }
      onClick={() => props.setDay(day)}>
      <h2  className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );
}