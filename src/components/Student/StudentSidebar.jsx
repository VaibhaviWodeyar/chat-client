
import React from "react";
import { FaRegUser } from "react-icons/fa";
import {FcBusinessContact, FcHome} from 'react-icons/fc'
import { Link } from "react-router-dom";
const StudentSidebar = () => {
  return (
    <ul>
      <li>
        <Link to="/student-dashboard">
          <span>
            {/* <FaRegUser /> */}
            <FcHome />
          </span>
          <span>User Batch List</span>
        </Link>
      </li>
      <li>
        <Link to="/student-dashboard/studentgrouplist">
          <span>
            <FcBusinessContact />
          </span>
          <span>User Group list</span>
        </Link>
      </li>
    </ul>
  );
};

export default StudentSidebar;