import React, { useEffect } from "react";
import AdminSideBar from "./AdminSideBar";
import "./admin-table.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersProfile,
  deleteProfile,
} from "../../redux/apiCalls/profileApiCall";

export default function UsersTable() {
  const dispatch = useDispatch();
  const { profiles, loading, isProfileDeleted } = useSelector(
    (state) => state.profile
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.token) {
      dispatch(getAllUsersProfile());
    }
  }, [dispatch, isProfileDeleted, user]);

  // Delete User Handler
  const deleteUserHandler = (userId) => {
    if (!user?.token) {
      Swal.fire({
        title: "خطأ",
        text: "يجب تسجيل الدخول أولاً",
        icon: "error",
      });
      return;
    }

    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لا يمكن التراجع عن حذف المستخدم!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم، احذف",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProfile(userId));
      }
    });
  };

  if (loading) {
    return (
      <section className="table-container">
        <AdminSideBar />
        <div className="table-wrapper">
          <h1 className="table-title">Users</h1>
          <p className="loading">جاري التحميل...</p>
        </div>
      </section>
    );
  }

  if (!profiles || profiles.length === 0) {
    return (
      <section className="table-container">
        <AdminSideBar />
        <div className="table-wrapper">
          <h1 className="table-title">Users</h1>
          <p className="not-acoont">لا يوجد مستخدمين</p>
        </div>
      </section>
    );
  }

  return (
    <section className="table-container">
      <AdminSideBar />
      <div className="table-wrapper">
        <h1 className="table-title">Users</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((item, index) => (
              <tr key={item?._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={item?.profilePhoto?.url}
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">{item?.username}</span>
                  </div>
                </td>
                <td>{item?.email}</td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/profile/${item?._id}`}>View Profile</Link>
                    </button>
                    {/* <button onClick={() => deleteUserHandler(item._id)}>
                      Delete User
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
