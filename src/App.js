import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from './pages/Game';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/settings" component={ Settings } />
      <Route exact path="/feedback" component={ Feedback } />
      <Route path="/game" component={ Game } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}
