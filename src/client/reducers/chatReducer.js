import {
    SEND_MESSAGE,
    FORWARD_MESSAGE,
    SET_USER_PULL
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
            return {
                ...state,
                messagePull: [...state.messagePull, {
                    username: action.req.username,
                    message: action.req.message
                }]
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