import React from 'react';

const SearchHistory = props => {
  return (
  <ul>
    <li>Keyword: {props.keyword}</li>
    <li>Start Date: {props.startDate}</li>
    <li>Start Date: {props.endDate}</li>
    <li>Zip: {props.zip}</li>
  </ul>
  );
};

export default SearchHistory;
