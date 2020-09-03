var express = require('express');
var router = express.Router();

var Product = require("../models/Product");
var product = new Product("barcode", "otro", "lo otro");

// Get all products
router.get('/', function(req, res, next) {
  Product.all((result) => {
    res.json(result);
  }); 
}); 

// Add a product
router.post('/create', function(req, res, next) {
  var product = Product.newProductWithQuery(req.query);
  product.create(() => {
    res.send(product);
  });
});

// Query generator
router.get('/get', function(req, res, next) {
  Product.get(req.query, (result) => {
    res.json(result);
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