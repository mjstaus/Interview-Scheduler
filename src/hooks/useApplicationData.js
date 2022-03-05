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

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const updateAppts = axios.put(`/api/appointments/${id}`, appointment);
    updateAppts
      .then(() => setState({ ...state, appointments: { ...appointments } }))
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
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const deleteAppt = axios.delete(`/api/appointments/${id}`, appointment);
    deleteAppt
      .then(() => setState({ ...state, appointments: { ...appointments } }))
      .catch((error) => {
        console.log(error);
      });
    return deleteAppt;
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}
