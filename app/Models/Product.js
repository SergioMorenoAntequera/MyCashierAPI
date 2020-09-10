'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {

    bundles () {
        return this.hasMany('App/Models/Bundle', "id", "product_id")
    }
    
    orders () {
        return this
          .belongsToMany('App/Models/Order')
          .pivotTable('bundles')
    }

}

module.exports = Product
