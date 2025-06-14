import React from "react";
import Header from "./components/header/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import PostsPage from "./pages/post-page/PostsPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreatePost from "./pages/create-post/CreatePost";
import Footer from "./components/footer/Footer";
import PostDetails from "./pages/post-datails/PostDetails";
import { ToastContainer } from "react-toastify";
import Catagory from "./pages/catagory/Catagory";
import Profile from "./pages/profile/Profile";
import UsersTable from "./pages/admin/UsersTable";
import PostsTable from "./pages/admin/PostsTable";
import CategoriesTable from "./pages/admin/CategoriesTable";
import CommentsTable from "./pages/admin/CommntTable";
import ForgotPassword from "./pages/forms/ForgotPassword";
import ResetPassword from "./pages/forms/ResetPassword";
import NotFound from "./pages/not-found/NotFound";
import { useSelector } from "react-redux";
import VerifyEmail from "./pages/verify-email/VerifyEmail";
export default function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <BrowserRouter>
        <ToastContainer theme="colored" position="top-center" />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />

          <Route
            path="/users/:userId/verify/:token"
            element={!user ? <VerifyEmail /> : <Navigate to="/" />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile/:id" element={<Profile />} />

          {/* Start Grob Route posts */}
          <Route path="posts">
            <Route index element={<PostsPage />} />
            <Route
              path="create-post"
              element={user ? <CreatePost /> : <Navigate to="/" />}
            />
            <Route path="details/:id" element={<PostDetails />} />
            <Route path="categories/:category" element={<Catagory />} />
          </Route>
          {/* end Grob Route posts */}

          {/* Start Grob Route Admin Dashoard */}
          <Route path="admin-dashoard">
            <Route
              index
              element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
            />
            <Route
              path="users-table"
              element={user?.isAdmin ? <UsersTable /> : <Navigate to="/" />}
            />
            <Route
              path="posts-table"
              element={user?.isAdmin ? <PostsTable /> : <Navigate to="/" />}
            />
            <Route
              path="catagories-table"
              element={
                user?.isAdmin ? <CategoriesTable /> : <Navigate to="/" />
              }
            />
            <Route
              path="comments-table"
              element={user?.isAdmin ? <CommentsTable /> : <Navigate to="/" />}
            />
          </Route>
          {/* end Grob Route Admin Dashoard */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
