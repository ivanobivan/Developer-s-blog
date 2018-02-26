const path = require('path');
const fs = require('fs');
const React = require('react');
const {Provider} = require('react-redux');
const {renderToString} = require('react-dom/server');
const {ConnectedRouter, routerMiddleware} = require('react-router-redux');
const {default: configureStore} = require('../../../src/client/store/configureStore');
const {default: App} = require('../../../src/client/components/App');
import createBrowserHistory from "history/createBrowserHistory";
import createMemoryHistory from 'history/createMemoryHistory';

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

        if (context.url) {
            // Somewhere a `<Redirect>` was rendered
            res.redirect(301, context.url)
        } else {
            // we're good, send the response
            const RenderedApp = htmlData.replace('{{SSR}}', markup)
            res.send(RenderedApp)
        }
    })
}

