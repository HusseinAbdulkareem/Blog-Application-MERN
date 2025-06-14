import React, { useEffect, useState } from "react";
import "./profile.css";
// import PostList from "../../components/posts/PostList";
// import { posts } from "../../dummyData";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import UpdateProfileModal from "./UpdateProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProfile } from "../../redux/apiCalls/profileApiCall";
import PostItem from "../../components/posts/PostItem";
import request from "../../utils/request";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

export default function Profile() {
  const [file, setFile] = useState(null);
  const [updateProfile, setUpdateProfile] = useState(false);

  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();

  //form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("There is no file");
  };

  //   // Delete Account Handler
  const deletePostHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your Account has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    dispatch(getProfile(id));
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img
            src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url}
            alt=""
            className="profile-image"
          />
          <form onSubmit={formSubmitHandler}>
            <abbr title="choose profile photo">
              <label
                htmlFor="file"
                className="bi bi-camera-fill upload-profile-photo-icon"
              ></label>
            </abbr>
            <input
              style={{ display: "none" }}
              type="file"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button type="submit" className="upload-profile-photo-btn">
              Upload
            </button>
          </form>
        </div>

        <h1 className="profile-username"> {profile?.username} </h1>
        <p className="profile-bio"> {profile?.bio} </p>
        <div className="user-data-joined">
          <strong> Date Joined : </strong>
          <span> {new Date(profile?.createdAt).toString()} </span>
        </div>
        <button
          onClick={() => setUpdateProfile(true)}
          className="profile-update-btn"
        >
          <i className="bi bi-file-person-fill"></i>
          Update Profile
        </button>
      </div>
      <div className="profile-post-list">
        <h2 className="profile-post-list-title"> {profile?.username} Posts </h2>
        {/* <PostList posts={posts} /> */}
        {profile?.posts.map((post) => (
          <PostItem
            key={post._id}
            post={post}
            username={profile?.username}
            userId={profile?._id}
          />
        ))}
      </div>

      <button onClick={deletePostHandler}></button>

      {updateProfile && (
        <UpdateProfileModal
          profile={profile}
          setUpdateProfile={setUpdateProfile}
        />
      )}
    </section>
  );
}
