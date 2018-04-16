import React from 'react';

export default class MessagePanel extends React.Component {

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView();
    };

    componentDidUpdate() {
        this.scrollToBottom();
    };

    render() {
        const room = this.props.activeRoom === 'all' ?
            {
                type: 'public',
                user: 'users'
            } :
            {
                type: 'private',
                user: 'user'
            };
        return (
            <div className="messagePanel__chatSide">
                <div className="titleRoom__messagePanel">You are in {room.type} room with {this.props.activeRoom} {room.user}</div>
                {this.props.messagePull.map((elem, index) => {
                    return (
                        <div key={index} className="oneMessage__messagePanel">
                            <div className="name__oneMessage">{elem.username}</div>
                            <div className="value__oneMessage">{elem.message}</div>
                        </div>
                    )
                })}
                <div style={{float: "left", clear: "both"}}
                     ref={(el) => {
                         this.messagesEnd = el;
                     }}>
                </div>
            </div>
        )
    }
}
