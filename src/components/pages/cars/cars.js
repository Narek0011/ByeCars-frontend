import React, {useEffect} from "react";
import Pagination from 'react-bootstrap/Pagination';
import {connect} from "react-redux";
import * as carAction from "../../../redux/actions/carActions";
import AdvancedExample from "../../pagination/AdvancedExample";
import styles from './cars.module.css'
import key from '../../../assets/images/key.png'
import road from '../../../assets/images/1234.png'
import clock from '../../../assets/images/clock.png'


function Cars(props) {

  let active = 1;
  let items = [];

  for (let number = 1; number <= 7; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }

  useEffect(() => {
    console.log(123123);
    props.getCars();
  },[]);

  useEffect(() => {
    console.log(props.cars);
  },[props.cars]);

  return (
    <div className={styles.container}>
      <div className={styles.cars}>
        <div className={styles.searchingDiv}>
          <span className={styles.searching}><b>Найдено:1 200</b> авто</span>
          <div className={styles.mobileTex}>За сегодня: <span>+300</span></div>
          <div className={styles.infoCars}>Сегодня добавлено: <span>+300</span></div>
        </div>
        <div className={styles.filter}>
          <div className={styles.activeButton}>
            <button type="button" className="btn btn-primary">Фильтр<img src={key} alt="Key Image"/></button>
          </div>
          <span className={styles.sort}>Сортировка</span>
          <select className="form-select h-20 d-inline rounded-0" className={styles.select} aria-label="Default select example">
            <option defaultValue>от дорогих к дешевым</option>
            <option value="1">One</option>
          </select>
        </div>

        {
          props.cars.length && props.cars.map((car,i) => (
              <div key={i}>
                <div className={styles.cardContainer}>
                  <div className={styles.carImage}/>
                  <div className={styles.mobileWersion}>
                    <div><span className={styles.typeCar}>{car.brand.name}</span></div>
                    <div><b>{car.brand.name}</b></div>
                    <span className={styles.priceCar}>{car.price}<span className={styles.ulLiPrice}> 245 180 грн</span></span>
                    <p className={styles.saleCars}>{car.sale}</p>
                  </div>
                  <div className={styles.computerWrsion} style={{paddingLeft: 20}}>
                    <div className={styles.rowOnes}><span className={styles.typeCar}>{car.brand.name}</span><span className={styles.priceCar}>{car.price}$</span>
                    </div>
                    <div className={styles.rowTwos}><b>{car.model}</b><span className={styles.saleCars}>{car.sale}</span></div>
                    <div className={styles.yearCar}>
                      <p><span><img src={clock} alt="Clock Image"/> 2009</span></p>
                      <div className={styles.location}/>
                      <span className={styles.locationCar}>{car.location}</span>
                    </div>
                    <div style={{display: "flex"}}>
                      <div style={{width:78}}>
                        <div className={styles.automatically}/>
                        <span className={styles.autoMat}>{car.box}</span></div>
                      <div className={styles.car}/>
                      <span className={styles.sedanCar}>{car.sedan}</span>
                    </div>
                    <div style={{display: "flex"}}>
                      <div className={styles.oil}/>
                      <span className={styles.oilCar}>{car.petrol}</span>
                      <span className={styles.mileage}><img src={road} alt="Car Image"/>{car.mileage}</span>
                    </div>
                    <div style={{display: "flex"}}>
                      <span className={styles.addDate}>Добавлено:21.08.202018:00</span>
                      <div className={styles.storyPrice}>
                        <div className={styles.statistic}/>
                        <span style={{fontSize: 10, color: 'green'}}>История цен</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.containerLink}>
                    <div className={styles.price}>
                      <ul>
                        <li>24580 грн</li>
                      </ul>
                    </div>
                    <div className={styles.linkInCar}>
                      <p className={styles.link}>Ссылки на авто:</p>
                      <div className={styles.cartImages}>
                        <div className={styles.imageOne}/>
                        <div className={styles.imageTwo}/>
                        <div className={styles.imageTree}/>
                      </div>
                      <div className={styles.rst}/>
                      <div className={styles.messageContainer}>
                        <p className={styles.message}>Обьявлений от <br/> продавца:</p>
                        <span className={styles.number}>1</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.mobileDataCars}>
                  {/*1*/}
                  <div>
                    <span><img src={clock} alt="Clock Image"/> {car.year}</span>
                    <span className={styles.locationCar}>{car.location}</span>
                  </div>
                  {/*2*/}
                  <div style={{display: 'flex', marginTop: 16}}>
                    <div className={styles.automatically}/>
                    <span>{car.box}</span>
                    <div className={styles.car}/>
                    <span style={{marginLeft: 10}}>{car.sedan}</span>
                  </div>
                  {/*3*/}
                  <div style={{display: 'flex', marginTop: 16}}>
                    <div className={styles.oil}/>
                    <span style={{marginLeft: 5}}>{car.petrol}</span>
                    <span className={styles.mileage}> <span className={styles.escape}><img src={road} alt="Road Image"/>{car.mileage}</span> </span>
                  </div>
                  {/*4*/}
                  <div style={{display: 'flex'}}>
                    <div className={styles.storyPrice}>
                      <div className={styles.statistic}/>
                      <span style={{fontSize: 10, color: 'green'}}>История цен</span>
                    </div>
                    <div style={{marginTop: 22, marginLeft: 29}}>
                      <span className={styles.addDate}>Добавлено:21.08.2020 18:00</span>
                    </div>
                  </div>
                </div>
                <div className={styles.mobileLinkInCar}>
                  <div>
                    <span className={styles.link}>Ссылки на авто:</span>
                  </div>
                  <div className={styles.cartImages}>
                    <div className={styles.imageOne}/>
                    <div className={styles.imageTwo}/>
                    <div className={styles.imageTree}/>
                    <div className={styles.rst}/>
                    <div className={styles.rowTop}/>
                    <div className={styles.cardText}>
                      <span>Обьявлений от <br/> продавца:</span>
                    </div>
                  </div>
                </div>
              </div>
          ))
        }

        <div className={styles.mobilePagination}>
          <div>
            <ul className="pagination">
              <li style={{marginLeft:12}}><a href="#">1</a></li>
              <li style={{marginLeft:12}}><a href="#">2</a></li>
              <li style={{marginLeft:12}}><a href="#">3</a></li>
              <li style={{marginLeft:12}}><a href="#">4</a></li>
              <li style={{marginLeft:12}}><a href="#">...</a></li>
              <li style={{marginLeft:12}}><a href="#">222</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.pagination}>
          <div>
            <button type="button" className="btn btn-outline-primary rounded-0">Назад</button>
          </div>
          <div>
            <AdvancedExample/>
          </div>
          <div>
            <button type="button" className="btn btn-outline-primary rounded-0">Вперед</button>
          </div>
        </div>
        <div className={styles.textEnd}>
          <div>
            <span>Показывать по:</span>
            <select className="form-select w-50 h-20 mTop" aria-label="Default select example">
              <option defaultValue="100 объявлений.......">100 объявлений.......</option>
            </select>
          </div>
        </div>
      </div>
      {/*---------------*/}
      <div className={styles.search}>
        <button type="button" className="btn btn-primary pb-2 rounded-0">Поиск автомобиля</button>
        <h6 className={styles.marginTop}>Тип кузова</h6>
        <label><input className={styles.mTop} type="checkbox"/> Легковые</label><br/>
        <label><input className={styles.mTop} type="checkbox"/> Грузовики</label><br/>
        <label><input className={styles.mTop} type="checkbox"/> Мотоциклы</label><br/>
        <label><input className={styles.mTop} type="checkbox"/> Легковые</label>

        <h6 className={styles.marginTop}>Марка</h6>
        <select className="form-select w-100 h-20 mTopc rounded-3" aria-label="Default select example">
          <option defaultValue='Виберите'>Виберите</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>

        <h6 className={styles.marginTop}>Модель</h6>
        <select className="form-select w-100 mTop" aria-label="Default select example">
          <option defaultValue='Виберите'>Виберите</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>

        <h6 className={styles.marginTop}>Год</h6>
        <select className="form-select w-50 d-inline mt-1" aria-label="Default select example">
          <option value="" disabled selected>От</option>
          <option value="1">One</option>
          <option value="2">Two</option>
        </select>
        <select className="form-select w-50 d-inline" aria-label="Default select example">
          <option value="" disabled defaultValue='Виберите'>До</option>
          <option value="1">One</option>
          <option value="2">Two</option>
        </select><br/>
        <span className={styles.plus}>&#43; Добавить марку/модель</span>

        <h6 className={styles.marginTop}>Цена</h6>
        <select className="form-select w-50 d-inline" aria-label="Default select example">
          <option value="" disabled defaultValue='Виберите'>От</option>
          <option value="1">One</option>
          <option value="2">Two</option>
        </select>
        <select className="form-select w-50 d-inline" aria-label="Default select example">
          <option value="" disabled defaultValue='Виберите'>До</option>
          <option value="1">One</option>
          <option value="2">Two</option>
        </select>

        <h6 className={styles.marginTop}>Модель</h6>
        <select className="form-select w-100" aria-label="Default select example">
          <option defaultValue='Виберите'>Любой</option>
          <option value="1">One</option>
          <option value="2">Two</option>
        </select>

        <h6 className={styles.marginTop}>Пробег (тыс. км)</h6>
        <select className="form-select w-50 d-inline" aria-label="Default select example">
          <option value="" disabled defaultValue='От'>От</option>
          <option value="1">One</option>
          <option value="2">Two</option>
        </select>
        <select className="form-select w-50 d-inline" aria-label="Default select example">
          <option value="" disabled defaultValue="До">До</option>
          <option value="1">One</option>
          <option value="2">Two</option>
        </select>

        <h6 className={styles.marginTop}>Коробка передач</h6>
        <label><input className={styles.mTop} type="checkbox"/> Ручная / Механика</label><br/>
        <label><input className={styles.mTop} type="checkbox"/> Автоматическая</label><br/>
        <label><input className={styles.mTop} type="checkbox"/> Вариатор</label><br/>
        <label><input className={styles.mTop} type="checkbox"/> Адаптивная</label><br/>
        <label><input className={styles.mTop} type="checkbox"/> Типтроник</label>

        <h6 className={styles.marginTop}>Топливо</h6>
        <label><input className={styles.mTop} type="checkbox"/> Газ/Бензин</label><br/>
        <label><input className={styles.mTop} type="checkbox"/> Газ</label><br/>
        <label><input className={styles.mTop} type="checkbox"/> Гибрид</label><br/>
        <label><input className={styles.mTop} type="checkbox"/> Элеткро</label>

        <h6 className={styles.marginTop}>Расстоможка</h6>
        <select className="form-select w-100" aria-label="Default select example">
          <option selected>Любой</option>
          <option value="1">One</option>
          <option value="2">Two</option>
        </select>

        <h6 className={styles.marginTop}>Повреждения</h6>
        <select className="form-select w-100" aria-label="Default select example">
          <option selected>Любой</option>
          <option value="1">One</option>
          <option value="2">Two</option>
        </select>

        <h6 className={styles.marginTop}>Обьем двигателя (л.)</h6>
        <select className="form-select w-50 d-inline" aria-label="Default select example">
          <option value="" disabled selected>От</option>
          <option value="1">One</option>
          <option value="2">Two</option>
        </select>
        <select className="form-select w-50 d-inline" aria-label="Default select example">
          <option value="" disabled selected>До</option>
          <option value="1">One</option>
          <option value="2">Two</option>
        </select>

        <br/><label><input className={styles.mTop} type="checkbox"/> Исключить диллеров</label><br/>
        <label><input className={styles.mTop} type="checkbox"/> Исключить <br/>    заблокированных</label><br/>
        <label><input className={styles.mTop} type="checkbox"/> Цена ниже <br/>   среднерыночной</label>

        <div className={styles.autoBye}>
          <button type="button" className="btn btn-success">показать</button>
          <p>Найдено <b>10 Авто</b></p>
        </div>
        <p className={styles.sbrosX}>&#10005; Сбросить все фильтры</p>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    cars: state.car.carDocs,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getCars: () => carAction.getCars(dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cars);
