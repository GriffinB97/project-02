const router = require('express').Router();
const { User } = require('../../models');

//api//users
//needs a post
//needs a delete
//needs a get by ID
//needs a get all?

//get all
router.get('/', async (req,res) => {
    try {
        const userData = await User.findAll();
        const userTotal = [];
        for(user of userData){
            userTotal.push(user.dataValues);
        }
        console.log(userTotal);
        // res.json(userTotal);
        //handelbars call go here
        //res.redirect('/');
        res.render('users', {userTotal});
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//post, so creating a new user
//works
//make a json object
//fetch(/api/users){
// method: post
//}
router.post('/', async (req,res) => {
    try {
        const userData = await User.create(req.body);
        res.json(userData);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});



//login info
// {{!-- GET ROUTE --}}
//api/users/login
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


//get by id
//works
//needs to be low to prevent it from eating the /login route
router.get('/:id', async (req,res) => {
    try {
        const userTotal = [(await User.findByPk(req.params.id)).dataValues];
        console.log(userTotal);
        // res.json(userData);
        //handelbars call go here
        res.render('users', {userTotal});
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//delete
//sort of works
//the onDelete cascade isn't working, so a user with recipes cannot be deleted
router.delete('/:id', async (req,res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!userData){
            res.status(404).json({message : 'No user was found'}); //the message template is because json
            return;
        }
        res.status(200).json(userData);

    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;