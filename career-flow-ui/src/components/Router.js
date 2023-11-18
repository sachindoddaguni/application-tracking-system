import React, { useReducer } from "react";
import { Switch, Route } from "react-router-dom";
import SignUp from "./authentication/SignUp";
import SignIn from "./authentication/SignIn";
import applicationReducer, { updateAppState } from "../appReducer/applicationReducer";
import PrivateRoute from "./PrivateRoute";
import ApplicationTrackingPage from "./ApplicationTrackingPage";
import StatsPage from "./StatsPage";
import NetworkingPage from "./NetworkingPage";
import ResumePage from "./ResumePage";
import useToken from "./authentication/useToken.js";

const initialAppState = {
  loggedIn: false,
  token: null,
  snackbar: {
    open: false,
    message: "",
    severity: "",
  },
};

function Router() {
  const { getToken, token } = useToken();
  const [appState, dispatchReducer] = useReducer(applicationReducer, initialAppState);
  if (!appState.loggedIn) {
    console.log("Logging In")
    let loggedInUserJWTtoken = getToken();
    if (loggedInUserJWTtoken) {
      let logInState = {
        loggedIn: true,
        token: token,
      };
      dispatchReducer(updateAppState(logInState));
    }
  }

  return (
    <Switch>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/signin">
        <SignIn dispatchReducer={dispatchReducer} />
      </Route>
      <PrivateRoute appState={appState} dispatchReducer={dispatchReducer} path="/networking">
        <NetworkingPage appState={appState} dispatchReducer={dispatchReducer} />
      </PrivateRoute>
      <PrivateRoute appState={appState} dispatchReducer={dispatchReducer} path="/stats">
        <StatsPage appState={appState} dispatchReducer={dispatchReducer} />
      </PrivateRoute>
      <PrivateRoute appState={appState} dispatchReducer={dispatchReducer} path="/resume">
        <ResumePage appState={appState} dispatchReducer={dispatchReducer} />
      </PrivateRoute>
      <PrivateRoute appState={appState} dispatchReducer={dispatchReducer} path="/">
        <ApplicationTrackingPage appState={appState} dispatchReducer={dispatchReducer} />
      </PrivateRoute>
    </Switch>
  );
}

export default Router;