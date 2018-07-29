import React from 'react';
import {changelocation,} from '../../actions/serverActions';
import Link from "./Link";


const Toolbar = (props) => {
    const {server, COMPONENT, goToTheURL} = props;
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

export default Toolbar;