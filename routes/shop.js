const router = require('express').Router();

let Shop = require("../models/shop.model")

router.route('/').get((req, res) => {
    Shop.find({"name": process.env.SHOP_NAME})
      .then(shop => res.json(shop))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/newShop').post((req, res) => {
    console.log("here")
    const name = req.body.name;
    const promos = req.body.promos
    const products = req.body.products

    const newShop = new Shop({
    name,
    promos,
    products
    });

    newShop.save()
    .then(() => res.json('Shop added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

