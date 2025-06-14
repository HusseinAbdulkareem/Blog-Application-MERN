import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AddCategoryFoem from "./AddCategoryFoem";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../redux/apiCalls/categoryApiCall";
import {
  getAllUsersProfile,
  getUsersCount,
} from "../../redux/apiCalls/profileApiCall";
import { getPostCount } from "../../redux/apiCalls/postCall";
import { getAllComment } from "../../redux/apiCalls/CommentApiCall";

export default function AdminMain() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { usersCount, profiles } = useSelector((state) => state.profile);
  const { postsCount } = useSelector((state) => state.post);
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(getUsersCount());
    dispatch(getAllUsersProfile());
    dispatch(getPostCount());
    dispatch(getAllComment());
  }, [dispatch]);

  return (
    <div className="admin-main">
      <div className="admin-main-header">
        <div className="admin-main-card">
          <h5 className="admin-card-title">Users</h5>
          <div className="admin-card-count">
            {usersCount || profiles?.length || 0}
          </div>
          <div className="admin-card-link-wrapper">
            <Link className="admin-card-link" to="/admin-dashoard/users-table">
              See all users
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-person"></i>
            </div>
          </div>
        </div>

        <div className="admin-main-card">
          <h5 className="admin-card-title"> Posts </h5>
          <div className="admin-card-count"> {postsCount} </div>
          <div className="admin-card-link-wrapper">
            <Link className="admin-card-link" to="/admin-dashoard/posts-table">
              See all posts
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-file-post"></i>
            </div>
          </div>
        </div>

        <div className="admin-main-card">
          <h5 className="admin-card-title"> Categories </h5>
          <div className="admin-card-count">{categories.length}</div>
          <div className="admin-card-link-wrapper">
            <Link
              className="admin-card-link"
              to="/admin-dashoard/catagories-table"
            >
              See all categories
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-tag-fill"></i>
            </div>
          </div>
        </div>

        <div className="admin-main-card">
          <h5 className="admin-card-title"> Comments </h5>
          <div className="admin-card-count">{comments.length}</div>
          <div className="admin-card-link-wrapper">
            <Link
              className="admin-card-link"
              to="/admin-dashoard/comments-table"
            >
              See all comments
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-chat-left-text"></i>
            </div>
          </div>
        </div>
      </div>

      <AddCategoryFoem />
    </div>
  );
}
