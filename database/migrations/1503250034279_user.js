'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      // table.increments()
      table.string('id').notNullable().unique()
      table.string('display_name', 80).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('phone_number', 60).nullable()
      table.string('photo_url', 300).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
