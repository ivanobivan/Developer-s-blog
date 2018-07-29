import React from 'react';

const Link = (props) => {
    return (
        <a onClick={props.handler} data-name={props.link}>{props.name}</a>
    )
}