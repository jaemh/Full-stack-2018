const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/User');

usersRouter.get('/', async (request, response) => {
    const listOfUsers = await User
    .find({})
    .populate('blogs', {title: 1, url: 1})
    response.json(listOfUsers.map(User.format))
})

usersRouter.post('/', async (request, response) => {
      const usersList = request.body;

      try {
        const findUser = await User.find({username: usersList.username});

      if(findUser.length > 0) {
        return response.status(400).json({ error: 'Username must be unique'})
      }if(usersList.password.length < 3) {
        return response.status(400).json({error: 'Password is too short. Password must be over 3 character'})
      }

      const saltRound = 10;
      const password = await bcrypt.hash(usersList.password, saltRound);

      const newUser = new User({
        username: usersList.username,
        name: usersList.name,
        adult: usersList.adult,
        password
      });

      const savedUser = await newUser.save();
      response.json(User.format(savedUser));
                
    } catch(exception) {
      console.log(exception);
      response.status(500).json({ error: 'something went wrong'})
    }
});

module.exports = usersRouter;