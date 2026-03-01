import "./admin-table.css";
import Swal from "sweetalert2";
import AdminSideBar from "./AdminSideBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteComment,
  getAllComment,
} from "../../redux/apiCalls/CommentApiCall";

const CommentsTable = () => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(getAllComment());
  }, []);
  // Delete Category Handler
  const deleteCommentHandler = (commentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This comment will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteComment(commentId));

        Swal.fire({
          title: "Deleted!",
          text: "Comment has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="table-container">
      <AdminSideBar />
      <div className="table-wrapper">
        <h1 className="table-title">Comments</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={item.user.profilePhoto?.url}
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">{item.user.username}</span>
                  </div>
                </td>
                <td>
                  <b> {item.text} </b>
                </td>
                <td>
                  <div className="table-button-group">
                    <button onClick={() => deleteCommentHandler(item._id)}>
                      Delete Comment
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommentsTable;
