import {
    TEST,
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS
} from "../constants/constants";

const initialValue = {
    api: "api0"
};

const searchAttributes = (state = initialValue, action) => {
    switch (action.type) {
        case TEST:
            return {
                api : action.api
            };
        default:
            return state;
    }
};

export default searchAttributes;