'use strict'
const User = use('App/Models/User')
const Database = use('Database')

class UserController {
    async index ({ request, response }) {
        var users = await User.all();
        response.json(users)
    }
    async create ({ request, response }) {
        var data = request.all();
        var newUser = new User();
        newUser.username = data.username;
        newUser.email = data.email;
        newUser.password = data.password;
        if(await newUser.save()) {
            newUser.id = await User.getMax('id')
            response.json(newUser);
        } else {
            response.send(false);
        }
        
    }
    update ({ request, response }) {
        
    }
    async delete ({ request, response }) {
        var user = await User.find(request.all().id);
        response.send(await user.delete());
    }
    filter ({ request, response }) {
        
    }
    getById ({ request, response }) {
        
    }
}

module.exports = UserController
