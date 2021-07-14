import { useEffect, useState } from "react";
import axios from 'axios';

export default function useApplicationData() {
 

  const setDay = day => setState({ ...state, day });
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, [])

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

  let days = updateSpots(state, state.day, appointments)

    return axios.put(`/api/appointments/${id}`, {interview})
    .then(
      () => setState({...state, appointments, days})
    )
  }

  const cancelInterview = appID => {
    const appointment = {...state.appointments[appID]};
    appointment.interview = null;
    const appointments = {
      ...state.appointments,
      [appID]: appointment
    };
    let days = updateSpots(state, state.day, appointments)

    return axios.delete(`/api/appointments/${appID}`)
    .then(() => setState((prev) => ({...prev, appointments, days}))) 
    
  }
  return {cancelInterview, bookInterview, state, setDay}
}

const updateSpots = (state, day, appointments) => {
  // Find the day the object
  const currentDayObj = state.days.find(dayObj => dayObj.name === state.day)
  const currentDayIndex = state.days.findIndex(dayObj => dayObj.name === state.day)
  // Find the appointment id array
  const listOfAppointmentIds = currentDayObj.appointments
  // Look for the null interviews in each appointment from the array
  const listOfNullAppointments = listOfAppointmentIds.filter(id => !appointments[id].interview)
  // Sum them up
  const spots = listOfNullAppointments.length
  // update the value of the key 'spots' in the day with the sum I just made
  const updatedDayObj = { ...currentDayObj, spots }

  let newDays = [...state.days]
  newDays[currentDayIndex] = updatedDayObj

  return newDays
}

