import React from "react";
// import Menu from "./Menu";
import Routes from "./Routes";

function Layout() {
  return (
    <div className="container-fluid">
      <div className="row h-100">
        <div className="col">
          <main>
            <Routes />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
