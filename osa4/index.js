const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const blogsRouter = require('./controllers/Blogs');
const config = require('./utils/config');
const usersRouter = require('./controllers/Users');
const loginRouter = require('./controllers/Login');

mongoose
  .connect(config.mongoUrl)
  .then( () => { console.log('connected to database', config.mongoUrl);
  })
  .catch( err => { console.log(err);
  });

mongoose.Promise = global.Promise;

function tokenExtractor(request, response, next) {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }

  next();
}

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('build'));
app.use(tokenExtractor);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);


const server = http.createServer(app);

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

server.on('close', () => {
  mongoose.connection.close();
});

module.exports = {
  app, server
};
