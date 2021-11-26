const router = require('express').Router();
const multer  = require('multer')

let Shop = require("../models/shop.model")

router.route('/').get((req, res) => {
    Shop.find({"name": process.env.SHOP_NAME})
      .then(shop => res.json(shop))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/newShop').post((req, res) => {
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

router.route('/deleteProductCollection/:id').post((req, res) => {
    Shop.findByIdAndUpdate(
        {_id: req.params.id},
        {$pull: {products: {name: req.body.name}}}
    ).then(() => res.json("Shop updated!"))
    .catch(err => res.status(400).json('Error: ' + err));
})

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "../client/assets")
    },
    filename: function  (req, file, cb) {
        cb(null, file.originalname + "-" + Date.now())
    }  
})
const upload = multer({ storage: storage })

router.route('/newProductCollection/:id').post(upload.single("image"), (req, res) => {
    const body = {
        name: req.body.name,
        caption: req.body.caption,
        source: "../../images/" + req.file.filename,
        details: JSON.parse(req.body.details)
    }
    console.log(body)
    Shop.findByIdAndUpdate(
        {_id: req.params.id},
        {$push: {products: body}}
    ).then(() => res.json("Shop updated!"))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/deletePromo/:id').post((req, res) => {
    Shop.findByIdAndUpdate(
        {_id: req.params.id},
        {$pull: {promos: {code: req.body.code}}}
    ).then(() => res.json("Shop updated!"))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/addPromo/:id').post((req, res) => {
    Shop.findByIdAndUpdate(
        {_id: req.params.id},
        {$push: {promos: req.body}}
    ).then(() => res.json("Shop updated!"))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;

