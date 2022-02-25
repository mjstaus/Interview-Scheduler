import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList({ days, day, setDay }) {
  
  const dayList = days.map(({ id, name, spots }) => (
      <DayListItem
      key={id}
      name={name}
      spots={spots} 
      selected={name === day}
      setDay={() => setDay(id)}
      />
  ))

  return (
    <ul>
      {dayList}
    </ul>
  );
}