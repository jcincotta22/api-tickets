
import React from 'react';

const SearchBarBand = props => {
  return (
    <input
      className='search-bar'
      type="text"
      placeholder="Keyword Search"
      value={props.searchTermBand}
      onChange={props.handleSearchChangeBand}
      />
  );
};

export default SearchBarBand;
