'use strict'
const adminCheck = use("App/Middleware/CheckForAdminHeader")
const Product = use('App/Models/Product')
const Database = use('Database')

class ProductController {
    async index ({ request, response }) {
        var products = await Product.all();
        response.json(products)
        // adminCheck(request, response, () => {
        // })
    }
    async store ({ request, response }) {
        var newProduct = new Product();
        newProduct.fill(request.all());
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
    async findByBarcode ({ request, response, params }) {
        // var product = await Product.find(params.barcode);
        var product = await Database
            .table('products')
            .where('barcode', params.barcode)
            .first()
        if(product){
            response.json(product);
        } else {
            response.send(false);
        }
    }

    async getBundles ({ request, response, params }) {
        var product = await Product.find(params.id);
        const bundle = await product.bundles().fetch();
        response.send(bundle);
    }

    async getOrders ({ request, response, params }) {
        var product = await Product.find(params.id);
        const orders = await product.orders().fetch();
        response.send(orders);
    }
}

module.exports = ProductController
