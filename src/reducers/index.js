import { userReducers } from "./userReducer";

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
    user: userReducers,
})

export default rootReducer;