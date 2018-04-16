import React from 'react'
import {connect} from 'react-redux'
import socketIOClient from 'socket.io-client'
import {sendMessage, addMessage, setUserPull} from '../../actions/chatActions'
import UserPanel from './UserPanel'
import InputPanel from './InputPanel'
import MessagePanel from './MessagePanel'
import ScrollArea from 'react-scrollbar'
import {checkUser} from "../../actions/serverActions";
import {push} from "react-router-redux";

const env = process.env.SERVER_TYPE;
let socket = null;
if (process.env.SERVER_TYPE === 'public') {
    socket = socketIOClient('http://185.117.155.32:5050');
} else if (process.env.SERVER_TYPE === "local") {
    socket = socketIOClient('http://192.168.1.4:5050');
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
            this.props.initializeSocket();
        }
    }

    componentDidMount() {
        if (!this.props.server.username || this.props.server.level === 'unknown') {
            this.props.push('/');
        }
    }

    sendMessage = (message) => {
        this.props.sendMessage(message, this.props.server.username);
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
                    />
                </ScrollArea>
                <div className="chatSide__chat">
                    <MessagePanel
                        env={env}
                        messagePull={this.props.chat.messagePull}
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
        sendMessage: (msg, username) => dispatch(sendMessage(msg, username)),
        addMessage: req => dispatch(addMessage(req)),
        setUserPull: name => dispatch(setUserPull(name)),
        checkUser: () => dispatch(checkUser()),
        push: location => dispatch(push(location)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
