import { combineReducers } from "redux";
import TabBarReducer from "./TabBarReducer";
import AuthReducer from "./authReducer";
import auth from "./auth";
import info from "./info";
import users from "./users";
import user from "./user";
import appInfo from "./appInfo";
export default combineReducers(
  Object.assign({
    TabBar: TabBarReducer,
    auth: AuthReducer,
    user,
    appInfo,
    // app,
    auth,
    // chat,
    info,
    users,
    // webrtc,
  })
);
