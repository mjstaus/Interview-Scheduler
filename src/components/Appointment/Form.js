import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setStudent("");
    setInterviewer(null);
    setError("")
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (!interviewer) {
      setError("Please select an interviewer");
      return;
    }
    props.onSave(student, interviewer);
  };

  return (
    <form autoComplete="off" onSubmit={onHandleSubmit}>
      <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <input
            className="appointment__create-input text--semi-bold"
            name="student"
            type="text"
            value={student}
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
          <InterviewerList
            interviewers={props.interviewers}
            onChange={setInterviewer}
            value={interviewer}
          />
        </section>
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button danger onClick={cancel}>
              Cancel
            </Button>
            <Button type="submit" confirm>
              Save
            </Button>
          </section>
        </section>
      </main>
    </form>
  );
}
