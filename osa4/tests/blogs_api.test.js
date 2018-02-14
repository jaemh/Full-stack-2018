const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);

test('missing title or url returns 400', async () => {
  const newBlog = {
    title: null,
    author: 'Joonas',
    url: null
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
});

test('blogs are returned', async () => {
  const resultBlogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
});

test('blogs are returned', async () => {
  const resultBlogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
});


test('blogs get a new blog', async () => {
  const initialRes = await api
    .get('/api/blogs');

  const newBlog = {
    title: 'Mars',
    author: 'Jaana',
    url: 'asd',
    likes: 30
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  

  const res = await api
    .get('/api/blogs')

  expect(res.body.length).toBe(initialRes.body.length + 1);

});

test('if likes is empty return 0', async () => {
  const newBlog = {
    title: 'Hendricks',
    author: 'Joonas',
    url: 'asd',
    likes: ''
  }

  const newBlogFromResponse = 
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)


  expect(newBlogFromResponse.body.likes).toBe(0);
    
});

afterAll(() => {
  server.close()
});