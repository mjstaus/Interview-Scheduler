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

export default function Appointment({
  id,
  interview,
  time,
  interviewers,
  bookInterview,
}) {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(id, interview).then(() => transition(SHOW));
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show student={interview.student} interviewer={interview.interviewer} />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={(name, interviewer) => save(name, interviewer)}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
    </article>
  );
}
