import {
    SEND_MESSAGE,
    FORWARD_MESSAGE,
    SET_USER_PULL
} from "../constants/chatConstants";

const initialState = {
    message: [],
    userPull: []
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE :
            return state;
        case FORWARD_MESSAGE:
            return {
                ...state,
                message: [...state.message, action.message]
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