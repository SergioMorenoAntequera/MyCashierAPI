'use strict'
const Product = use('App/Models/Product')
const Database = use('Database')

class ProductController {
    async index ({ request, response }) {
        var products = await Product.all();
        response.json(products)
    }
    async store ({ request, response }) {
        var data = request.all();
        var newProduct = new Product();
        newProduct.barcode = data.barcode;
        newProduct.name = data.name;
        newProduct.price = data.price;
        if(await newProduct.save()) {
            newProduct.id = await Product.getMax('id')
            response.json(newProduct);
        } else {
            response.send(false);
        }
    }
    async show ({ request, response }) {
        
    }
    async update ({ request, response }) {
        // const trx = await Database.beginTransaction()
    }
    async destroy ({ request, response }) {
        var product = await Product.find(request.all().id);
        response.send(await product.delete());
    }
}

module.exports = ProductController
