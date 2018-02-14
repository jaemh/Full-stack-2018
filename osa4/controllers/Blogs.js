const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs);
    });
});

blogsRouter.post('/', (request, response) => {
  const blog = request.body;

  const newBlog = new Blog({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes || 0
  });

  if(!blog.title || !blog.url) {
    response.status(400).send('Missing title or url');
  } else {
    newBlog
      .save()
      .then(result => {
        response.status(201).json(result);
      });
  }
});

const mostBlogs = (blogs) => {

  let popularAuthor = {
    author: null,
    blogs: 0
  };
  let authors = {};

  blogs.forEach(blog => {
    authors[blog.author] = authors[blog.author] ? authors[blog.author]++ : 1;
  });
  console.log(authors);

  for(let key in authors){
    if(popularAuthor.blogs < authors[key]) {
      popularAuthor.author = key;
      popularAuthor.blogs = authors[key];
    }
  }

  return popularAuthor;
};

module.exports = blogsRouter;