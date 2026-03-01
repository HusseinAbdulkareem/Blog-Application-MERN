import { useState } from "react";
import "./commentList.css";
import Swal from "sweetalert2";
import UpdateCommentModal from "./UpdateCommentModal";
import { formatDistanceToNow } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
// import { deleteComment } from "../../redux/slices/CommentApiCall";
import { deleteComment } from "../../redux/apiCalls/CommentApiCall";

const CommentList = ({ comments }) => {
  const [updateComment, setUpdateComment] = useState(false);
  const [commentForUpdate, setCommentForUpdate] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // Update Comment Handler
  const updateCommentHandler = (comment) => {
    setUpdateComment(true);
    setCommentForUpdate(comment);
  };

  const deleteCommentHandler = (commentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      // تغيير isOk إلى result
      if (result.isConfirmed) {
        // تحقق من result.isConfirmed وليس isOk
        dispatch(deleteComment(commentId));
        window.location.reload();
      }
    });
  };

  return (
    <div className="comment-list">
      <h4 className="comment-list-count">{comments?.length} Comments</h4>
      {comments?.map((comment) => (
        <div key={comment._id} className="comment-item">
          <div className="comment-item-info">
            <div className="comment-item-user-info">
              <img
                src="/images/user-avatar.png"
                alt=""
                className="comment-item-user-photo"
              />
              <span className="comment-item-username">{comment.username}</span>
            </div>
            <div className="comment-item-time">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </div>
          </div>
          <p className="comment-item-text">{comment.text}</p>
          {user?._id === comment.user && (
            <div className="comment-item-icon-wrapper">
              <i
                onClick={() => updateCommentHandler(comment)}
                className="bi bi-pencil-square"
              ></i>
              <i
                onClick={() => deleteCommentHandler(comment?._id)}
                className="bi bi-trash-fill"
              ></i>
            </div>
          )}
        </div>
      ))}
      {updateComment && (
        <UpdateCommentModal
          commentForUpdate={commentForUpdate}
          setUpdateComment={setUpdateComment}
        />
      )}
    </div>
  );
};

export default CommentList;
