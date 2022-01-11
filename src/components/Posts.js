
import React, { useEffect } from "react";
import { MakePost } from ".";
import { fetchPosts, deletePost } from "../api";


const Posts = (props) => {
  const { posts, setPosts, token } = props;

  const handlePosts = async () => {
    try {
      const getPosts = await fetchPosts();
      console.log(getPosts)
      setPosts(getPosts);
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    handlePosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <section className="posts">
      {token? <MakePost handlePosts={handlePosts} token={token}/> : ""}
      {posts.length > 0 &&
        posts.map(({ _id, title, description, author: { username }, price, location, willDeliver }) => {
          return (
            <div className="post" key={_id}>
              <h2>{title}</h2>
              <div>Description: {description}</div>
              <div>Price: {price}</div>
              <div>Posted by: {username}</div>
              {willDeliver ? <div>Will deliver</div> : <div>Will not deliver</div>}
            </div>
          )
        })
      }
    </section>
  )
}

export default Posts