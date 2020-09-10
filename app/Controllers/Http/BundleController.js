'use strict'
const Bundle = use('App/Models/Bundle')
const Database = use('Database')


class PackageController {
    async index ({ request, response }) {
        var bundle = await Bundle.all();
        response.json(bundle)
    }
    async store ({ request, response }) {
        var newBundle = new Bundle();
        newBundle.fill(request.all());
        if(await newBundle.save()) {
            newBundle.id = await Bundle.getMax('id')
            response.json(newBundle);
        } else {
            response.send(false);
        }
    }
    async show ({ request, response, params }) {
        response.json(await Bundle.find(params.id));
    }
    async update ({ request, response, params }) {
        var bundle = await Bundle.find(params.id);
        bundle.merge(request.all());
        await bundle.save();
        response.json(bundle);
    }
    async destroy ({ request, response, params }) {
        var bundle = await Bundle.find(params.id);
        response.send(await bundle.delete());
    }
}

module.exports = PackageController
