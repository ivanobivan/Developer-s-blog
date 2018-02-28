import React from 'react';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

class Home extends React.Component {

    goToTheURL = event => {
        this.props.push(event.target.attributes.name.nodeValue)
    };

    render() {
        return (
            <div>
                <h1>Welcome to my Page</h1>
                <p>You can view my posts</p>
                <button onClick={this.goToTheURL} name="/posts">View posts</button>
                <br/>
                <p>You can join to me</p>
                <button onClick={this.goToTheURL} name="/userform">Log in page</button>
                <br/>
                <p>You can view page about me</p>
                <button onClick={this.goToTheURL} name="/aboutme">About me</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);