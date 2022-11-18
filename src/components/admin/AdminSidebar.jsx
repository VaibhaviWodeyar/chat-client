import React from "react";
import { FaRegUser } from "react-icons/fa";
import {FcBusinessContact, FcHome} from 'react-icons/fc'
import { Link } from "react-router-dom";
const AdminSidebar = () => {
  return (
    <ul>
      <li>
        <Link to="/admin-dashboard">
          <span>
            {/* <FaRegUser /> */}
            <FcHome />
          </span>
          <span>Home</span>
        </Link>
      </li>
      <li>
        <Link to="/admin-dashboard/admin/addroles">
          <span>
            {/* <FaRegUser /> */}
            <FcBusinessContact />
          </span>
          <span>Add Roles</span>
        </Link>
      </li>
      <li>
        <Link to="/admin-dashboard/admin/allroles">
          <span>
            {/* <FaRegUser /> */}
            <FcBusinessContact />
          </span>
          <span>View Roles</span>
        </Link>
      </li>
    </ul>
  );
};

export default AdminSidebar;
