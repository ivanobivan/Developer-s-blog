import React from 'react'
import {connect} from 'react-redux'
import socketIOClient from 'socket.io-client'
import {
    addMessage,
    setUserPull,
    clearMessagePull,
    addRoom,
    changeActiveRoom
} from '../../actions/chatActions'
import UserPanel from './UserPanel'
import InputPanel from './InputPanel'
import MessagePanel from './MessagePanel'
import RoomPullPanel from './RoomPullPanel'
import ScrollArea from 'react-scrollbar'
import {checkUser} from "../../actions/serverActions";
import {push} from "react-router-redux";

const env = process.env.SERVER_TYPE;
let socket = null;
if (process.env.SERVER_TYPE === 'public') {
    socket = socketIOClient('http://185.117.155.32:5050');
} else if (process.env.SERVER_TYPE === "local") {
    socket = socketIOClient('http://192.168.1.2:5050');
}


export class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessageLength: ''
        };
        if (!this.props.socketWasInitialized) {
            socket.on('forward_message', (req) => {
                this.props.addMessage(req);
            });
            socket.on('send_user_list', userPull => {
                this.props.setUserPull(userPull);
            });
            socket.on('send_room_name', room => {
                if (room !== "common+") {
                    this.props.addRoom(room, true);
                    this.props.changeActiveRoom(room);
                }
            });
            socket.on('connect_other_user', room => {
                this.props.addRoom(room, false);
            });
            socket.emit('subscribe', "common+");
            this.props.initializeSocket();
        }
    }

    componentDidMount() {
        const {username, level} = this.props.server;
        if (!username || level === 'unknown') {
            this.props.push('/');
        }
    }

    sendMessage = (message) => {
        socket.emit('send_message', {
            message: message,
            username: this.props.server.username,
            room: this.props.chat.activeRoom
        });
    };

    render() {
        return (
            <div id="chat__root">
                <ScrollArea
                    speed={0.8}
                    className="scrollArea_UserPanel__chat"
                    horizontal={false}
                >
                    <UserPanel
                        env={env}
                        userPull={this.props.chat.userPull}
                        socket={socket}
                        username={this.props.server.username}
                        clearMessagePull={this.props.clearMessagePull}
                        addRoom={this.props.addRoom}
                        roomPull={this.props.chat.roomPull}
                        changeActiveRoom={this.props.changeActiveRoom}
                        activeRoom={this.props.chat.activeRoom}
                    />
                </ScrollArea>
                <div className="chatSide__chat">
                    <RoomPullPanel
                        roomPull={this.props.chat.roomPull}
                        activeRoom={this.props.chat.activeRoom}
                        changeActiveRoom={this.props.changeActiveRoom}
                    />
                    <MessagePanel
                        env={env}
                        messagePull={this.props.chat.messagePull}
                        roomPull={this.props.chat.roomPull}
                        activeRoom={this.props.chat.activeRoom}
                        changeActiveRoom={this.props.changeActiveRoom}
                    />
                    <InputPanel
                        env={env}
                        sendMessage={this.sendMessage}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        chat: state.chat,
        server: state.server
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addMessage: req => dispatch(addMessage(req)),
        changeActiveRoom: room => dispatch(changeActiveRoom(room)),
        setUserPull: name => dispatch(setUserPull(name)),
        addRoom: (room, visibility) => dispatch(addRoom(room, visibility)),
        checkUser: () => dispatch(checkUser()),
        clearMessagePull: room => dispatch(clearMessagePull(room)),
        push: location => dispatch(push(location))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
