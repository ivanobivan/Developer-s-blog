import fs from 'fs';
import path from 'path';
import http from 'http'
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import config from './webpack.prod.config.js';
import serverConfig from './src/server/config';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose'
import socketIo from 'socket.io'
/*------------------------------------CONSTANTS----------------------------------------------------*/
const port = process.env.PORT || 5050;
const app = express();

/*------------------------------------REQUIREMENTS----------------------------------------------------*/
const mongo = process.env.MONGO_URI || serverConfig.dbUri;
require('./src/server/models').connect(mongo);
/*------------------------------------OPTIONS----------------------------------------------------*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use("/public", express.static(path.resolve("public")));

const NODE_ENV = process.env.NODE_ENV || 'production';

if (NODE_ENV !== 'production') {
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
        }
    });
    app.use(middleware);
}
//todo if i use es05 format of code, then i get Mongoose Exception
const localSignupStrategy = require('./src/server/passport/local-signup');
const localLoginStrategy = require('./src/server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

const secretWord = process.env.SECRET || "secret";

app.use(session({
    secret: secretWord,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
    done(null, {
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
        if (!data) {
            data = "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <title>Developer's Blog</title>\n" +
                "</head>\n" +
                "<body>\n" +
                "<div id=\"client\"></div>\n" +
                "<script src=\"public/client.js\"></script>\n" +
                "<div id=\"admin\"></div>\n" +
                "<script src=\"public/admin.js\"></script>\n" +
                "</body>\n" +
                "</html>\n";
        }
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
const roomPull = [];
io.on('connection', socket => {
    console.log('a user connected');
    socket.on('send_message', res => {
        io.in(res.room).emit('forward_message', res);
    });
    socket.on('get_users_list', username => {
        const index = userPull.findIndex(elem => elem.username === username);
        if (username && index < 0) {
            const rooms = [];
            for (let i in roomPull) {
                if (roomPull[i].search(`((^${username}\\+)|(\\+${username}$))`) >= 0) {
                    rooms.push(roomPull[i])
                }
            }
            socket.client.username = username;
            userPull.push({
                username: username,
                id: socket.id
            });
            io.emit('send_user_list', {
                userPull: userPull,
                activeRooms: rooms
            })
        }
    });
    socket.on('subscribe', (room) => {
        if (room) {
            const roomNames = room.split("+");
            const roomExist = roomPull.find(element =>
                element === roomNames[0] + "+" + roomNames[1] ||
                element === roomNames[1] + "+" + roomNames[0]
            );
            if (roomExist) {
                socket.join(roomExist);
                socket.emit('send_room_name', roomExist);
            } else {
                roomPull.push(room);
                socket.join(room);
                socket.emit('send_room_name', room);
                if (roomNames[0] && room !== "common+") {
                    const user = userPull.find(elem => elem.username === roomNames[0]);
                    const userSocket = socket.server.sockets.sockets[user.id];
                    userSocket.join(room);
                    userSocket.emit('connect_other_user', room);
                }
            }
        }
    });
    socket.on('unsubscribe', (room) => {
        const index = roomPull.findIndex(elem => elem === room);
        if (index >= 0) {
            roomPull.splice(index, 1);
            io.in(room).emit('forward_message', {
                username: 'server',
                message: "The other user has been unsubscribe and does not see your messages." +
                "Please open the room again to write to him.",
                room: room
            });
            socket.leave(room);
        }
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
        const name = socket.client.username;
        const isInPull = userPull.findIndex(elem => elem.username === name);
        if (name && isInPull >= 0) {
            userPull.splice(isInPull, 1);
            io.emit('send_user_list', {userPull: userPull});
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