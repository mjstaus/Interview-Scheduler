import { useState, useEffect } from "react";
import axios from "axios";

export function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    const proxy = {
      host: "localhost",
      port: 8001,
    }
    Promise.all([
      axios.get("/api/days", {
        proxy: proxy
      }),
      axios.get("/api/appointments", {
        proxy: proxy
      }),
      axios.get("/api/interviewers", {
        proxy: proxy
      }),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((error) => {
        console.log(error.status);
        console.log(error.header);
        console.log(error.data);
      });
  }, []);

  function updateAppointmentsAndSpots(appointment) {
    const { day, days, appointments } = state;

    const updatedAppointments = {
      ...appointments,
      [appointment.id]: appointment,
    };
    
    const updatedDays = days.map((d) => {
      if(d.name === day){
        const availableSpotsForDay = d.appointments.filter((id) => !updatedAppointments[id].interview).length;

        return {
          ...d,
          spots: availableSpotsForDay
        }
      }

      return d
    })

    setState({
      ...state,
      appointments: updatedAppointments,
      days: updatedDays,
    })
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    
    const updateAppts = axios.put(`/api/appointments/${id}`, appointment);
    updateAppts
      .then(() => updateAppointmentsAndSpots(appointment))
      .catch((error) => {
        console.log(error);
      });
    return updateAppts;
  }
  

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const deleteInterview = axios.delete(`/api/appointments/${id}`, appointment);
    deleteInterview
      .then(() => updateAppointmentsAndSpots(appointment))
      .catch((error) => {
        console.log(error);
      });
    return deleteInterview;
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}
