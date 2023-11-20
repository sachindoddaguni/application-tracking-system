import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

const CardEdit = ({ closeEditModal, deleteApplication, submitFunc, application, mode, show }) => {
  const [id, setId] = useState(application.id);
  const [jobTitle, setJobTitle] = useState(application.jobTitle);
  const [companyName, setCompanyName] = useState(application.companyName);
  const [date, setDate] = useState(application.date);
  const [jobLink, setJobLink] = useState(application.jobLink);
  const [location, setLocation] = useState(application.location);
  const [classValue, setClassValue] = useState(application.status);

  const handleChange = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case 'jobTitle':
        setJobTitle(value);
        break;
      case 'companyName':
        setCompanyName(value);
        break;
      case 'date':
        setDate(value);
        break;
      case 'jobLink':
        setJobLink(value);
        break;
      case 'location':
        setLocation(value);
        break;
      case 'class':
        setClassValue(value);
        break;
      default:
        break;
    }
  };

  const submitAction = () => {
    closeEditModal();
    const editedApplication = {
      id,
      jobTitle,
      companyName,
      date,
      jobLink,
      location,
      status: classValue,
    };

    if (editedApplication.jobLink && !editedApplication.jobLink.startsWith('http')) {
      editedApplication.jobLink = 'http://' + editedApplication.jobLink;
    }

    submitFunc(editedApplication);
  };

  const deleteAction = () => {
    closeEditModal();
    const deletedApplication = {
      id,
      jobTitle,
      companyName,
      date,
      jobLink,
      location,
      status: classValue,
    };
    deleteApplication(deletedApplication);
  };

  const functionBtn =
    mode === 'update' ? (
      <button type='button' className='btn btn-success' onClick={submitAction}>
        Update
      </button>
    ) : (
      <button type='button' className='btn btn-success' onClick={submitAction}>
        Create
      </button>
    );

  return (
    <div>
      <Modal show={show} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>{application.companyName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='form-group'>
            <label htmlFor='companyName' className='col-form-label'>
              Company Name
            </label>
            <input
              type='text'
              className='form-control'
              id='companyName'
              value={companyName}
              onChange={handleChange}
            />
          </div>
          {/* Other form inputs */}
        </Modal.Body>
        <Modal.Footer>
          <button type='button' className='btn btn-danger mr-auto' onClick={deleteAction}>
            Delete
          </button>
          <button type='button' className='btn btn-secondary' onClick={closeEditModal}>
            Close
          </button>
          {functionBtn}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CardEdit;
