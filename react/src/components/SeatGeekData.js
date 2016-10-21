import React from 'react';

const SeatGeekData = props => {

  return (
  <div className='showDiv'>
    <ul onClick={props.handleClickGeek} className='data'>
    {props.title}, Venue: {props.venue}, {props.city} Date: {props.date}
    </ul>
  </div>
  );
};

export default SeatGeekData;
