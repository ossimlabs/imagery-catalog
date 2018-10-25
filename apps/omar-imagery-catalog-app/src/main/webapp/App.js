import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import MapCatalog from "./MapCatalog";
import TestRoute from "./TestRoute";

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Switch>
          <Route exact path={`/mapCatalog`} component={MapCatalog} />
          <Route exact path={`/testRoute/:id`} component={TestRoute} />
        </Switch>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
