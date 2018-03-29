import React from 'react'
import UserPanel from './UserPanel'
import InputPanel from './InputPanel'
import MessagePanel from './MessagePanel'
//import {connect} from 'react-redux'
//import socketIOClient from 'socket.io-client'
//import {sendMessage, addMessage, setUserPull} from '../../actions/chatActions'


//const socket = socketIOClient('http://0.0.0.0:5050');
export default class Chat extends React.Component {

    render() {
        return (
            <div id="chat__root">
                <div id="test">
                    <UserPanel
                        userPull={this.props.userPull}
                        level={this.props.level}
                    />

                    <div className="chatSide__chat">
                        <MessagePanel
                            message={this.props.message}
                            username={this.props.username}
                        />
                        <InputPanel/>
                    </div>
                </div>
            </div>
        )
    }
}

/*const mapStateToProps = state => {
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
};*/

