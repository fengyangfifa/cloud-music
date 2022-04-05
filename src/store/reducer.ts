import { combineReducers } from "redux";
import { reducer as recommendReducer } from "@/application/Recommend/store";

const reducers = combineReducers({
  recommend: recommendReducer
});

export default reducers;
