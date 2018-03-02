import {routerReducer} from 'react-router-redux'
import serverReducer from "./serverReducer";
import { combineReducers } from "redux";

export default combineReducers({
    serverReducer,
    router: routerReducer
});

