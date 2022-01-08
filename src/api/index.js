/**
 * This file features and exports all of your calls to the API
 * You need to replace COHORT_NAME in the string associated with your COHORT_NAME
 */
export const COHORT_NAME = '2110-FTB-PT-WEB-PT';
export const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;


// READ grab posts
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
  try{
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
  } catch(error){
    console.error(error)
  }
}