import React, {Component} from 'react';
import {DragSource} from 'react-dnd';
import {ItemTypes} from './constants';

const knightSource = {
    beginDrag(props) {
        return {};
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}


class Knight extends Component {
    render() {
        const {connectDragSource, isDragging} = this.props;
        return connectDragSource(
            <div
                className='knight'
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    fontWeight: 'bold',
                    cursor: 'move'
                }}>
                ♘
            </div>
        );
    }
}

export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);