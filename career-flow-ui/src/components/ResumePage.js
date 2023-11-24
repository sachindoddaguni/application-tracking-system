import React, { useState } from 'react';
import axios from 'axios';


function ResumePage(props) {
  const [uploadedFile, setUploadedFile] = useState(null);

  const [resume, setresume] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setUploadedFile(file);

    const formData = new FormData();
    formData.append('file', file);
    //print(props)
    axios.post('http://localhost:5000/resume', formData, {
        headers: {
         
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Credentials': 'true',
          'Authorization': "Bearer " + props.appState.token,
          //'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('success', response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  };


  function downloadResume() {
    axios({
      url: 'http://localhost:5000/resume',
      method: 'GET',
      headers: {
        'Authorization': "Bearer " + props.appState.token,
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true',
      },
      responseType: 'blob', // Set the response type to blob
    })
      .then((response) => {
        console.log("hi8")
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <h2>Resume Page</h2>
      <label htmlFor="file" className="sr-only">
        Choose a file
      </label>
      <input id="file" type="file" onChange={handleFileChange} accept=".pdf" />
      {uploadedFile && <p>Uploaded File: {uploadedFile.name}</p>}

      <label htmlFor="file" className="sr-only">
        Download a file
      </label>
      <button onClick={downloadResume}>Download Resume</button>
    </div>
  )
}

export default ResumePage