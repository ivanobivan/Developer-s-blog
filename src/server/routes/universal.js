import path  from 'path';
import fs from 'fs';
import React from 'react';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import configureStore from '../../../src/client/store/configureStore';
import App from '../../client/components/Application';
import createBrowserHistory from "history/createBrowserHistory";
import createMemoryHistory from "history/createMemoryHistory";

module.exports = function universalLoader(req, res) {
    const filePath = path.resolve(__dirname,'../../..', 'index.html');
    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('read err', err);
            return res.status(404).end()
        }
        const context = {};
        const history = process.env.BROWSER ? createBrowserHistory() : createMemoryHistory();
        const middleware = routerMiddleware(history);
        const store = configureStore(middleware);
        const markup = renderToString(
            <Provider store={store}>
                <ConnectedRouter history={history} location={req.url} context={context}>
                    <App/>
                </ConnectedRouter>
            </Provider>
        );
        context.url ? res.redirect(301, context.url) :
            res.send(htmlData.replace('{{SSR}}', markup));
    })
};

