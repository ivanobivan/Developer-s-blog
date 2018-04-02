import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Provider} from "react-redux";
import {checkA11y} from '@storybook/addon-a11y';
import Chat from '../../../src/client/components/Chat/Chat';
import '../../../src/client/less/app/chat/chat.less'
import configureStore from "../../../src/client/store/configureStore"
import createHistory from "history/createBrowserHistory";

const history = createHistory();
const store = configureStore(history);


storiesOf('Chat Page/userpanel', module)
    .addDecorator(checkA11y)
    .addDecorator(
        story => <Provider store={store}>{story()}</Provider>
    )
    .add('users', () => (
        <Chat
            userPull={['ivan', 'oleg', 'nickolay', '123', '321',
                'ivan', 'oleg', 'nickolay', '123', '321']}
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
            userPull={['ivan', 'ivan']}
            message={[]}
            level="user"
        >
        </Chat>
    ))
    .add('admins', () => (
        <Chat
            userPull={['ivan', 'oleg', 'nickolay', '123', 'hhh321']}
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
storiesOf('Chat Page/message', module)
    .add('no message', () => (
        <Chat
            userPull={[]}
            message={[]}
            username="test"
        >
        </Chat>
    ))
    .add('1message', () => (
        <Chat
            userPull={[]}
            message={["test"]}
            username="test"
            pull={[
                {
                    name: "test1",
                    message: 'message1'
                }
            ]}
        >
        </Chat>
    ))
    .add('2 message', () => (
        <Chat
            userPull={[]}
            message={["test", "test2"]}
            username="test"
            pull={[
                {
                    name: "test1",
                    message: 'message1'
                },
                {
                    name: "test1",
                    message: 'message1'
                }
            ]}
        >
        </Chat>
    ))