import {
    FORWARD_MESSAGE,
    SET_USER_PULL,
    CLEAR_MESSAGE_PULL,
    ADD_ROOM,
    CHANGE_ACTIVE_ROOM
} from "../constants/chatConstants";

const initialState = {
    userPull: [],
    activeRoom: "common+",
    roomPull: [
        {
            name: 'common+',
            visibility: true,
            messagePull: []
        }
    ]
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case FORWARD_MESSAGE:
            const currentRoomPull = state.roomPull.find(e => e.name === action.req.room);
            const index = state.roomPull.findIndex(e => e.name === action.req.room);
            currentRoomPull.messagePull = [...currentRoomPull.messagePull,
                {
                    username: action.req.username,
                    message: action.req.message
                }];
            state.roomPull.slice(index, 1).push(currentRoomPull);
            /*const slicePull = state.messagePull.length > 1000 ? state.messagePull.slice(0, 100) :
                state.messagePull;*/
            return {
                ...state,
                roomPull: state.roomPull
            };
        case CLEAR_MESSAGE_PULL:
            const room = state.roomPull.find(elem => elem.name === action.room);
            const indexRoom = state.roomPull.findIndex(elem => elem.name === action.room);
            room.messagePull = [];
            state.roomPull.slice(indexRoom, 1).push(room);
            return {
                ...state,
                roomPull: state.roomPull
            };
        case SET_USER_PULL:
            const userPull = action.userPull.map(elem => elem.username);
            return {
                ...state,
                userPull: userPull
            };
        case ADD_ROOM:
            return {
                ...state,
                roomPull: [
                    ...state.roomPull,
                    {
                        name: action.room,
                        visibility: action.visibility, messagePull: []
                    }
                ]
            };
        case CHANGE_ACTIVE_ROOM :
            return {
                ...state,
                activeRoom: action.room
            };
        default:
            return state;
    }
};

export default chatReducer;