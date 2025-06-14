import React from "react";
import { Link } from "react-router-dom";

export default function AdminSideBar() {
  return (
    <div className="admin-sidebar">
      <Link to="/admin-dashoard" className="admin-sidebar-title">
        <i className="bi bi-columns"></i>
        Dashoard
      </Link>

      <ul className="admin-dashoard-list">
        <Link className="admin-siderbar-link" to="/admin-dashoard/users-table">
          <i className="bi bi-person"></i>
          Users
        </Link>

        <Link className="admin-siderbar-link" to="/admin-dashoard/posts-table">
          <i className="bi bi-file-post"></i>
          Posts
        </Link>

        <Link
          className="admin-siderbar-link"
          to="/admin-dashoard/catagories-table"
        >
          <i className="bi bi-tag-fill"></i>
          Catagories
        </Link>

        <Link
          className="admin-siderbar-link"
          to="/admin-dashoard/comments-table"
        >
          <i className="bi bi-chat-left-text"></i>
          Comment
        </Link>
      </ul>
    </div>
  );
}
