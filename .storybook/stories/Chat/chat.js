import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addons';
import Chat from '../../../src/client/components/chat/Chat';
//import '../../../src/client/less/app/chat/chat.less'

storiesOf('Chat Page', module)
    .add('test', () => (
        <Chat data={"test"} text="chat Page"></Chat>
    ))
    .add('test2', () => (
        <Chat data={'test2'} text="chat"></Chat>
    ));