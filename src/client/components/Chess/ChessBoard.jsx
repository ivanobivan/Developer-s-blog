import React from 'react'
import {connect} from "react-redux";
import Board from "./Board";
import {checkPoint} from "../../api/api";

class ChessBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            knightPosition: [0, 0]
        }
    }

    setPosition = (toX, toY) => {
        const [x, y] = this.state.knightPosition;
        const dx = toX - x;
        const dy = toY - y;
        if (checkPoint(dx,dy,this.state.knightPosition)) {
            this.setState({
                knightPosition: [toX, toY]
            })
        }


    };

    render() {
        return <Board
            knightPosition={this.state.knightPosition}
            setPosition={this.setPosition}
            image={this.props.image}
        />
    }

}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChessBoard);