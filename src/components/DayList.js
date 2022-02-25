import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList({ days, value, onChange }) {
  
  const dayList = days.map(({ id, name, spots }) => (
      <DayListItem
      key={id}
      name={name}
      spots={spots} 
      selected={name === value}
      setDay={() => onChange(name)}
      />
  ))

  return (
    <ul>
      {dayList}
    </ul>
  );
}