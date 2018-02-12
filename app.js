const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require(__dirname + '/webpack.config.js');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoApi = require('./mongoApi');

const port = 3000;
const app = express();

const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/node_modules', express.static(__dirname + '/node_modules'));
//app.use('/images', express.static(__dirname + '/example/images'));

app.use(middleware);
app.use(webpackHotMiddleware(compiler, {
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
}));

app.get('/', function response (req, res) {
    fs.readFile(__dirname + '/index.html', (err, data) => {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
});

app.post("/test", (req, res) => {
    mongoApi.test(req.body.name,req.body.password);
    //res.send(`${req.body.name} ${req.body.password} : success`);
});

app.listen(port, 'localhost', err => {
    if (err) {
        console.log(err);
    }
    console.info(`==> 🌎 Listening on port %s.
    Open up http://localhost:%s/ in your browser.`, port, port);
});
