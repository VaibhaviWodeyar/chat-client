import React from "react";
import { Link } from "react-router-dom";
import Styles from "./_admin.module.css";
import { FaRegUser } from "react-icons/fa";
import {FcBusinessContact, FcHome} from 'react-icons/fc'
import BatchList from "./BatchList";

const AdminDashboard = () => {
  return (
    <section id={Styles.adminDashboardBlock}>
      <article>
        <aside className={Styles.sidebarBlock}>
          <ul>
          <li>
              <Link to="/">
                <span>
                  {/* <FaRegUser /> */}
                  <FcHome />
                </span>
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/addroles">
                <span>
                  {/* <FaRegUser /> */}
                  <FcBusinessContact />
                </span>
                <span>Add Roles</span>
              </Link>
            </li>
           
          </ul>
        </aside>
        <aside className={Styles.mainadminBlock}>
          <BatchList />
        </aside>
      </article>
    </section>
  );
};

export default AdminDashboard;
