const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({})
  .populate('user', { username: 1, name: 1 })
  response.json(blogs.map(Blog.format))
});

blogsRouter.get('/:id', async (request, response) => {
  try {

    const blog = await Blog.findById(request.params.id)

    if (blog) {
      response.json(Blog.format(blog))
    } else {
      response.status(404).end()
    }

  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})


/*4.7* apufunktioita ja yksikkötestejä, osa 5
Määrittele funktio mostLikes joka saa parametrikseen 
taulukollisen blogeja. Funktio selvittää kirjoittajan, 
kenen blogeilla on eniten likejä. Funktion paluuarvo kertoo 
myös suosikkiblogaajan likejen yhteenlasketun määrän: */

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  try {

    const token = request.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (body.title === undefined) {
      return response.status(400).json({ error: 'title missing' });
    }

    const user = await User.findById(decodedToken.id);

    const newBlog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user
    });

    if(!body.title || !body.url) {
      response.status(400).send('Missing title or url');
    } 
  
    const savedBlog = await newBlog.save();

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save();

    response.json(Blog.format(newBlog))
    } catch(exception) {
        if(exception.name === 'JsonWebTokenError' ){
        response.status(401).json({ error: exception.message })
    } else {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
    }
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

blogsRouter.delete('/:id', async (request, response) => {
  if(!request.token) {
    return response.status(400).send({ error: 'Not authorized'});
  }
  
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  try {
    const blogToRemove = await Blog.findById(request.params.id)
          .populate('user', { username: 1, name: 1 });
    
    if(blogToRemove.user._id.toString() === decodedToken.id) {
      await blogToRemove.remove();
      response.status(200).end();
    } else {
      return response.status(400).send({ error: 'Not authorized'});
    }
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'error'});
  }
});

blogsRouter.put('/:id', async (request, response) => {
  try{

    const initialBlogList = await request.body;

    const newList = {
      title: initialBlogList.title,
      author: initialBlogList.author,
      url: initialBlogList.url,
      likes: initialBlogList.likes
    };

    await Blog.findByIdAndUpdate(request.params.id, newList, { new: true});
  
    response.status(200).end();
  } catch(exception) {
    console.log(exception);
    response.status(400).send({ error: 'error'});
  }
});

module.exports = blogsRouter;