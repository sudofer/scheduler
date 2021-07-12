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
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(
      () => setState((prev) => ({...prev, appointments}))
    )
  }

  const cancelInterview = appID => {
    const appointment = {...state.appointments[appID]};
    appointment.interview = null;
    const appointments = {
      ...state.appointments,
      [appID]: appointment
    };
    return axios.delete(`/api/appointments/${appID}`)
    .then(() => setState((prev) => ({...prev, appointments})))
  }
  

  return {cancelInterview, bookInterview, state, setDay}


}






