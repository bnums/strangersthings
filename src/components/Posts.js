import React, { useEffect } from "react";
import { fetchPosts } from "../api";


const Posts = (props) => {
  const { posts, setPosts } = props;

  const handlePosts = async () => {
    try{
      const newPosts = await fetchPosts();
      setPosts(newPosts);
    } catch(error){
      console.error(error);
    }
  }


  useEffect(() => {
    handlePosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className="posts">
      {posts.length > 0 &&
        posts.map(({ _id, description }) => {
          return (
            <div className="post" key={_id}>{description}</div>
          )
        })
      }
    </div>
  )
}

export default Posts