import React from 'react'
import {connect} from 'react-redux'
import socketIOClient from 'socket.io-client'
import {sendMessage, addMessage, setUserPull} from '../../actions/chatActions'


const socket = socketIOClient('http://192.168.1.2:5050');
class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            message: ''
        };
        socket.on('forward_message', (message) => {
            this.props.addMessage(message);
        });
        socket.on('send_user_list', userPull => {
            this.props.setUserPull(userPull);
        })
    }
    componentWillMount() {
        socket.emit('get_users_list', this.props.server.username);
    }
    handleChangeMessage = event => {
        this.setState({message: event.target.value});
    };
    sendMessage = () => {
        this.props.sendMessage(this.state.message);
    };

    render() {
        return (
            <div id="chat__root">
                <div id="test">

                    <div className="usersPanel__chat">
                        {this.props.chat.userPull.map(username => {
                            return(
                                <div>{username}</div>
                            )
                        })}
                    </div>


                    <div className="chatSide__chat">
                        <div className="messagePanel__chatSide">
                            {this.props.chat.message.map(msg => {
                                return (
                                    <div>{msg}</div>
                                )
                            })}
                        </div>


                        <div className="inputPanel__chatSide">
                            <input type='text' name='message' value={this.state.message}
                                   onChange={this.handleChangeMessage}/>
                            <button onClick={this.sendMessage}>Send</button>
                        </div>
                    </div>
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
        sendMessage: msg => dispatch(sendMessage(msg)),
        addMessage: msg => dispatch(addMessage(msg)),
        setUserPull: name => dispatch(setUserPull(name))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
