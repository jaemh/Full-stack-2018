const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/User');

/*4.17 blogilistan laajennus, osa 6
Laajenna blogia siten, että blogiin tulee tieto sen lisänneestä käyttäjästä.

Muokkaa blogien lisäystä osan 4 luvun populate tapaan 
siten, että blogin lisäämisen yhteydessä määritellään 
blogin lisääjäksi joku järjestelmän tietokannassa 
olevista käyttäjistä (esim. ensimmäisenä löytyvä). 
Tässä vaiheessa ei ole väliä kuka käyttäjistä määritellään 
lisääväksi. Toiminnallisuus viimeistellään tehtävässä 4.19.
*/


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