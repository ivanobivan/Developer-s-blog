import React from 'react';

export default class UserPanel extends React.Component {

    componentWillMount() {
        if(this.props.env !== 'storybook') {
            this.props.socket.emit('get_users_list', this.props.username);
        }
    }

    render() {
        return (
            <div id="usersPanel__chat">
                {this.props.userPull && this.props.userPull.length ?
                    this.props.userPull.map((username, index) => {
                        return (
                            <div key={index} className="userNameItem__usersPanel">
                                <div title={username} className="nameInCircle__usersPanel">
                                    {this.props.level === 'user' ?
                                        <span className="user__nameInCircle">{this.props.level}</span>
                                        :
                                        <span className="admin__nameInCircle">{this.props.level}</span>
                                    }
                                </div>
                                <div className="username__usersPanel">
                                    {username}
                                </div>
                            </div>
                        )
                    })
                    :
                    <div className="noUsers__usersPanel">NO USERS</div>
                }

            </div>
        )
    }
}