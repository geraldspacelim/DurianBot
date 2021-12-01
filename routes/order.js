require('dotenv').config()
const router = require('express').Router();
const axios = require('axios');

let Order = require('../models/order.model');
// New order telegram message
const ORDER_RECEIVED_MESSAGE = "You have received a new order"
const TELEGRAM_CHANNEL = -629840517

router.route('/').get((req, res) => {
    Order.find().sort({"createdAt": -1})
      .then(orders => res.json(orders))
      .catch(err => res.status(400).json('Error: ' + err));
  });


router.route('/newOrder').post((req, res) => {
  const telegramId = req.body.telegramId
  const orderId = req.body.orderId
  const name = req.body.name;
  const contact = req.body.contact
  const email = req.body.email
  const address = req.body.address
  const deliveryOption = req.body.deliveryOption
  const orders = req.body.orders
  const amountPayable = req.body.amountPayable
  const promoCode = req.body.promoCode

  const newOrder = new Order({
    telegramId,
    orderId,
    name,
    contact,
    email,
    address,
    deliveryOption,
    orders,
    amountPayable,
    promoCode
  });

  newOrder.save()
  .then(() => {
    const body = {
      chat_id: TELEGRAM_CHANNEL, 
      text: ORDER_RECEIVED_MESSAGE
  }
    axios.post(`https://api.telegram.org/bot${process.env.BOT_ADMIN_TOKEN}/sendMessage`, body).then(() => {
        res.json("New order received")   
    }).catch (err => {
        console.log(err)
    })
  })
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

router.route('/getOrder/:id').get((req, res) => {
  Order.findById(req.params.id)
  .then(order => res.json(order))
  .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/updateOrder/:id').post((req, res) => {
  Order.findById(req.params.id)
  .then(order => {
    order.name = req.body.name
    order.contact = req.body.contact 
    order.address = req.body.address 
    order.deliveryOption = req.body.deliveryOption
    order.orders = req.body.orders
    order.amountPayable = req.body.amountPayable
    order.promoCode = req.body.promoCode
    order.email = req.body.email
  
    order.save()
      .then(() => res.json("order updated"))
      .catch(err => res.status(400).json('Error: ' + err))
  })
  .catch(err => res.status(400).json('Error: ' + err));
})



module.exports = router;
