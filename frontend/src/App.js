import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from './pages/Main';
import User from './pages/User';
import Monster from './pages/Monster';
import Details from './pages/Details';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Main} />
        <Route path="/user" exact={true} component={User} />
        <Route path="/details/:id" exact={true} component={Details} />
        <Route path="/monster" exact={true} component={Monster} />
      </Switch>
    </ BrowserRouter>
  );
}

export default App;
