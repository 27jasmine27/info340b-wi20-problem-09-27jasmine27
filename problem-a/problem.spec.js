const raf = require('raf') //fix raf warning, redux!

import React from 'react';
import Enzyme, {shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { MemoryRouter } from 'react-router';

//include custom matchers
const styleMatchers = require('jest-style-matchers');
expect.extend(styleMatchers);

//Enzyme config
Enzyme.configure({ adapter: new Adapter() });

//solution classes
import App from  './src/App';

/* Begin the tests */

describe('Source code is valid', () => {
  test('JavaScript lints without errors', async () => {
    const sources = ['index.js', 'App.js', 'AdoptPet.js'].map((src) => __dirname + '/src/' + src);
    const linterOptions = {}; //this should be sufficient with other fields
    sources.forEach((source) => {
      expect([source]).toHaveNoEsLintErrors(linterOptions); //test each
    })
  })
});

describe('The single-page pet adoption app', () => { 
  it('shows the Pet List at the correct route', () => {
    let wrapper = mount(<MemoryRouter initialEntries={['/']}><App/></MemoryRouter>);
    expect(wrapper.find('PetList').length).toBe(1); //has a PetList
  })
  
  it('shows the About Page at the correct route', () => {
    let wrapper = mount(<MemoryRouter initialEntries={['/about']}><App/></MemoryRouter>);
    expect(wrapper.find('AboutPage').length).toBe(1); //has an AboutPage
  })

  it('shows the Resources Page at the correct route', () => {
    let wrapper = mount(<MemoryRouter initialEntries={['/resources']}><App/></MemoryRouter>);
    expect(wrapper.find('ResourcesPage').length).toBe(1); //has a ResourcesPage
  })

  it('redirects to the root on an invalid route', () => {
    let wrapper = mount(<MemoryRouter initialEntries={['/error']}><App/></MemoryRouter>);
    expect(wrapper.find('PetList').length).toBe(1); //has a PetList    
  })

  it('includes a Link in the header', () => {
    let wrapper = mount(<MemoryRouter initialEntries={['/']}><App/></MemoryRouter>);
    let link = wrapper.find('header').find('Link');
    expect(link.length).toBe(1); //has link
    expect(link.props().to).toEqual('/'); //link to correct route
  })

  it('contains highlighting navigation links', () => {
    let wrapper = mount(<MemoryRouter initialEntries={['/about']}><App/></MemoryRouter>);    
    let navLinks = wrapper.find('nav').find('NavLink');
    expect(navLinks.length).toBe(3); //has 3 links

    expect(navLinks.at(0).props().to).toEqual('/'); //link to correct route
    expect(navLinks.at(1).props().to).toEqual('/about'); //link to correct route
    expect(navLinks.at(2).props().to).toEqual('/resources'); //link to correct route
    
    //active styling is correct
    expect(navLinks.at(1).find('a').hasClass('activeLink')).toBe(true); //on About, so is lit
    expect(navLinks.at(0).find('a').hasClass('activeLink')).toBe(false); //on About, others not lit
    expect(navLinks.at(2).find('a').hasClass('activeLink')).toBe(false); //on About, others not lit
  })

  it('shows pet cards for each pet in the list', () => {
    let wrapper = mount(<MemoryRouter initialEntries={['/']}><App/></MemoryRouter>);
    let cards = wrapper.find('PetCard');
    expect(cards.length).toBe(5); //show all dogs
    expect(cards.at(1).find('.card-title').text()).toMatch('Spot'); //spot check name
  })

  it('shows Pet detail pages at the correct route', () => {
    let wrapper = mount(<MemoryRouter initialEntries={['/adopt/Spot']}><App/></MemoryRouter>);
    let adoptPage = wrapper.find('AdoptPage');
    expect(adoptPage.length).toBe(1);

    //check output
    expect(adoptPage.find('h2').text()).toEqual('Adopt Spot'); //has title for correct dog
    let lead = wrapper.find('.col-9 .lead');
    expect(lead.text()).toEqual('Female Terrier'); //includes details for correct dog
  })

  it('shows "missing" detail page at invalid route', () => {
    let wrapper = mount(<MemoryRouter initialEntries={['/adopt/missing']}><App/></MemoryRouter>);
    let adoptPage = wrapper.find('AdoptPage');
    expect(adoptPage.length).toBe(1);

    //check output
    expect(adoptPage.find('h2').text()).toEqual('No pet specified'); //missing dog
  })

  it('shows detail pages for Pets on card click', () => {
    let wrapper = mount(<MemoryRouter initialEntries={['/']}><App/></MemoryRouter>);
    
    let spotCard = wrapper.find('PetCard').at(1);
    spotCard.simulate('click'); //click the card

    let adoptPage = wrapper.find('AdoptPage');
    expect(adoptPage.length).toBe(1); //now shows AdoptPage
    expect(adoptPage.find('h2').text()).toEqual('Adopt Spot'); //has title for correct dog
  })
})
