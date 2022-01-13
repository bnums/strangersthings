
import React, { useEffect } from "react";
import { MakePost } from ".";
import { PostSingle } from ".";
import { callApi } from "../api";


const Posts = ({ posts, setPosts, fetchPosts, token, user }) => {

  const handleDelete = async () =>{
      // const method = 'DELETE';
      // try {
      //   await callApi({ url: `/posts/${post._id}`, method, token })
      //   console.log("posts before filtering:",posts)
      //   setPosts(posts);
      // } catch (error) {
      //   console.error(error)
      // }
  }

  return (
    <section className="posts">
      {token && <MakePost fetchPosts={fetchPosts} token={token} posts={posts} setPosts={setPosts} />}
      {
        posts && posts.length
          ? posts.map(post => {
            return (
              <PostSingle key={post._id} post={post}>
                {post.isAuthor && <button onClick={handleDelete}>Delete</button>}
              </PostSingle>
            );
          })
          : <h5>No posts to display</h5>
      }
    </section>
  )
}

export default Posts