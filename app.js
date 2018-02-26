
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';
import serverConfig from './src/server/config';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import reactRoutes from './src/server/routes/index.js';
/*------------------------------------CONSTANTS----------------------------------------------------*/
const port = serverConfig.port;
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
//todo styles .less don't be ignore(WHY?)
require('./src/server/models').connect(serverConfig.dbUri);
require('babel-register')({
    ignore: /\/(build|node_modules)\//,
    presets: ['env', 'react']
});
require('ignore-styles');
/*------------------------------------OPTIONS----------------------------------------------------*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use("/public", express.static(path.resolve("public")));
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
app.use(passport.session());
const User = require('mongoose').model('User');
passport.serializeUser((user, done) => {
    done(null,  {
        username: user.username,
        level: user.level
    });
});

passport.deserializeUser((user, done) => {
    User.findOne({username: user.username}, (err, user) => {
         done(err, user);
    })
});
const authRoutes = require('./src/server/routes/auth');
const apiRoutes = require('./src/server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/',reactRoutes);

/*------------------------------------REQUESTS----------------------------------------------------*/
/*app.get('/', function response(req, res) {
    fs.readFile(__dirname + '/index.html', (err, data) => {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
});*/
app.post('/logout', (req, res) => {
    req.logout();
    res.json({
        message: 'log out success'
    })
});
/*------------------------------------SERVER----------------------------------------------------*/

app.listen(port, 'localhost', err => {
    if (err) {
        console.log(err);
    }
    console.info(`==> 🌎 Listening on port %s.
    Open up http://localhost:%s/ in your browser.`, port, port);
});
