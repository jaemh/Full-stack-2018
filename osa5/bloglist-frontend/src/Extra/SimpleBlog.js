import React from 'react';

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div>
    <div className="title">
      {blog.title} {blog.author}
      </div>
    </div>
    <div>
    <div className="likes">
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
      </div>
    </div>
  </div>
)

export default SimpleBlog;