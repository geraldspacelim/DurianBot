const router = require('express').Router();
const bcrypt = require('bcrypt');

let User = require('../models/user.model');


router.route('/authenticate').post(async (req, res) => {
    User.findOne({username: req.body.username}, async function (err, user) {
        if (err) throw err; 
        if (user === null) {
            res.status(400).send()
        } else {
            if (await bcrypt.compare(req.body.password, user.password )) {
                res.status(201).send()
            } else {
                res.status(400).send()
            }
        }
        
    }) 
})

router.route('/addUser').post(async (req, res) => {
    const password = await bcrypt.hash(req.body.password, 10)
    const username = req.body.username;

    const newUser = new User({
        username,
        password
    })

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
