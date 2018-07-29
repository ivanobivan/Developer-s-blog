import React from 'react';
import {changelocation} from '../../actions/serverActions';
import {COMPONENT} from '../../constants/const';

const Toolbar = (props) => {
    const {server, switchComponent} = props;
    return (
        <nav id="toolbar__root">
            {COMPONENT.map((e, i) => {
                return (
                    <a
                        key={i}
                        onClick={switchComponent}
                        data-link={e.name}
                    >
                        {e.name.toUpperCase()}
                    </a>);
            })}
        </nav>
    );

};

export default Toolbar;