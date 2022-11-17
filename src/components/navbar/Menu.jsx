import React from "react";
import Styles from "./_navbar.module.css";
import { NavLink } from "react-router-dom";
const Menu = () => {
  return (
    <nav className={Styles.menuBlock}>
      <ul>
        <li>
          <a href="#"  activeClassName="active-link">Home</a>
        </li>
        <li>
          <NavLink
            to="/auth/login"
            activeClassName="active-link"
          >
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
