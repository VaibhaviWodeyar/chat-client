import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Allroles } from "../../redux/Batch/BatchSlice";
const AllRoles = () => {
  let dispatch = useDispatch();
  let { allroles } = useSelector((state) => state.batch);
  useEffect(() => {
    dispatch(Allroles());
  }, []);
  console.log(allroles);
  return (
    <Fragment>
      <table border="2px">
        <thead>
          <tr>
            <th>Trainer</th>
            <th>Branch</th>
            <th>Subject</th>
            <th>Course</th>
            <th>Total Student</th>
          </tr>
        </thead>
        <tbody>
          <>
            {allroles?.results.map((ele,ind) => {
              return (
                <tr key={ele.ind}>
                  <td>{ele.branch}</td>
                  <td>{ele.subject}</td>
                  <td>{ele.course}</td>
                  <td>{ele.trainer}</td>
                  <td>{ele.No_ofStudents}</td>
                </tr>
              );
            })}
          </>
        </tbody>
      </table>
    </Fragment>
  );
};

export default AllRoles;
