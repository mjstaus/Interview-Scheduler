import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem({ selected, spots, setDay, name }) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots
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
      className={dayClass}
      onClick={setDay}
      data-testid="day">
      <h2  className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}