const express = require('express');

const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded());

const OrderItems = require('./models/orderItems.model');
const Order = require('./models/order.model');

const port = 3000;
mongoose.connect('mongodb://localhost:27017/OrderDB', (err) => {
  if (!err) console.log('server connected to Mongodb');
});

app.post('/addOrderItems', (req, res) => {
  console.log('Giving Order');
  const orderItObj = {
    _id: new mongoose.Types.ObjectId(),
    product: req.body.product,
    quantity: req.body.quantity,
    phone: '61083aa094e7ae072c044390', // I am using the phone "_id" that has been made in /addOrder as I havent work on the frontend to request the id of the order
  };
  const newOrderItems = new OrderItems(orderItObj);
  newOrderItems.save((err, orderItems) => {
    if (err) res.status(400).send('Cant place order');
    else res.status(200).json(orderItems);
  });
});
app.post('/addOrder', (req, res) => {
  console.log('Adding The Order');
  const orderObj = {
    _id: new mongoose.Types.ObjectId(),
    phone: req.body.phone,
  };
  const newOrder = new Order(orderObj);
  newOrder.save((err, order) => {
    if (err) res.status(400).send('Cant place order');
    else res.status(200).json(order);
  });
});
app.get('/orders', (req, res) => {
  console.log('Getting the order');
  OrderItems.find({}, { _id: 0 })
    .select('-__v')
    .populate('phone')
    .exec((err, orders) => {
      if (err) res.status(400).send(err);
      else res.status(200).json(orders);
    });
});

app.get('/', (req, res) => {
  res.send('This is homepage');
});

app.listen(port, () => {
  console.log(`App is running on port${port}`);
});
