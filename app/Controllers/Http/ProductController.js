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
    async show ({ request, response, params }) {
        response.json(await Product.find(params.id));
    }
    async update ({ request, response, params }) {
        var product = await Product.find(params.id);
        product.merge(request.all());
        await product.save();
        response.json(product);
    }
    async destroy ({ request, response, params }) {
        var product = await Product.find(params.id);
        response.send(await product.delete());
    }
}

module.exports = ProductController
