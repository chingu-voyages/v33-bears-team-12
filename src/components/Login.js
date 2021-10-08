import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const history = useHistory();
  const url = process.env.REACT_APP_API_BASE_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginUser = { email, password };
    try {
      const res = await axios.post(`${url}/user/login`, loginUser);
      console.log(res.data.accessToken);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("username", res.data.username);
      history.push(`/dashboard`);
    } catch (err) {
      setLoginError(err.response.data.error);
      console.log(err.response.data.error);
    }
  };

  return (
    <>
      <div className="container text-center">
        <h1>Welcome</h1>
        {loginError && (
          <div className="alert border border-danger alert-danger my-2">
            Error: {loginError}
          </div>
        )}
        <form style={{ maxWidth: "18rem" }} onSubmit={handleSubmit}>
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
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
