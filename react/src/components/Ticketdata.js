import React from 'react';

const Ticketdata = props => {
  return (
  <div>
    <ul onClick={props.handleClickTicketMaster}>
      {props.name}, Location: {props.venueName}, {props.city}, Date: {props.date}
    </ul>
  </div>
  );
};

export default Ticketdata;
