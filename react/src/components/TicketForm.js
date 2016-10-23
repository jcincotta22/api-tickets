import React from 'react';

const TicketForm = props => {
  return (

  <div className='container'>
    <div className='row'>
      <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 form-container'>
        <form className="form-inline" onSubmit={props.handleFormSubmit}>
        <div id="formMessage"></div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Keyword"
              value={props.search}
              onChange={props.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              placeholder="Start Date"
              value={props.date}
              onChange={props.handleDateChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              placeholder="End Date"
              value={props.endDate}
              onChange={props.handleEndDateChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              id="zip"
              type="text"
              placeholder="Zip"
              value={props.zip}
              onChange={props.handleZipChange}
            />
          </div>
            <input type="submit" className='btn btn-info' value="Search Event"/>
        </form>
      </div>
    </div>
  </div>
  );
};

export default TicketForm;
