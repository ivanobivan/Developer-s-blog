import React from 'react';

export default class MessagePanel extends React.Component {

    render() {
        return (
            <div className="messagePanel__chatSide">
                {this.props.message.map(msg => {
                    return (
                        <div>{msg}</div>
                    )
                })}
            </div>
        )
    }
}
