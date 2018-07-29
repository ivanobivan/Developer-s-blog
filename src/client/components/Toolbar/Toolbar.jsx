import React from 'react';
import {changelocation, checkUser, logOut} from '../../actions/serverActions';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

let pushed = null;
const goToTheURL = (event, props) => {
    pushed(event.target.dataset.link);
};

const Toolbar = (props) => {
    pushed = props.push;
    const level = props.server.level;
    return (
        <nav id="toolbar__root">
            <a onClick={goToTheURL} data-link="/">Home</a>
            <a onClick={goToTheURL} data-link='/posts'>Posts</a>
            {level === 'unknown' ?
                <a onClick={goToTheURL} data-link='/userform/logIn'>Log in</a> : null
            }
            <a onClick={goToTheURL} data-link='/aboutme'>About</a>
            {level === 'admin' ?
                <a onClick={goToTheURL} data-link='/admin'>Admin</a> : null
            }
            {level !== 'unknown' ?
                <a onClick={goToTheURL} data-link="/chat">Chat</a> : null
            }
        </nav>
    );

};

const mapStateToProps = state => {
    return {
        server: state.server
    };
};

const mapDispatchToProps = dispatch => {
    return {
        push: location => dispatch(push(location)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);