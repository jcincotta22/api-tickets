import React from 'react';

const Ticketdata = props => {
  return (
  <div>
    <p>
    Event: {props.name}, Url: <a href={props.url} target="_blank">Click to Buy or View</a>, Event ID: {props.id}
    </p>
  </div>
  );
};

export default Ticketdata;
