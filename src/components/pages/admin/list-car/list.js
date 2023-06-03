import React, {useEffect, useState} from 'react';
import styles from "./list.module.css";
import * as carAction from "../../../../redux/actions/carActions";
import * as brandActions from "../../../../redux/actions/brandActions";
import {connect} from "react-redux";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import axiosClient from "../../../../axios-client";
import PaginationMui from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ListCars = (props) => {

  const [params] = useState({
    page: 1
  });

  const [modelCars, setModelCars] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageCountFilter, setPageCountFilter] = useState(0);
  const [typeId, setTypeId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setPageCount(props.pagination.cars_pages)
  }, [props.pagination]);

  useEffect(() => {
    props.getAllBrands()
  }, []);

  const deleteCarInList = (id) => {
    props.deleteCar(id)
      .then(() => {
        setTimeout(() => {
          props.getCars(params);
        },400)
      });
  };

  const navigateCars = (id) => {
    navigate(`/admin/car/${id}`);
  };

  useEffect(() => {
    props.getCars(params);
  }, []);

  const handlePageClick = (event, value) => {
    setPageCountFilter(value);
    props.getCars({...params, page: value});
  };

  const handleSelectChangeTypes = (event) => {
    const {value} = event.target;
    setTypeId(value);
    if (pageCountFilter) {
      props.getCars({...params, page: pageCountFilter, modelId: value});
    } else {
      props.getCars({...params, page: 1, modelId: value});
    }
    if (value) {
      axiosClient.get(`models-by-brand/${value}`)
        .then(res => {
          setModelCars(res.data.data)
        })
        .catch(err => {
          console.error(err.message)
        });
    } else {
      setModelCars([])
    }
  };

  const handleSelectChangeModels = (event) => {
    const {value} = event.target;
    if (pageCountFilter) {
      props.getCars({...params, page: pageCountFilter, brandName: value, modelId: typeId,})
    } else {
      props.getCars({...params, page: pageCountFilter, brandName: value, modelId: typeId,});
    }
  };

  if (!props.isLoading) {
    return (
      <div>
        <div className={styles.searching}>
          <div style={{display: "flex"}}>
            <div className={styles.selectTree}>
              <select onChange={handleSelectChangeTypes} className="form-select w-100 h-20  rounded-3"
                      aria-label="Default select example">
                <option selected disabled>type</option>
                <option value=''>all</option>
                {
                  props.allTypes && props.allTypes.map(type => {
                    return (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className={styles.selectTree}>
              <select onChange={handleSelectChangeModels} className="form-select w-100 h-20  rounded-3"
                      aria-label="Default select example">
                <option selected disabled>brand</option>
                <option value=''>all</option>
                {
                  modelCars.map((type, i) => {
                    return (
                      <option key={i} value={type.name}>{type.name}</option>
                    )
                  })
                }
              </select>
            </div>
          </div>
          <div>
            <Link to='/admin/cars/create'>
              <button type="button" className="btn btn-primary btn-lg">Add</button>
            </Link>
          </div>
        </div>
        <table style={{height: 300}} className="table fs-3">
          <thead>
          <tr>
            <th scope="col">BRAND</th>
            <th scope="col">MODEL</th>
            <th scope="col">BOX</th>
            <th scope="col">LOCATION</th>
            <th scope="col">MILEAGE</th>
            <th scope="col">PETROL</th>
            <th scope="col">PRICE</th>
            <th scope="col">SALE</th>
            <th scope="col">SEDAN</th>
            <th scope="col">YEAR</th>
            <th scope="col">CREATED_AT</th>
            <th scope="col">SETTINGS</th>
          </tr>
          </thead>
          <tbody>
          {
            !props.carDocs ? <h1>No car of this model found</h1> : props.carDocs.map((car) => (
              <tr key={car.id} style={{cursor: "pointer"}} onClick={() => navigateCars(car.id)}>
                <td>{car.brand.name}</td>
                <td>{car.model}</td>
                <td>{car.box}</td>
                <td>{car.location}</td>
                <td>{car.mileage}</td>
                <td>{car.petrol}</td>
                <td>{car.price}</td>
                <td>{car.sale}</td>
                <td>{car.sedan}</td>
                <td>{car.year}</td>
                <td>{car.created_at}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <Link to={`/admin/cars/${car.id}`}>
                    <button type="button" className="btn fs-4 me-2 btn-warning">Edit</button>
                  </Link>
                  <button onClick={() => deleteCarInList(car.id)} type="button" className="btn fs-4 btn-danger">Delete
                  </button>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
        <div className="d-flex justify-content-center mt-3">
          <Stack>
            <PaginationMui
              count={pageCount}
              onChange={handlePageClick}
              variant="outlined"
              size="large"
              color="primary"
            />
          </Stack>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{marginTop: 80}}>
        <Skeleton count={4} height={25} style={{margin: 20}}/>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    cars: state.car.cars,
    carDocs: state.car.carDocs,
    type: state.type.types,
    pagination: state.car.paginate,
    allTypes: state.type.allTypes,
    isLoading: state.car.isLoading,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getCars: (data) => carAction.getCars(dispatch, data),
    deleteCar: (uid) => carAction.deleteCar(dispatch, uid),
    getAllBrands: () => brandActions.getAllBrands(dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCars);