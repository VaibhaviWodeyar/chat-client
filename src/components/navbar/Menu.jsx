import React, { Fragment } from "react";
import Styles from "./_navbar.module.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut, StudentlogOut } from "../../redux/auth/AuthSlice";
const Menu = () => {
  let dispatch = useDispatch();
  let { user } = useSelector((state) => state.auth);
  let activeClassName = "active";

  const IsLogout = () => {
    dispatch(logOut());
    window.location.assign("/auth/admin/login");
    
  };

  const IsStudentLogout = () =>{
    dispatch(StudentlogOut());
    window.location.assign("/auth/login")
  }

  let IsAuthenticatedUser = () => {
    return (
      <Fragment>
        <li>
          <button className="btn" onClick={user.role === "admin" ? IsLogout : IsStudentLogout}>
            logout
          </button>
        </li>
      </Fragment>
    );
  };

  let IsAnonymousUser = () => {
    return (
      <Fragment>
        <li>
          <NavLink to="/auth/login">Login</NavLink>
        </li>
      </Fragment>
    );
  };
  return (
    <nav className={Styles.menuBlock}>
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        {user?.TOKEN ? <IsAuthenticatedUser /> : <IsAnonymousUser />}
      </ul>
    </nav>
  );
};

export default Menu;
