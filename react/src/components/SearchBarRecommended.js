
import React from 'react';

const SearchBarRecommended = props => {
  return (
    <input
      className='search-bar'
      type="text"
      placeholder="Keyword Search"
      value={props.searchTermRec}
      onChange={props.handleSearchChangeRec}
      />
  );
};

export default SearchBarRecommended;
