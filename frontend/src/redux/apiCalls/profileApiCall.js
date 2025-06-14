import { authActions } from "../slices/authSlice";
import { profileActions } from "../slices/profileSlice";
import request from "./../../utils/request";
import { toast } from "react-toastify";

// get user profile
export function getProfile(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`api/users/profile/${userId}`);
      dispatch(profileActions.setProfile(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// get user profile
export function uploadProfilePhoto(newPhoto) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        `/api/users/profile/profile-photo-upload`,
        newPhoto,

        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(profileActions.setProfilePhoto(data.profilePhoto));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// update profile
export function updateProfile(userId, profile) {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth?.user?.token;

      if (!token) {
        throw new Error("Authentication token not found. Please login again.");
      }

      const { data } = await request.put(
        `/api/users/profile/${userId}`,
        profile,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(profileActions.updateProfile(data));
      dispatch(authActions.setUsername(data.username));

      localStorage.setItem("userInfo", JSON.stringify(data));

      const user = JSON.parse(localStorage.getItem("userInfo")) || {};
      user.username = data?.username;
      localStorage.setItem("userInfo", JSON.stringify(user));
      window.location.reload();
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      toast.error(message);
    }
  };
}

// delete profile
export function deleteProfile(userId) {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading());
      const { data } = await request.delete(`/api/users/profile/${userId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(profileActions.setProfileDeleted());
      toast.success(data?.message);
      setTimeout(() => dispatch(profileActions.clearProfileDelete()), 2000);
      // dispatch(getAllUsersProfile())
    } catch (error) {
      toast.error(error.response?.data?.message);
      dispatch(profileActions.clearLoading());
    }
  };
}

// get  users Count (admin dash)
export function getUsersCount() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/users/count`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(profileActions.setUsersCount(data));
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Error fetching user count");
    }
  };
}

// get  All users Profile (admin dash)
export function getAllUsersProfile() {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading());
      const { data } = await request.get(`/api/users/profile`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      if (Array.isArray(data)) {
        dispatch(profileActions.setProfiles(data));
      } else {
        console.error("Expected array of profiles, got:", typeof data);
        toast.error("Error: Invalid data format received from server");
        dispatch(profileActions.clearLoading());
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Error fetching profiles");
      dispatch(profileActions.clearLoading());
    }
  };
}
