/* Shallow render example */

import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Message from '../../js/components/Message';

describe('<Message />', function() {
    
    const timestamp = 1487278301187;
    
    const message = shallow(
        <Message me={true} user="Barkley" msg="Woof" timestamp={timestamp} />
    );
                
    it('mounts a div.message container', function () {
        expect(message.find('.message').length).toBe(1);
    });
    
    it('adds a .me class if this.props.me is true', function () {
        expect(message.find('.me').length).toBe(1);
    });
    
    it('creates a div.user containing the value of this.props.user', function () {
       expect(message.find('.user').length).toBe(1);
       expect(message.find('.user').text()).toBe('Barkley:'); 
    });
    
    it('creates a div.msg containing the value of this.props.msg', function () {
        expect(message.find('.msg').length).toBe(1);
        expect(message.find('.msg').text()).toBe('Woof');
    });
    
    it('creates a div.date containing a date string calculated from this.props.date', function () {
        expect(message.find('.date').length).toBe(1);
        //Just checking for a string with length. Should format with a proper library...
        expect(message.find('.date').text().length).toBeGreaterThan(0);
    });
    
});

describe('<Message /> with empty message', function() {
    
    const message = shallow(
        <Message me={true} user="Barkley" msg="" />
    );

    it('creates a div.msg containing an ellipsis if this.props.msg is empty', function () {
        expect(message.find('.msg').text()).toBe('...');
    });

});
