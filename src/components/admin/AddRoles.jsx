import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../../redux/auth/AuthSlice";
import Styles from "../auth/_auth.module.css";
const AddRoles = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [number, setNumber] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  // let [idNum, setIdNum] = useState("");


  useEffect(() => {
    if (isError) {
      toast.error("User is not added", { position: "top-right" });
    }
    if (isSuccess) {
      toast.success("User is added successfully", { position: "top-right" });
      console.log("registered");
      // navigate("/admin/dashboard");
    }
    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);
  let handleSubmit = (e) => {
    e.preventDefault();
    try {
      let payload = { email, password, username, number, role };
      dispatch(register(payload));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section id={Styles.authBlock}>
      <article>
        <div className="container">
          <h1>Add Roles</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                className="form-control"
                type="text"
                name="username"
                required
                value={username}
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                required
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="number">number</label>
              <input
                className="form-control"
                type="number"
                name="number"
                required
                value={number}
                placeholder="Enter number"
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">role</label>
              <select value={role} name={role} onChange={(e) => setRole(e.target.value)}>
                <option value="trainer">Trainer</option>
                <option value="hr">Hr</option>
                <option value="councellor">Counsellor</option>
                <option value="feetracker">Traker</option>
              </select>
            </div>
            {/* <div className="form-group">
              <label htmlFor="idNum">idNum</label>
              <input
                className="form-control"
                type="idNum"
                name="idNum"
                required
                value={idNum}
                placeholder="Enter idNum"
                onChange={(e) => setIdNum(e.target.value)}
              />
            </div> */}
            <div className="form-group">
              <button>Add User</button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default AddRoles;
