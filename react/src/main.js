import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Ticket from './components/Ticket';

$(function() {
  ReactDOM.render(
    <Ticket/>,
    document.getElementById('app')
  );
});
