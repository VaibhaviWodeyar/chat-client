import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddRoles from "./components/admin/AddRoles";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLogin from "./components/admin/AdminLogin";
import BatchList from "./components/admin/BatchList";
import Login from "./components/auth/Login";
import Navbar from "./components/navbar/Navbar";
import StudentBatchData from "./components/Student/StudentBatchData";
import StudentDashboard from "./components/Student/StudentDashboard";
import StudentGroupData from "./components/Student/StudentGroupData";
import StuSelectBatchList from "./components/Student/StuSelectedBatchList";
import SelectedBatchList from "./components/Users/SelectedBatchList";
import UserBatchData from "./components/Users/UserBatchData";
import UserGroupData from "./components/Users/UserGroupData";
import UsersDashboard from "./components/Users/UsersDashboard";
import AdminRoute from "./helpers/AdminRoutes";
import PrivateRoute from "./helpers/PrivateRoute";
import Home from "./pages/Home";
import AllRoles from "./components/admin/AllRoles";
import UpdateRoles from "./components/admin/UpdateRoles";

const App = () => {
  let user = useSelector((state) => state.auth);

  return (
    <Fragment>
      <Router>
        <Navbar />
        <ToastContainer theme="dark"/>
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
             <Route
              path="admin/allroles"
              element={
                <AdminRoute>
                  <AllRoles />
                </AdminRoute>
              }
            />
            <Route path="admin/allroles/:id" element={<UpdateRoles />} />
          </Route>
          {/* user Dashboard */}

          {user?.user?.role === "student" ? (
            <Route path="/student-dashboard" element={<StudentDashboard />}>
              <Route index element={<StudentBatchData />} />
              <Route path="studentgrouplist" element={<StudentGroupData />} />
              <Route path=":batchCode" element={<StuSelectBatchList />} />
            </Route>
          ) : (
            <Route path="/user-dashboard" element={<UsersDashboard />}>
              <Route index element={<UserBatchData />} />
              <Route path="usergrouplist" element={<UserGroupData />} />
              <Route path=":batchCode" element={<SelectedBatchList />} />
            </Route>
          )}
        </Routes>
      </Router>
    </Fragment>
  );
};

export default App;
