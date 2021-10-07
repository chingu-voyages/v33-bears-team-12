import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const url = process.env.REACT_APP_API_BASE_URL;
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat_password, setRepeatPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = { name, username, email, password, repeat_password };
    try {
      const res = await axios.post(`${url}/user/register`, newUser);
      console.log("registered!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container text-center">
        <h1>Welcome</h1>
        <form style={{ maxWidth: "18rem" }} onSubmit={handleSubmit}>
          {/* // */}
          <div className="input-group mb-3">
            <span className="input-group-text">name</span>
            <input
              onChange={(event) => {
                setName(event.target.value);
              }}
              type="text"
              className="form-control"
              aria-label="name"
            />
          </div>
          {/* // */}
          <div className="input-group mb-3">
            <span className="input-group-text">username</span>
            <input
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              type="text"
              className="form-control"
              aria-label="username"
            />
          </div>
          {/* // */}
          <div className="input-group mb-3">
            <span className="input-group-text">email</span>
            <input
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              type="text"
              className="form-control"
              aria-label="email"
            />
          </div>
          {/* // */}
          <div className="input-group mb-3">
            <span className="input-group-text">password</span>
            <input
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              type="text"
              className="form-control"
              aria-label="password"
            />
          </div>
          {/* // */}
          <div className="input-group mb-3">
            <span className="input-group-text">repeat password</span>
            <input
              onChange={(event) => {
                setRepeatPassword(event.target.value);
              }}
              type="text"
              className="form-control"
              aria-label="repeat password"
            />
          </div>
          {/* // */}
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
