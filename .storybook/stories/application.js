import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Provider} from "react-redux";
import {checkA11y} from '@storybook/addon-a11y';
import App from '../../src/client/components/Application';
import Home from '../../src/client/components/Home';
import {Chat} from '../../src/client/components/Chat/Chat';
import '../../src/client/less/app/application.less'
import configureStore from "../../src/client/store/configureStore"
import createHistory from "history/createBrowserHistory";

const history = createHistory();
const store = configureStore(history);


storiesOf('App', module)
    .addDecorator(checkA11y)
    .addDecorator(
        story => <Provider store={store}>{story()}</Provider>
    )
    .add('Application', () => (
        <App></App>
    ))
storiesOf('App/Home', module)
    .addDecorator(checkA11y)
    .addDecorator(
        story => <Provider store={store}>{story()}</Provider>
    )
    .add('Home', () => (
        <Home></Home>
    ))

storiesOf('App/Chat/userpanel', module)
    .add('users', () => (
        <Chat
            chat={{
                userPull: ['ivan', 'oleg', 'nickolay', '123', '321',
                    'ivan', 'oleg', 'nickolay', '123', '321'],
                messagePull: []
            }}
            server={{
                level: "user",
                username: "test"
            }}
            level="user"
        >
        </Chat>
    ))
    .add('1user', () => (
        <Chat
            chat={{
                userPull: ['ivan'],
                messagePull: []
            }}
            server={{
                level: "user",
                username: "test"
            }}
            level="user"
        >
        </Chat>
    ))
    .add('2user', () => (
        <Chat
            chat={{
                userPull: ['ivan', 'oleg'],
                messagePull: []
            }}
            server={{
                level: "user",
                username: "test"
            }}
            level="user"
        >
        </Chat>
    ))
    .add('admins', () => (
        <Chat
            chat={{
                userPull: ['ivan', 'oleg', 'nickolay', '123', '321',
                    'ivan', 'oleg', 'nickolay', '123', '321'],
                messagePull: []
            }}
            server={{
                level: "user",
                username: "test"
            }}
            level="admin"
        >
        </Chat>
    ))
    .add('longnames_users', () => (
        <Chat
            chat={{
                userPull: ['nickolnickolaynickolaynickolaynickolaynickolayaynickolay',
                    'olegolegolegolegolegolegolegolegolegolegolegolegoleg',
                    'nickolaynickolaynickolaynickolaynickolaynickolaynickolay',
                    '123123123123123123123123123123123123123123',
                    'hhh321'],
                messagePull: []
            }}
            server={{
                level: "user",
                username: "test"
            }}
            level="user"
        >
        </Chat>
    ))
    .add('no users', () => (
        <Chat
            chat={{
                userPull: [],
                messagePull: []
            }}
            server={{
                level: "user",
                username: "test"
            }}
            level="user"
        >
        </Chat>
    ));
storiesOf('App/Chat/inputpanel', module)
    .add('test', () => (
        <Chat
            userPull={[]}
            message={[]}
            valueInput="test"
        >
        </Chat>
    ));
storiesOf('App/Chat/message', module)
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