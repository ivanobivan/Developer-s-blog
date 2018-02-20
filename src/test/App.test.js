import React from 'react'
import Admin from '../client/components/App'
import renderer  from 'react-test-renderer'

test('Application test', () => {
    const component = renderer.create(
        <Admin/>,
        );
        let appJSON = component.toJSON();
});