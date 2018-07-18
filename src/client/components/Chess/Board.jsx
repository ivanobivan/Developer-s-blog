import React, {Component} from 'react';
import Knight from './Knight';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BoardSquare from "./BoardSquare";

class Board extends Component {

    setPosition = (x, y) => {
        this.props.setPosition(x, y)
    };


    renderSquare(i) {
        const x = i % 8;
        const y = Math.floor(i / 8);
        return (
            <div key={i}
                 style={{width: '12.5%', height: '12.5%'}}
                 onClick={() => this.props.setPosition(x, y)}
            >
                <BoardSquare
                    x={x}
                    y={y}
                    setPosition={this.setPosition}
                    knightPosition={this.props.knightPosition}
                >
                    {this.renderPiece(x, y)}
                </BoardSquare>
            </div>
        );
    }

    renderPiece(x, y) {
        const [knightX, knightY] = this.props.knightPosition;
        if (x === knightX && y === knightY) {
            return <Knight image={this.props.image}/>;
        }
    }

    render() {
        const squares = [];
        for (let i = 0; i < 64; i++) {
            squares.push(this.renderSquare(i));
        }

        return (
            <div
                id='posts_root'>
                {squares}
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(Board);