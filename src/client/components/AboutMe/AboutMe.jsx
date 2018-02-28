import React from 'react';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import Stack from './Stack'
import Announcements from './Announcements'
class AboutMe extends React.Component {

    render() {
        return (
            <div>
                <p>I am simple developer</p>
                <Stack/>
                <Announcements/>
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutMe);