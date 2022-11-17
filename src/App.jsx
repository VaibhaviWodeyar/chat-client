import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AddRoles from "./components/admin/AddRoles";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLogin from "./components/admin/AdminLogin";
import BatchList from "./components/admin/BatchList";
import Login from "./components/auth/Login";
import Navbar from "./components/navbar/Navbar";
import PrivateRoute from "./helpers/PrivateRoute";
import Home from "./pages/Home";

const App = () => {
  let user = useSelector((state) => state.auth);

  return (
    <Fragment>
      <Router>
        <Navbar />

        <Routes>
        <Route path="/auth/admin/login" element={<AdminLogin  />} />
          <Route path="/auth/login" element={<Login />} />

          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          >
            <Route
              index
              element={
                user?.user?.role === "admin" ? (
                  <PrivateRoute>
                    <BatchList />
                  </PrivateRoute>
                ) : (
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                )
              }
            />
            <Route
              path="admin/addroles"
              element={
                <PrivateRoute>
                  <AddRoles />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </Fragment>
  );
};

export default App;
