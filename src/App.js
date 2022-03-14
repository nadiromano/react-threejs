import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NameInput from './components/inputName';
import Canvas3d from './components/canvas3d';
import Scene from './components/scene3d';
import ThreeScene from './components/three-scene';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <NameInput />
        </Route>
        <Route path="/canvas3d">
          <Scene />
        </Route>
      </Switch>
    </Router>
  );
}
