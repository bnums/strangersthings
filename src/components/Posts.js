import React from "react";
import { AddPost, PostSingle } from ".";

const Posts = ({ posts, setPosts, fetchPosts, token, user, deletePost }) => {

  return (
    <section className="posts">
      {token && <AddPost fetchPosts={fetchPosts} token={token} posts={posts} setPosts={setPosts} />}
      {
        posts && posts.length
          ? posts.map(post => {
            return (
              <PostSingle key={post._id} post={post} deletePost={deletePost}></PostSingle>
            );
          })
          : <h5>No posts to display</h5>
      }
    </section>
  )
}

export default Posts