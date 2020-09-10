'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Bundle extends Model {

    product () {
        return this.belongsTo('App/Models/Product', "product_id", "id")
    }
    
    order () {
        return this.belongsTo('App/Models/Order')
    }
    
}

module.exports = Bundle
