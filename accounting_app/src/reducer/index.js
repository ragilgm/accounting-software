import { combineReducers } from "redux"
import AuthReducer from "./auth"
import DataReducer from "./data"
import ThemeReducer from './theme'

const AllReducers = combineReducers({
    AuthReducer,
    DataReducer,
    ThemeReducer
})

export default AllReducers