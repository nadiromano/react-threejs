import React, { Suspense } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NameInput from './components/inputName';
import Canvas3d from './components/canvas3d';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <NameInput />
        </Route>
        <Route path="/canvas3d">
          <Canvas3d />
        </Route>
      </Switch>
    </Router>
  );
}
