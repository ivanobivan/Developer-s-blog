import React from 'react';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {Stack} from './Stack'
import {Announcements} from './Announcements'
export class AboutMe extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="aboutMe__root">
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