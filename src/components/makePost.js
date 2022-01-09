import { useState } from "react";
import { addPost} from "../api";


const MakePost = ({ token, handlePosts }) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const [message,setMessage] = useState("")

  let newPost = { title, description, price, location, willDeliver };
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!token){
      setMessage("You must be logged in to make a post")
      return;
    }
    try {
      const post = await addPost(newPost, token);
      console.log("This is my postObject from makePost", post)
      if(!post.success){
       setMessage("Sorry there was an issue making your post, please try again");
       return;
      }
      setMessage("Your post was successfully made")
    } catch (error) {
      console.error(error)
    } finally{
      await handlePosts();
    }
  }



  return (
    <div>
      <form className="post-form">
        <h3>Make A New Post</h3>
        <label>
          Title:
          <input id="post-form-title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
        </label>
        <br />
        <label>
          Description:
          <input id="post-form-description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
        </label>
        <br />
        <label>
          Price:
          <input id="post-form-price" value={price} onChange={(e) => { setPrice(e.target.value) }} />
        </label>
        <br />
        <label>
          Location:
          <input id="post-form-location" value={location} onChange={(e) => { setLocation(e.target.value) }} />
        </label>
        <br />
        <label>
          Are you offering delivery?
          <select onChange={(e) => {setWillDeliver(e.target.value)}}>
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </label>
      </form>
      <br />
      { message.length > 0 && <h3>{message}</h3>}
      <button type="submit" onClick={handleSubmit}>Submit new post</button>
    </div>
  )
}

export default MakePost;