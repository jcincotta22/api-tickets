import TicketForm from 'components/TicketForm';
import { shallow } from 'enzyme';
import React from 'react';
import jasmineEnzyme from 'jasmine-enzyme';

describe('TicketForm', () => {
  let onChange,
      dateChange,
      endDateChange,
      zipChange,
      wrapper,
      onSubmit;

  beforeEach(() => {
    jasmineEnzyme();
    onSubmit = jasmine.createSpy('onSubmit spy');
    endDateChange = jasmine.createSpy('endDateChange spy');
    dateChange = jasmine.createSpy('dateChange spy');
    zipChange = jasmine.createSpy('zipChange spy');
    wrapper = shallow(
      <TicketForm
      onSubmit={onSubmit}
      onChange={onChange}
      dateChange={dateChange}
      endDateChange={endDateChange}
      zipChange={zipChange}
      search='Cats'
      date='2016-10-15'
      endDate='2016-10-31'
      zip='02466'
      />
    );
  });

  it('should have props'), () => {
    expect(wrapper.find(TicketForm)).toHaveProp('onSubmit', {onSubmit});
    expect(wrapper.find(TicketForm)).toHaveProp('onChange', {onChange});
    expect(wrapper.find(TicketForm)).toHaveProp('dateChange', {dateChange});
    expect(wrapper.find(TicketForm)).toHaveProp('zipChange', {zipChange});
    expect(wrapper.find(TicketForm)).toHaveProp('search', 'Cats');
    expect(wrapper.find(TicketForm)).toHaveProp('date', '2016-10-15');
    expect(wrapper.find(TicketForm)).toHaveProp('zip', '02466');
  }

  it('should should have html', () => {

    expect(wrapper.find('form')).toHaveHTML(
      "<form class='form-inline'><div id='formMessage'></div><div class='form-group'><input type='text' placeholder='Keyword' class='form-input' value='Cats' required=''/></div><div class='form-group'><input type='date' class='date' placeholder='Start Date' value='2016-10-15' required=''/></div><div class='form-group'><input type='date' class='date' placeholder='End Date' value='2016-10-31' required=''/></div><div class='form-group'><input type='text' id='zip' class='form-input' placeholder='Zip' value='02466'/></div><input type='submit' class='btn btn-info submit-button' data-loading-text='Searching...' value='Search Event'/></form>"
    );
  });

  // it('should render submit button', () => {
  //   let submit = wrapper.find('btn');
  //   debugger;
  //   expect(submit.toHaveValue('Search Event'));
  // });

  // it('should render an li tag', () => {
  //   let div = wrapper.find('div').at(4);
  //   expect(div.toHaveValue('Cats'));
  // });
  //
  // it('should render an li tag with the text property value', () => {
  //   let div2 = wrapper.find('div').at(5)
  //   expect(div2.toHaveValue('2016-10-15'));
  // });
  //
  // it('should render an li tag with the text property value', () => {
  //   let secondLineItem = wrapper.find('li').at(1);
  //   expect(secondLineItem.text()).toMatch('Date: 2016-10-15'));
  // });

  // it('should invoke the onClick function from props when clicked', () => {
  //   let header = wrapper.find('h5');
  //   debugger;
  //   expect(onClick).toNotHaveBeenCalled();
  //   header.simulate("click");
  //   expect(onClick).toHaveBeenCalled();
  //
  // });
});
