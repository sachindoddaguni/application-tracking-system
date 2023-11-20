import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import TaskForm from "./TaskForm";
import axios from "axios";

const initialValues = {
  jobTitle: "",
  companyName: "",
  date: new Date(),
  jobLink: "",
  location: ""
};

function NewTask(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {}, []);

  const onSubmit = (values, submitProps) => {
    submitProps.setSubmitting(false);
    props.addNewTask(values);
    axios({
      method: "POST",
      url: "/applications",
      headers: {
        Authorization: "Bearer " + props.state.token,
      },
      data: {
        jobTitle: initialValues["jobTitle"],
        companyName: initialValues["companyName"],
        date: initialValues["date"],
        jobLink: initialValues["jobLink"],
        location: initialValues["location"]
      },
    })
      .then((response) => {
        const res = response.data;
        console.log(res)
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
    setShow(false);
    submitProps.resetForm();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        New Task
      </Button>
      <TaskForm taskState='New' show={show} handleClose={handleClose} initialValues={initialValues} onSubmit={onSubmit}></TaskForm>
    </>
  );
}

export default NewTask;
