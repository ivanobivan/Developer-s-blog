import React from 'react'
import {connect} from 'react-redux'
import socketIOClient from 'socket.io-client'

const socket = socketIOClient('http://0.0.0.0:5050');
export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            color: 'white',
            message: '',
            messagePull: ['test', 'test2']
        }
    }

    handleChangeMessage = event => {
        this.setState({message: event.target.value});
    };
    send = () => {
        socket.emit('change color', this.state.color);
        console.log("send emit");
    };
    sendMessage = () => {
        socket.emit('send_message', this.state.message);
    };
    setColor = (color) => {
        this.setState({color})
    };

    render() {
        const socket = socketIOClient(this.state.endpoint);
        socket.on('send_message', (message) => {
            this.setState({messagePull: [...this.state.messagePull, message]});
        });
        return (
            <div id="chat__root">
                <div id="test">

                    <div className="usersPanel__chat">
                        users
                    </div>


                    <div className="chatSide__chat">
                        <div className="messagePanel__chatSide">
                            {this.state.messagePull.map(msg => {
                                return(
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
                    {/*<button onClick={() => this.send()}>Change Color</button>
                    <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
                    <button id="red" onClick={() => this.setColor('red')}>Red</button>*/}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

//export default connect(mapStateToProps, mapDispatchToProps)(Chat);
