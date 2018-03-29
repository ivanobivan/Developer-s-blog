import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
//import { withNotes } from '@storybook/addons';
import Chat from '../../../src/test/storybook/chat/Chat';
import '../../../src/client/less/app/chat/chat.less'
storiesOf('Chat Page/userpanel', module)
    .addDecorator(checkA11y)
    .add('users', () => (
        <Chat
            userPull={['ivan', 'oleg', 'nickolay', '123','321',
                'ivan', 'oleg', 'nickolay', '123','321']}
            message={[]}
            level="user"
        >
        </Chat>
    ))
    .add('1user', () => (
        <Chat
            userPull={['ivan']}
            message={[]}
            level="user"
        >
        </Chat>
    ))
    .add('2user', () => (
        <Chat
            userPull={['ivan','ivan']}
            message={[]}
            level="user"
        >
        </Chat>
    ))
    .add('admins', () => (
        <Chat
            userPull={['ivan', 'oleg', 'nickolay', '123','hhh321']}
            message={[]}
            level='admin'
        >
        </Chat>
    ))
    .add('longnames_users', () => (
        <Chat
            userPull={['nickolnickolaynickolaynickolaynickolaynickolayaynickolay',
                'olegolegolegolegolegolegolegolegolegolegolegolegoleg',
                'nickolaynickolaynickolaynickolaynickolaynickolaynickolay',
                '123123123123123123123123123123123123123123',
                'hhh321']}
            message={[]}
            level='user'
        >
        </Chat>
    ))
    .add('no users', () => (
        <Chat userPull={[]} message={['kek']}></Chat>
    ));
storiesOf('Chat Page/inputpanel', module)
    .add('test', () => (
        <Chat
            userPull={[]}
            message={[]}
            valueInput="test"
        >
        </Chat>
    ));