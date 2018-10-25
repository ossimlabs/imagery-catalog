import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import MapCatalog from "./MapCatalog";
import TestRoute from "./TestRoute";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={`/mapCatalog`} component={MapCatalog} />
        <Route exact path={`/testRoute/:id`} component={TestRoute} />
      </Switch>
    </Router>
  );
};

export default App;