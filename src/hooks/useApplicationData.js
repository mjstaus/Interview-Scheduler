import { useEffect, useReducer } from "react";
import axios from "axios";

export function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  };

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.value };
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.value[0].data,
          appointments: action.value[1].data,
          interviewers: action.value[2].data,
        };

      case SET_INTERVIEW: {
        return {
          ...state,
          appointments: action.value[0],
          days: action.value[1],
        };
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  function setDay(day) {
    dispatch({type: SET_DAY, value: day})
  }

  useEffect(() => {
    const proxy = {
      host: "localhost",
      port: 8001,
    };

    // const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    // ws.onopen = (event) => {
    //   ws.send("ping");
    // };
    // ws.onerror = (error) => {
    //   console.log(`WebSocket error: ${error}`)
    // }
    // ws.onmessage = (event) => {
    //   console.log("Message received:", event.data)
    // }

    Promise.all([
      axios.get("/api/days", {
        proxy: proxy,
      }),
      axios.get("/api/appointments", {
        proxy: proxy,
      }),
      axios.get("/api/interviewers", {
        proxy: proxy,
      }),
    ])
      .then((all) => {
        dispatch({ type: SET_APPLICATION_DATA, value: all });
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
      if (d.name === day) {
        const availableSpotsForDay = d.appointments.filter(
          (id) => !updatedAppointments[id].interview
        ).length;

        return {
          ...d,
          spots: availableSpotsForDay,
        };
      }

      return d;
    });

    dispatch({
      type: SET_INTERVIEW,
      value: [updatedAppointments, updatedDays],
    });
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

    const deleteInterview = axios.delete(
      `/api/appointments/${id}`,
      appointment
    );
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
    cancelInterview,
  };
}
