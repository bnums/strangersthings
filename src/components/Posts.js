import React from "react";
import { AddPost } from ".";
import { PostSingle } from ".";
import { useNavigate, useParams } from "react-router-dom";

const Posts = ({ posts, setPosts, fetchPosts, token, user, deletePost }) => {
  const navigate = useNavigate();
  const params = useParams();
  let {postId} = params;

  return (
    <section className="posts">
      {token && <AddPost fetchPosts={fetchPosts} token={token} posts={posts} setPosts={setPosts} />}
      {
        posts && posts.length
          ? posts.map(post => {
            postId = post._id
            return (
              <PostSingle key={post._id} post={post}>
                {post.isAuthor && <button onClick={() => deletePost(post._id)}>Delete</button> } 
                {!post.isAuthor && <button onClick={navigate(`/posts/${postId}/messages`)}>Message</button>}
              </PostSingle>
            );
          })
          : <h5>No posts to display</h5>
      }
    </section>
  )
}

export default Posts