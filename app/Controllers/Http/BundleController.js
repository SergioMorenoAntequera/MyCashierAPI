'use strict'
const adminCheck = use("App/Middleware/CheckForAdminHeader")
const Bundle = use('App/Models/Bundle')
const Database = use('Database')

class PackageController {
    async index ({ request, response }) {
        var bundle = await Bundle.all();
        adminCheck(request, response, () => {
            response.json(bundle)
        })
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

    async getProduct ({ request, response, params }) {
        var bundle = await Bundle.find(params.id);
        const bundleProduct = await bundle.product().fetch(); 
        response.json(bundleProduct);
    }
    async getOrder ({ request, response, params }) {
        var bundle = await Bundle.find(params.id);
        const bundleOrder = await bundle.order().fetch(); 
        response.json(bundleOrder);
    }
}

module.exports = PackageController
