import React, { Fragment, useState } from 'react';
import "components/Appointment/styles.scss"

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from '../../hooks/useVisualMode';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR';
  const ERROR_DELETE = 'ERROR_DELETE';
  const DELETING = 'DELETING';
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING); 
    props.bookInterview(props.id, interview)
    .then(
      () => transition(SHOW)
    )
    .catch(
      () => transition(ERROR_SAVE, true)
    )
  }

  const onDeleteClick = () => {
    transition(CONFIRM);
  }

  const onEditClick = () => {
    transition(EDIT);
  }


  function destroy(event) {
    transition(DELETING, true);
    props
     .cancelInterview(props.id)
     .then(() => transition(EMPTY))
     .catch(error => transition(ERROR_DELETE, true));
   }

  return (
    <div data-testid="appointment">
      {mode === EMPTY && <Empty 
      onAdd={()=> transition(CREATE)} />}

      {mode === SHOW && (<Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete={onDeleteClick}
      onEdit={onEditClick}/>
      )}

      {mode === CREATE && (<Form
      interviewers={props.interviewers}
      onCancel={() => back()}
      onSave={save}
      />)}

      {mode === SAVING && <Status message='Saving'/>}

      {mode === CONFIRM && <Confirm message='Confirm?'
      onCancel={()=> {transition(SHOW)}}
      onConfirm={()=> {destroy()}}/>}

        {mode === EDIT && (<Form
      interviewers={props.interviewers}
      onCancel={() => back()}
      onSave={save}
      name={props.interview.student}
      interviewer={props.interview.interviewer.id}
      />)}

      {mode === ERROR_DELETE && <Error onClose={back} message='Delete Error' />}

      {mode === DELETING && <Status message='Deleting' />}

      {mode === ERROR_SAVE && <Error onClose={back} message='Did not save' />}
    </div>
  )
}



//<article className="appointment"></article>