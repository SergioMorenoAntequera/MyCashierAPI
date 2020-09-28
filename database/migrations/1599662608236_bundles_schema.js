'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PackagesSchema extends Schema {
  up () {
    this.create('bundles', (table) => {
      table.increments()
      table.integer('order_id').unsigned().notNullable().references('id').inTable('orders')
      table.integer('product_id').notNullable().references('id').inTable('products')
      table.integer('amount')
      table.timestamps()
    })
  }

  down () {
    this.drop('bundles')
  }
}

module.exports = PackagesSchema
