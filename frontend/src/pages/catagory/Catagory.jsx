import React, { useEffect } from "react";
import "./catagory.css";
import { Link, useParams } from "react-router-dom";
import PostList from "../../components/posts/PostList";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsBasedOnCategory } from "../../redux/apiCalls/postCall";

export default function Catagory() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { postsCate } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPostsBasedOnCategory(category));
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <div className="category">
      {postsCate.length === 0 ? (
        <div className="category-not-found-container">
          <h1 className="category-not-found">
            Posts With <span> {category} </span>category ot found
          </h1>

          <Link to="/posts" className="category-not-found-link">
            Go to post page
          </Link>
        </div>
      ) : (
        <>
          <h1 className="category-title">Posts based on {category}</h1>
          <PostList posts={postsCate} />
        </>
      )}
    </div>
  );
}
