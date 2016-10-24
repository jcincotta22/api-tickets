import React from 'react';

const ClickedRecommendedData = props => {
  let clickedLineItem = <ul>
      <li>{props.title}</li>
      <li><a href={props.url} target="_blank">Visit SeatGeek to See Tickets for This Event</a></li>
      <li>{props.venue}</li>
      <li>{props.display_location}</li>
      <li>{props.date}</li>
      <li>Highest Price: ${props.highest_price}</li>
      <li>Lowest Price: ${props.lowest_price}</li>
      <li><img src={props.image} className="clicked-image"/></li>
      <button type="button" className="btn btn-info" onClick={props.handleClick}>Save Event</button>
    </ul>

  return (
    <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12 saved-events'>
      {clickedLineItem}
    </div>

  );
};

  export default ClickedRecommendedData;
