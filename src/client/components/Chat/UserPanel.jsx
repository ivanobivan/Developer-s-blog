import React from 'react';
import FontAwesome from 'react-fontawesome';

export default class UserPanel extends React.Component {

    componentWillMount() {
        this.props.socket.emit('get_users_list', this.props.username);
    }

    changeActiveRoom = (event) => {
        this.props.changeActiveRoom(event.target.attributes.name.nodeValue);
    };

    render() {
        return (
            <div id="usersPanel__chat">
                {this.props.userPull && this.props.userPull.length ?
                    this.props.userPull.map((username, index) => {
                        return (
                            <div key={index}
                                 className="userNameItem__usersPanel"
                                 name={username}
                                 onClick={this.changeActiveRoom}>
                                <div className="username__usersPanel">
                                    {username.toUpperCase()}
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