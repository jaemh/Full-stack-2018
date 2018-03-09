import React from 'react';

const ExpandedBlog = ({blog, removeExpand, likeBlog, comment, changeComment}) => {
    let closeOnClick = (e) => {
        e.preventDefault();
        removeExpand(blog);
    }

    let likeBlogClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        likeBlog(blog);
    }
 
    let addComment = (e) => {
        e.preventDefault();
        e.stopPropagation();
        comment(blog);
    }

    let change = (e) => {
        e.preventDefault();
        comment(blog);

    }

    return(
        <div>
        <ul onClick={closeOnClick}>
            <li>{blog.title}</li>
            <li>{blog.url}</li>
            <li>Likes: {blog.likes}</li>
            <li><button onClick={likeBlogClick}>Like</button></li>
        </ul>
            <div> comments </div>
            <input type='text' onChange={change}/>
            <button onClick={addComment}>Add</button>

        
        </div>
    )
}

export default ExpandedBlog;