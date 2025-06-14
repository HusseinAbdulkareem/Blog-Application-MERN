import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./forms.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import Swal from "sweetalert2";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { resgisterMessage } = useSelector((state) => state.auth);

  const HandleSubmitForm = (e) => {
    e.preventDefault();
    if (username.trim() === "") return toast.error("There is no username");
    if (email.trim() === "") return toast.error("There is no email");
    if (password.trim() === "") return toast.error("There is no pass");

    dispatch(registerUser({ username, email, password }));
  };
  const navigate = useNavigate();

  if (resgisterMessage) {
    Swal.fire({
      icon: "success",
      title: resgisterMessage,
    }).then((isOK) => {
      if (isOK) {
        navigate("/login");
      }
    });
  }

  return (
    <div className="form-container">
      <h1 className="form-title"> Create new account </h1>
      <form className="form" onSubmit={HandleSubmitForm}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            passowrd
          </label>
          <input
            type="password"
            id="passowrd"
            placeholder="Enter your password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="form-btn">
          Regiester
        </button>
      </form>

      <div className="form-footer">
        Already have account ? <Link to="/login"> Login </Link>
      </div>
    </div>
  );
}
