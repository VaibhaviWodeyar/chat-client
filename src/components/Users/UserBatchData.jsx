import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Styles from "./_user.module.css";
import UserBatchesListSlice, {
  AllUsersBatchDetails,
} from "../../redux/usersBatches/UserBatchesListSlice";
import UserBatchListDetails from "./UserBatchListDetails";

const UserBatchData = () => {
  let dispatch = useDispatch();
  let { usersbatchesdetails } = useSelector((state) => state.usersBatches);

  useEffect(() => {
    dispatch(AllUsersBatchDetails());
  }, []);

  return (
    <section id={Styles.BatchGridLayout}>
      <article>
        {usersbatchesdetails?.BatchsDetails === undefined
          ? "loading"
          : usersbatchesdetails.BatchsDetails.map((val, index) => {
              return (
                <Fragment key={index + 1}>
                  <UserBatchListDetails {...val} />
                </Fragment>
              );
            })}
      </article>
    </section>
  );
};

export default UserBatchData;
