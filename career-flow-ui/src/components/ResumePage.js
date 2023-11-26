import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Button, Typography, Box, Divider } from '@mui/material';

function ResumePage(props) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null); // New state for the file URL

  useEffect(() => {
    // Function to fetch the resume
    const fetchResume = async () => {
      try {
        const response = await axios.get('http://localhost:5000/fetchresume', {
          headers: {
            'Authorization': "Bearer " + props.appState.token,
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true',
          },
          responseType: 'blob', // Set the response type to blob
        });

        if (response.data) {
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob) + "#zoom=75"; // 150% zoom
          setFileUrl(url);
          // Optionally, set a file name or other details if available
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Call the function
    fetchResume();
  }, [props.appState.token]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setUploadedFile(file);
    setFileUrl(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('file', file);
    axios.post('http://localhost:5000/resume', formData, {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true',
        'Authorization': "Bearer " + props.appState.token,
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
    axios.get('http://localhost:5000/downloadresume', {
      headers: {
        'Authorization': "Bearer " + props.appState.token,
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true',
      },
      responseType: 'blob', // Set the response type to blob
    })
      .then((response) => {
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
      <Container maxWidth='lg'>
        <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
          <Typography variant="h4" component="h1">Resume</Typography>
        </Box>
        <Divider sx={{ mb: 5 }} />
        <Box flexDirection="column">
          <Box display="flex" sx={{mb: 2}}>
          <Typography variant="h6" sx={{ mr: 5 }}>Upload Resume:</Typography>
          <input id="file" type="file" onChange={handleFileChange} accept=".pdf" />
          {uploadedFile && <Typography sx={{ ml: 2 }}>Uploaded File: {uploadedFile.name}</Typography>}
          </Box>
          <Box display="flex">
          <Typography variant="h6" sx={{ mr: 2 }}>Download Resume:</Typography>
          <Button variant="contained" color="primary" onClick={downloadResume} sx={{ ml: 1 }}>Download</Button>
          </Box>
        </Box>
        {fileUrl && (
          <Box mt={5}>
            <iframe src={fileUrl} width="100%" height="500px" title="Uploaded Resume"></iframe>
          </Box>
        )}
      </Container>
    </div>
  )
}

export default ResumePage;
