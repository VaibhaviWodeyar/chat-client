import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { allroles } from "../../redux/Batch/BatchSlice";
const AllRoles = () => {
    let dispatch = useDispatch();
    let { allroles } = useSelector((state) => state.batch);
    useEffect(() => {
        dispatch(allroles());
      }, []);
      // console.log(allroles)
  return (
    <div>AllRoles</div>
  )
}

export default AllRoles