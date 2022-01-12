/**
 * This file features and exports all of your calls to the API
 * You need to replace COHORT_NAME in the string associated with your COHORT_NAME
 */

export const COHORT_NAME = '2110-FTB-PT-WEB-PT';
export const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;


//MODULAR API CALL FUNCTION

export const callApi = async ({url,method,token,body}) =>{
  try{
    const options = {
      method: method ? method.toUpperCase() : "GET" ,
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(body)
    }
    if(token){
      options.headers['Authorization'] = `Bearer ${token}`
    }
    const response = await fetch(BASE_URL + url,options);
    const data = await response.json();
    return data;
  }
    catch(error){
      console.error(error)
    }
  }

// GET /api/COHORT-NAME/users/me
export const getUser = async (token) =>{

  try{
    const resp = await fetch(`${BASE_URL}users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    const userObj = resp.json();
    return userObj;

  }catch(error){
    console.error(error);
  }
}

// POST /api/COHORT-NAME/posts 
// api call to add post
export const addPost = async (postObject, token) => {
  const { title, description, price, location, willDeliver } = postObject;
  try {
    const resp = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          location,
          willDeliver
        }
      })
    })
    const newPost = resp.json();
    console.log(newPost)

    return newPost;
  } catch (error) {
    console.error(error)
  }
}


//PATCH /api/COHORT-NAME/posts/POST_ID
// api call to edit post
export const editPost = async (postObj,token) => {
  const {title, description, price, location, willDeliver,_id} = postObj;
  try{
    const resp = await fetch(`${BASE_URL}/posts/${_id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          location,
          willDeliver
        }
      })
    })
    const editedPost = resp.json();
    return editedPost;

  } catch(error){
    console.error(error)
  }
}

// DELETE /api/COHORT-NAME/posts/POST_ID
// api call to delete post
export const deletePost = async (token, id) => {
  try {
    const resp = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const {success} = resp.json();
    if(success){
      console.log("Message has been deleted")
    }
  } catch (error) { 
    console.error(error)
  }
}

//POST /api/COHORT-NAME/posts/POST_ID/messages
// api call to send message to user of a post
export const sendMessage = async (content, token, postId) =>{
  try{
    const resp = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        message: {
          content
        }
      })
    })
    const data = resp.json();
    return data;
  }catch(error){
    console.error(error);
  }
} 