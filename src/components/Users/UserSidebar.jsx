
import React from "react";
import { FaRegUser } from "react-icons/fa";
import {FcBusinessContact, FcHome} from 'react-icons/fc'
import { Link } from "react-router-dom";
const UserSidebar = () => {
  return (
    <ul>
      <li>
        <Link to="/user-dashboard">
          <span>
            {/* <FaRegUser /> */}
            <FcHome />
          </span>
          <span>User Batch List</span>
        </Link>
      </li>
      <li>
        <Link to="/user-dashboard/usergrouplist">
          <span>
            <FcBusinessContact />
          </span>
          <span>User Group list</span>
        </Link>
      </li>
    </ul>
  );
};

export default UserSidebar;