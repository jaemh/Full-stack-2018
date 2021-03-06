const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  //comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

blogSchema.statics.format = (blog) => {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: blog.user,
    //comments: blog.comments,
    id: blog._id
  };
};

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;