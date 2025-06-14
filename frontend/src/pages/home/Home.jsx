import React, { useEffect } from "react";
import "./home.css";
import PostList from "../../components/posts/PostList";
import { categories } from "../../dummyData";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../../redux/apiCalls/postCall";
export default function Home() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(fetchPosts(1));
  }, []);

  return (
    <section className="home">
      <div className="home-hero-header">
        <div className="home-hero-header-layout">
          <h1 className="home-title"> Welcome to Blog </h1>
        </div>
      </div>

      <div className="home-latest-post"> Latest Posts </div>
      <div className="home-container">
        <PostList posts={posts} />
        <Sidebar categories={categories} />
      </div>
      <div className="home-see-posts-link">
        <Link className="home-link" to="posts">
          See All Posts
        </Link>
      </div>
    </section>
  );
}
