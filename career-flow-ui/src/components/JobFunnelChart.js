import React from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function JobFunnelChart(props) {
  // props.jobAppsStatus must be in the below format (Make sure the dashboard api returns the data in this format so that there is no need to reformat it in the front end)
  // const jobAppsStatus = [
  //   {
  //     name: "Jobs Saved",
  //     count: 50,
  //   },
  //   {
  //     name: "Applications",
  //     count: 30,
  //   },
  //   {
  //     name: "Interviews",
  //     count: 16,
  //   },
  //   {
  //     name: "Offers",
  //     count: 2,
  //   },
  // ];
  return (
    <ComposedChart
      width={500}
      height={250}
      data={props.jobAppsStatus}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" allowDuplicatedCategory={false} />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="count" fill="#8884d8" stroke="#8884d8" />
      <Bar dataKey="count" barSize={50} fill="#413ea0" />
      <Line type="monotone" dataKey="count" stroke="#ff7300" />
    </ComposedChart>
  );
}

export default JobFunnelChart;
