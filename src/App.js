import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import "./App.css";
import GamesList from "./components/GamesList";
import GameDetail from "./components/GameDetail";

function App() {
  return (
    <Switch>
      <Route
        path="/"
        exact
        render={props => <GamesList {...props} enablePagination={true} />}
      />
      <Route path="/game/:id" component={GameDetail} />
    </Switch>
  );
}

export default App;
