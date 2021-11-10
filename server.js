require('dotenv').config()
const express = require("express");
const cors = require("cors");
const app = express()
const port = process.env.PORT || 8080;
const sql = require("./connection")
import { nanoid } from 'nanoid'

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/newOrder", (req, res) => {
    const id = nanoid()
    const name = req.body.name
    const contact = req.body.contact
    const package = req.body.package
    const deliveryDate = req.body.date
    const deliveryTime = req.body.timeslot
    const address = req.body.address
    const promoCode = req.body.promoCod
    // const amountPayable = req.
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
    
    