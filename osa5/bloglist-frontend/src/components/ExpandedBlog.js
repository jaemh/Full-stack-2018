import React from 'react';

const ExpandedBlog = ({blog, removeExpand, likeBlog}) => {
    let closeOnClick = (e) => {
        e.preventDefault();
        removeExpand(blog);
    }

    let likeBlogClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        likeBlog(blog);
    }

    return(
        <div onClick={closeOnClick}>
        <ul>
            <li>{blog.title}</li>
            <li>{blog.url}</li>
            <li>Likes: {blog.likes}</li>
            <li><button onClick={likeBlogClick}>Like</button></li>
        </ul>
        </div>
    )
}

export default ExpandedBlog;