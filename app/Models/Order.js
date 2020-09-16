'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {

    bundles () {
        return this.hasMany('App/Models/Bundle')
    }

    products () {
        return this
          .belongsToMany('App/Models/Product')
          .pivotModel('App/Models/Bundle')
    }
    
    user() {
        return this.belongsTo('App/Models/User')
    }

}

module.exports = Order
