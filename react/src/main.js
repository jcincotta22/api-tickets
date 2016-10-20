import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Ticket from './components/Ticket';
// import { Router, Route, IndexRoute, hashHistory } from 'react-router';

$(function() {
  ReactDOM.render(
    <Ticket/>,
    document.getElementById('app')
  );
});
