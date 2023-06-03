import React, {useEffect, useState, useRef} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useParams} from "react-router-dom";
import {connect} from "react-redux";
import {useNavigate} from "react-router";
import {schema} from '../validation-scema/editInCreateValidation'
import * as modelActions from "../../../../redux/actions/modelActions";
import * as brandActions from "../../../../redux/actions/brandActions";
import * as carAction from "../../../../redux/actions/carActions";

const typeEngine = ['Газ', 'Бензин', 'Гибрид', 'Елекро'];
const sedanTypes = ['Купе', 'Универсал', "Седан"];
const boxTypes = ['Автомат', 'Механика'];

const EditAndCreateCar = ({getAllBrands, getModelById, models, editCar, deleteCarImage, getCarById, allTypes, update, add}) => {

  const [isEdit, setIsEdit] = useState(false);
  const [typeId, setTypeId] = useState(null);
  const [images, setImages] = useState([]);
  const [linkImg, setLinkImg] = useState([]);
  const [deleteIds, setDeleteIds] = useState([]);
  const {id} = useParams();
  const navigate = useNavigate();
  const fileInput = useRef();

  const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (id === 'create') {
      setIsEdit(false)
    } else {
      setIsEdit(true);
      getCarById(id);
    }
  }, [id]);

  useEffect(() => {
    if (editCar) {
      setLinkImg(editCar.images);
      setTypeId(editCar.brand.id);
      reset(editCar);
      setValue('brand_id', editCar.brand.id);
    }
  }, [editCar]);

  useEffect(() => {
    if (typeId) {
      getModelById(typeId);
    }
  }, [typeId]);

  useEffect(() => {
    getAllBrands();
  }, []);

  const onSubmit = () => {
    const formData = new FormData(document.getElementById('form-data'));
    if (images && images.length) {
      for (let i = 0; i < images.length; i++) {
        formData.append(`images[${i}]`, images[i])
      }
    }
    if (isEdit) {
      update(id, formData).then(() => {
        if (deleteIds && deleteIds.length) {
          for (let i = 0; i < deleteIds.length; i++) {
            deleteCarImage(deleteIds[i])
          }
        }
        navigate('/admin/cars/list')
      });
    } else {
      add(formData).then(() => {
        navigate('/admin/cars/list')
      });
    }
  };

  const deleteCarImg = (image, index) => {
    if (image && image.id) {
      setDeleteIds(current => [...current, image.id]);
      setImages(current => current.filter(i => i.id !== id));
      setLinkImg(current => current.filter((item, i) => i !== index))
    } else {
      setImages(current => current.filter((item, i) => i !== index));
      setLinkImg(current => current.filter((item, i) => i !== index))
    }
  };

  const getUrlFiles = (e) => {
    const linkImages = [];

    const fileList = e.target.files;
    const selectedPhotos = Array.from(fileList);
    setImages(current => [...current, ...selectedPhotos]);
    for (let i = 0; i < fileList.length; i++) {
      linkImages.push(URL.createObjectURL(fileList[i]));
    }
    setLinkImg(current => [...current, ...linkImages])
  };

  return (
    <div>
      <form className='fs-3' onSubmit={handleSubmit(onSubmit)} id="form-data">
        <div className="d-flex justify-content-center">
          <h1>
            {isEdit ? `Edit Car` : 'Create Car'}
          </h1>
        </div>
        <div>
          <label>brand</label>
          <select
            {...register("brand_id")}
            onChange={e => {
              setTypeId(e.target.value);
              setValue('brand_id', e.target.value)
            }}
            className="form-select fs-3"
          >
            <option selected disabled>brand</option>
            {
                allTypes && allTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))
            }
          </select>
        </div>
        <div>
          <label>model</label>
          <select className="form-select fs-3" {...register("model")}>
            <option value="" selected disabled>model</option>
            {
              models.length && models.map(brand => (
                <option key={brand.name} value={brand.name}>{brand.name}</option>
              ))
            }
          </select>
          <h3 className="text-danger">{errors.brand && errors.brand.message}</h3>
        </div>
        <div>
          <label>petrol</label>
          <select  {...register("petrol")} className="form-select fs-3">
            <option value="" disabled selected>petrol</option>
            {typeEngine.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <h3 className="text-danger">{errors.petrol && errors.petrol.message}</h3>
        </div>
        <div>
          <label>sedan</label>
          <select  {...register("sedan")} className="form-select fs-3">
            <option value="" disabled selected>sedan</option>
            {sedanTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <h3 className="text-danger">{errors.sedan && errors.sedan.message}</h3>
        </div>
        <div>
          <label className="d-inline">box</label>
          <select {...register("box")} className="form-select fs-3">
            <option value="" disabled selected>box</option>
            {boxTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <h3 className="text-danger">{errors.box && errors.box.message}</h3>
        </div>

        <div>
          <label className="d-inline">year</label>
          <input type="date" min="2000-01-01" max="2023-12-31"
                 className="form-control h-25 fs-3" {...register("year")}/>
          <h3 className="text-danger">{errors.year && errors.year.message}</h3>
        </div>
        <div>
          <label className="d-inline">location</label>
          <input className="form-control h-25 fs-3" placeholder='location' {...register("location")}/>
          <h3 className="text-danger">{errors.location && errors.location.message}</h3>
        </div>
        <div>
          <label className="d-inline">mileage</label>
          <input className="form-control h-25 fs-3" placeholder="mileage" {...register("mileage")}/>
          <h3 className="text-danger">{errors.mileage && errors.mileage.message}</h3>
        </div>
        <div>
          <label className="d-inline">price</label>
          <input className="form-control h-25 fs-3" placeholder="price" {...register("price")}/>
          <h3 className="text-danger">{errors.price && errors.price.message}</h3>
        </div>
        <div>
          <label className="d-inline">sale</label>
          <input className="form-control h-25 fs-3" placeholder="sale" {...register("sale")}/>
          <h3 className="text-danger">{errors.sale && errors.sale.message}</h3>
        </div>
        <div>

          <label className="d-inline">image</label>
          <input
            ref={fileInput}
            multiple
            type="file"
            className="input mt-2 mb-2"
            accept="image/png, image/jpeg"
            onChange={getUrlFiles}
            style={{display: "none"}}
          />
          <button className="btn m-2  fs-4 btn-success" type="button" onClick={() => fileInput.current.click()}>Upload
            File
          </button>
          <div className="d-flex">
            {
              linkImg.length > 0 && linkImg.map((image, i) => (
                <div key={i}>
                  {image.image ? (
                    <img className="d-block me-2" src={image.image} alt="Car Image"/>
                  ) : (
                    <img className="d-block me-2" src={image} alt="Car Image"/>
                  )}
                  <button className="btn btn-danger fs-5 mt-2" type="button"
                          onClick={() => deleteCarImg(image, i)}>Удалить
                  </button>
                </div>
              ))
            }
          </div>
        </div>
        <button type="submit" className="btn btn-success me-2 mt-3 fs-3 p-1">Отправить</button>
      </form>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    allTypes: state.type.allTypes,
    editCar: state.type.car.data,
    models: state.type.models,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getModel: () => modelActions.getModel(dispatch),
    getBrands: () => brandActions.getBrands(dispatch),
    getAllBrands: () => brandActions.getAllBrands(dispatch),
    add: (data) => carAction.add(dispatch, data),
    update: (id, data) => carAction.update(dispatch, id, data),
    deleteCarImage: (item) => carAction.deleteCarImage(dispatch, item),
    getCarById: (id) => carAction.getCarById(dispatch, id),
    getModelById: (id) => carAction.getModelById(dispatch, id),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAndCreateCar);
