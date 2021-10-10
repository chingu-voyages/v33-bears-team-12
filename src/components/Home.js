import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div
        className="container text-center card mt-5"
        style={{ maxWidth: "18rem" }}
      >
        <div className="card-body">
          <h1 className="card-title ">Welcome</h1>
          <Link to="/register" className="btn m-2 btn-primary">
            Register
          </Link>
          <Link to="/login" className="btn m-2 btn-secondary">
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
