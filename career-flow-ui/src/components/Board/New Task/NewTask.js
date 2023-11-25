import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import TaskForm from "./TaskForm";
import axios from "axios";
import { data } from "jquery";

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
  const [values,setValues] = useState(initialValues);
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {}, []);

  const onSubmit = (values, submitProps) => {
    submitProps.setSubmitting(false);
    const token = localStorage.getItem("token");

    console.log("Token: " + token);

    console.log(values);

    props.addNewTask(values);
    axios({
      method: "POST",
      url: "/applications",
      headers: {
        Authorization: "Bearer " + token,
      },
      data: {
        jobTitle: values["jobTitle"],
        companyName: values["companyName"],
        date: values["date"],
        jobLink: values["jobLink"],
        location: values["location"]
      },
    })
      .then((response) => {
        const res = response.data;
        props.reload()
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
      <Button variant="contained" style={{ backgroundColor: "#d32f2f", color: "whitesmoke" }} onClick={handleShow}>
        NEW TASK
      </Button>
      {show && 
      <TaskForm taskState='New' show={show} handleClose={handleClose} initialValues={values} onSubmit={onSubmit} setValues={setValues}></TaskForm>
      }
    </>
  );
}

export default NewTask;
