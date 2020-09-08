'use strict'

const { route } = require('@adonisjs/framework/src/Route/Manager')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

///////////////////////////////////////////////////////////////////////////////////////////////////
// USER CONTROLLER ////////////////////////////////////////////////////////////////////////////////
Route.get("/user", 'UserController.index')
Route.post("/user", 'UserController.create')
Route.put("/user", 'UserController.update')
Route.delete("/user", 'UserController.delete')
Route.get("/user/filter", 'UserController.filter')
Route.get("/user/:id", 'UserController.getById')

///////////////////////////////////////////////////////////////////////////////////////////////////
// PRODUCT CONTROLLER /////////////////////////////////////////////////////////////////////////////
Route.resource('products', 'ProductController')
// ...equates to this:
// Route.get('users', 'UserController.index').as('users.index')
// Route.post('users', 'UserController.store').as('users.store')
// Route.get('users/:id', 'UserController.show').as('users.show')
// Route.put('users/:id', 'UserController.update').as('users.update')
// Route.patch('users/:id', 'UserController.update')
// Route.delete('users/:id', 'UserController.destroy').as('users.destroy')
// Route.get('users/:id/edit', 'UserController.edit').as('users.edit') No need
// Route.get('users/create', 'UserController.create').as('users.create') No need