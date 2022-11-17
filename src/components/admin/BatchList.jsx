import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AllBatches } from "../../redux/Batch/BatchSlice";
import {HiChat} from 'react-icons/hi'
const BatchList = () => {
  let dispatch = useDispatch();
  let { batches } = useSelector((state) => state.batch);
  useEffect(() => {
    dispatch(AllBatches());
  }, []);
  console.log(batches?.result?.results);
  let FetchAllBatches = () => {
    return (
      <Fragment>
        <table border="2px">
          <thead>
            <tr>
              <th>Branch</th>
              <th>Subject</th>
              <th>Course</th>
              <th>Trainer</th>
              <th>Total Student</th>
              <th>View Chat</th>
            </tr>
          </thead>
          <tbody>
            <>
              {batches?.result?.results.map((ele) => {
                return (
                  <tr key={ele.batchCode}>
                    <td>{ele.branch}</td>
                    <td>{ele.subject}</td>
                    <td>{ele.course}</td>
                    <td>{ele.trainer}</td>
                    <td>{ele.No_ofStudents}</td>
                    <td><Link to={`${ele.batchCode}`}>
                      <span>
                        <HiChat />
                      </span>
                      </Link></td>
                  </tr>
                );
              })}
            </>
          </tbody>
        </table>
      </Fragment>
    );
  };
  return <>{batches.result === undefined ? "no data" : <FetchAllBatches />}</>;
};

export default BatchList;
