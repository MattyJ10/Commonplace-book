import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import cardReducer from "./reducers";

export default createStore(cardReducer, applyMiddleware(thunk));