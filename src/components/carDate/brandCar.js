import React, {useEffect, useState} from 'react'
import * as brandActions from "../../redux/actions/brandActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Pagination from 'react-paginate';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function CarBrands({deleteBrand, updateBrand, isLoading, getBrands, types, pagination}) {

  const [editText, setEditText] = useState('');
  const [showEditInp, setShowEditInp] = useState(null);
  const [carsPage, setCarsPage] = useState(0);

  useEffect(() => {
    setCarsPage(pagination.cars_pages)
  }, [pagination]);

  useEffect(() => {
    getBrands({page: 1})
  }, []);

  const editingType = () => {
    updateBrand(editText);
    setShowEditInp(null)
  };

  const handleDelete = (id) => {
    deleteBrand(id)
      .then(() => {
        setTimeout(() => {
          getBrands({page: 1})
        }, 400)
      });
  };

  const handlePageClick = (data) => {
    const countPage = data.selected + 1;
    getBrands({page: countPage})
  };

  if (isLoading) {
    return (
      <div className='card w-100 mt-5 p-5'>
        <div>
          <div>
            <Link to="/admin/cars/brands/add">
              <button
                type="button"
                className="btn btn-info fs-3 me-4 mb-2"><i className="bi bi-car-front-fill me-2"/>Add
              </button>
            </Link>
          </div>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
            <tr>
              <th className="border-bottom-0" scope="col">Types</th>
              <th className="border-bottom-0" scope="col">Created At</th>
            </tr>
            </thead>
            <tbody>
            {
              types.map((item, i) => (
                <tr key={i}>
                  <td> {showEditInp === i && (
                    <>
                      <input className="me-2" value={editText.name} type="text" onChange={(e) => setEditText({
                        name: e.target.value,
                        created_at: item.created_at,
                        id: item.id
                      })}/>
                      <button disabled={!editText.name} type="button" className="btn btn-info"
                              onClick={editingType}>Save
                      </button>
                    </>
                  )} {showEditInp !== i && item.name}
                  </td>
                  <td>
                    {item.created_at}
                  </td>
                  <td>
                    <button style={{width: 100}} type="button" className="btn btn-danger float-end fs-4"
                            onClick={() => handleDelete(item.id)}><i className="bi bi-trash3 me-2"/> Delete
                    </button>
                    <button style={{width: 100}} type="button" className="btn btn-success float-end fs-4 me-4"
                            onClick={() => {
                              setShowEditInp(i);
                              setEditText({name: item.name})
                            }}><i className="bi bi-pencil-square me-2"/>Edit
                    </button>
                  </td>
                </tr>
              ))
            }
            </tbody>
            <tfoot className="d-flex justify-content-center fs-4">
            <Pagination
              previousLabel={"previous"}
              nextLabel={"next"}
              pageCount={carsPage}
              marginPagesDisplayed={3}
              pageRangeDisplayed={6}
              onPageChange={handlePageClick}
              containerClassName={"pagination justify-content-center"}
              pageClassName={"page-item"}
              activeClassName={"active"}
            />
            </tfoot>
          </table>
        </div>
      </div>
    )
  } else {
    return (
      <div style={{marginTop: 80}}>
        <Skeleton count={4} height={25} style={{margin: 20}}/>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    cars: state.car.cars,
    carDocs: state.car.carDocs,
    types: state.type.types,
    pagination: state.type.pagination,
    isLoading: state.type.isLoading,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    deleteBrand: (id) => brandActions.deleteBrand(dispatch, id),
    updateBrand: (type) => brandActions.updateBrand(dispatch, type),
    getBrands: (params) => brandActions.getBrands(dispatch, params),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CarBrands);
