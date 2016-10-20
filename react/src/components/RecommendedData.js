import React from 'react';

const RecommendedData = props => {
  let clickedLineItem
  if (props.recommendedEvent.length !== 0 && props.recommendedEvent.id === props.id){
    clickedLineItem = <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12 saved-events'><ul>
        <li>{props.recommendedEvent.title}</li>
        <li><a href={props.recommendedEvent.url} target="_blank">Visit SeatGeek to See Tickets for This Event</a></li>
        <li>{props.recommendedEvent.venue.name}</li>
        <li>{props.recommendedEvent.venue.display_location}</li>
        <li><img src={props.recommendedEvent.performers[0].image}/></li>
        <li>Date: {props.recommendedEvent.datetime_local.slice(0,10)}</li>
        <li>Highest Price: ${props.recommendedEvent.stats.highest_price}</li>
        <li>Lowest Price: ${props.recommendedEvent.stats.lowest_price}</li>
      </ul></div>
  }else {
    clickedLineItem = null;
  }
  return (
  <div className='showDiv'>
    <ul onClick={props.handleClickRecommended} className='data'>
    {props.title}, Venue: {props.venue}, {props.city} Date: {props.date}
      {clickedLineItem}
    </ul>
  </div>
  );
};

export default RecommendedData;
