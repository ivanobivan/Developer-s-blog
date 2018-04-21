import React from 'react';
import FontAwesome from 'react-fontawesome';

export default class UserPanel extends React.Component {

    componentWillMount() {
        this.props.socket.emit('get_users_list', this.props.username);
    }

    addRoom = (event) => {
        const {roomPull, username} = this.props;
        const friendName = event.target.innerText.trim();
        const roomExist = roomPull.find(element =>
            element.name === friendName + "+" + username ||
            element.name === username + "+" + friendName
        );
        if (!roomExist && friendName !== username) {
            const room = friendName + '+' + username;
            this.props.socket.emit('subscribe', room);
        } else if (friendName !== username && !roomExist.visibility) {
            this.props.addRoom(roomExist.name, !roomExist.visibility, friendName);
            this.props.changeActiveRoom(roomExist.name);
        }
    };

    clearMessagePull = () => {
        this.props.clearMessagePull(this.props.activeRoom)
    };

    render() {
        return (
            <div id="usersPanel__chat">
                {this.props.userPull && this.props.userPull.length ?
                    this.props.userPull.map((elem, index) => {
                        return (
                            <div
                                className="userNameItem__usersPanel"
                                key={index}
                            >
                                <div
                                    className="clickWrapper__userNameItem"
                                    onClick={this.addRoom}
                                >
                                    <div className="username__usersPanel">
                                        {elem.username}
                                    </div>
                                </div>
                                {elem.notReadMessages ?
                                    <div className="notReadMessages__username">{elem.notReadMessages}</div>
                                    : null
                                }
                            </div>
                        )
                    })
                    :
                    <div className="noUsers__usersPanel">NO USERS</div>
                }
                <div className="bottomBar__usersPanel">
                    <FontAwesome name='trash-o' size='2x' title="Delete messages" onClick={this.clearMessagePull}/>
                </div>

            </div>
        )
    }
}