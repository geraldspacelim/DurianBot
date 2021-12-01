require('dotenv').config()
const axios = require('axios');
const router = require('express').Router();

router.route('/sendConfirmationMessage').post((req, res) => {
    axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, req.body).then(() => {
        res.json("Confirmation message sent")    
    }).catch(err => {
        console.log(err)
    })
});

module.exports = router;

