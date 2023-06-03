import {
  ADD_BRAND,
  DELETE_BRAND,
  EDIT_BRAND,
  GET_CAR_BRANDS
} from "../actions/modelActions";

const initialState = {
  defaultBrandsCars : [],
  pagination : {},
  error:false,
  isLoading:false,
};

function modelReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_BRAND:
      const brandData = state.defaultBrandsCars.map(type => {
        if(type.id === action.payload.id){
          return action.payload
        }
        return type
      });
      return {
        ...state,
        defaultBrandsCars:brandData
      };
    case GET_CAR_BRANDS:
      const newDate = action.payload.data;
      return {
        ...state,
        defaultBrandsCars: newDate,
        pagination:action.payload.pagination,
        isLoading: true,
      };
    case ADD_BRAND:
      return {
        ...state,
      };
    case DELETE_BRAND:
      const data = state.defaultBrandsCars.filter(item => item.id !== action.payload);
      return {
        ...state,
        defaultBrandsCars: data
      };
    default:
      return state
  }
}

export default modelReducer