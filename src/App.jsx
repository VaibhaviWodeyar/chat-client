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
import UserBatchData from "./components/Users/UserBatchData";
import UserGroupData from "./components/Users/UserGroupData";
import UsersDashboard from "./components/Users/UsersDashboard";
import AdminRoute from "./helpers/AdminRoutes";
import PrivateRoute from "./helpers/PrivateRoute";
import Home from "./pages/Home";

const App = () => {
  let user = useSelector((state) => state.auth);

  return (
    <Fragment>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/auth/admin/login" element={<AdminLogin />} />
          <Route path="/auth/login" element={<Login />} />

          <Route
            path="/admin-dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          >
            <Route
              index
              element={
                user?.user?.role === "admin" ? (
                  <AdminRoute>
                    <BatchList />
                  </AdminRoute>
                ) : (
                  <AdminRoute>
                    <Home />
                  </AdminRoute>
                )
              }
            />
            <Route
              path="admin/addroles"
              element={
                <AdminRoute>
                  <AddRoles />
                </AdminRoute>
              }
            />
          </Route>
          {/* user Dashboard */}
          <Route path="/user-dashboard" element={<UsersDashboard />}>
            <Route index element={<UserBatchData />} />
            <Route  path="usergrouplist" element={<UserGroupData />} />
          </Route>
        </Routes>
      </Router>
    </Fragment>
  );
};

export default App;
