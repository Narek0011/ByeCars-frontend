import React, {useState} from 'react';
import {connect} from 'react-redux'
import * as typeAction from "../../../../redux/actions/brandActions";
import {useNavigate} from "react-router";

const TypeForm = ({addBrand}) => {

  const [name, setName] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    addBrand(name)
      .then(() => {
        setTimeout(() => {
          navigate('/admin/cars/brands')
        },400)
      });
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-content-between">
          <label className="form-check-label fs-3 d-block">Car Name</label>
          <input onChange={handleChange} value={name} type="text" class="form-control fs-3" id="exampleInputEmail1"
                 aria-describedby="emailHelp" placeholder="Enter car name"/>
        </div>
        <button type="submit" className="btn btn-primary fs-4 mt-3">Add</button>
      </form>
    </>
  );
};


const mapDispatchToProps = dispatch => {
  return {
    addBrand: (name) => typeAction.addBrand(dispatch, name),
  }
};

export default connect(null, mapDispatchToProps)(TypeForm);

