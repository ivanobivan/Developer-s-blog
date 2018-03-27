import React from 'react'
import {connect} from 'react-redux'
import socketIOClient from 'socket.io-client'
import {sendMessage, addMessage} from '../../actions/chatActions'


class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            message: ''
        };
        this.socket = socketIOClient('http://0.0.0.0:5050');
        this.socket.on('forward_message', (message) => {
            this.props.addMessage(message);
        });
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
                        users
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
        chat: state.chat
    };
};

const mapDispatchToProps = dispatch => {
    return {
        sendMessage: msg => dispatch(sendMessage(msg)),
        addMessage: msg => dispatch(addMessage(msg))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
