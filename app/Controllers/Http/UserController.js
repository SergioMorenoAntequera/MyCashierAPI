'use strict'
const adminCheck = use("App/Middleware/CheckForAdminHeader")
const userCheck = use("App/Middleware/CheckForUserHeader")
const User = use('App/Models/User')

class UserController {
    async index ({ request, response }) {
        var users = await User.all();
        adminCheck(request, response, () => {
            response.json(users);
        })
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
        const user = await User.find(params.id)
        userCheck(user, request, response, () => {
            response.json(user);
        })
    }
    async update ({ request, response, params }) {
        var user = await User.find(params.id);
        
        userCheck(user, request, response, async () => {
            user.merge(request.all());
            await user.save();
            response.json(user);
        })
    }
    async destroy ({ request, response, params }) {
        var user = await User.find(params.id);
        userCheck(user, request, response, async () => {
            response.send(await user.delete());
        })
    }
    async getTokens ({ request, response, params }) {
        var user = await User.find(params.id);
        const tokens = await user.tokens().fetch();
        userCheck(user, request, response, () => {
            response.send(tokens);
        })
    }
    async getOrders ({ request, response, params }) {
        var user = await User.find(params.id);
        const orders = await user.orders().fetch();
        
        userCheck(user, request, response, () => {
            response.send(orders);
        })
    }
}

module.exports = UserController
