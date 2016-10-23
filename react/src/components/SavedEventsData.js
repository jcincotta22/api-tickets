import React from 'react';

const SavedEventsData = props => {
  return (
  <ul>
    <li>Event Title: {props.title}</li>
    <li>Site: {props.site}</li>
    <li><a href={props.url}>Click to Buy</a></li>
  </ul>
  );
};

export default SavedEventsData;
