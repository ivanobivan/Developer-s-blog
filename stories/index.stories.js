import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Provider} from 'react-redux';
import configureStore from "../src/client/store/configureStore"

const store = configureStore();

import Posts from '../src/client/components/Posts/Posts'
import '../src/client/less/app/application.less'
storiesOf('Application', module)
    .addDecorator(story => <Provider store={store}>{story()}</Provider>)
    .add('Posts', () => <Posts/>);
