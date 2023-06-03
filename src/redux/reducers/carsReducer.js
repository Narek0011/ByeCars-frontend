import {GET_CAR_DOCS, GET_CARS, ADD_CAR, DELETE_CAR, EDIT_CAR, GET_CAR, GET_CAR_REQUEST,} from "../actions/carActions";

const initialState = {
  cars: [],
  car: {},
  paginate: {},
  carDocs: [],
  isLoading:true
};

function carsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CAR:
      return {
        ...state,
        carDocs:action.payload
      };
    case EDIT_CAR:
      const carsData = state.cars.map(item => {
        if (item.id === action.payload.id) {
          return action.payload
        }
        return item
      });
      return {
        ...state,
        cars: carsData,
      };
    case GET_CARS:
      return {
        ...state,
        cars: action.payload
      };
    case GET_CAR_REQUEST:
      return {
        ...state,
        cars: []
      };
    case GET_CAR_DOCS:
      return {
        ...state,
        carDocs: action.payload.data,
        paginate: action.payload.pagination,
        isLoading:false
      };
    case ADD_CAR:
      const newData = [action.payload, ...state.cars];
      return {
        ...state,
        cars: newData
      };
    case DELETE_CAR:
      const newCarsList = state.carDocs.filter(item => item.id !== action.payload);
      return {
        ...state,
        carDocs: newCarsList
      };
    default:
      return state
  }
}
export default carsReducer