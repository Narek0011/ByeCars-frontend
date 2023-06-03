import React, {useState, useEffect} from 'react'
import {connect} from "react-redux";
import * as modelActions from '../../redux/actions/modelActions'
import 'bootstrap-icons/font/bootstrap-icons.css';
import * as brandActions from "../../redux/actions/brandActions";
import {Link} from "react-router-dom";
import Pagination from 'react-paginate';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function CarModels({brand, deleteModel, getModel, isLoading, editModel, pagination}) {

  const [showEditInp, setShowEditInp] = useState(null);
  const [editText, setEditText] = useState('');
  const [carsPages, setCarsPages] = useState(0);

  useEffect(() => {
    setCarsPages(pagination.cars_pages)
  }, [pagination]);

  const brandEdit = ({id, created_at}) => {
    editModel({name: editText, id: id, created_at: created_at});
    setShowEditInp(null)
  };

  const handlePageClick = (data) => {
    const page = data.selected + 1;
    getModel({page: page});
  };

  useEffect(() => {
    getModel({page: 1})
  }, []);

  const deleteModelCar = (id) => {
    deleteModel(id).then(() => {
      setTimeout(() => {
        getModel({page: 1})
      }, 400)
    });
  };

  if (isLoading) {
    return (
      <div className="card w-100 p-5">
        <div className='d-flex'>
          <div className="w-75">
            <Link to="/admin/cars/models/add">
              <button type="button" className="btn btn-info fs-3 me-4 mb-2">Add</button>
            </Link>
          </div>
        </div>

        <div className="card-body">
          <table className="table">
            <thead>
            <tr>
              <th className="border-bottom-0">Brands</th>
              <th className="border-bottom-0">Created At</th>
            </tr>
            </thead>
            <tbody className="h-50">
            {
              brand.length ? brand.map((item, i) => (
                  <tr key={i}>
                    <td>
                      {showEditInp === i && (
                        <>
                          <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)}/>
                          <button disabled={!editText} type="button" className="btn btn-info"
                                  onClick={() => brandEdit(item)}>Save
                          </button>
                        </>
                      )}
                      {showEditInp !== i && item.name}
                    </td>
                    <td>
                      {item.created_at}
                    </td>
                    <td>
                      <button type="button"
                              style={{width: 100}}
                              className="btn btn-danger float-end fs-4"
                              onClick={() => deleteModelCar(item.id)}>
                        <i className="bi bi-trash3 me-2"/>
                        Delete
                      </button>
                      <button type="button" className="btn btn-success float-end fs-4 me-4" onClick={() => {
                        setShowEditInp(i);
                        setEditText(item.name);
                      }}><i className="bi bi-pencil-square me-2"/> Edit
                      </button>
                    </td>
                  </tr>
                ))
                :
                null
            }
            </tbody>
            <tfoot className="fs-4">
            <Pagination
              previousLabel={"previous"}
              nextLabel={"next"}
              pageCount={carsPages}
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
    brand: state.brand.defaultBrandsCars,
    pagination: state.brand.pagination,
    isLoading: state.brand.isLoading,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addModel: (brandData) => modelActions.addModel(dispatch, brandData),
    getModel: (page) => modelActions.getModel(dispatch, page),
    deleteModel: (id) => modelActions.deleteModel(dispatch, id),
    editModel: (data) => modelActions.editModel(dispatch, data),
    getBrands: () => brandActions.getBrands(dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CarModels);


