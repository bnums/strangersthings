import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react";
import { callApi } from "../api";

const EditForm = ({ posts, token,fetchPosts }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { title, description, price, location, willDeliver } = posts.filter((elem) => elem._id === postId)[0];
  const origPost = { title: title, description: description, price: price, location: location, willDeliver: willDeliver };
  const [post, setPost] = useState(origPost);


  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await callApi({
        url: `/posts/${postId}`,
        method: 'PATCH',
        body: { post },
        token
      });
      console.log("Updated Post: ")
      fetchPosts();
      navigate('/posts')
    } catch (error) {
      console.error(error)

    }
  }

  return <>
    <div>This is my edit form</div>
    <form className="post-form" onSubmit={handleEdit}>
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
  </>
}

export default EditForm