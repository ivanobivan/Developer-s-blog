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

    render() {
        return (
            <div className="inputPanel__chatSide">
                <input type='text' name='message' value={this.state.message}
                       onChange={this.handleChangeMessage}/>
                <button onClick={this.props.sendMessage}>SEND</button>
            </div>
        )
    }
}
