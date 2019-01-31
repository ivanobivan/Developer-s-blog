import React from 'react';
import {connect} from 'react-redux'
import {getUser} from '../../actions/adminActions'
import {push} from 'react-router-redux'
import {checkUser} from "../../actions/serverActions";

class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: ""
        }
    }
    componentWillMount() {
        const {level, username} = this.props.server;
        if(!username || level !== 'admin') {
            this.props.push('/');
        }
    }
    handleChangeName = event => {
        this.setState({username: event.target.value});
    };

    getUserByName = () => {
        this.props.getUser(this.state.username);
    };

    render() {
        const {userData, requestError} = this.props.adminRes;
        return (
            <div id="admin__root">
                <h1>Admin page</h1>
                <fieldset>
                    <p>Enter user name</p>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChangeName}/>
                    <button onClick={this.getUserByName}>Get User</button>
                </fieldset>
                {requestError ? <p>{requestError}</p> : null}
                {userData ?
                    <ul>
                        <li>username: {userData.username}</li>
                        <li>level: {userData.level}</li>
                        <li>date: {userData.date}</li>
                        <li>ip: {userData.ip}</li>
                    </ul> :
                    null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        adminRes: state.admin,
        server: state.server
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUser: username => dispatch(getUser(username)),
        checkUser: () => dispatch(checkUser()),
        push: location => dispatch(push(location)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);