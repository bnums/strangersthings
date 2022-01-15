
import React from "react";
import { AddPost } from ".";
import { PostSingle } from ".";
import { callApi } from "../api";


const Posts = ({ posts, setPosts, fetchPosts, token, user }) => {

  const handleDelete = async (id) => {
    try {
      await callApi({ url: `/posts/${id}`, method:'DELETE', token })
      const newPosts = posts.filter(element => element._id !== id);
      setPosts(newPosts);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className="posts">
      {token && <AddPost fetchPosts={fetchPosts} token={token} posts={posts} setPosts={setPosts} />}
      {
        posts && posts.length
          ? posts.map(post => {
            return (
              <PostSingle key={post._id} post={post}>
                {post.isAuthor && <button onClick={() => handleDelete(post._id)}>Delete</button>}
              </PostSingle>
            );
          })
          : <h5>No posts to display</h5>
      }
    </section>
  )
}

export default Posts