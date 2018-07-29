import React from 'react';

const Link = (props) => {
    return (
        <a onClick={props.handler} data-link={props.link}>{props.name}</a>
    );
};

export default Link;