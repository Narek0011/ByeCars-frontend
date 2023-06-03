import {
  ADD_TYPE,
  DELETE_TYPE,
  EDIT_TYPE,
  GET_CAR_TYPES,
  GET_CAR_TYPES_All,
} from "../actions/brandActions";
import {GET_CAR_BY_ID, GET_CAR_MODEL_BY_BRAND_ID} from "../actions/carActions";

const initialState = {
  types: [],
  allTypes: [],
  pagination: {
    cars_pages: undefined
  },
  isLoading: false,
  car: {},
  models: []
};

function typeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CAR_MODEL_BY_BRAND_ID:
      return {
        ...state,
        models: action.payload,
      };
    case GET_CAR_BY_ID:
      return {
        ...state,
        car: action.payload
      };
    case GET_CAR_TYPES_All:
      return {
        ...state,
        allTypes: action.payload.data
      };
    case GET_CAR_TYPES:
      return {
        ...state,
        types: action.payload.data,
        pagination: action.payload.pagination,
        isLoading: true,
      };
    case EDIT_TYPE:
      const typesData = state.types.map(type => {
        if (type.id === action.payload.id) {
          type = action.payload
        }
        return type
      });
      return {
        ...state,
        types: typesData
      };
    case DELETE_TYPE:
      let types = state.types.filter(item => item.id !== action.payload);
      return {
        ...state,
        types: types
      };
    case ADD_TYPE:
      return {
        ...state
      };
    default:
      return state;
  }
}

export default typeReducer