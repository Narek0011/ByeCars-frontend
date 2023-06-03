import {combineReducers} from 'redux';
import carsReducer from './reducers/carsReducer'
import typeReducer from "./reducers/brandReducer";
import modelReducer from "./reducers/modelReducer";

const rootReducer = combineReducers({
  car: carsReducer,
  type: typeReducer,
  brand: modelReducer,
});

export default rootReducer;