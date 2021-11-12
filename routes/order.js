const router = require('express').Router();

let Order = require('../models/order.model');

router.route('/').get((req, res) => {
    Package.find()
      .then(packages => res.json(packages))
      .catch(err => res.status(400).json('Error: ' + err));
  });


router.route('/newOrder').post((req, res) => {
  const name = req.body.name;
  const contact = req.body.contact
  const address = req.body.address
  const deliveryOption = req.body.deliveryOption
  const orders = req.body.orders
  const amountPayable = req.body.amountPayable
  const promoCode = req.body.promoCode

  const newOrder = new Order({
    name,
    contact,
    address,
    deliveryOption,
    orders,
    amountPayable,
    promoCode
  });

  newOrder.save()
  .then(() => res.json('Order added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
