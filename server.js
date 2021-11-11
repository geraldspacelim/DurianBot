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

const packagesRouter = require('./routes/packages.js');

app.use('/api/v1/packages', packagesRouter);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
    
    