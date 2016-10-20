import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Ticket from './components/Ticket';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

$(function() {
  let componentInstance = ReactDOM.render(
    <Router history={hashHistory}>
      <Route path='/' component={Ticket}>
        <IndexRoute component={Ticket}></IndexRoute>
      </Route>
    </Router>,
    document.getElementById('app')
  );
});
