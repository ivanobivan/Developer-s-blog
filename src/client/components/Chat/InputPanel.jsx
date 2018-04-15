import React from 'react';

export default class InputPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            message: '',
            errorMessageLength: ''
        };
    }

    handleChangeMessage = event => {
        this.setState({message: event.target.value});
    };

    handlerSendMessage = () => {
        const {message} = this.state;
        if (this.validateMessage(message)) {
            this.props.sendMessage(message);
        }
        this.setState({message: ""})
    };

    handlerSendMessageEvent = (event) => {
        const {message} = this.state;
        if (event.key === "Enter") {
            if(this.validateMessage(message)) {
                this.props.sendMessage(message);
            }
            this.setState({message: ""})
        }
        event.preventDefault();
    };

    validateMessage = message => {
        if (message && message.trim()) {
            if (message.trim().length <= 100) {
                this.setState({
                    errorMessageLength: ''
                });
                return true;
            } else {
                this.setState({
                    errorMessageLength: "Sorry, but your message shouldn't contains more than 100 symbols"
                });
            }
        }
        return false;
    };

    render() {
        const {errorMessageLength} = this.state;
        return (
            <div className="inputPanel__chatSide">
                <input type='text' name='message' value={this.state.message}
                       onChange={this.handleChangeMessage}
                       onKeyUp={this.handlerSendMessageEvent}/>
                <button onClick={this.handlerSendMessage}>
                    SEND
                </button>
                <div className="errorWrapper__chat">
                    {errorMessageLength ? <div className='errorMessageLength__chat'>{errorMessageLength}</div> : null}
                </div>
            </div>
        )
    }
}
