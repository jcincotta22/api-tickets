import React from 'react';

const SeatGeekData = props => {
  let clickedLineItem
  if (props.seatGeekEvent.length !== 0 && props.seatGeekEvent.id === props.id){
    clickedLineItem = <li>{props.seatGeekEvent.title}</li>
  }else {
    clickedLineItem = null;
  }
  return (
  <div>
    <p onClick={props.handleClickGeek}>
    Event: {props.title}, Event ID: {props.id}
      {clickedLineItem}
    </p>
  </div>
  );
};

export default SeatGeekData;
