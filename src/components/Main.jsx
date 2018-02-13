import React from 'react'
import {changeApi} from "../actions/AppActions";
import {connect} from "react-redux";

class Main extends React.Component {

    render() {
        return(
            <div>
                Main Component
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        simpleReducer: state.simpleReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeApi: message => dispatch(changeApi(message))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);