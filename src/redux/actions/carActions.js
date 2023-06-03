import axiosClient from "../../axios-client";

export const GET_CARS = 'GET_CARS';
export const GET_CAR = 'GET_CAR';
export const GET_CAR_DOCS = 'GET_CAR_DOCS';
export const DELETE_CAR = 'DELETE_CAR';
export const ADD_CAR = 'ADD_CAR';
export const EDIT_CAR = 'EDIT_CAR';
export const GET_CAR_BY_ID = 'GET_CAR_BY_ID';
export const GET_CAR_MODEL_BY_BRAND_ID = 'GET_CAR_MODEL_BY_BRAND_ID';
export const GET_CAR_REQUEST = 'GET_CAR_REQUEST';


export const getCars = async (dispatch, params) => {
  dispatch({
    type: GET_CAR_REQUEST,
  });
  axiosClient.get(`/cars`, {
    params: params
  })
    .then(res => {
      dispatch({
        type: GET_CAR_DOCS,
        payload: {
          data: res.data.data,
          pagination: res.data.pagination,
        }
      });
    })
    .catch((e) => {
      let error = '';
      if (e.response.data.message) {
        error = e.response.data.message
      } else {
        error = 'Server Error!'
      }
      console.error(error.message)
    });
};

export const deleteCar = async (dispatch, id) => {
  axiosClient.delete(`cars/${id}`)
    .then(() => {
      dispatch({
        type: DELETE_CAR,
        payload: id
      })
    })
    .catch((e) => {
      let error = '';
      if (e.response.data.message) {
        error = e.response.data.message
      } else {
        error = 'Server Error!'
      }
      console.error(error.message)
    });
};

export const add = async (dispatch, data) => {
  axiosClient.post('/cars', data)
    .then((res) => {
      dispatch({
        type: ADD_CAR,
        payload: res.data
      });
    })
    .catch((e) => {
      let error = '';
      if (e.response.data.message) {
        error = e.response.data.message
      } else {
        error = 'Server Error!'
      }
      console.error(error.message)
    })
};

export const update = async (dispatch, id, data) => {
  axiosClient.post(`edtCar/${id}`, data)
    .then(() => {
      dispatch({
        type: EDIT_CAR,
        payload: {
          id: id,
          ...data
        }
      })
    })
    .catch(e => {
      let error = '';
      if (e.response.data.message) {
        error = e.response.data.message
      } else {
        error = 'Server Error!'
      }
      console.log(error.message)
    })
};

export const getCarById = (dispatch, id) => {
  axiosClient.get(`cars/${id}`)
    .then((res) => {
      dispatch({
        type: GET_CAR_BY_ID,
        payload: res.data,
      })
    })
    .catch(err => {
      console.error(err.message)
    })
};

export const getModelById = (dispatch, id) => {
  axiosClient.get('models-by-brand/' + id)
    .then(res => {
      dispatch({
        type: GET_CAR_MODEL_BY_BRAND_ID,
        payload: res.data.data
      })
    })
    .catch(err => {
      console.error(err.message)
    })
};

export const deleteCarImage = (dispatch, item) => {
  axiosClient.delete(`deleteCarImage/${item}`)
    .then()
    .catch(errors => console.error(errors.message));
};
