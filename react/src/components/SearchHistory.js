import React from 'react';

const SearchHistory = props => {
  return (
  <ul>
    <li>You searched for: {props.keyword} on {props.createdAt}</li>
    <li>With a start date of: {props.startDate}</li>
    <li>An end date of: {props.endDate}</li>
    <li>With a zip code of: {props.zip}</li>
  </ul>
  );
};

export default SearchHistory;
