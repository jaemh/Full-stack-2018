import React from 'react'

const Blog = ({blog, onDelete, expand, user}) => {
  let deleteOnClick = (e) => {
    e.preventDefault();

    onDelete(blog);
  }

  let expandOnClick = (e) => {
    e.preventDefault();
    expand(blog);
  }

  let showDeleteButton = () => {
    return !blog.user || blog.user.username === user.username;
  }

  return (
    <li onClick={expandOnClick}>
      {blog.title}
      {showDeleteButton() ? <button onClick={deleteOnClick} type="submit" >Delete</button> : ""}
    </li>)  
}

export default Blog;