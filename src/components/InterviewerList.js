import React from 'react';
import 'components/InterviewerList.scss'
import InterviewerListItem from 'components/InterviewerListItem';
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  const parsedInterviewers = props.interviewers
  .map((interviewer) => {
    return (
      <InterviewerListItem 
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={props.interviewer === interviewer.id}
      setInterviewer={() => props.setInterviewer(interviewer.id)}
      />
    )
  })


  return (
    <ul className='interviewers__list'>
   {parsedInterviewers}
   </ul>
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

