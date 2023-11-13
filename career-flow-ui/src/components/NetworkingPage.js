import React, { useState} from 'react'
import { Container, Typography, Button, Box, Paper, Divider, TextField, Card, Grid, CardContent, CardActions, Avatar } from '@mui/material';
import GroupIcon from '@mui/icons-material/GroupOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function NetworkingPage() {
  const [openModal, setOpenModal] = useState(false);
  const hasContacts = true;

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSaveModal = () => {
    setOpenModal(false);
  };

  const contacts = [
    {
      "firstName": "Amrita",
      "lastName": "Visalam",
      "jobTitle": "Technical Consultant",
      "companyName": "Microsoft",
      "email": "avisala@microsoft.com",
      "phone": "7878343478",
      "linkedin": "www.linkedin.com/in/amritavisalam/"
    },
    {
      "firstName": "Sphurthy",
      "lastName": "Satish",
      "jobTitle": "Student",
      "companyName": "NCSU",
      "email": "ssatish@microsoft.com",
      "phone": "9978343478",
      "linkedin": ""
    },
    {
      "firstName": "Amrita",
      "lastName": "Visalam",
      "jobTitle": "Technical Consultant",
      "companyName": "Microsoft",
      "email": "avisala@microsoft.com",
      "phone": "7878343478",
      "linkedin": "www.linkedin.com/in/amritavisalam/"
    },
    {
      "firstName": "Sphurthy",
      "lastName": "Satish",
      "jobTitle": "",
      "companyName": "",
      "email": "ssatish@microsoft.com",
      "phone": "",
      "linkedin": "www.linkedin.com/in/ssatish/"
    }
  ]

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

        {hasContacts ? (
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              {contacts.map((contact) => (
                <Grid item key={contact} xs={12} sm={6} md={4}>
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
                        <MailOutlinedIcon color='disabled' sx={{ mr: 1 }} />
                        <Typography>{contact.email ? contact.email : "N/A"}</Typography>
                      </Box>
                      <Box display="flex">
                        <PhoneOutlinedIcon color='disabled' sx={{ mr: 1 }} />
                        <Typography>{contact.phone ? contact.phone : "N/A"}</Typography>
                      </Box>
                       <Box display="flex" sx={{ mt: 1 }}>
                        <LinkedInIcon color='disabled' sx={{ mr: 1 }}/>
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
              <TextField fullWidth label="First Name" required placeholder="i.e: John" margin="dense" sx={{ mr: 2, width: '50%' }} />
              <TextField fullWidth label="Last Name" required placeholder="i.e: Smith" margin="dense" sx={{ ml: 2, width: '50%' }} />
            </Box>
            <Box display="flex" justifyContent="space-between" width="100%">
              <TextField fullWidth label="Job Title" placeholder="i.e: CEO" margin="dense" sx={{ mr: 2, width: '50%' }} />
              <TextField fullWidth label="Company" placeholder="add location" margin="dense" sx={{ ml: 2, width: '50%' }} />
            </Box>
            <TextField fullWidth label="Email" margin="dense" />
            <TextField fullWidth label="Phone" margin="dense" />
            <TextField fullWidth label="LinkedIn" margin="dense" />
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