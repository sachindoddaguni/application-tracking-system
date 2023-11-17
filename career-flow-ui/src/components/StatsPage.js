import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  ListItem,
  List,
  Typography,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
  Paper,
  Table,
  TableHead,
} from "@mui/material";
import Box from "@mui/material/Box";
import BarChartIcon from "@mui/icons-material/BarChart";
import StarIcon from "@mui/icons-material/Star";
import TimelineIcon from "@mui/icons-material/Timeline";
import PersonIcon from "@mui/icons-material/Person";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import TodayIcon from "@mui/icons-material/Today";
import JobFunnelChart from "./JobFunnelChart";
import JobsCreatedChart from "./JobsCreatedChart";
import axios from "axios";

function StatsPage(props) {
  // 1.073c2f2c-b4d9-455e-9cf2-ae0453736423
  // lastFourApps should be in the below format
  // const lastFourApps = [
  //   {
  //     jobTitle: "SDE Intern",
  //     company: "Microsoft",
  //     status: "Job saved",
  //   },
  //   {
  //     jobTitle: "Dev Intern",
  //     company: "HPE",
  //     status: "Applied",
  //   },
  //   {
  //     jobTitle: "SDE Intern",
  //     company: "Dell",
  //     status: "Job saved",
  //   },
  //   {
  //     jobTitle: "Dev Intern",
  //     company: "Lenovo",
  //     status: "Applied",
  //   },
  // ];
  const [jobAppsStatus, setJobAppsStatus] = useState([]);
  const [sixMonthAppCount, setSixMonthAppCount] = useState([]);
  const [lastFourApps, setLastFourApps] = useState([]);
  const [appsCreated, setAppsCreated] = useState(0);
  const [interviewsCompleted, setInterviewsCompleted] = useState(0);
  const [notesTaken, setNotesTaken] = useState(0);
  const [contactsSaved, setContactsSaved] = useState(0);
  useEffect(() => {
    // Make API call to backend to get stats data.
    axios({
      method: "GET",
      url: "/dashboard",
      headers: {
        // Authorization: "Bearer " + props.state.token,
        Authorization: "Bearer 1.4b3cf8e0-2004-4cb2-b1ce-0eede94b97e4",
      },
    })
      .then((response) => {
        const res = response.data;
        setJobAppsStatus(res["job_applications_status"])
        setSixMonthAppCount(res["six_months_jobs_count"])
        setAppsCreated(res["applications_created"])
        setInterviewsCompleted(res["interviews_completed"])
        setNotesTaken(res["notes_taken"])
        setContactsSaved(res["contacts_saved"])
        setLastFourApps(res["last_four_apps"])
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }, []);
  return (
    <>
      <Container>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 2,
            gridTemplateRows: "auto",
            gridTemplateAreas: `"jobFunnel jobFunnel jobFunnel keyStats keyStats keyStats"
                                "jobsCreated jobsCreated jobsCreated jobsCreated activity activity"
                                ". . . . activity activity"`,
            paddingTop: "2rem",
          }}
        >
          <Card
            sx={{ gridArea: "jobFunnel", border: "1px solid #d32f2f" }}
            elevation={3}
          >
            <CardHeader
              title={<Typography color="primary">Job Search Funnel</Typography>}
              avatar={<BarChartIcon color="primary" />}
            />
            <CardContent align="center">
              <JobFunnelChart jobAppsStatus={jobAppsStatus}/>
            </CardContent>
          </Card>

          <Card
            sx={{ gridArea: "keyStats", border: "1px solid #d32f2f" }}
            elevation={3}
          >
            <CardHeader
              title={<Typography color="primary">Key Stats</Typography>}
              avatar={<StarIcon color="primary" />}
            />
            <CardContent>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  paddingBottom: "7.5px",
                }}
              >
                <Card
                  elevation={2}
                  sx={{ width: "15rem", border: "1px solid #d32f2f" }}
                >
                  <CardHeader
                    title={<Typography>Applications</Typography>}
                    avatar={<CropSquareIcon />}
                  />
                  <CardContent
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Typography align="center">{appsCreated}</Typography>
                  </CardContent>
                </Card>
                <Card
                  elevation={2}
                  sx={{ width: "15rem", border: "1px solid #d32f2f" }}
                >
                  <CardHeader
                    title={<Typography>Interviews</Typography>}
                    avatar={<BeenhereIcon />}
                  />
                  <CardContent
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Typography align="center">{interviewsCompleted}</Typography>
                  </CardContent>
                </Card>
              </Box>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  paddingTop: "7.5px",
                }}
              >
                <Card
                  elevation={2}
                  sx={{ width: "15rem", border: "1px solid #d32f2f" }}
                >
                  <CardHeader
                    title={<Typography>Contacts Saved</Typography>}
                    avatar={<PersonIcon />}
                  />
                  <CardContent
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Typography align="center">{contactsSaved}</Typography>
                  </CardContent>
                </Card>
                <Card
                  elevation={2}
                  sx={{ width: "15rem", border: "1px solid #d32f2f" }}
                >
                  <CardHeader
                    title={<Typography>Notes Taken</Typography>}
                    avatar={<TextSnippetIcon />}
                  />
                  <CardContent
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Typography align="center">{notesTaken}</Typography>
                  </CardContent>
                </Card>
              </Box>
            </CardContent>
          </Card>

          <Card
            sx={{ gridArea: "jobsCreated", border: "1px solid #d32f2f" }}
            elevation={3}
          >
            <CardHeader
              title={<Typography color="primary">Jobs Created</Typography>}
              avatar={<TimelineIcon color="primary" />}
            />
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <JobsCreatedChart sixMonthAppCount={sixMonthAppCount} />
            </CardContent>
          </Card>

          <Card
            sx={{ gridArea: "activity", border: "1px solid #d32f2f" }}
            elevation={3}
          >
            <CardHeader
              title={<Typography color="primary">Activity</Typography>}
              avatar={<TodayIcon color="primary" />}
            />
            <CardContent>
              <TableContainer
                component={Paper}
                elevation={2}
                sx={{ border: "1px solid #d32f2f" }}
              >
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell variant="head" sx={{ color: "#d32f2f" }}>
                        Job Title
                      </TableCell>
                      <TableCell variant="head" sx={{ color: "#d32f2f" }}>
                        Company
                      </TableCell>
                      <TableCell variant="head" sx={{ color: "#d32f2f" }}>
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lastFourApps.map((row) => (
                      <TableRow
                        key={row.company}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.jobTitle}
                        </TableCell>
                        <TableCell>{row.company}</TableCell>
                        <TableCell>{row.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
}

export default StatsPage;
