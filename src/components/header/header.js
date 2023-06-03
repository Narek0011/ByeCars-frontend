import React from "react";
import {NavLink} from "react-router-dom";
import styles from './header.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import logos from '../../assets/images/logo.png'
import car from '../../assets/images/car.png'
import search from '../../assets/images/search.png'
import vector from '../../assets/images/vector.png'
import person from '../../assets/images/PersoNN.png'
import call from '../../assets/images/call2.png'

export default function Header() {
  return(
    <div className={styles.header}>
      <img className={styles.logo} src={logos} alt=""/>
      <div className={styles.navBar}>
        <div className={styles.linkOne}>
          <img src={car} alt="" className={styles.mBottom}/>
          <NavLink className={({ isActive }) => isActive && styles.activeNavLink} to="/cars">Автомобили</NavLink>
        </div>
        <div className={styles.linkTwo}>
          <img src={search} alt="" className={styles.mBottom}/>
          <NavLink className={({ isActive }) => isActive && styles.activeNavLink} to="/search">Поиск по номеру</NavLink>
        </div>
        <div className={styles.linkTree}>
          <img src={vector} alt="" className={styles.mBottom}/>
          <NavLink className={({ isActive }) => isActive && styles.activeNavLink} to="/about">Инструкция</NavLink>
        </div>
        <div className={styles.linkFor}>
          <img src={person} alt="" className={styles.imageInHeaderOne}/>
          <NavLink className={({ isActive }) => isActive && styles.activeNavLink} to="/personal">Алексей</NavLink>
          <img src={call} alt=""  className={styles.imageInHeaderTwo} />
        </div>
      </div>
      <button type="button" className="btn btn-success">АВТОВЫКУП</button>
      <div className={styles.selectLogo}>
        <div className={styles.selectImg}/>
      </div>
    </div>
  )
}