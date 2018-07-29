import React from 'react';
import ReactDom from 'react-dom';
import Application from './containers/Application';
import {ConnectedRouter} from 'react-router-redux';
import {Provider} from 'react-redux';
import createHistory from 'history/createHashHistory';
import configureStore from './store/configureStore';
const history = createHistory();
const store = configureStore(history);



ReactDom.render(
    <Provider store={store}>
            <Application/>
    </Provider>,
    document.getElementById('client')
);
