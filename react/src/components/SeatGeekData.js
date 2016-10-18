import React from 'react';

const SeatGeekData = props => {

  let clickedLineItem
  if (props.seatGeekEvent.length !== 0 && props.seatGeekEvent.id === props.id){
    clickedLineItem = <ul>
        <li>{props.seatGeekEvent.title}</li>
        <li><a href={props.seatGeekEvent.url} target="_blank">Visit SeatGeek to See Tickets for This Event</a></li>
        <li>{props.seatGeekEvent.venue.name}</li>
        <li>{props.seatGeekEvent.venue.display_location}</li>
        <li><img src={props.seatGeekEvent.performers[0].image}/></li>
        <li>Highest Price: ${props.seatGeekEvent.stats.highest_price}</li>
        <li>Lowest Price: ${props.seatGeekEvent.stats.lowest_price}</li>
      </ul>
  }else {
    clickedLineItem = null;
  }
  return (
  <div className='showDiv'>
    <ul onClick={props.handleClickGeek} className='data'>
    Event: {props.title}, Venue: {props.venue}, {props.city} Event ID: {props.id}
      {clickedLineItem}
    </ul>
  </div>
  );
};

export default SeatGeekData;
