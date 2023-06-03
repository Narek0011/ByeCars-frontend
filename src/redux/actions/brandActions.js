import axiosClient from "../../axios-client";

export const ADD_TYPE = 'ADD_TYPE';
export const DELETE_TYPE = 'DELETE_TYPE';
export const EDIT_TYPE = 'EDIT_TYPE';
export const GET_CAR_TYPES = 'GET_CAR_TYPES';
export const GET_CAR_TYPES_All = 'GET_CAR_TYPES_All';

export const addBrand = async (dispatch, name) => {
  axiosClient.post('/brands', {name: name})
    .then((res) => {
      dispatch({
        type: ADD_TYPE,
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

export const getBrands = (dispatch, params) => {
  return axiosClient.get(`/brands`, {
    params: params
  })
    .then(({data}) => {
      return dispatch({
        type: GET_CAR_TYPES,
        payload: {
          data: data.data,
          pagination: data.pagination,
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

export const getAllBrands = (dispatch) => {
  axiosClient.get(`/getAllBrands`)
    .then(({data}) => {
      let newData = data.data;
      dispatch({
        type: GET_CAR_TYPES_All,
        payload: {
          data: newData,
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


export const deleteBrand = async (dispatch, id) => {
  if (!window.confirm("If you sure delete this car")) {
    return
  }
  axiosClient.delete(`/brands/` + id)
    .then(() => {
      dispatch({
        type: DELETE_TYPE,
        payload: id
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
    });
};

export const updateBrand = async (dispatch, type) => {
  axiosClient.put('/brands/' + type.id, {name: type.name})
    .then((res) => {
      dispatch({
        type: EDIT_TYPE,
        payload: res.data.data
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

