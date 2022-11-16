import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBatch } from "../../redux/Batch/BatchSlice"


const CreateBatch = () => {
  let [batchCode, setBatchCode] = useState("");
  let [subject, setSubject] = useState("");
  let [course, setCourse] = useState("");
  let [branch, setBranch] = useState("");
  let [startDate, setStartDate] = useState("");
  let [endDate, setEndDate] = useState();
  let [trainer, setTrainer] = useState("");
  let [tracker, setTracker] = useState("");
  let [addStudents, setAddStudents] = useState(Array);

  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { isLoading, isSuccess, isError, message, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error("Please fill all the batch details", {
        position: "top-right",
      });
    }
    if (isSuccess && user) {
      toast.success("Batch added successfully", { position: "top-right" });
      navigate("/admin/dashboard");
    }
    // dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch, user]);

  let handleSubmit = (e) => {
    e.preventDefault();
    try {
      let form = new FormData();
      form.append("file", addStudents);
      form.append("batchCode", batchCode);
      form.append("subject", subject);
      form.append("course", course);
      form.append("branch", branch);
      form.append("startDate", startDate);
      form.append("endDate", endDate);
      form.append("trainer", trainer);
      form.append("tracker", tracker);

      dispatch(createBatch(form));
      navigate("/admin/dashboard");
      toast.success("Batch added successfully", { position: "top-right" });
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
              <select
                value={role}
                name={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="trainer">Trainer</option>
                <option value="hr">Hr</option>
                <option value="councellor">Counsellor</option>
                <option value="feetracker">Traker</option>
              </select>
            </div>
            <div className="form-group">
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
            </div>
            <div className="form-group">
              <button>Add User</button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default CreateBatch;
