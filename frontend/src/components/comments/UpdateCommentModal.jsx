import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import "./updateCommentModal.css";
import { useDispatch } from "react-redux";
import { updateComment } from "../../redux/apiCalls/CommentApiCall";
// import { updateComment } from "../../redux/slices/CommentApiCall";
const UpdateCommentModal = ({ setUpdateComment, commentForUpdate }) => {
  const [text, setText] = useState(commentForUpdate?.text);

  const dispatch = useDispatch();

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("Pleas write something");

    dispatch(updateComment(commentForUpdate?._id, { text }));
    setUpdateComment(false);
    window.location.reload();
  };

  return (
    <div className="update-comment">
      <ToastContainer theme="colored" />
      <form onSubmit={formSubmitHandler} className="update-comment-form">
        <abbr title="close">
          <i
            onClick={() => setUpdateComment(false)}
            className="bi bi-x-circle-fill update-comment-form-close"
          ></i>
        </abbr>
        <h1 className="update-comment-title">Edit Comment</h1>
        <input
          onChange={(e) => setText(e.target.value)}
          value={text}
          type="text"
          className="update-comment-input"
          placeholder="Update Comment"
        />
        <button type="submit" className="update-comment-btn">
          Edit Comment
        </button>
      </form>
    </div>
  );
};

export default UpdateCommentModal;
