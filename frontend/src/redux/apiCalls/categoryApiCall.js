import request from "../../utils/request";
import { toast } from "react-toastify";
import { categoryActions } from "../slices/categorySlice";

//  fetch all category
export function fetchCategory(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/categorys");
      dispatch(categoryActions.setCategories(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

//  Create category
export function createCategory(newCategory) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/categorys", newCategory, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "application/json",
        },
      });
      dispatch(categoryActions.addCategory(data));
      toast.success("Category created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

//  delete category
export function deleteCategory(categoryId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/categorys/${categoryId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "application/json",
        },
      });
      dispatch(categoryActions.deleteCategory(data.categoryId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
