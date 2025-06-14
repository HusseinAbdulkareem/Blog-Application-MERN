import React, { useEffect, useState } from "react";
import "./postPage.css";
import PostList from "./../../components/posts/PostList";
import Sidebar from "./../../components/sidebar/Sidebar";
import { categories } from "../../dummyData";
import Pagination from "../../components/pagination/Pagination";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchPosts, getPostCount } from "../../redux/apiCalls/postCall";

const POSTS_PER_PAGE = 3; // Number of posts per page
export default function PostsPage() {
  const dispatch = useDispatch();
  const { postsCount, posts } = useSelector((state) => state.post);

  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(postsCount / POSTS_PER_PAGE);

  useEffect(() => {
    dispatch(fetchPosts(currentPage));
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    dispatch(getPostCount());
  }, []);

  return (
    <>
      <section className="post-page">
        <PostList posts={posts} />
        <Sidebar categories={categories} />
      </section>
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
