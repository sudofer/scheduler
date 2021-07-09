import React, { Fragment, useState } from 'react';
import "components/Appointment/styles.scss"

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from '../../hooks/useVisualMode';


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = 'CREATE';
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  

  return (
    <>
      {mode === EMPTY && <Empty 
      onAdd={()=> transition(CREATE)} />}
      {mode === SHOW && (<Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}/>
      )}
      {mode === CREATE && (<Form
      interviewers={props.interviewers}
      onCancel={() => back(EMPTY)}
      />)}
    </>
  )

}



//<article className="appointment"></article>