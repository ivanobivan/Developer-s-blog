import {TEST} from "../constants/constants";

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

        default:
            return state;
    }
}