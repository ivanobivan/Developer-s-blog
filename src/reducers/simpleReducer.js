import {
    TEST,
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    CHANGE_LOCATION
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
        case CHANGE_LOCATION:
            return {

            }

        default:
            return state;
    }
}