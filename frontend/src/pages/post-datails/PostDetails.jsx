import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./postDetails.css";
import { toast, ToastContainer } from "react-toastify";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import Swal from "sweetalert2";
import UpdatePostModal from "./UpdatePostModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  fetchSinglePosts,
  toggleLike,
} from "../../redux/apiCalls/postCall";

export default function PostDetails() {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { id } = useParams();

  //state
  const [file, setFile] = useState("");
  const [updatePost, setupdatePost] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSinglePosts(id));
  }, [id]);

  // Update Image submit Handler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("There is no file");
  };

  //   // Delete Comment Handler
  const deletePostHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePost(post?._id));
        navigate(`/profile/${user?._id}`);
      }
    });
  };

  return (
    <section className="post-details">
      <ToastContainer theme="colored" />
      <div className="post-datails-imag-wrapper">
        <img
          src={`http://localhost:8000${post?.image?.url}`}
          alt=""
          className="post-details-image"
        />
      </div>

      <h1 className="post-details-title"> {post?.title} </h1>
      <div className="post-details-user-info">
        <img
          src={post?.user.profilePhoto?.url}
          alt=""
          className="post-details-user-image"
        />
        <div className="post-details-user">
          <strong>
            <Link to={`/profile/${post?.user._id}`}>{post?.user.username}</Link>
          </strong>
          <span>{new Date(post?.createdAt).toDateString()}</span>
        </div>
      </div>
      <p className="post-details-description">
        {post?.description}
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores sed,
        accusantium modi tempore dolorem non dolore similique at cupiditate
        veritatis! Rerum facere, qui ex cumque veniam ipsa commodi eaque. Aut?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia eos,
        corporis itaque molestiae debitis eius harum voluptas? Quae provident
        dolores quaerat iure suscipit delectus ipsam consectetur? Impedit
        consectetur saepe exercitationem!
      </p>
      <div className="post-details-icon-wrapper">
        <div>
          {user && (
            <i
              onClick={() => dispatch(toggleLike(post?._id))}
              className={
                post?.likes.includes(user?._id)
                  ? "bi bi-hand-thumbs-up-fill"
                  : "bi bi-hand-thumbs-up"
              }
            ></i>
          )}
          <small> {post?.likes.length} </small>
        </div>
        {user?._id === post?.user?._id && (
          <div>
            <i
              onClick={() => setupdatePost(true)}
              className="bi bi-pencil-square"
            ></i>
            <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
          </div>
        )}
      </div>

      {user ? (
        <AddComment postId={post?._id} />
      ) : (
        <p className="post-details-info-write">
          to write a commwent you should login first
        </p>
      )}
      <CommentList comments={post?.comments} />
      {updatePost && (
        <UpdatePostModal post={post} setUpdatePost={setupdatePost} />
      )}
    </section>
  );
}
