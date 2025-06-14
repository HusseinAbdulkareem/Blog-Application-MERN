import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
export default function HeaderRight() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [dropdown, setDropdown] = useState(false);

  // Logut Handler
  const logoutHadler = () => {
    setDropdown(false);
    dispatch(logoutUser());
  };

  return (
    <div className="header-right">
      {user ? (
        <>
          <div className="header-right-user-info">
            <span
              onClick={() => setDropdown((priv) => !priv)}
              className="header-right-username"
            >
              {user?.username}
            </span>
            <img
              src={user?.profilePhoto.url}
              alt=""
              className="header-right-user-photo"
            />
            {dropdown && (
              <div className="header-right-dropdwon">
                <Link
                  to={`/profile/${user?._id}`}
                  className="header-dropdown-item"
                  onClick={() => setDropdown(false)}
                >
                  <i className="bi bi-file-person"></i>
                  <span>Profile</span>
                </Link>

                <div onClick={logoutHadler} className="header-dropdown-item">
                  <i className="bi bi-box-arrow-in-left"></i>
                  <span> Logout</span>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Link to="login" className="header-right-link">
            <i className="bi bi-box-arrow-in-right"></i>
            <span> Login </span>
          </Link>

          <Link to="/register" className="header-right-link">
            <i className="bi bi-person-plus"></i>
            <span> Register </span>
          </Link>
        </>
      )}
    </div>
  );
}
