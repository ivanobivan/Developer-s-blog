import {
    SEND_MESSAGE,
    FORWARD_MESSAGE
} from "../constants/chatConstants";

const initialState = {
    message: []
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE :
            return state;
        case FORWARD_MESSAGE:
            return {
                message: [...state.message,action.message]
            };
        default:
            return state;
    }
};

export default chatReducer;