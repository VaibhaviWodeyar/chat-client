import React from "react";
import Styles from './_user.module.css'
import UserMainBar from "./UserMainBar";
import UserSidebar from "./UserSidebar";

const UsersDashboard = () => {
  return (
    <section id={Styles.adminDashboardBlock}>
      <article>
        <aside className={Styles.sidebarBlock}>
          <UserSidebar />
        </aside>
        <aside className={Styles.mainadminBlock}>
          <UserMainBar />
        </aside>
      </article>
    </section>
  );
};

export default UsersDashboard;
