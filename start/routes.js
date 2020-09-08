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

Route.get("/user", 'UserController.index')
Route.post("/user", 'UserController.create')
Route.put("/user", 'UserController.update')
Route.delete("/user", 'UserController.delete')
Route.get("/user/filter", 'UserController.filter')
Route.get("/user:id", 'UserController.getById')
