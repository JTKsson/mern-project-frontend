import { Link } from "react-router-dom";
import { Post } from "../../types";
import Styles from "./PostListItem.module.css";
import VoteComponent from "../VoteComponent";

const PostListItem = ({ post }: { post: Post }) => {
  return (
    <div className={Styles.post} key={post._id}>
      <VoteComponent post={post} />
      <div className={Styles.postContent}>
        <Link to={`/posts/${post._id}`}>
          <h2 className={Styles.title}>{post.title}
          <span className={Styles.link}>{post.link ? " (Link in post)" : ""}</span></h2>
        </Link>

        <p className={Styles.author}>by {post.author.userName}</p>
        {post.link && (
          <span>
            <Link to={`/posts/${post._id}`}></Link>
          </span>
        )}
      </div>
    </div>
  );
};

export default PostListItem;
