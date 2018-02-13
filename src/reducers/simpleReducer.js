import {
    TEST,
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS
} from "../constants/constants";

const initialValue = {
    api: "api0"
};

export default function searchAttributes(state = initialValue, action) {
    switch (action.type) {
        case TEST:
            return {
                ...state,
                api : action.api
            };
        case LOGIN_REQUEST :

        default:
            return state;
    }
}