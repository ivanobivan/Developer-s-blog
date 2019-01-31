import React from 'react';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

export class AboutMe extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="aboutMe__root">
                <h1>Welcome to the page about me</h1>
                <h3>This page is under development</h3>
                <p>I am glad to see you on this page
                    Please, add this page in favorites and follow the development</p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        push: location => dispatch(push(location))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutMe);