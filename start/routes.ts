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

Route.get('/me','AccountsController.me');
Route.get('/edit_me','AccountsController.edit_me');
Route.get('/get_account','AccountsController.get_account');
Route.get('/get_account_from_ids','AccountsController.get_account_from_ids');
Route.get('/get_all_account','AccountsController.get_all_account'); // admin // moderator

Route.post('/create_category','CategoriesController.create_category');// admin
Route.put('/update_category','CategoriesController.update_category');// admin
Route.get('/get_category','CategoriesController.get_category'); 
Route.get('/get_category_from_ids','CategoriesController.get_category_from_ids');
Route.get('/get_category_child_list','CategoriesController.get_category_child_list');
Route.get('/get_category_all_child_list','CategoriesController.get_category_all_child_list');
Route.get('/get_category_parents','CategoriesController.get_category_parents');
Route.delete('/delete_category','CategoriesController.delete_category');//admin

Route.post('/create_product','ProductsController.create_product');
Route.put('/update_product','ProductsController.update_product');
Route.get('/get_product','ProductsController.get_product'); 
Route.get('/get_product_from_ids','ProductsController.get_product_from_ids');
Route.get('/get_product_child_list','ProductsController.get_product_child_list');
Route.get('/filter_product','ProductsController.filter_product');
Route.delete('/delete_product','ProductsController.delete_product');

Route.post('/report_product','ReportsController.report_product');
Route.get('/get_products_reported','ReportsController.get_products_reported');

Route.get('/protected',()=>{
    return 'protected route'
}).middleware('auth');


