import React from "react";

const PostForm = ({ post, setPost, handleSubmit }) => {

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <input value={post.title} placeholder="Title" onChange={(e) => { setPost({ ...post, title: e.target.value }) }} />
      <input value={post.description} placeholder="Description" onChange={(e) => { setPost({ ...post, description: e.target.value }) }} />
      <input value={post.price} placeholder="Price" onChange={(e) => { setPost({ ...post, price: e.target.value }) }} />
      <input value={post.location} placeholder="Location" onChange={(e) => { setPost({ ...post, location: e.target.value }) }} />
      <select onChange={(e) => { setPost({ ...post, willDeliver: e.target.value }) }}>
        <option value={false}>No</option>
        <option value={true}>Yes</option>
      </select>
      <button>Submit</button>
    </form>
  )
}


export default PostForm;