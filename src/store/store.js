import { createStore } from "redux";
import simpleReducer from "../reducers/indes";

export default function storeConfig(initialState) {
    return createStore(
        simpleReducer,
        initialState
    );
}
