import React, { useState, useEffect } from "react";

export default function Profile({ user }) {
  const [listLinks, setListLinks] = useState(<li></li>);

  useEffect(() => {
    if (user.links.length > 0) {
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
  }, [user.links]);

  return (
    <>
      <div className="">
        <div className="container text-center">
          <div className="card-body">
            <h1 className="card-title ">{user.name}</h1>
            <p className="card-text"></p>
            <ul className="list-group">{listLinks}</ul>
          </div>
        </div>
      </div>
    </>
  );
}
