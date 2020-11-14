'use strict'
const adminCheck = use("App/Middleware/CheckForAdminHeader")
const Token = use('App/Models/Token')
const Database = use('Database')

class TokenController {
    async index ({ request, response }) {
        var tokens = await Token.all();
        adminCheck(request, response, () => {
            response.json(tokens)
        })
    }
    async store ({ request, response }) {
        var newToken = new Token();
        newToken.fill(request.all());
        if(await newToken.save()) {
            newToken.id = await Token.getMax('id')
            response.json(newToken);
        } else {
            response.send(false);
        }
    }
    async show ({ request, response, params }) {
        response.json(await Token.find(params.id));
    }
    async update ({ request, response, params }) {
        var token = await Token.find(params.id);
        token.merge(request.all());
        await token.save();
        response.json(token);
    }
    async destroy ({ request, response, params }) {
        var token = await Token.find(params.id);
        response.send(await token.delete());
    }

    async getUser ({ request, response, params }) {
        var token = await Token.find(params.id);
        const user = await token.user().fetch();
        response.send(user);
    }

}

module.exports = TokenController
