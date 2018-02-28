import React from 'react';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

class Stack extends React.Component {

    render() {
        return (
            <div>
                <p>There are technologies that i use</p>
                <ul>
                    <li>React</li>
                    <li>Redux</li>
                    <li>React-router</li>
                    <li>Webpack</li>
                </ul>
            </div>
        )

    }
}
const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        push : location => dispatch(push(location))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Stack);