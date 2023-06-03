import React from "react";
import {NavLink} from "react-router-dom";
import styles from './footer.module.css';
import logo from "../../assets/images/logo.png";

export default function Footer(){
  return(
    <>
      <div className={styles.footer}>
        <img src={logo} alt=""/>
        <div className={styles.navBar}>
          <NavLink className={({ isActive }) => isActive && styles.activeNavLink} to="/">Автомобили</NavLink>
          <NavLink className={({ isActive }) => isActive && styles.activeNavLink} to="/search">Поиск по номеру</NavLink>
          <NavLink className={({ isActive }) => isActive && styles.activeNavLink} to="/about">Инструкция</NavLink>
        </div>
        <button type="button" className="btn btn-success">АВТОВЫКУП</button>
      </div>
      <div className={styles.footerMobile}>
        <div className={styles.navBarMobile}>
          <NavLink className={({ isActive }) => isActive && styles.activeNavLink} to="/">Автомобили</NavLink>
          <NavLink className={({ isActive }) => isActive && styles.activeNavLink} to="/search">Поиск по номеру</NavLink>
          <NavLink className={({ isActive }) => isActive && styles.activeNavLink} to="/about">Инструкция</NavLink>
        </div>
        <div className={styles.imgLogo}>
          <img src={logo} alt=""/>
          <button type="button" className="btn btn-success ">АВТОВЫКУП</button>
        </div>
      </div>
    </>
  )
}