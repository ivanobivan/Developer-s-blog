import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from "react-redux";
import App from './components/App'
import storeConfig from './store/store'

const store = storeConfig();

ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root')
);
