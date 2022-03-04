import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Form from "components/Appointment/Form.js";
import Status from "components/Appointment/Status.js";
import Error from "components/Appointment/Error.js";
import Confirm from "components/Appointment/Confirm.js";
import { useVisualMode } from "hooks/useVisualMode";

const SHOW = "SHOW";
const EMPTY = "EMPTY";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_SAVE= "ERROR_SAVE";
const ERROR_DELETE= "ERROR_DELETE";

export default function Appointment({
  id,
  interview,
  time,
  interviewers,
  bookInterview,
  cancelInterview,
}) {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  function destroy() {
    transition(DELETING);
    cancelInterview(id)
      .then(() => transition(EMPTY, true))
      .catch(() => transition(ERROR_DELETE, true))
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show 
          student={interview.student} 
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)} />
      )}
      {(mode === CREATE) && (
        <Form
          interviewers={interviewers}
          onSave={(name, interviewer) => save(name, interviewer)}
          onCancel={() => back()}
        />
      )}
      {(mode === EDIT) && (
        <Form
          student={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onSave={(name, interviewer) => save(name, interviewer)}
          onCancel={() => back()}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={() => destroy(id)}
          onCancel={() => back()}
          message={"Are you sure you would like to delete?"}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting"/>}
      {mode === ERROR_DELETE && <Error 
        message="Uh oh! Something went wrong!"
        onClose={() => back()}/>}
      {mode === ERROR_SAVE && <Error message="Uh oh! Something went wrong!"/>}
    </article>
  );
}
