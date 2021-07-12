import React, { useState, useEffect } from "react";
import "components/Application.scss";
import Appointment from "./Appointment";
import DayList from 'components/DayList';
import axios from 'axios';
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from 'helpers/selectors';
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  // part 1
  
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);


  console.log(state);
  // part 2
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
  <DayList
    days={state.days}
    day={state.day}
    setDay={setDay}
    />
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {dailyAppointments.map((app) => {
          const interview = getInterview(state, app.interview)
          console.log(state);
          console.log(interview,`************`, app.interview);
        return (
          <Appointment 
          key={app.id}
          id={app.id}
          time={app.time}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
        )  
        })}
      </section>
    </main>
  );
}
