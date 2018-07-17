import React from 'react'
import {connect} from "react-redux";
import Board from "./Board";

class Posts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            knightPosition: [0, 0]
        }
    }

    disablePoint = (dx, dy) => {
        return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
            (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    };

    setPosition = (toX, toY) => {
        const [x, y] = this.state.knightPosition;
        const dx = toX - x;
        const dy = toY - y;
        if (this.disablePoint(dx,dy)) {
            this.setState({
                knightPosition: [toX, toY]
            })
        }


    };

    render() {
        return <Board
            knightPosition={this.state.knightPosition}
            setPosition={this.setPosition}
            disablePoint={this.disablePoint}
        />
    }

}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);