<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::resource('articles', 'ArticleController');
Route::resource('users', 'UserController');

Route::post('login', function()
{
    $request_body = file_get_contents('php://input');
    $request = json_decode($request_body);
    $email = $request->email;
    $password = $request->password;

    if (Auth::attempt(array('email' => $email, 'password' => $password)))
    {
        $message = array("message" => 'Login Successful.');
    }
    else {
        $message = array("message" => 'Not Authorized.');
    }
    $message = json_encode($message);
    return $message;
});