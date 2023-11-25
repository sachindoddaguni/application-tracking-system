import React from "react";
import { Button, Modal, FormGroup, FormLabel } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./NewTask.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const validationSchema = Yup.object().shape({
  jobTitle: Yup.string().required("Job Title is required"),
  companyName: Yup.string().required("Company Name is required"),
  date: Yup.date().nullable().required("Date is required"),
  jobLink: Yup.string().required("Job link is required"),
  location: Yup.string().required("Location is required")
});

function TaskForm(props) {
  return (
    <>
      <Formik
        initialValues={props.editedValues|| props.initialValues}
        validationSchema={validationSchema}
        onSubmit={props.onSubmit}
        setValues={props.setValues}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Modal show={props.show} onHide={props.handleClose}>
              <Modal.Header closeButton>
          <Modal.Title>{props.taskState} Task</Modal.Title>
              </Modal.Header>
              <Form>
                <Modal.Body>
                  <FormGroup>
                    <FormLabel>Job Title</FormLabel>
                    <Field
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      className={`form-control ${
                        formik.touched.jobTitle && formik.errors.jobTitle
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="jobTitle"
                      className="invalid-feedback"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Company Name</FormLabel>
                    <Field
                      type="text"
                      id="companyName"
                      name="companyName"
                      className={`form-control ${
                        formik.touched.companyName && formik.errors.companyName
                          ? "is-invalid"
                          : ""
                      }`}
                      as="textarea"
                    />
                    <ErrorMessage
                      component="div"
                      name="companyName"
                      className="invalid-feedback"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Date</FormLabel>

                    <DatePicker
                      selected={formik.values.startDate}
                      name="date"
                      id="date"
                      onBlur={formik.handleBlur}
                      onChange={(date) =>
                        formik.setFieldValue("date", date)
                      }
                      className={`form-control ${
                        formik.touched.date && formik.errors.date
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="date"
                      className="invalid-feedback"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>job Link</FormLabel>
                    <Field
                      type="text"
                      id="jobLink"
                      name="jobLink"
                      className={`form-control ${
                        formik.touched.jobLink && formik.errors.jobLink
                          ? "is-invalid"
                          : ""
                      }`}
                      as="textarea"
                    />
                    <ErrorMessage
                      component="div"
                      name="jobLink"
                      className="invalid-feedback"
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Location</FormLabel>
                    <Field
                      type="text"
                      id="location"
                      name="location"
                      className={`form-control ${
                        formik.touched.location && formik.errors.location
                          ? "is-invalid"
                          : ""
                      }`}
                      as="textarea"
                    />
                    <ErrorMessage
                      component="div"
                      name="companyName"
                      className="invalid-feedback"
                    />
                  </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={props.handleClose}
                    type="reset"
                  >
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
          );
        }}
      </Formik>
    </>
  );
}

export default TaskForm;
