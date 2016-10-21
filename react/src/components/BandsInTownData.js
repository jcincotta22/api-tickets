import React from 'react';

const BandsInTownData = props => {
  return (
  <div className='showDiv'>
    <ul onClick={props.handleClickBand} className='data'>
    {props.title}, City: {props.city} Date: {props.formatedDate} Venue: {props.venue}, {props.city}
    </ul>
  </div>
  );
};

export default BandsInTownData;
