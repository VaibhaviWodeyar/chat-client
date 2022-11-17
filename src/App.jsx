import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AddRoles from "./components/admin/AddRoles";
import AdminDashboard from "./components/admin/AdminDashboard";
import Login from "./components/auth/Login";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";

const App = () => {
  let user = useSelector(
      state => state.auth
    );
  
  return (
    <Fragment>
      <Router>
        <Navbar />
       
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/" element={user?.user?.role === "admin"  ? <AdminDashboard/>: <Home />} />
          <Route path="/admin/addroles" element={<AddRoles/>}/>
          {/* <Route path="/admin/Admindashboard" element={user.user.role === "admin" ? <AdminDashboard/> : <Login/> }/> */}
        </Routes>
      </Router>
    </Fragment>
  );
};

export default App;
