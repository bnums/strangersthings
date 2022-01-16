import { useParams } from "react-router-dom";
import { useState } from "react";
import { callApi, sendMessage } from "../api";


const MessageForm = ({ token, setPosts }) => {
  const { postId } = useParams();
  const [content, setContent] = useState('');

  const handleMessage = async (e) => {
    e.preventDefault();

    try {
      const msg = await sendMessage({content, token, postId});
      console.log(msg);
      const {data: {posts: newPosts}} = await callApi({url: '/posts', token});
      setPosts(newPosts);
    } catch (error) { 
      console.error(error) 
    }
  }


  return (
    <form className="message-form" onSubmit={handleMessage}>
      <h2>Message Form</h2>
      <label htmlFor="comment-input">Comment: </label>
      <input value={content} onChange={(e) => { setContent(e.target.value) }} id="comment-input" />
      <button>submit</button>
    </form>
  )
}

export default MessageForm;