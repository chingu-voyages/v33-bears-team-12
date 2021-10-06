import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotFound from "../layout/NotFound";
import Profile from "./Profile";

export default function ProfileRouter() {
  const url = process.env.REACT_APP_API_BASE_URL;
  const { username } = useParams();

  const [user, setUser] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(
    getUser, // eslint-disable-next-line react-hooks/exhaustive-deps
    [username]
  );

  function getUser() {
    const fetchData = async () => {
      if (username) {
        setNotFound(false);
        try {
          const res = await axios.get(`${url}/user/username/${username}`);
          setUser(res.data);
        } catch {
          setNotFound(true);
        }
      }
    };
    fetchData();
  }

  return (
    <>
      {user && <Profile user={user} />}
      {notFound && <NotFound />}
    </>
  );
}
