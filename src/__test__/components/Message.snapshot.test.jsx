/* Snapshot render example */

import React from 'react';
import renderer from 'react-test-renderer';
import Message from '../../js/components/Message';

test('Message is populated with user, msg, and date values', function() {
    
    const timestamp = 1487278301187;
    
    const component = renderer.create(
        <Message me={false} user="Boots" msg="Meow" timestamp={timestamp} />
    );
    
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});