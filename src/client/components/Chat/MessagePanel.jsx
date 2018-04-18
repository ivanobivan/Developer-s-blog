import React from 'react';
import RoomPullPanel from './RoomPullPanel'
export default class MessagePanel extends React.Component {

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView();
    };

    componentDidUpdate() {
        this.scrollToBottom();
    };

    render() {
        const {activeRoom,roomPull} = this.props;
        const activeMessagePull = roomPull.find(elem => elem.name === activeRoom);
        return (
            <div className="messagePanel__chatSide">
                <RoomPullPanel
                    roomPull={roomPull}
                    activeRoom={activeRoom}
                    changeActiveRoom={this.props.changeActiveRoom}
                />
                {activeMessagePull.messagePull.map((elem, index) => {
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
