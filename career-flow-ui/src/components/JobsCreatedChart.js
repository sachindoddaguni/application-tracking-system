import React, { useState } from "react";
import {
  Tooltip,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

function JobsCreatedChart(props) {
  // props.sixMonthAppCount should have the below format (ordered from the farthest month first to the most recent month last). Ensure /dashboard api returns this format so there is no processing needed in the frontend.
  // const data = [
  //   {
  //     Month: "Jun 2023",
  //     "Jobs Created": 0,
  //   },
  //   {
  //     Month: "Jul 2023",
  //     "Jobs Created": 5,
  //   },
  //   {
  //     Month: "Aug 2023",
  //     "Jobs Created": 0,
  //   },
  //   {
  //     Month: "Sep 2023",
  //     "Jobs Created": 20,
  //   },
  //   {
  //     Month: "Oct 2023",
  //     "Jobs Created": 50,
  //   },
  //   {
  //     Month: "Nov 2023",
  //     "Jobs Created": 15,
  //   },
  // ];
  return (
    <LineChart
      width={700}
      height={250}
      data={props.sixMonthAppCount}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Jobs Created" stroke="#8b0e0e" />
    </LineChart>
  );
}

export default JobsCreatedChart;
