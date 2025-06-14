import React, { useEffect, useState } from "react";
import "./createPost.css";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/apiCalls/postCall";
import { RotatingLines } from "react-loader-spinner";
export default function CreatePost() {
  const dispatch = useDispatch();
  const { loading, isPostCreated } = useSelector((state) => state.post);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  //Formmm submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (title.trim() === "") return toast.error("Post Title is required");
    if (category.trim() === "") return toast.error("Post Category is required");
    if (description.trim() === "")
      return toast.error("Post Description is required");
    if (!file) return toast.error("Post Image is required");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    dispatch(createPost(formData));
    const imgUrl = URL.createObjectURL(file);
    console.log(imgUrl, "imgUrl");
    console.log(formData.get("image"), "formData");
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isPostCreated) {
      toast.error("Post Created Successfully");
      navigate("/");
    }
  }, [isPostCreated, navigate]);

  return (
    <section className="create-post">
      <ToastContainer theme="colored" position="top-center" />
      <h1 className="create-post-title">Create New Post</h1>
      <form onSubmit={formSubmitHandler} className="create-post-form">
        <input
          type="text"
          placeholder="Post Title"
          className="create-post-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="create-post-input"
        >
          <option disabled value="">
            Select A Category
          </option>
          <option value="travelling">travelling</option>
          <option value="music">music</option>
          <option value="programming">Programming</option>
          <option value="cars">Cars</option>
          <option value="nature">Nature</option>
          <option value="coffetea ">Coffee && Tea</option>
        </select>

        <textarea
          className="create-post-textarea"
          placeholder="Post Description"
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          className="create-post-upload"
          type="file"
          name="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" className="create-post-btn">
          {loading ? (
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="46"
              visible={true}
            />
          ) : (
            "Create Post"
          )}
        </button>
      </form>
    </section>
  );
}
