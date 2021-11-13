const router = require('express').Router();

let Order = require('../models/order.model');

router.route('/').get((req, res) => {
    Order.find()
      .then(orders => res.json(orders))
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

router.route('/paymentReceived/:id').post((req, res) => {
  Order.findOneAndUpdate(
    {_id: req.params.id},
    {$set: {paymentReceived: true}}
  ).then(() => res.json("Order updated!"))
  .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/deleteOrder/:id').post((req, res) => {
  Order.deleteOne({_id: req.params.id})
  .then(() => res.json("Order deleted!"))
  .catch(err => res.status(400).json('Error: ' + err));
})


module.exports = router;
