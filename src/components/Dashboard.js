import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default function Dashboard() {
  const history = useHistory();
  //axiosJWT is an axios instance to be used when autorization is needed
  const axiosJWT = axios.create();
  const url = process.env.REACT_APP_API_BASE_URL;
  const [user, setUser] = useState(null);
  const username = localStorage.getItem("username");
  if (!username) history.push("/");
  const [listLinks, setListLinks] = useState(
    <li className="list-group-item"></li>
  );
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newLinkHyperlink, setNewLinkHyperlink] = useState("");
  const [newLinkError, setNewLinkError] = useState(null);

  useEffect(
    getUser, // eslint-disable-next-line react-hooks/exhaustive-deps
    [username]
  );

  function getUser() {
    const fetchData = async () => {
      if (username) {
        try {
          const res = await axios.get(`${url}/user/username/${username}`);
          await setUser(() => res.data);
        } catch (err) {
          history.push("/");
          console.log(err);
        }
      }
    };
    fetchData();
  }

  useEffect(() => {
    if (user && user.links.length > 0) {
      setListLinks(
        user.links.map((link) => {
          const { _id, title, hyperlink } = link;
          return (
            <li className="list-group-item" key={_id}>
              <a className="btn btn-primary" href={hyperlink}>
                {title}
              </a>
            </li>
          );
        })
      );
    }
  }, [user]);

  // refreshed the refresh token
  const refreshToken = async () => {
    try {
      const res = await axios.post(`${url}/user/refresh`, {
        token: localStorage.getItem("refreshToken"),
      });
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("username", res.data.username);
      return res.data;
    } catch (err) {
      console.log(err.response.data.error);
    }
  };

  // axios interceptor that automatically calls refreshToken function if access token is expired
  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(localStorage.getItem("accessToken"));
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        config.headers["auth-token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("added link");
    const newLink = { title: newLinkTitle, hyperlink: newLinkHyperlink };
    try {
      await axiosJWT.post(`${url}/links`, newLink, {
        headers: {
          "auth-token": "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      setNewLinkError(null);
      getUser();
      setNewLinkTitle("");
      setNewLinkHyperlink("");
    } catch (err) {
      console.log(err.response.data.error);
      setNewLinkError(err.response.data.error);
    }
  };

  const logout = async () => {
    try {
      await axiosJWT.post(
        `${url}/user/logout`,
        { token: localStorage.getItem("refreshToken") },
        {
          headers: {
            "auth-token": "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      setUser(null);
      localStorage.clear();
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {user && (
        <div className="">
          <button className="btn btn-secondary" onClick={logout}>
            Log Out
          </button>
          <div className="container text-center">
            <div className="card-body">
              <h1 className="card-title ">{`Welcome ${user.name}`}</h1>
              <p className="card-text"></p>
              <ul className="list-group">{listLinks}</ul>
            </div>
            {newLinkError && (
              <div className="alert border border-danger alert-danger my-2">
                Error: {newLinkError}
              </div>
            )}
            <form style={{ maxWidth: "18rem" }} onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <span className="input-group-text">title</span>
                <input
                  onChange={(event) => {
                    setNewLinkTitle(event.target.value);
                  }}
                  type="text"
                  className="form-control"
                  aria-label="title"
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">hyperlink</span>
                <input
                  onChange={(event) => {
                    setNewLinkHyperlink(event.target.value);
                  }}
                  type="text"
                  className="form-control"
                  aria-label="hyperlink"
                />
              </div>
              <button className="btn btn-primary" type="submit">
                Add new link
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
