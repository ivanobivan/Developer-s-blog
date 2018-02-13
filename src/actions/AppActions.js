import {TEST} from "../constants/constants";

export const changeApi = (api) => {
    return {
        type: TEST,
        api: api
    };
};
