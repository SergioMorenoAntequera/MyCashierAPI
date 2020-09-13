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
Route.resource('users', 'UserController')

///////////////////////////////////////////////////////////////////////////////////////////////////
// PRODUCT CONTROLLER /////////////////////////////////////////////////////////////////////////////
Route.get('products/barcode/:barcode', 'ProductController.findByBarcode').as('products.barcode')
Route.get('products/:id/bundles', 'ProductController.getBundles').as('products.bundles')
Route.get('products/:id/orders', 'ProductController.getOrders').as('products.orders')
Route.resource('products', 'ProductController')

///////////////////////////////////////////////////////////////////////////////////////////////////
// ORDER CONTROLLER ///////////////////////////////////////////////////////////////////////////////
Route.get('orders/:id/bundles', 'OrderController.getBundles')
Route.get('orders/:id/products', 'OrderController.getProducts')
Route.resource('orders', 'OrderController')

///////////////////////////////////////////////////////////////////////////////////////////////////
// BUNDLE CONTROLLER //////////////////////////////////////////////////////////////////////////////
Route.get('bundles/:id/product', 'BundleController.getProduct')
Route.get('bundles/:id/order', 'BundleController.getOrder')
Route.resource('bundles', 'BundleController')

// Route.resource('products', 'ProductController')
// ...equates to this:
// Route.get('products', 'ProductController.index').as('products.index')
// Route.post('products', 'ProductController.store').as('products.store')
// Route.get('products/:id', 'ProductController.show').as('products.show')
// Route.put('products/:id', 'ProductController.update').as('products.update')
// Route.patch('products/:id', 'ProductController.update')
// Route.delete('products/:id', 'ProductController.destroy').as('products.destroy')
// Route.get('products/:id/edit', 'ProductController.edit').as('products.edit') No need
// Route.get('products/create', 'ProductController.create').as('products.create') No need