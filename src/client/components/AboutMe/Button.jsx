import React from 'react';
import {ThemeContext} from '../../Theme/context';

const Button = props => {
    return (
        <ThemeContext.Consumer>
            {theme => (
                <button
                    {...props}
                    style={{backgroundColor: theme.background}}
                >{props.value}</button>
            )}
        </ThemeContext.Consumer>
    );
};

export default Button;