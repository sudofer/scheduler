import React, { useState, useEffect } from "react";
import "components/Application.scss";
import Appointment from "./Appointment";
import DayList from 'components/DayList';
import axios from 'axios';

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Emrys Bryce-Blizz",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: '2pm',
    interview: {
      student: 'Juliano Mathias',
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 4,
    time: '9am',
    interview: {
      student: 'Paul Craig',
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  },
  {
    id: 5,
    time: '11am',
    interview: {
      student: 'LLoyd Niceman',
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  }
];




export default function Application(props) {
  // part 1
  const [day, setDay] = useState('Monday');



  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get('/api/days').then((res) => {
      setDays([...res.data])
    })
  }, [])


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
    days={days}
    day={day}
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
        {appointments.map((app) => <Appointment key={app.id} {...app} />)}
      </section>
    </main>
  );
}
