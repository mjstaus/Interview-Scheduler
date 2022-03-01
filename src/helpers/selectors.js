const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  }
};

export function getAppointmentsForDay(state, day) {
  const apptsFromDay = state.days.filter(d => d.name === day)[0]?.appointments;
  
  if(!apptsFromDay){
    return [];
  }
  
  const apptsArray = Object.entries(state?.appointments);
  const result = [];
  for(const appt of apptsFromDay){
    const a = apptsArray.filter(a => a[1]?.id === appt);
    result.push(a[0][1]);
  }
  return result;
}