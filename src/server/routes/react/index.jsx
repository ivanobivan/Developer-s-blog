/*
const React = require('react');
const Provider = require('react-redux').Provider;
import configureStore from "../../../../src/client/store/configureStore"

const store = configureStore();

var router = require('express').Router();
var ReactDOMServer = require('react-dom/server');
var ReactRouter = require('react-router-redux');


router.get('*', function(request, response) {
    ReactRouter.match({
        routes: require('./react.jsx'),
        location: request.url
    }, function(error, redirectLocation, renderProps) {
        if (renderProps) {
            var html = ReactDOMServer.renderToString(
                <Provider store={store}>
                    <ReactRouter.RouterContext {...renderProps} />
                </Provider>
            );
            response.send(html);
        } else {
            response.status(404).send('Not Found');
        }
    });
});

module.exports = router;
*/
