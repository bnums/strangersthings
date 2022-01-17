import { useParams } from "react-router-dom";
import { useState } from "react";
import { sendMessage } from "../api";


const MessageForm = ({ token, fetchPosts }) => {
  const { postId } = useParams();
  const [content, setContent] = useState('');


  const handleMessage = async (e) => {
    e.preventDefault();

    try {
      await sendMessage({ content, token, postId });
      await fetchPosts();
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <>
      {token ?
        <form className="message-form" onSubmit={handleMessage}>
          <h2>Message Form</h2>
          <label htmlFor="comment-input">Comment: </label>
          <input value={content} onChange={(e) => { setContent(e.target.value) }} id="comment-input" />
          <button>submit</button>
        </form> :
        <div> Please login to message other users</div>
      }
    </>
  )
}

export default MessageForm;


