import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {useNavigate} from "react-router";
import * as modelActions from "../../../../redux/actions/modelActions";
import * as brandActions from "../../../../redux/actions/brandActions";

const BrandForm = ({types, addModel, getBrands}) => {

  const [brandData, setBrandData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getBrands()
  }, []);

  const handleChangeTypes = (e) => {
    const {value} = e.target;
    setBrandData({...brandData, brand_id: value})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addModel(brandData)
      .then(() => {
        setTimeout(() => {
          navigate('/admin/cars/models')
        },200)
    });
  };

  return (
    <div>
      <div className='d-flex justify-content-evenly'>
        <form onSubmit={handleSubmit} className="w-75">
          <button
            disabled={!brandData.brand_id}
            type="submit"
            className="btn btn-info fs-3 me-4 mb-2"
          >Add
          </button>
          <input
            value={brandData.name}
            onChange={e => setBrandData({...brandData, name: e.target.value})}
            type="text"
            className="form-control w-50 d-inline fs-3 rounded-4 me-5"
            placeholder="Brand Name"
          />
        </form>
        <select onChange={handleChangeTypes} className="form-select d-inline w-25 h-100 fs-3 rounded-4 fst-normal"
                aria-label="Default select example">
          <option selected disabled> add type</option>
          {
            types.map(({name, id}) => (
              <option key={id} value={id}>{name}</option>
            ))
          }
        </select>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    types: state.type.types,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addModel: (brandData) => modelActions.addModel(dispatch, brandData),
    getBrands: () => brandActions.getBrands(dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandForm);
