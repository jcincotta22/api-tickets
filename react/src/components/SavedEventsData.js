import React from 'react';

const SavedEventsData = props => {
  return (
  <ul className='saved-data'>
    <h5 className='search-heading'>{props.title}</h5>
    <li>Site: {props.site}</li>
    <li><a href={props.url} target="_blank">Click to Buy</a></li>
    <li> <a href='javascript:void(0)'onClick={props.handleClick}>Delete Event</a></li>
  </ul>
  );
};

export default SavedEventsData;
