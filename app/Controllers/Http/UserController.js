'use strict'
const User = use('App/Models/User')

class UserController {
    async index ({ request, response }) {
        var users = await User.all();
        response.json(users)
    }
    async store ({ request, response }) {
        var params = request.all();
        var newUser = new User();
        newUser.fill(params);
        if(await newUser.save()) {
            newUser.id = params.id;
            response.json(newUser);
        } else {
            response.send(false);
        }
    }
    async show ({ request, response, params }) {
        response.json(await User.find(params.id));
    }
    async update ({ request, response, params }) {
        var user = await User.find(params.id);
        user.merge(request.all());
        await user.save();
        response.json(user);
    }
    async destroy ({ request, response, params }) {
        var user = await User.find(params.id);
        response.send(await user.delete());
    }
    async getTokens ({ request, response, params }) {
        var user = await User.find(params.id);
        const tokens = await user.tokens().fetch();
        response.send(tokens);
    }
    async getOrders ({ request, response, params }) {
        var user = await User.find(params.id);
        const orders = await user.orders().fetch();
        response.send(orders);
    }
}

module.exports = UserController
