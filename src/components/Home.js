import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="container text-center">
        <h1>Welcome</h1>
        <Link to="/register" className="btn m-2 btn-primary">
          Register
        </Link>
        <Link className="btn m-2 btn-secondary">Login</Link>
      </div>
    </>
  );
}
