import React from "react";
import { Link } from "react-router-dom";

export default function HeaderLeft({ toggle, setToggle }) {
  return (
    <div className="header-letf">
      <Link to="/" className="header-logo">
        <strong> BLOG </strong>
        <i className="bi bi-pencil"></i>
      </Link>
      <div onClick={() => setToggle((prev) => !prev)} className="header-menu">
        {toggle ? (
          <i className="bi bi-x-lg"></i>
        ) : (
          <i className="bi bi-list"></i>
        )}
      </div>
    </div>
  );
}
