import React from "react";


const PostSingle = (props) => {
  const { post , children } = props

  return (
    post
      ? <div className="post" key={post._id}>
          <h2>{post.title}</h2>
          <div>Description: {post.description}</div>
          <div>Price: {post.price}</div>
          <div>Posted by: {post.author.username}</div>
          <div>Location: {post.location} </div>
          {post.willDeliver ? <div>Will deliver</div> : <div>Will not deliver</div>}
          {children}
        </div>
        : '...Loading'
  )
}

export default PostSingle;