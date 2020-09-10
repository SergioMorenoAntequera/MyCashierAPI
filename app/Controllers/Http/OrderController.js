'use strict'
const Order = use('App/Models/Order')
const Database = use('Database')

class OrderController {
    async index ({ request, response }) {
        var order = await Order.all();
        response.json(order)
    }
    async store ({ request, response }) {
        var newOrder = new Order();
        newOrder.fill(request.all());
        if(await newOrder.save()) {
            newOrder.id = await Order.getMax('id')
            response.json(newOrder);
        } else {
            response.send(false);
        }
    }
    async show ({ request, response, params }) {
        response.json(await Order.find(params.id));
    }
    async update ({ request, response, params }) {
        var order = await Order.find(params.id);
        order.merge(request.all());
        await order.save();
        response.json(order);
    }
    async destroy ({ request, response, params }) {
        var order = await Order.find(params.id);
        response.send(await order.delete());
    }
}

module.exports = OrderController
