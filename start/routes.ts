import './RulesLauncher';
import { HttpContext } from '@adonisjs/core/build/standalone';
import Route from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env';
// import transmit from '@adonisjs/transmit/build/services/transmit';

Route.get('/google_connexion','AuthController.google_connexion');
Route.get('/gl_push_info','AuthController.google_push_info');
Route.post('/create_user','AuthController.create_user');
Route.get('/disconnection','AuthController.disconnection');

Route.get('/me','AccountsController.me').middleware('auth');
Route.put('/edit_me','AccountsController.edit_me').middleware('auth');
Route.post('/get_account','AccountsController.get_account');
Route.post('/get_account_from_ids','AccountsController.get_account_from_ids');
Route.post('/get_all_account','AccountsController.get_all_account'); // admin // moderator

Route.post('/create_category','CategoriesController.create_category');// admin
Route.put('/update_category','CategoriesController.update_category');// admin
Route.post('/get_category','CategoriesController.get_category'); 
Route.post('/get_category_from_ids','CategoriesController.get_category_from_ids');
Route.post('/get_category_child_list','CategoriesController.get_category_child_list');
Route.post('/get_category_all_child_list','CategoriesController.get_category_all_child_list');
Route.post('/get_category_parents','CategoriesController.get_category_parents');
Route.delete('/delete_category','CategoriesController.delete_category');//admin

Route.post('/create_product','ProductsController.create_product').middleware('auth');
Route.put('/update_product','ProductsController.update_product').middleware('auth');;
Route.post('/get_product','ProductsController.get_product'); 
Route.post('/get_product_from_ids','ProductsController.get_product_from_ids');
Route.post('/get_product_child_list','ProductsController.get_product_child_list');
Route.post('/filter_product','ProductsController.filter_product');
Route.delete('/delete_product','ProductsController.delete_product');

Route.group(()=>{
    Route.post('/add_recommendation_account','RecommendationsController.add_recommendation_account');
    Route.post('/add_recommendation_product','RecommendationsController.add_recommendation_product');
    Route.post('/get_account_recommendations','RecommendationsController.get_account_recommendations');
    Route.post('/get_product_recommendations','RecommendationsController.get_product_recommendations');
    Route.delete('/delete_recommendation_account','RecommendationsController.delete_recommendation_account');
    Route.delete('/delete_recommendation_product','RecommendationsController.delete_recommendation_product');
}).middleware('auth');

Route.group(()=>{
    Route.post('/report_product','ReportsController.report_product');
    Route.post('/report_account','ReportsController.report_account');
    Route.post('/get_products_reported','ReportsController.get_products_reported');
    Route.post('/get_accounts_reported','ReportsController.get_accounts_reported');
}).middleware('auth');

Route.group(()=>{
    Route.post('/add_favorite_account','FavoritesController.add_favorite_account');
    Route.post('/add_favorite_product','FavoritesController.add_favorite_product');
    Route.post('/get_favorite_accounts','FavoritesController.get_favorite_accounts');
    Route.post('/get_favorite_products','FavoritesController.get_favorite_products');
    Route.post('/get_all_favorite_products_id','FavoritesController.get_all_favorite_products_id');
    Route.delete('/delete_favorite_account','FavoritesController.delete_favorite_account');
    Route.delete('/delete_favorite_product','FavoritesController.delete_favorite_product');    
}).middleware('auth');

Route.group(()=>{
    Route.post('/create_discussion','MessengersController.create_discussion');
    Route.post('/get_discussions','MessengersController.get_discussions');
    Route.post('/send_message','MessengersController.send_message');
    Route.post('/get_messages','MessengersController.get_messages');
   // Route.post('/get_message','MessengersController.get_message');
    Route.post('/delete_discussion','MessengersController.delete_discussion');
}).middleware('auth');

Route.group(()=>{
    Route.post('/vote_account','VoteController.vote_account');
    Route.post('/get_account_votes','VoteController.get_account_votes');
}).middleware('auth');


Route.get('/try_token',()=>{
    return {
        valid :true
    }
}).middleware('auth');

Route.post('/',({response}:HttpContext)=>{
    response.redirect().toPath(`${Env.get('FRONT_ORIGINE')}`)
});
Route.get('/fs/:fileName',({params,response}:HttpContext)=>{
response.download(`${Env.get("FILE_STORAGE")}/${params.fileName}`)

});


