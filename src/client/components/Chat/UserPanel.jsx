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
                                <div className="username__usersPanel">
                                    {username.toUpperCase()}
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