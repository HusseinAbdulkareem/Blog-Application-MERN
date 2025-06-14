import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import "./updatePost.css";
import request from "../../utils/request";

const UpdatePostModal = ({ setUpdatePost, post }) => {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [category, setCategory] = useState(post.category);
  const [loading, setLoading] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;

  const updatePost = async () => {
    if (!token) {
      toast.error("You are not authorized. Please login first.");
      return;
    }

    setLoading(true);
    try {
      const response = await request.put(
        `/api/posts/${post._id}`,
        {
          title,
          description,
          category,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.data) {
        toast.success("Post updated successfully");
        setUpdatePost(false);
        window.location.reload();
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "You cannot update this post";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (title.trim() === "") return toast.error("Post Title is required");
    if (category.trim() === "") return toast.error("Post Category is required");
    if (description.trim() === "")
      return toast.error("Post Description is required");
    updatePost();
  };

  return (
    <div className="update-post">
      <ToastContainer theme="colored" />
      <form onSubmit={formSubmitHandler} className="update-post-form">
        <abbr title="close">
          <i
            onClick={() => setUpdatePost(false)}
            className="bi bi-x-circle-fill update-post-form-close"
          ></i>
        </abbr>
        <h1 className="update-post-title">Update Post</h1>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="update-post-input"
        />
        <select
          className="update-post-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value="">
            Select A Category
          </option>
          <option value="music">music</option>
          <option value="travelling">travelling</option>
          <option value="drinks">drinks</option>
        </select>
        <textarea
          className="update-post-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="5"
        ></textarea>
        <button type="submit" className="update-post-btn" disabled={loading}>
          {loading ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePostModal;
