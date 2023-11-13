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

function StatsPage(props) {
  const rows = [
    {
      jobTitle: "SDE Intern",
      company: "Microsoft",
      status: "Job saved",
    },
    {
      jobTitle: "Dev Intern",
      company: "HPE",
      status: "Applied",
    },
    {
      jobTitle: "SDE Intern",
      company: "Microsoft",
      status: "Job saved",
    },
    {
      jobTitle: "Dev Intern",
      company: "HPE",
      status: "Applied",
    },
  ];
  return (
    <>
      <Container maxWidth>
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
              <JobFunnelChart />
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
                    <Typography align="center">{50}</Typography>
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
                    <Typography align="center">{50}</Typography>
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
                    <Typography align="center">{50}</Typography>
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
                    <Typography align="center">{50}</Typography>
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
              <JobsCreatedChart />
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
                        Action
                      </TableCell>
                      <TableCell variant="head" sx={{ color: "#d32f2f" }}>
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.jobTitle}
                        </TableCell>
                        <TableCell>{row.company}</TableCell>
                        <TableCell>{1}</TableCell>
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
