import React, {useEffect, useState, useCallback} from "react";
import {Route, Routes, Navigate} from "react-router";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Cars from "./components/pages/cars/cars";
import Search from "./components/pages/search/search";
import AboutAs from "./components/pages/about/about";
import Personal from "./components/pages/personal/personal";
import Login from "./components/pages/admin/login";
import Car from "./components/pages/car/car";
import DashboardContent from "./components/pages/admin/adminCars";
import NoMatch from "./components/nomatch/NoMatch";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";

function App() {
  const [showHeaderAndFooter, setShowHeaderAndFooter] = useState(true);
  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname.startsWith("/admin")) {
      setShowHeaderAndFooter(false);
    }
  }, []);

  const RequireAuth = useCallback(({children}) => {
    return localStorage.getItem("admin") ? (
      children
    ) : (
      <Navigate to="/admin" replace/>
    );
  }, []);

  return (
    <div>
      {showHeaderAndFooter && <Header/>}
      <div>
        <Routes>
          <Route path="*" element={<NoMatch setShowHeaderAndFooter={setShowHeaderAndFooter}/>}/>
          <Route path="admin" element={<Login setShowHeaderAndFooter={setShowHeaderAndFooter}/>}/>
          <Route path="admin/car/:id" element={<RequireAuth><Car/></RequireAuth>}/>
          <Route path="/admin/cars/*" element={<RequireAuth><DashboardContent/></RequireAuth>}/>
          <Route path="/" element={<Cars/>}/>
          <Route path="/cars" element={<Cars/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/about" element={<AboutAs/>}/>
          <Route path="/personal" element={<Personal/>}/>
        </Routes>
      </div>
      {showHeaderAndFooter && <Footer/>}
      <ToastContainer/>
    </div>
  );
}

export default App;
