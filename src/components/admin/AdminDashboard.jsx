import React from "react";
import { Link, Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Styles from "./_admin.module.css";

const AdminDashboard = () => {
  return (
    <section id={Styles.adminDashboardBlock}>
      <article>
        <aside className={Styles.sidebarBlock}>
          <AdminSidebar />
        </aside>
        <aside className={Styles.mainadminBlock}>
          <Outlet />
        </aside>
      </article>
    </section>
  );
};

export default AdminDashboard;
