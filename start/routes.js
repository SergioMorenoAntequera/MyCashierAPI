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
Route.get('products/barcode/:barcode', 'ProductController.findByBarcode').as('products.barcode')
Route.resource('products', 'ProductController')
// ...equates to this:
// Route.get('products', 'ProductController.index').as('products.index')
// Route.post('products', 'ProductController.store').as('products.store')
// Route.get('products/:id', 'ProductController.show').as('products.show')
// Route.put('products/:id', 'ProductController.update').as('products.update')
// Route.patch('products/:id', 'ProductController.update')
// Route.delete('products/:id', 'ProductController.destroy').as('products.destroy')
// Route.get('products/:id/edit', 'ProductController.edit').as('products.edit') No need
// Route.get('products/create', 'ProductController.create').as('products.create') No need

///////////////////////////////////////////////////////////////////////////////////////////////////
// ORDER CONTROLLER ///////////////////////////////////////////////////////////////////////////////
Route.resource('orders', 'OrderController')

///////////////////////////////////////////////////////////////////////////////////////////////////
// PACKAGE CONTROLLER /////////////////////////////////////////////////////////////////////////////
Route.resource('bundles', 'BundleController')