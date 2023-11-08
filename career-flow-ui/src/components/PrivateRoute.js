import React from "react";
import { Redirect, Route } from "react-router-dom";
import SideBar from "./SideBar";

function PrivateRoute(props) {
  return props.appState.loggedIn ? (
    <Route path={props.path}>
      <SideBar
        appState={props.appState}
        dispatchReducer={props.dispatchReducer}
      >
        {props.children}
      </SideBar>
    </Route>
  ) : (
    <Redirect to="/signin" />
  );
}

export default PrivateRoute;
