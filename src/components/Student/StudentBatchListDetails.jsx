import React from "react";
import { Link } from "react-router-dom";
import { VscOutput } from "react-icons/vsc";
import {FcGraduationCap} from 'react-icons/fc';
import {BsChatDotsFill} from 'react-icons/bs'
import Styles from "./_user.module.css";
const StudentBatchListDetails = ({ subject, course, batchCode }) => {
  return (
    <div className={Styles.container}>
      <h1>{batchCode}</h1>
      <p>
        <span>
          <strong>
            <VscOutput />
          </strong>
          <strong>Subject : </strong>
        </span>
        <span> {subject}</span>
      </p>
      <p>
        <span>
          <strong>
            <FcGraduationCap />
          </strong>
          <strong>Course : </strong>
        </span>
        <span> {course}</span>
      </p>
      <Link to={`${batchCode}`}>
      <span><BsChatDotsFill /></span>
      chat with students</Link>
    </div>
  );
};

export default StudentBatchListDetails;
