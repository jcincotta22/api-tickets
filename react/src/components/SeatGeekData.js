import React from 'react';

const SeatGeekData = props => {

  return (
  <div className='showDiv'>
    <ul onClick={props.handleClickGeek} className='data'>
      <li>{props.title}</li>
      <li>Location: {props.venue}, {props.city}</li>
      <li>Date: {props.date}</li>
    </ul>
  </div>
  );
};

export default SeatGeekData;
