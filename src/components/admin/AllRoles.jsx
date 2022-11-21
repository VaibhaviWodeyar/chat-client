import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Allroles } from "../../redux/Batch/BatchSlice";
import {FaPenSquare} from "react-icons/fa"
const AllRoles = () => {
  let dispatch = useDispatch();
  let { allroles } = useSelector((state) => state.batch);
  useEffect(() => {
    dispatch(Allroles());
  }, []);
  console.log(allroles);
  let FetchAllGroups = () => {
  return (
    <Fragment>
      <table border="2px">
        <thead>
          <tr>
            <th>Username</th>
            <th>email</th>
            <th>Number</th>
            <th>Role</th>
            <th>BatchCode</th>
            <th>GroupCode</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          <>
            {allroles?.results.map((ele,ind) => {
              return (
                <tr key={ele.ind}>
                  <td>{ele.username}</td>
                  <td>{ele.email}</td>
                  <td>{ele.number}</td>
                  <td>{ele.role}</td>
                  <td>{ele.batchCode.length}</td>
                  <td>{ele.groupCode.length}</td>
                  <td><Link to={`${ele._id}`} ><span><FaPenSquare></FaPenSquare></span></Link></td>
                </tr>
              );
            })}
          </>
        </tbody>
      </table>
    </Fragment>
  );
};
return <>{allroles.results === undefined ? "no data" : <FetchAllGroups />}</>;
}
export default AllRoles;
