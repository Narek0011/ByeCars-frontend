import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import styles from "./car.module.css";
import clock from "../../../assets/images/clock.png";
import road from "../../../assets/images/1234.png";
import axiosClient from "../../../axios-client";

const Car = () => {
  const [dataCar, setDataCar] = useState({});
  const {id} = useParams();

  const getCar = async () => {
    axiosClient.get(`cars/${id}`)
      .then(res => {
        console.log(res.data);
        setDataCar(res.data.data)
      })
  };

  useEffect(() => {
    (async () => {
      await getCar()
    })()
  }, []);

  return (
    <div>
      {dataCar.id && (<div style={{padding: 90}} key={dataCar.id}>
        <div className={styles.cardContainer}>
          <img src={dataCar.images[0].image} alt="#"/>
          <div className={styles.mobileWersion}>
            <div><span className={styles.typeCar}>{dataCar.brand.name}</span></div>
            <div><b>{dataCar.model}</b></div>
            <span className={styles.priceCar}>{dataCar.price}<span
              className={styles.ulLiPrice}> 245 180 грн</span></span>
            <p className={styles.saleCars}>{dataCar.sale}</p>
          </div>
          <div className={styles.computerWrsion} style={{paddingLeft: 20}}>
            <div className={styles.rowOnes}>
              <span className={styles.typeCar}>{dataCar.brand.name}</span>
              <span className={styles.priceCar}>{dataCar.price}$</span>
            </div>
            <div className={styles.rowTwos}><b>{dataCar.model}</b><span
              className={styles.saleCars}>{dataCar.sale}</span>
            </div>
            <div className={styles.yearCar}>
              <p><span><img src={clock} alt="#"/> 2009</span></p>
              <div className={styles.location}/>
              <span className={styles.locationCar}>{dataCar.location}</span>
            </div>
            <div style={{display: "flex"}}>
              <p style={{width: 78}}>
                <div className={styles.automatically}/>
                <span className={styles.autoMat}>{dataCar.box}</span></p>
              <div className={styles.dataCar}/>
              <span className={styles.sedanCar}>{dataCar.sedan}</span>
            </div>
            <div style={{display: "flex"}}>
              <div className={styles.oil}/>
              <span className={styles.oilCar}>{dataCar.petrol}</span>
              <span className={styles.mileage}><img src={road} alt="#"/>{dataCar.mileage}</span>
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
          <div>
            <span><img alt="#" src={clock}/> {dataCar.year}</span>
            <span className={styles.locationCar}>{dataCar.location}</span>
          </div>
          <div style={{display: 'flex', marginTop: 16}}>
            <div className={styles.automatically}/>
            <span>{dataCar.box}</span>
            <div className={styles.dataCar}/>
            <span style={{marginLeft: 10}}>{dataCar.sedan}</span>
          </div>
          <div style={{display: 'flex', marginTop: 16}}>
            <div className={styles.oil}/>
            <span style={{marginLeft: 5}}>{dataCar.petrol}</span>
            <span className={styles.mileage}> <span className={styles.escape}><img alt="#" src={road}/>{dataCar.mileage}</span> </span>
          </div>
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
      </div>)}
    </div>
  );
};

export default Car;
