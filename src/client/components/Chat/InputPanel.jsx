import React from 'react';

export default class InputPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            message: ''
        };
    }

    handleChangeMessage = event => {
        this.setState({message: event.target.value});
    };

    handlerSendMessage = () => {
        this.props.sendMessage(this.state.message);
        this.setState({message: ""})
    };

    handlerSendMessageEvent = (event) => {
        if (event.key === "Enter") {
            this.props.sendMessage(this.state.message);
            this.setState({message: ""})
        }
    };

    render() {
        return (
            <div className="inputPanel__chatSide">
                <input type='text' name='message' value={this.state.message}
                       onChange={this.handleChangeMessage}
                       onKeyUp={this.handlerSendMessageEvent}/>
                <button onClick={this.handlerSendMessage}

                >SEND
                </button>
            </div>
        )
    }
}
