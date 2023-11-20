import React, { useState, useEffect } from 'react'
import { Container, Typography, Button, Box, Paper, Divider, TextField, Card, Grid, CardContent, CardActions, Avatar } from '@mui/material';
import GroupIcon from '@mui/icons-material/GroupOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';

function NetworkingPage(props) {
  const [openModal, setOpenModal] = useState(false);

  const [newContact, setNewContact] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    companyName: '',
    email: '',
    phone: '',
    linkedin: '',
  });

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    axios.get('/users/contacts', {
      headers: {
        Authorization: "Bearer " + props.appState.token,
      }
    })
      .then(response => {
        setContacts(response.data.contacts);
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
      });
  };

  const handleInputChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSaveModal = () => {
    if (!newContact.firstName.trim() || !newContact.lastName.trim()) {
      alert('First Name and Last Name are required.');
      return;
    }

    axios.post('/users/contacts', newContact, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + props.appState.token,
      }
    })
      .then(response => {
        setContacts([...contacts, response.data.contact]);
        resetForm();
      })
      .catch(error => console.error('Error:', error))
      .finally(() => setOpenModal(false));
    };

  const resetForm = () => {
    setNewContact({
      firstName: '',
      lastName: '',
      jobTitle: '',
      companyName: '',
      email: '',
      phone: '',
      linkedin: '',
    });
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
          <Typography variant="h4" component="h1">
            My Network
          </Typography>
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Add Contact
          </Button>
        </Box>
        <Divider sx={{ mb: 10 }} />

        {contacts.length > 0 ? (
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              {contacts.map((contact) => (
                <Grid item key={contact.id} xs={12} sm={6} md={4}>
                  <Card sx={{ height: '95%', display: 'flex', flexDirection: 'column', border: '1px solid #D3D3D3' }}>
                    <CardContent >
                      <Box display="flex">
                        <Avatar sx={{ mr: 3, mt: 2, ml: 1 }} />
                        <Box display="flex" flexDirection='column'>
                          <Box display="flex">
                            <Typography fontWeight='bold' sx={{ mr: 0.5 }}>{contact.firstName}</Typography>
                            <Typography fontWeight='bold'>{contact.lastName}</Typography>
                          </Box>
                          <Typography>{contact.jobTitle}</Typography>
                          <Typography>{contact.companyName}</Typography>
                        </Box>
                      </Box>
                      <Divider sx={{ mt: 2, mb: 2 }} />
                      <Box display="flex" sx={{ mb: 1 }}>
                        <MailOutlinedIcon color='disabled' sx={{ mr: 1 }} aria-hidden="true" />
                        <Typography>{contact.email ? contact.email : "N/A"}</Typography>
                      </Box>
                      <Box display="flex">
                        <PhoneOutlinedIcon color='disabled' sx={{ mr: 1 }} aria-hidden="true" />
                        <Typography>{contact.phone ? contact.phone : "N/A"}</Typography>
                      </Box>
                      <Box display="flex" sx={{ mt: 1 }}>
                        <LinkedInIcon color='disabled' sx={{ mr: 1 }} aria-hidden="true" />
                        <Typography>{contact.linkedin ? contact.linkedin : "N/A"}</Typography>
                      </Box>
                    </CardContent>
                    <CardActions>

                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        ) : (
          <Paper elevation={0} style={{ textAlign: 'center', padding: '100px' }}>
            <GroupIcon style={{ fontSize: 60 }} color="action" />
            <Typography variant="subtitle1" color="textSecondary">
              You have not created any contacts on this board yet. <br /> Click 'Add Contact' to create your first contact.
            </Typography>
          </Paper>
        )}
      </Container>

      {/* Modal */}
      <Dialog open={openModal} onClose={handleCloseModal} >
        <DialogTitle align='center' fontWeight='bold'>Save New Contact</DialogTitle>
        <Divider />
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center" p={2}>
            <Box display="flex" justifyContent="space-between" width="100%">
              <TextField fullWidth label="First Name" name="firstName" value={newContact.firstName} required onChange={handleInputChange} placeholder="i.e: John" margin="dense" sx={{ mr: 2, width: '50%' }} inputProps={{ 'aria-label': 'First Name' }} />
              <TextField fullWidth label="Last Name" name="lastName" value={newContact.lastName} required onChange={handleInputChange} placeholder="i.e: Smith" margin="dense" sx={{ ml: 2, width: '50%' }} inputProps={{ 'aria-label': 'Last Name' }} />
            </Box>
            <Box display="flex" justifyContent="space-between" width="100%">
              <TextField fullWidth label="Job Title" name="jobTitle" value={newContact.jobTitle} onChange={handleInputChange} placeholder="i.e: CEO" margin="dense" sx={{ mr: 2, width: '50%' }} inputProps={{ 'aria-label': 'Job Title' }} />
              <TextField fullWidth label="Company" name="company" value={newContact.company} onChange={handleInputChange} placeholder="add company" margin="dense" sx={{ ml: 2, width: '50%' }} inputProps={{ 'aria-label': 'Company' }} />
            </Box>
            <TextField fullWidth onChange={handleInputChange} label="Email" name="email" value={newContact.email} margin="dense" inputProps={{ 'aria-label': 'Email' }} />
            <TextField fullWidth onChange={handleInputChange} label="Phone" name="phone" value={newContact.phone} margin="dense" inputProps={{ 'aria-label': 'Phone' }} />
            <TextField fullWidth onChange={handleInputChange} label="LinkedIn" name="linkedin" value={newContact.linkedin} margin="dense" inputProps={{ 'aria-label': 'LinkedIn' }}/>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} variant="outlined" color="primary">
            Discard
          </Button>
          <Button onClick={handleSaveModal} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>


    </div>
  )
}

export default NetworkingPage