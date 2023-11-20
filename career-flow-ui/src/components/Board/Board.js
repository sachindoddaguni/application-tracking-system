import React, { useState, useEffect, useReducer, createContext } from "react";
import NewTask from "./New Task/NewTask";
import BoardLanes from "./BoardLanes";
import "./Board.css";
import { Container, Typography, Box, Divider } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';

const stagesData = [
  { name: "Wishlist", id: 1, icon: <StarBorderIcon /> },
  { name: "Applied", id: 2, icon: <ChecklistOutlinedIcon /> },
  { name: "Interview", id: 3, icon: <WorkOutlineOutlinedIcon /> },
  { name: "Rejected", id: 4, icon: <ThumbDownOutlinedIcon />}
];
const taskData = [
  {
    id: 1,
    jobTitle: "SWE Interm",
    companyName: "Google",
    stage: 1,
    date: new Date(2020, 3, 1),
    jobLink: "google.com/intern",
    jobLocation: "LA"
  },
  {
    id: 2,
    jobTitle: "ML Intern",
    companyName: "openAI",
    stage: 1,
    date: new Date(2020, 3, 1),
    jobLink: "openai.com/intern",
    jobLocation: "LA"
  },
  {
    id: 3,
    jobTitle: "DS Intern",
    companyName: "Amazon",
    stage: 3,
    date: new Date(2020, 3, 1),
    jobLink: "amazon.com/intern",
    jobLocation: "LA"
  },
  {
    id: 4,
    jobTitle: "FS Intern",
    companyName: "Google",
    stage: 3,
    date: new Date(2020, 3, 1),
    jobLink: "google.com/intern",
    jobLocation: "LA"
  },
];

 
export const BoardContext = createContext({});

function reducer(state, action) {
  switch (action.type) {
    case "ON_DROP":
      const droppedTask = action.payload;
      const updatedTasks = state.map((task) => {
        if (task.id === droppedTask.id) {
          return droppedTask;
        }
        return task;
      });
      return updatedTasks;
    case "LOAD_DATA":
      return action.payload;
    case "ADD_NEW":
      return [...state, action.payload];
    case "ON_DELETE":
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
}
function Board(props) {
  const [taskState, dispatch] = useReducer(reducer, taskData);
  const [stages, setStage] = useState(stagesData);

  useEffect(() => {
    dispatch({ type: "LOAD_DATA", payload: taskState });
  }, [taskState, stages]);

  const onDragStartHandler = (
    event,
    taskId,
    stageId
  ) => {
    var data = {
      taskId: taskId,
      stageId: stageId,
    };
    event.dataTransfer.setData("text/plain", JSON.stringify(data));
    event.dataTransfer.effectAllowed = "move";
    //event.dataTransfer.setData("taskName", taskName);
  };

  const onTaskContainerDragStartHandler = (event,laneId) => {
    let fromBox = JSON.stringify({ laneId: laneId });
    event.dataTransfer.setData("laneId", fromBox);
  };
  const onTaskContainerDragOverHandler = (event) => {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
    }
  };

  const onTaskContainerDropHandler = (event, droppedLaneId) => {
  /*  let fromLane:any = JSON.parse(event.dataTransfer.getData("laneId"));
   swapStages(fromLane.laneId,droppedLaneId) */
  };
  
 const swapStages = (fromLane, toLane) => {

     /*  const filterStage = stages.filter((x) => x.id === fromLane);
      filterStage[0].id=toLane;
      setStage([...stages,filterStage[0]]) */
  };
  const onDragOverHandler = (event) => {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
    }
  };

  const onDropHandler = (event, droppedStageId) => {
    let droppedData = event.dataTransfer.getData("text/plain");
    droppedData = JSON.parse(droppedData);
    const filterTask = taskState.filter((x) => x.id === droppedData.taskId);
    filterTask[0].stage = droppedStageId;
    dispatch({ type: "ON_DROP", payload: filterTask[0] });
  };

  const onAddingNewTask = (dataFromChild) => {
    dataFromChild.stage = 1;
    dataFromChild.id = taskState.length + 1;
    dispatch({ type: "ADD_NEW", payload: dataFromChild });
  };

  const onUpdatingTask = (dataFromChild) => {
    console.log(dataFromChild)
    dispatch({ type: "ON_DROP", payload: dataFromChild });
  };

  const onDeletingTask = (taskId) => {
    dispatch({ type: "ON_DELETE", payload: taskId });
  };

  const ContextData = {
    taskState,
    onDragStartHandler,
    onDragOverHandler,
    onDropHandler,
    onUpdatingTask,
    onDeletingTask,
    onTaskContainerDragStartHandler,
    onTaskContainerDropHandler,
    onTaskContainerDragOverHandler
  };

  return (
    <div>
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="space-between" my={4}>
          <Typography variant="h4" component="h1">
            Job Tracker
          </Typography>
            <NewTask state={props.appState} addNewTask={onAddingNewTask} />
        </Box>
        <Divider sx={{ mb: 5 }} />
        </Container>
      <Box display="flex" justifyContent="center" alignItems="center">
            <BoardContext.Provider value={ContextData}>
                <BoardLanes state={props.appState} stages={stages}  ></BoardLanes>
            </BoardContext.Provider>
      </Box>
    </div>
  );
}

export default Board;
