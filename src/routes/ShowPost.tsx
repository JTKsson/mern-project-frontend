import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { Post } from "../types";
import CommentForm from "../components/CommentForm";
import VoteComponent from "../components/VoteComponent";
import UpdatePost from "./UpdatePost";

export const loader = async (args: LoaderFunctionArgs) => {
  const { params } = args;

  const { id } = params;

  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL + "/posts/" + id,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const posts = await response.json();

  return posts;};

const ShowPost = () => {
  const post = useLoaderData() as Post;

  // const commentFetcher = useFetcher({key: "comment-form-" + post._id})

  return (
    <>
      <div>
        <VoteComponent post={post}/>
        <div>
          { post.link ? (
            <Link to={post.link}>
              <h2>{post.title}<span>({post.link})</span></h2>
            </Link>
          ) : (
            <h2>{post.title}</h2>
          )}
          <p>by {post.author.userName}</p>
          { post.body && (
            <div>
              <p>{post.body}</p>
            </div>
          )}
          <UpdatePost />
        </div>
      </div>
        <CommentForm postId={post._id} />
        { post.comments?.map(comment => <p key={comment._id}>{comment.body} - {comment.author.userName}</p>) }    </>
  );
};

export default ShowPost;
