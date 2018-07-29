import {
    GET_USER,
    USER_FAILURE
} from "../constants/const"
import {SERVER_ERROR} from "../constants/const"
import axios from 'axios'
import {push} from "react-router-redux";

export const getUser = username => {
    return (dispatch, getStore) => {
        axios.post("/admin/user", {
            username: username
        })
            .then(res => {
                if (res.data.message) {
                    dispatch({
                        type: USER_FAILURE,
                        requestError: res.data.message
                    })
                }else {
                    dispatch({
                        type: GET_USER,
                        userData: res.data
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: SERVER_ERROR,
                    err: err
                });
                dispatch(push("/serverError"));
            })
    }
};