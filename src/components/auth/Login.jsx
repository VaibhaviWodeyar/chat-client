import React, { useEffect, useRef, useState } from "react";
import Styles from "./_auth.module.css";
import { signIn, reset } from "../../redux/auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { isLoading, isSuccess, isError, message, user } = useSelector(
    (state) => state.auth
  );

  let [number, setNumber] = useState("");
  let [password, setPassword] = useState("");
  let numbererrorRef = useRef()
  let passworderrorRef = useRef();

  useEffect(() => {
    if (isError) {
      toast.error("Unable to login with provided Credentials", {
        position: "top-right",
      });
    }
    if (isSuccess && user) {
      toast.success("Successfully Logged in", { position: "top-right" });
      navigate("/user-dashboard");
    }
    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch, user]);

  let handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (number === "" || number.length !== 10 || number.length < 10) {
        numbererrorRef.current.innerHTML = "Mobile Number is Required*";
      }
      if (password === "" && number) {
        passworderrorRef.current.innerHTML = "Password is Required*";
        numbererrorRef.current.innerHTML = "";
      }
      if (number && password) {
        let payload = { number, password };
        dispatch(signIn(payload));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id={Styles.authBlock}>
      <article>
        <div className="container">
          <h1>QTalk Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="number">username</label>
              <input
                className="form-control"
                type="text"
                name="number"
                required
                value={number}
                placeholder="Enter username"
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                required
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button>login</button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default Login;
