import React from 'react';
import {changelocation, checkUser, logOut} from '../../actions/serverActions';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import Link from "./Link";

let pushed = null;
const goToTheURL = (event, props) => {
    pushed(event.target.dataset.link);
};

const Toolbar = (props) => {
    pushed = props.push;
    const {server, COMPONENT} = props;
    return (
        <nav id="toolbar__root">
            <Link handler={goToTheURL} link={COMPONENT.HOME} name='Home'/>
            <Link handler={goToTheURL} link={COMPONENT.POSTS} name='Posts'/>
            {server.level === 'unknown' &&
            <Link handler={goToTheURL} link={COMPONENT.USERFORM} name='Log In'/>
            }
            <Link handler={goToTheURL} link={COMPONENT.ABOUTME} name='About'/>
            {server.level === 'admin' &&
            <Link handler={goToTheURL} link={COMPONENT.ADMIN} name='Admin'/>
            }
            {server.level !== 'unknown' &&
            <Link handler={goToTheURL} link={COMPONENT.CHAT} name='Chat'/>
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