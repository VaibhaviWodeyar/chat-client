import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AxiosInstance from "../../api/AxiosInstance";

const UpdateRoles = () => {
  let { id } = useParams();
  let { user } = useSelector((state) => state?.auth);
  console.log(user);
  console.log(id)

//   useEffect(() => {
//     async function fetchlist() {
//         console.log(user.TOKEN)
//    await  AxiosInstance.put(`admin/${id}`, {
//         headers: {
//           Authorization: `Bearer ${user.TOKEN}`,
//         },
//       }).then((data) => {
//         console.log(data);
//       });
//     }
//     fetchlist();
//   }, []);
  return <div>UpdateRoles</div>;
};

export default UpdateRoles;
