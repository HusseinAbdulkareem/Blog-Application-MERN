import { Link } from "react-router-dom";

const PostItem = ({ post, username, userId }) => {
  const imgUrl = `http://localhost:8000${post.image?.url}`; // التأكد من وجود الصورة

  // تأكد من أن post.user ليس null أو undefined قبل استخدامه
  const profileLink = userId
    ? `/profile/${userId}`
    : post.user && post.user._id
    ? `/profile/${post.user._id}`
    : "/profile/default"; // إذا كان post.user غير موجود، يمكنك توجيه المستخدم إلى رابط افتراضي

  return (
    <div className="post-item">
      <div className="post-item-image-wrapper">
        <img src={imgUrl} alt="" className="post-itme-image" />
      </div>
      <div className="post-item-info-wrapper">
        <div className="post-item-info">
          <div className="post-item-author">
            <strong>Author: </strong>
            {post.user ? (
              <Link to={profileLink}>
                <span>{post.user.username}</span>
              </Link>
            ) : (
              <span>Unknown</span>
            )}
          </div>
          <div className="post-itme-date">
            {new Date(post.createdAt).toDateString()}
          </div>
        </div>
        <div className="post-item-details">
          <h4 className="post-item-title">{post.title}</h4>
          <Link
            className="post-item-category"
            to={`/posts/categories/${post.category}`}
          >
            {post.category}
          </Link>
        </div>
        <p className="post-item-description">
          {post.description?.substring(0, 200)}... Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quaerat natus delectus blanditiis
          accusamus. Fugit vitae odit accusamus, error nobis debitis, rerum ex
          saepe quisquam rem qui sint deserunt consectetur voluptas! Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Repudiandae itaque atque,
          molestiae totam, unde minus corrupti dicta distinctio repellat enim
          doloribus consectetur odit nisi optio, repellendus ea ex impedit
          incidunt.
        </p>
        <Link className="post-item-link" to={`/posts/details/${post._id}`}>
          Read More...
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
