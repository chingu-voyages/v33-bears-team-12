import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const history = useHistory();
  const url = process.env.REACT_APP_API_BASE_URL;
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat_password, setRepeatPassword] = useState("");
  const [regeistrationError, setRegistrationError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = { name, username, email, password, repeat_password };
    try {
      const res = await axios.post(`${url}/user/register`, newUser);
      console.log(res.data.accessToken);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("username", res.data.username);
      history.push(`/dashboard`);
    } catch (err) {
      setRegistrationError(err.response.data.error);
      console.log(err.response.data.error);
    }
  };

  return (
    <>
      <div
        className="container text-center card mt-5"
        style={{ maxWidth: "30rem" }}
      >
        <div className="card-body">
          <h1 className="card-title ">Sign Up</h1>
          {regeistrationError && (
            <div className="alert border border-danger alert-danger my-2">
              Error: {regeistrationError}
            </div>
          )}
          <form className="row p-3" onSubmit={handleSubmit}>
            {/* // */}
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                name
              </span>
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
                type="password"
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
                type="password"
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
      </div>
    </>
  );
}
