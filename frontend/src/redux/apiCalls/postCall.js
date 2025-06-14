import request from "../../utils/request";
import { postActions } from "../slices/PostSlice";
import { toast } from "react-toastify";

// Fetch posts Based in page number
export function fetchPosts(pageNummber) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(
        `/api/posts?pageNumber=${pageNummber}`
      );
      dispatch(postActions.setPost(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Get posts Count
export function getPostCount(pageNummber) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/count`);
      dispatch(postActions.setPostCount(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Fetch posts Based in Category
export function fetchPostsBasedOnCategory(category) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?category=${category}`);
      dispatch(postActions.setPostCate(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Create Post
export function createPost(newPost) {
  return async (dispatch, getState) => {
    try {
      dispatch(postActions.setLoading());
      await request.post("/api/posts", newPost, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(postActions.setIsPostCreated());
      setTimeout(() => dispatch(postActions.clearIsPostCreated()), 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(postActions.clearLoading());
    }
  };
}

// Fetch single posts
export function fetchSinglePosts(postId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/${postId}`);
      dispatch(postActions.setSinglePost(data));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
}

// Toggle Like  posts
export function toggleLike(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/posts/like/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      );
      dispatch(postActions.setLike(data));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
}

// update posts image
export function updatePostImage(newImage, postId) {
  return async (dispatch, getState) => {
    try {
      await request.put(`/api/posts/update-image/${postId}`, newImage, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("New post image uploaded successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
}

// Delete Post
export function deletePost(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/posts/${postId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(postActions.deletePost(data.postId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
}

// get all posts
export function getAllPosts(getposts) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts`);
      dispatch(postActions.setPost(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
