import { useEffect, useState } from "react";
import { PostSingle } from ".";
import { callApi } from "../api";

const UserInbox = ({ token, posts, deletePost, user }) => {
  const userPosts = posts.filter(element => element.isAuthor !== false);
  const [userMsgs, setUserMsgs] = useState([]);

  const getUser = async () => {
    if (token) {
      const { data: { messages } } = await callApi({
        url: `/users/me`,
        method: 'GET',
        token
      });
      setUserMsgs(messages);
    }
  }

  useEffect(() => [
    getUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [])

  return <>
    <section className="user-inbox">
      <h2>Inbox</h2>
      {
        userMsgs.length > 0 ? userMsgs.map(message => {
          return (
            <div key={message._id}>
              <h3>{message.post.title}</h3>
              {user === message.fromUser.username ?
                <div>By: {message.fromUser.username} </div> :
                <div> From: {message.fromUser.username} </div>}
              <div>Content: {message.content} </div>
              <br />
            </div>
          )
        }) : <h5>No messages to display</h5>
      }
    </section>
    <section className="user-posts">
      <h2>Active Posts By User </h2>
      {
        userPosts.length > 0
          ? userPosts.map(post => {
            return (
              <PostSingle key={post._id} post={post} deletePost={deletePost}></PostSingle>
            );
          })
          : <h5>No active posts to display</h5>
      }
    </section>
  </>
}

export default UserInbox;