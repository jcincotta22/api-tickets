import React from 'react';

const Ticketdata = props => {
  return (
  <div>
    <ul onClick={props.handleClickTicketMaster} className='data'>
      <h5 className='search-heading'>{props.name}</h5>
      <li>Location: {props.venueName}, {props.city}</li>
      <li>Date: {props.date}</li>
    </ul>
  </div>
  );
};

export default Ticketdata;
