'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PackagesSchema extends Schema {
  up () {
    this.create('packages', (table) => {
      table.increments()
      table.integer('order_id').notNullable().default(0)
      table.integer('product_id').notNullable().default(0)
      table.integer('amount').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('packages')
  }
}

module.exports = PackagesSchema
