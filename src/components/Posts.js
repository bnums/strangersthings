
import React from "react";
import { MakePost } from ".";
import { callApi } from "../api";
import { PostSingle } from ".";


const Posts = ({ posts, setPosts, fetchPosts, token, user }) => {

  return (
    <section className="posts">
      {token && <MakePost fetchPosts={fetchPosts} token={token} />}
      {posts && posts.length > 0 ?
        posts.map((post) => {
          return (
            <PostSingle key={post._id} post={post}></PostSingle>
          );
        })
        : <h5>No posts to display</h5>
      }
    </section>
  )
}

export default Posts