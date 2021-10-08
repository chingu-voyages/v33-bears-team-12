import React from "react";

import { Route, Switch } from "react-router-dom";

import AuthSamples from "../components/AuthSamples";
import Dashboard from "../components/Dashboard";
import Home from "../components/Home";
import Login from "../components/Login";
import ProfileRouter from "../components/ProfileRouter";
import Register from "../components/Register";

export default function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Home />
      </Route>
      <Route exact={true} path="/dashboard">
        <Dashboard />
      </Route>
      <Route exact={true} path="/login">
        <Login />
      </Route>
      <Route exact={true} path="/register">
        <Register />
      </Route>
      <Route path="/samples">
        <AuthSamples />
      </Route>
      <Route path="/:username">
        <ProfileRouter />
      </Route>
    </Switch>
  );
}
