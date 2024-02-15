import { combineReducers } from "redux";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import loadingReducer from "./loadingReducer";
const rootReducer = combineReducers({
    user: userReducer,
    auth:authReducer,
    loading:loadingReducer,
})

export default rootReducer;