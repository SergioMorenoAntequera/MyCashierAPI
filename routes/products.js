var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

var Product = require("../models/Product");
var product = new Product("barcode", "otro", "lo otro");

// Get all products
router.get('/', (req, res, next) => {

  Product.all().then((result) => {
    res.json(result);
    
  }).catch((error) => {
    res.send(error);
  }); 
}); 

// Add a product
router.post('/create', [      body('barcode').isLength({ min: 5 }),
    ], (req, res) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      var product = Product.newProductWithQuery(req.query);
      product.create((result) => {
        product.id = result.insertId;
        res.send(product);
      }); 
    }
);

// Query generator
router.get('/get', function(req, res, next) {
  Product.get(req.query).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).send(error);
  });
});

// Update a product, depending in ID
router.put('/:id', function(req, res, next) {
  res.send('Updating one product');
});

// Deleting a product, depending in ID
router.delete('/:id', function(req, res, next) {
  res.send('Deelting one product');
});

module.exports = router;