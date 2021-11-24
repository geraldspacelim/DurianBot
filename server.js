require('dotenv').config()
const express = require("express");
const cors = require("cors");
const app = express()
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const orderRouter = require('./routes/order.js');
const shopRouter = require('./routes/shop.js');
const confirmationRouter = require('./routes/confirmation.js');

app.use('/api/v1/order', orderRouter);
app.use('/api/v1/shop', shopRouter);
app.use('/api/v1/confirmation', confirmationRouter)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
    
    