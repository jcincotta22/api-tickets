import React from 'react';

const ClickedTicketMasterData = props => {
  let clickedLineItem
    clickedLineItem = <ul>
        <li>{props.title}</li>
        <li><a href={props.url} target="_blank">Visit Ticketmaster to See Tickets for This Event</a></li>
        <li>{props.venue}</li>
        <li>{props.city}</li>
        <li>{props.date}</li>
        <li>Highest Price: ${props.highest_price}</li>
        <li>Lowest Price: ${props.lowest_price}</li>
        <li><img src={props.image} className="clicked-image"/></li>
        <button type="button" className="btn btn-info" onClick={props.handleClick}>Save Event</button>
      </ul>


  return (
    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
      {clickedLineItem}
    </div>

  );
};

export default ClickedTicketMasterData;
