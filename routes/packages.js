const router = require('express').Router();

let Package = require('../models/package.model');

router.route('/').get((req, res) => {
    Package.find()
      .then(packages => res.json(packages))
      .catch(err => res.status(400).json('Error: ' + err));
  });


router.route('/addPackageSchema').post((req, res) => {
  const name = req.body.name;
  const caption = req.body.caption
  const source = req.body.source

  const newPackage = new Package({
    name,
    caption,
    source
  });

  newPackage.save()
  .then(() => res.json('Package Schema added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/addPackageVariation/:id').post((req, res) => {

    Package.findOneAndUpdate({_id:req.params.id}, {"$push": {details: req.body}})
        .then(() => res.json('Package updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    
  });
  

module.exports = router;
