import React from 'react';

const ClickedGeekData = props => {
  let clickedLineItem
    clickedLineItem = <ul className='clicked-data'><h2>{props.title}</h2>
        <li><img src={props.image} className="clicked-image"/></li>
        <li><a href={props.url} target="_blank">Visit SeatGeek to See Tickets for This Event</a></li>
        <li>{props.venue}</li>
        <li>{props.display_location}</li>
        <li>{props.date}</li>
        <li>Highest Price: ${props.highest_price}</li>
        <li>Lowest Price: ${props.lowest_price}</li>
        <button type="button" className="btn btn-info" onClick={props.handleClick}>Save Event</button>
        </ul>

  return (
    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
      { clickedLineItem }
    </div>

  );
};

export default ClickedGeekData;
