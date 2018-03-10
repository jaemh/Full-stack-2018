import axios from 'axios';
const baseUrl = '/api/blogs';
const usersUrl = '/api/users';

const getAllUsers = () => {
  const allUsers = axios.get(usersUrl)
  return allUsers.then(response => response.data);
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getToken = () => {
  let user = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'));
  if(user) {
    return `bearer ${user.token}`;
  } else {
    return false
  }
}

const configHeaders = () => {
  return {
    headers: { 'Authorization': getToken() }
  }
}

/*const createComments = async (blog, comment) => {
  let url = baseUrl + '/' + blog.id + '/comment';

  if(!getToken()) {
    console.log('not logged in, not authorized to create comments');
      return false;
  }

  const response = await axios
    .post(url, comment, configHeaders())
      return response.data;
}
*/
const create = async (blog) => {
  
  if(!getToken()) {
    console.log('not logged in, not authorized to create blog');
    return false;
  }

  const response = await axios
     .post(baseUrl, blog, configHeaders())
  return response.data;
}

const update = async (id, newObject) => {
  const res = await axios.put(`${baseUrl}/${id}`, newObject, configHeaders())
  return res.status === 200 ? true : false;
}

const deleteBlog = async (id) => {
  if(!getToken()) {
    console.warn('not logged in to delete blog');
    return false;
  }
  
  const res = await axios
      .delete(baseUrl + '/' + id, configHeaders());
  return res.status === 200 ? true : false;
}


export default { getAll, create, update, deleteBlog, getAllUsers }