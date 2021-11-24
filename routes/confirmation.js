const router = require('express').Router();

router.route('/sendConfirmationMessage').post((req, res) => {
    Order.find()
      .then(orders => res.json(orders))
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;
