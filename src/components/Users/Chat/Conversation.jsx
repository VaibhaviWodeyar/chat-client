import React, { useState } from "react";
import Styles from './_chat.module.css'
const Conversation = ({ students, currentUser }) => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  // new conv

  // get conver
  //   const getUser = async () => {
  //     const StudentID = newCon.members.find(m => m !== currentUser);
  //     console.log(StudentID);
  //     let idStudent = newCon.members.find(m => m !== currentUser);
  //     if (!StudentID) {
  //       let payload = { senderId: currentUser, receiverId: _id };
  //       console.log(payload);
  //       let data = AxioInstance.post("/chat/newcon", payload);
  //       console.log(data);
  //     }
  //     try {
  //       const res = await AxioInstance.get("/users?studentId=" + StudentID);
  //       setUser(res.data);
  //       console.log(res);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getUser();
  // }, [currentUser]);
  // useEffect(() => {
  //   // const StudentID = conversation.members.find(m => m !== currentUser);

  //   const getUser = async () => {
  //     try {
  //       const res = await AxioInstance("/users?studentId=" + StudentID);
  //       setUser(res.data);
  //       console.log(res);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getUser();
  // }, [currentUser, conversation]);

  return (
    <div className={Styles.conversation}>
      <span>{students.username}</span>
    </div>
  );
};

export default Conversation;
