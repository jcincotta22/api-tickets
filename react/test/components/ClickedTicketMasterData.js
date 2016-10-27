
import ClickedTicketMasterData from 'components/ClickedTicketMasterData';
import { shallow } from 'enzyme';
import React from 'react';
import jasmineEnzyme from 'jasmine-enzyme';

describe('ClickedTicketMasterData', () => {
  let onClick,
      wrapper;

  beforeEach(() => {
    jasmineEnzyme();
    onClick = jasmine.createSpy('onClick spy');
    wrapper = shallow(
      <ClickedTicketMasterData
      key='1'
      id='1'
      title='Adele'
      image='image.png'
      url='www.garden.com'
      city='Boston'
      venue='The Garden'
      date='2016-10-15'
      highest_price='500'
      lowest_price='25'
      onClick={onClick}
      />
    );
  });

  it('should have props'), () => {
    expect(wrapper.find(ClickedTicketMasterData)).toHaveProp('key', '1');
    expect(wrapper.find(ClickedTicketMasterData)).toHaveProp('id', '1');
    expect(wrapper.find(ClickedTicketMasterData)).toHaveProp('name', 'Adele');
    expect(wrapper.find(ClickedTicketMasterData)).toHaveProp('image', 'image.png');
    expect(wrapper.find(ClickedTicketMasterData)).toHaveProp('date', '2016-10-15');
    expect(wrapper.find(ClickedTicketMasterData)).toHaveProp('venue', 'The Garden');
    expect(wrapper.find(ClickedTicketMasterData)).toHaveProp('city', 'Boston');
    expect(wrapper.find(ClickedTicketMasterData)).toHaveProp('url', 'www.garden.com');
    expect(wrapper.find(ClickedTicketMasterData)).toHaveProp('highest_price', '$500');
    expect(wrapper.find(ClickedTicketMasterData)).toHaveProp('lowest_price','$25');
    expect(wrapper.find(ClickedTicketMasterData)).toHaveProp('onClick', {onClick});
  }

  it('should render an h2 tag', () => {
    let header = wrapper.find('h2');
  expect(header).toBePresent();
});

  it('should render an h5 tag with the text property value', () => {
    let header = wrapper.find('h2');
    expect(header.text()).toMatch('Adele');
  });

  it('should render 7 li tags', () => {
    let liItems = wrapper.find('li')
  expect(liItems.length).toEqual(7);
});

  // it('should render an li tag with the text property value', () => {
  //   let firstLiItem = wrapper.find('li').at(0);
  //   expect(firstLiItem.text()).toMatch('image.png');
  // });

  it('should render an li tag with the text property value', () => {
    let secondLineItem = wrapper.find('li').at(1);
    expect(secondLineItem.text()).toMatch('Visit Ticketmaster to See Tickets for This Event');
  });

  it('should render an li tag with the text property value', () => {
    let secondLineItem = wrapper.find('li').at(2);
    expect(secondLineItem.text()).toMatch('The Garden');
  });

  it('should render an li tag with the text property value', () => {
    let secondLineItem = wrapper.find('li').at(3);
    expect(secondLineItem.text()).toMatch('Boston');
  });

  it('should render an li tag with the text property value', () => {
    let secondLineItem = wrapper.find('li').at(4);
    expect(secondLineItem.text()).toMatch('2016-10-15');
  });

  // it('should render an li tag with the text property value', () => {
  //   let secondLineItem = wrapper.find('li').at(5);
  //   expect(secondLineItem.text()).toMatch('Highest Price: $500');
  // });
  //
  // it('should render an li tag with the text property value', () => {
  //   let secondLineItem = wrapper.find('li').at(6);
  //   expect(secondLineItem.text()).toMatch('Lowest Price: $25');
  // });

  it('should render a button tag with the text property value', () => {
    let secondLineItem = wrapper.find('button');
    expect(secondLineItem.text()).toMatch('Save Event');
  });

  // it('should invoke the onClick function from props when clicked', () => {
  //   let header = wrapper.find('h5');
  //   debugger;
  //   expect(onClick).toNotHaveBeenCalled();
  //   header.simulate("click");
  //   expect(onClick).toHaveBeenCalled();
  //
  // });
});
