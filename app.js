const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require(__dirname + '/webpack.config.js');
const serverConfig = require('./src/server/config');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const flash = require('connect-flash');

/*------------------------------------CONSTANTS----------------------------------------------------*/
const port = 5050;
const app = express();

/*------------------------------------CUSTOM----------------------------------------------------*/
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
/*------------------------------------REQUIREMENTS----------------------------------------------------*/
require('./src/server/models').connect(serverConfig.dbUri);
/*------------------------------------OPTIONS----------------------------------------------------*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use(middleware);
app.use(webpackHotMiddleware(compiler, {
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
}));
const localSignupStrategy = require('./src/server/passport/local-signup');
const localLoginStrategy = require('./src/server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());
const User = require('mongoose').model('User');
passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    User.findOne({username: username}, (err, user) => {
        done(err, user);
    })

});
const authRoutes = require('./src/server/routes/auth');
const apiRoutes = require('./src/server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);


/*------------------------------------REQUESTS----------------------------------------------------*/
app.get('/', function response(req, res) {
    fs.readFile(__dirname + '/index.html', (err, data) => {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
});

app.post('/foo', function (req, res, next) {
    res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
});

app.post('/bar', function (req, res, next) {
    res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
});
app.post("/session", (req, res) => {
    res.send(req.session);
});

/*------------------------------------SERVER----------------------------------------------------*/

app.listen(port, 'localhost', err => {
    if (err) {
        console.log(err);
    }
    console.info(`==> 🌎 Listening on port %s.
    Open up http://localhost:%s/ in your browser.`, port, port);
});
