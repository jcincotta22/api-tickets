import React from 'react';

const RecommendedData = props => {
  return (
  <div className='showDiv'>
    <ul onClick={props.handleClickRecommended} className='data'>
    {props.title}, Venue: {props.venue}, {props.city} Date: {props.date}
    </ul>
  </div>
  );
};

export default RecommendedData;
