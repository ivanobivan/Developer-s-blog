import {routerReducer} from 'react-router-redux'
import serverReducer from "./serverReducer";
import adminReducer from './adminReducer'
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    server: serverReducer,
    admin: adminReducer,
    router: routerReducer
});
export default rootReducer     ;

