import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import AuthSamples from "../components/AuthSamples";
import ProfileRouter from "../components/ProfileRouter";

export default function Routes() {
  return (
    <Switch>
      <Route path="/samples">
        <AuthSamples />
      </Route>
      <Route path="/:username">
        <ProfileRouter />
      </Route>
    </Switch>
  );
}
