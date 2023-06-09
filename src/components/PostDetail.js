import { Link } from "react-router-dom";

import styles from "./PostDatail.module.css";

const PostDetail = ({ post }) => {
  return (
    <div >
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p>por: {post.createdBy}</p>
      <div >
      {post && post.tagsArray && post.tagsArray.map((tag) => (
  <p key={tag}>
    <span>#</span>
    {tag}
  </p>
))}

      </div>
      <Link to={`/posts/${post.id}`} className="btn btn-outline">
        Ler
      </Link>
    </div>
  );
};

export default PostDetail;
