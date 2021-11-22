const router = require('express').Router();

let Product = require('../models/product.model');

router.route('/deleteProduct').get((req, res) => {
    Order.find()
      .then(orders => res.json(orders))
      .catch(err => res.status(400).json('Error: ' + err));
  });

