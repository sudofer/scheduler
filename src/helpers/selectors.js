export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.find(dayObj => dayObj.name === day);
    if (!filteredDay) {
      return [];
    }
  const apps = filteredDay.appointments;
  const results = [];
  for (const id of apps) {
    results.push(state.appointments[id]);
  }
  return results;
}

export function getInterview(state, interview) {
  
  if (!interview) {
    return null;
  }
 
  //get interviewer from appointment
  const interviewer = state.interviewers[interview.interviewer];

  return  {
    'student': interview.student,
    'interviewer': interviewer
}

}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.find(dayObj => dayObj.name === day);
    if (!filteredDay) {
      return [];
    }
  const interviewers = filteredDay.interviewers;
  const results = [];
  for (const id of interviewers) {
    results.push(state.interviewers[id]);
  }
  return results;

  
}