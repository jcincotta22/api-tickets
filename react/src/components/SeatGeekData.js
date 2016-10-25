import React from 'react';

const SeatGeekData = props => {

  return (
  <div className='showDiv'>
    <ul onClick={props.handleClickGeek} className='data'>
      <h5 className='search-heading'>{props.title}</h5>
      <li>Location: {props.venue}, {props.city}</li>
      <li>Date: {props.date}</li>
    </ul>
  </div>
  );
};

export default SeatGeekData;
