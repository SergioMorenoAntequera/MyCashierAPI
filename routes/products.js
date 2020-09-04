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
router.post('/create', (req, res) => {
  var product = Product.newProductWithQuery(req.body);
  product.create().then((result) => {
    product.id = result.insertId;
    delete product['table'];
    res.status(201).json(product);
  }).catch((error) => {
    res.status(500).json(error);
  }); 
});

// Query generator
router.get('/get', function(req, res, next) {
  Product.get(req.query).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).send(error);
  });
});

// Query generator
router.get('/:id', function(req, res, next) {
  Product.get(req.params).then((result) => {
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