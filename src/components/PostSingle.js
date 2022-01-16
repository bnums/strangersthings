import React from "react";
import { useNavigate } from "react-router";


const PostSingle = (props) => {
  const { post, deletePost } = props
  const navigate = useNavigate();

  return (
    post
      ? <div className="post" key={post._id}>
        <h2>{post.title}</h2>
        <div>Description: {post.description}</div>
        <div>Price: {post.price}</div>
        <div>Posted by: {post.author.username}</div>
        <div>Location: {post.location} </div>
        {post.willDeliver ? <div>Will deliver</div> : <div>Will not deliver</div>}
        {post.isAuthor && <button onClick={() => deletePost(post._id)}>Delete</button>}
        {!post.isAuthor && <button onClick={() => { navigate(`/posts/${post._id}/messages`) }}>Message</button>}
        {post.messages.map((elem) =>{
          return(
            <div>{elem.content}</div>
          )
        })}
      </div>
      : '...Loading'
  )
}

export default PostSingle;