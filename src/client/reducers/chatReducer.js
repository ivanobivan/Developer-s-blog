import {
    SEND_MESSAGE,
    FORWARD_MESSAGE,
    SET_USER_PULL,
    CLEAR_MESSAGE_PULL
} from "../constants/chatConstants";

const initialState = {
    messagePull: [],
    userPull: []
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE :
            return state;
        case FORWARD_MESSAGE:
            const slicePull = state.messagePull.length > 1000 ? state.messagePull.slice(0, 100) : state.messagePull;
            return {
                ...state,
                messagePull: [...slicePull, {
                    username: action.req.username,
                    message: action.req.message
                }]
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
        default:
            return state;
    }
};

export default chatReducer;