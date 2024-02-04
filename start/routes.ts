/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/google_connexion','AuthController.google_connexion');
Route.get('/gl_push_info','AuthController.google_push_info');
Route.post('/create_user','AuthController.create_user');
Route.get('/disconnection','AuthController.disconnection');


Route.get('/create_category','CategoriesController.create_category');// admin
Route.get('/update_category','CategoriesController.update_category');// admin
Route.get('/get_category','CategoriesController.get_category');// admin

Route.get('/protected',()=>{
    return 'protected route'
}).middleware('auth');


