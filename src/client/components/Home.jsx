import React from 'react';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {checkUser} from '../actions/AppActions'

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    goToTheURL = event => {
        this.props.push(event.target.attributes.name.nodeValue)
    };

    componentDidMount() {
        this.props.checkUser();
    }

    render() {
        const level = this.props.store.level;
        return (
            <div>
                <h1>Welcome to my Page, you are {this.props.store.level}</h1>
                <p>You can view my posts</p>
                <button onClick={this.goToTheURL} name="/posts">View posts</button>
                <br/>
                {level === 'unknown' ?
                    <div>
                        <p>You can log in</p>
                        <button onClick={this.goToTheURL} name="/userform">Log in page</button>
                    </div>
                    : null
                }
                <br/>
                <p>You can view page about me and send me letter</p>
                <button onClick={this.goToTheURL} name="/aboutme">About me</button>
                {level !== 'unknown' ?
                    <div>
                        <p>You may log out</p>
                        <button >Log out</button>
                    </div>
                    : null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        store: state.simpleReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        push: location => dispatch(push(location)),
        checkUser: () => dispatch(checkUser()),
        changeApi: () => dispatch(changeApi())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);