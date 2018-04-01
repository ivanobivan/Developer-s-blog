import fs from 'fs';
import path from 'path';
import http from 'http'
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import config from './webpack.config.js';
import serverConfig from './src/server/config';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose'
import socketIo from 'socket.io'
/*------------------------------------CONSTANTS----------------------------------------------------*/
const port = serverConfig.port;
const app = express();
/*------------------------------------CUSTOM----------------------------------------------------*/
//const compiler = webpack(config);
/*const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
    }
});*/
/*------------------------------------REQUIREMENTS----------------------------------------------------*/
require('./src/server/models').connect(serverConfig.dbUri);
/*------------------------------------OPTIONS----------------------------------------------------*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use("/public", express.static(path.resolve("public")));
//app.use(middleware);
//todo if i use es05 format of code, then i get Mongoose Exception
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
passport.serializeUser((user, done) => {
    done(null,  {
        username: user.username,
        level: user.level
    });
});

passport.deserializeUser((user, done) => {
    const User = mongoose.model('User');
    User.findOne({username: user.username}, (err, user) => {
         done(err, user);
    })
});
import authRoutes from './src/server/routes/auth';
import apiRoutes from './src/server/routes/api';
import adminRoutes from './src/server/routes/admin'
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use("/admin", adminRoutes);
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
app.post('/logout', (req, res) => {
    req.logout();
    res.json({
        message: 'log out success'
    })
});

/*------------------------------------CHAT&&SERVER----------------------------------------------------*/
const server = http.createServer(app);
const io = socketIo.listen(server);
const userPull = [];
io.on('connection', socket =>{

    console.log('a user connected');
    socket.on('send_message', res => {
        io.emit('forward_message', res);
    });
    socket.on('get_users_list', username => {
        if(username && userPull.indexOf(username) === -1) {
            socket.client.username = username;
            userPull.push(username);
            io.emit('send_user_list', userPull)
        }
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
        const name = socket.client.username;
        const isInPull = userPull.indexOf(name);
        if(isInPull !== -1) {
            userPull.splice(isInPull, 1);
            io.emit('send_user_list', userPull)
        }
    });
});



server.listen(port, '0.0.0.0', err => {
    if (err) {
        console.log(err);
    }
    console.info(`==> 🌎 Listening on port %s.
    Open up http://0.0.0.0:%s/ in your browser.`, port, port);
});