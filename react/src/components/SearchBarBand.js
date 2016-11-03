import React from 'react';

const SearchBarBand = props => {
  return (
    <input
      className='search-bar'
      type="text"
      placeholder="Filter Results"
      value={props.searchTermBand}
      onChange={props.handleSearchChangeBand}
      />
  );
};

export default SearchBarBand;
