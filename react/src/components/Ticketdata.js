import React from 'react';

const Ticketdata = props => {
  return (
  <div>
    <ul onClick={props.handleClickTicketMaster} className='data'>
      <li>{props.name}</li>
      <li>Location: {props.venueName}, {props.city}</li>
      <li>Date: {props.date}</li>
    </ul>
  </div>
  );
};

export default Ticketdata;
