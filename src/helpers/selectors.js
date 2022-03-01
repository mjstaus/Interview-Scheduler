export function getAppointmentsForDay(state, day) {
  const apptsFromDay = state.days.filter(d => d.name === day)[0].appointments;
  
  if(!apptsFromDay){
    return [];
  }
  
  const apptsArray = Object.entries(state.appointments);
  const result = [];
  for(const appt of apptsFromDay){
    const a = apptsArray.filter(a => a[1].id === appt);
    result.push(a[0][1]);
  }
  return result;
}