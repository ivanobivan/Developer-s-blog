import {
    SEND_MESSAGE,
    FORWARD_MESSAGE,
    SET_USER_PULL,
    CLEAR_MESSAGE_PULL,
    ADD_ROOM
} from "../constants/chatConstants";

const initialState = {
    userPull: [],
    roomPull: [
        {
            name: 'common+',
            type: 'public',
            messagePull: []
        }
    ]
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        /*case SEND_MESSAGE :
            return state;*/
        case FORWARD_MESSAGE:
            const currentRoomPull = state.roomPull.find(e => e.name === action.req.room);
            const index = state.roomPull.findIndex(e => e.name === action.req.room);
            currentRoomPull.messagePull = [...currentRoomPull.messagePull,
                {
                    username: action.req.username,
                    message: action.req.message
                }];
            state.roomPull.slice(index,1).push(currentRoomPull);
            /*const slicePull = state.messagePull.length > 1000 ? state.messagePull.slice(0, 100) :
                state.messagePull;*/
            return {
                ...state,
                roomPull: state.roomPull
            };
        case CLEAR_MESSAGE_PULL:
            return {
                ...state,
                messagePull: []
            };
        case SET_USER_PULL:
            return {
                ...state,
                userPull: action.userPull
            };
        case ADD_ROOM:
            return {
                ...state,
                roomPull: [...state.roomPull, {name: action.room, type: 'private', messagePull: []}]
            };
        default:
            return state;
    }
};

export default chatReducer;