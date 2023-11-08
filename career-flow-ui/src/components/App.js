import React from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Router from "./Router";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ThemeProvider, createTheme } from "@mui/material";


const theme = createTheme({
  palette: {
    primary: {
      main: "#d32f2f",
    },
    secondary: {
      main: "#2e7d32",
    },
  },
});

function App(props) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Router />
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
