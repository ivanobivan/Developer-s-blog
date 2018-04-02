import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Provider} from "react-redux";
import {checkA11y} from '@storybook/addon-a11y';
import App from '../../src/client/components/Application';
import Home from '../../src/client/components/Home';
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