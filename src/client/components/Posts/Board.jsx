import React, {Component} from 'react';
import Square from './Square';
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
                    disablePoint={this.props.disablePoint}
                >
                    {this.renderPiece(x, y)}
                </BoardSquare>
            </div>
        );
    }

    renderPiece(x, y) {
        const [knightX, knightY] = this.props.knightPosition;
        if (x === knightX && y === knightY) {
            return <Knight/>;
        }
    }

    render() {
        const squares = [];
        for (let i = 0; i < 64; i++) {
            squares.push(this.renderSquare(i));
        }

        return (
            <div
                id='posts_root'
                style={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    flexWrap: 'wrap'
                }}>
                {squares}
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(Board);