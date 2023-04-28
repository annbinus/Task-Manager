const router = require('express').Router();
let User = require('../models/user.model');


// GET endpoint for all users
router.route('/').get((req, res) =>
{
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// POST endpoint for registering a new user
router.route('/add').post((req, res) =>
{
    const username = req.body.username;
    const password = req.body.password;

    const newUser = new User({ username, password });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// GET endpoint for a specific user
router.route('/:id').get((req, res) =>
{
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE endpoint for a specific user
router.route('/:id').delete((req, res) =>
{
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// POST endpoint for updating a user's username
router.route('/update/:id').post((req, res) =>
{
    User.findById(req.params.id)
        .then(user =>
        {
            user.username = req.body.username;
            user.password = req.body.password;

            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/signin').post((req, res) =>
{
    User.find({username: req.body.username, password: req.body.password}, )
        .then(user =>
        {
            req.session.userID = user[0].id;
            console.log('user[0].id: ' + user[0].id);
            res.status(200).send(user[0].id);
        })
        .catch(err => res.status(404).json('Error: ' + err));
});

module.exports = router;