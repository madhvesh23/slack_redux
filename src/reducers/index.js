import { combineReducers } from "redux";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import loadingReducer from "./loadingReducer";
import channelReducer from "./channelReducer";
const rootReducer = combineReducers({
    user: userReducer,
    auth:authReducer,
    loading:loadingReducer,
    channel:channelReducer,
})

export default rootReducer;