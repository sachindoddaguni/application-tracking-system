import React, { useState, useContext } from "react";
import { BoardContext } from "./Board";
import TaskForm from "./New Task/TaskForm";
import { Card, CardContent, Typography, IconButton, CardActions } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  cardHover: {
    position: 'relative',
    '&:hover $cardActions': {
      display: 'block'
    }
  },
  cardActions: {
    display: 'none',
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)' // Optional: add background for visibility
  },
  smallIcon: {
    fontSize: '16px' 
  }
});

// Function to format the date
const formateDate = (date) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const month = months[date.getMonth()];
  let day = "" + date.getDate();

  if (day.length < 2) day = "0" + day;

  return `${month} ${day}, ${date.getFullYear()}`;
};

const initialEditedValues = {
  id: "",
  jobTitle: "",
  companyName: "",
  date: new Date(),
  jobLink: "",
  location: ""
};

function CardItem(props) {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const [editedValues, setFormValues] = useState(initialEditedValues);
  const { taskState, onDeletingTask, onUpdatingTask } = useContext(BoardContext);

  const handleClose = () => setShow(false);

  const handleShow = () => {
    setShow(true);
  };

  const clickHandler = (type) => {
    if (type === "edit") {
      const formValues = taskState.find((task) => task.id === props.task.id);
      setFormValues(formValues);
      handleShow();
    } else if (type === "delete") {
      onDeletingTask(props.task.id);
    }
  };

  const handleUpdate = (values, submitProps) => {

    console.log(values)
    submitProps.setSubmitting(false);
    onUpdatingTask(values);
    setShow(false);
    submitProps.resetForm();
  };

  return (
    <>
      <TaskForm
        editedValues={editedValues}
        taskState="Update"
        show={show}
        handleClose={handleClose}
        onSubmit={handleUpdate}
      />
      <Card key={props.task.id} variant="outlined" className={classes.cardHover}>
        <CardContent>
          <Typography variant="h5" component="div">
            {props.task.companyName}
          </Typography>
          <Typography variant="body2">
            {props.task.jobTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Date: {formateDate(new Date(props.task.date))}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <IconButton onClick={() => clickHandler("edit")} aria-label="edit">
            <EditIcon className={classes.smallIcon} />
          </IconButton>
          <IconButton onClick={() => clickHandler("delete")} aria-label="delete">
            <DeleteIcon className={classes.smallIcon} />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}

export default CardItem;
