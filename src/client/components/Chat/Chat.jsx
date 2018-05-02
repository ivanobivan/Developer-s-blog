import React from 'react'
import {connect} from 'react-redux'
import socketIOClient from 'socket.io-client'
import {
    addMessage,
    setUserPull,
    clearMessagePull,
    addRoom,
    changeActiveRoom,
    deleteRoom
} from '../../actions/chatActions'
import UserPanel from './UserPanel'
import InputPanel from './InputPanel'
import MessagePanel from './MessagePanel'
import RoomPullPanel from './RoomPullPanel'
import ScrollArea from 'react-scrollbar'
import {checkUser} from "../../actions/serverActions";
import {push} from "react-router-redux";

const socket_host = process.env.SOCKET || "127.0.0.1";
const socket = socketIOClient(`http://${socket_host}:5050`);


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
            socket.on('send_user_list', res => {
                this.props.setUserPull(res.userPull);
                if (res.activeRooms && res.activeRooms.length &&
                    this.props.chat.roomPull.length - 1 < res.activeRooms.length) {
                    res.activeRooms.forEach(elem => socket.emit('subscribe', elem));
                }
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

    closeRoom = (room) => {
        socket.emit('unsubscribe', room);
        this.props.deleteRoom(room);
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
                        closeRoom={this.closeRoom}
                    />
                    <MessagePanel
                        messagePull={this.props.chat.messagePull}
                        roomPull={this.props.chat.roomPull}
                        activeRoom={this.props.chat.activeRoom}
                        changeActiveRoom={this.props.changeActiveRoom}
                    />
                    <InputPanel
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
        addRoom: (room, visibility, friendName) => dispatch(addRoom(room, visibility, friendName)),
        checkUser: () => dispatch(checkUser()),
        clearMessagePull: room => dispatch(clearMessagePull(room)),
        deleteRoom: room => dispatch(deleteRoom(room)),
        push: location => dispatch(push(location))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
