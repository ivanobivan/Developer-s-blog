import React from 'react';
import FontAwesome from 'react-fontawesome';

export default class UserPanel extends React.Component {

    componentWillMount() {
        this.props.socket.emit('get_users_list', this.props.username);
    }

    addRoom = (event) => {
        const {roomPull} = this.props;
        const roomName = event.target.innerText.trim();
        const pull = roomPull.filter(elem => elem.name === roomName);
        if(!pull.length) {
            this.props.changeActiveRoom(roomName);
            this.props.addRoom(roomName);
        }
    };

    render() {
        return (
            <div id="usersPanel__chat">
                {this.props.userPull && this.props.userPull.length ?
                    this.props.userPull.map((username, index) => {
                        return (
                            <div key={index}
                                 className="userNameItem__usersPanel"
                                 onClick={this.addRoom}
                            >
                                <div className="username__usersPanel">
                                    {username}
                                </div>
                            </div>
                        )
                    })
                    :
                    <div className="noUsers__usersPanel">NO USERS</div>
                }
                <div className="bottomBar__usersPanel">
                    <FontAwesome name='trash-o' size='2x' title="Clear chat" onClick={this.props.clearMessagePull}/>
                </div>

            </div>
        )
    }
}