const React = require('react');
const renderFullPage = require('./html');
const ReactDOMServer = require('react-dom/server');
const Application = require('../components/Application');
const router = require('express').Router();

const routes = [
    '/',
    '/login',
    '/description'
];

router.get('*', (req, res) => {
    /*const match = routes.reduce((acc, route) =>
        matchPath(req.url, {path: route, exact: true}) || acc, null);
    if (!match) {
        return res.status(404).send('page not found');
    }*/
    const context = {};
    const html = ReactDOMServer.renderToString(
        <Application context={context} location={req.url}/>
    );
    res.status(200).send(renderFullPage(html))
        .catch(err => res.status(404).send(`${err}`));
});

module.exports = router;
