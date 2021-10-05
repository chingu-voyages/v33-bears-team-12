import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default function AuthSamples() {
  //axiosJWT is an axios instance to be used when autorization is needed
  const axiosJWT = axios.create();

  //api base url
  const url = process.env.REACT_APP_API_BASE_URL;
  const [user, setUser] = useState(null);
  const [link, setLink] = useState(null);

  // refreshed the refresh token
  const refreshToken = async () => {
    try {
      const res = await axios.post(`${url}/user/refresh`, {
        token: user.refreshToken,
      });
      setUser({
        ...user,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // axios interceptor that automatically calls refreshToken function if access token is expired
  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(user.accessToken);
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

  //sample content for testing api calls
  const sampleNewUser = {
    username: "alice123",
    name: "Alice",
    email: "alice123@gmail.com",
    password: "password12345",
    repeat_password: "password12345",
  };
  const sampleUser = {
    email: "alice123@gmail.com",
    password: "password12345",
  };
  const sampleLink = {
    title: "linkedin",
    hyperlink: "http://www.linkedin.com/alice123",
  };

  // handler functions
  const registerHandler = async () => {
    try {
      const res = await axios.post(`${url}/user/register`, sampleNewUser);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const loginHandler = async () => {
    try {
      const res = await axios.post(`${url}/user/login`, sampleUser);
      await setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const postLinkHandler = async () => {
    try {
      const res = await axiosJWT.post(`${url}/links`, sampleLink, {
        headers: { "auth-token": "Bearer " + user.accessToken },
      });
      setLink(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const logoutHandler = async () => {
    try {
      await axiosJWT.post(
        `${url}/user/logout`,
        { token: user.refreshToken },
        {
          headers: { "auth-token": "Bearer " + user.accessToken },
        }
      );
      setUser(null);
      setLink(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button onClick={registerHandler}>register new user</button>
      <button onClick={loginHandler}>login user</button>
      <button onClick={postLinkHandler}>post new link</button>
      <button onClick={logoutHandler}>log out</button>
      {user && <p>Welcome {user.username}</p>}
      {link && <a href={link.hyperlink}>{link.title}</a>}
    </>
  );
}
