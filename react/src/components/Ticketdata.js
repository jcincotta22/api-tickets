import React from 'react';

const Ticketdata = props => {
  return (
  <div>
    <ul onClick={props.handleClickTicketMaster} className='data'>
      <h5 className='search-heading' id='tmH5'>{props.name}</h5>
      <li id='tmLi'>Location: {props.venueName}, {props.city}</li>
      <li>Date: {props.date}</li>
    </ul>
  </div>
  );
};

export default Ticketdata;
