import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  
  const setDay = (day) => setState({ ...state, day });
  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days", {
        proxy: {
          host: "localhost",
          port: 8001,
        },
      }),
      axios.get("/api/appointments", {
        proxy: {
          host: "localhost",
          port: 8001,
        },
      })])
      .then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}))
      })
      .catch((error) => {
        console.log(error.status);
        console.log(error.header);
        console.log(error.data);
      });
    }, []);
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  console.log(dailyAppointments);
    
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => (
          <Appointment key={appointment.id} {...appointment} />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
