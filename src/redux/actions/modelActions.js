import axiosClient from "../../axios-client";

export const GET_CAR_BRANDS = 'GET_CAR_BRANDS';
export const ADD_BRAND = 'ADD_BRAND';
export const DELETE_BRAND = 'DELETE_BRAND';
export const EDIT_BRAND = 'EDIT_BRAND';

export const addModel = async (dispatch, data) => {
  axiosClient.post(`/models`, data)
    .then(res => {
      dispatch({
        type: ADD_BRAND,
        payload: res.data
      })
    })
    .catch(e => {
      let error = '';
      if (e.response.data.message) {
        error = e.response.data.message
      } else {
        error = 'Server Error!'
      }
      console.error(error)
    });
};

export const deleteModel = async (dispatch, id) => {
  axiosClient.delete(`models/${id}`)
    .then(() => {
      dispatch({
        type: DELETE_BRAND,
        payload: id
      });
    })
    .catch(e => {
      let error = '';
      if (e.response.data.message) {
        error = e.response.data.message
      } else {
        error = 'Server Error!'
      }
      console.error(error)
    })
};

export const editModel = async (dispatch, data) => {
  axiosClient.put(`models/${data.id}`, {name: data.name})
    .then(() => {
      dispatch({
        type: EDIT_BRAND,
        payload: data,
      });
    })
    .catch((e) => {
      let error = '';
      if (e.response.data.message) {
        error = e.response.data.message
      } else {
        error = 'Server Error!'
      }
      console.error(error)
    })
};

export const getModel = async (dispatch, page) => {
  axiosClient.get(`/models`,{params:page})
    .then(res => {
      dispatch({
        type: GET_CAR_BRANDS,
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
      console.error(error)
    })
};
