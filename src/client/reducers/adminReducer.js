import {
    GET_USER,
    USER_FAILURE
} from "../constants/adminConstants"

const initialState = {
    userData: null,
    requestError: ""
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return {
                userData: action.userData
            };
        case USER_FAILURE:
            return {
                requestError: action.requestError
            };
        default:
            return state
    }
};

export default adminReducer;