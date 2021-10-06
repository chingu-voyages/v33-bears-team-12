import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./layout/Layout";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Layout />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
