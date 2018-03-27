import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addons';
import Chat from '../../../src/client/components/Chat/Chat';

storiesOf('Chat Page', module)
    .add('test', () => (
        <Chat data={"test"} text="chat Page"></Chat>
    ))
    .add('test2', () => (
        <Chat data={'test2'} text="chat"></Chat>
    ));