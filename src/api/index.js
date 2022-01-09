/**
 * This file features and exports all of your calls to the API
 * You need to replace COHORT_NAME in the string associated with your COHORT_NAME
 */
export const COHORT_NAME = '2110-FTB-PT-WEB-PT';
export const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;


//GET /api/COHORT-NAME/posts
export const fetchPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const { data: { posts } } = await response.json();
    return posts;

  } catch (error) {
    console.error(error);
  }
}


// api call to create a new user account
export const register = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        }
      })
    })
    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
  }
}

//api call to log user in
export const login = async (username, password) => {
  try {
    const resp = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        }
      })
    })
    const data = resp.json();
    return data;
  } catch (error) {
    console.error(error)
  }
}

// POST /api/COHORT-NAME/posts
export const addPost = async (postObject, token) => {
  const { title, description, price, willDeliver } = postObject;
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

// DELETE /api/COHORT-NAME/posts/POST_ID
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