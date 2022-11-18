import React from "react";
import Styles from './_user.module.css'
import StudentMainBar from "./StudentMainBar";
import StudentSidebar from "./StudentSidebar";

const StudentDashboard = () => {
  return (
    <section id={Styles.adminDashboardBlock}>
      <article>
        <aside className={Styles.sidebarBlock}>
          <StudentSidebar />
        </aside>
        <aside className={Styles.mainadminBlock}>
          <StudentMainBar />
        </aside>
      </article>
    </section>
  );
};

export default StudentDashboard;
