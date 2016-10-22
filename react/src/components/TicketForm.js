import React from 'react';

const TicketForm = props => {
  return (

  <div>
    <form onSubmit={props.handleFormSubmit}>
      <input
        type="text"
        placeholder="Keyword"
        value={props.search}
        onChange={props.handleChange}
        required
      />
      <input
        type="date"
        placeholder="yyyy-mm-dd"
        value={props.date}
        onChange={props.handleDateChange}
        required
      />
      <input
        type="date"
        placeholder="yyyy-mm-dd"
        value={props.endDate}
        onChange={props.handleEndDateChange}
        required
      />
      <input
        id="zip"
        type="text"
        placeholder="Zip"
        value={props.zip}
        onChange={props.handleZipChange}
      />
    <input type="submit" className='btn btn-info' value="Search Event"/>
    </form>
    <p id="formMessage"></p>
  </div>
  );
};

export default TicketForm;
