<?php

class ArticleController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
            $articles = Article::all();
            foreach ($articles as $article){
                $json[] = $article['attributes'];
            }
            return json_encode($json);
            
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
            
            $request_body = file_get_contents('php://input');
            $request = json_decode($request_body);

            $article = new Article;
            $article->content = $request->content;
            $article->slug = $request->slug;
            $article->title = $request->title;
            $article->date = date("Y-m-d");
            
            if($article->save()){
                $message = array('message'=>'Article Saved Correctly.');
            }
            else {
                $message = array('message'=>'Sorry. There was a database error.');
            }
            $message = json_encode($message);
            return $message;
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
            $articles = Article::where('slug', '=', $id)->take(1)->get();
            
            foreach($articles as $article){
                $json = $article['attributes'];
            }
            return json_encode($json);
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
            $request_body = file_get_contents('php://input');
            $request = json_decode($request_body);
            var_dump($request);
            $article = Article::find($request->_id);
            $article->content = $request->content;
            $article->slug = $request->slug;
            $article->title = $request->title;
            $article->date = date("Y-m-d");
            
            if($article->save()){
                $message = array('message'=>'Article Saved Correctly.');
            }
            else {
                $message = array('message'=>'Sorry. There was a database error.');
            }
            $message = json_encode($message);
            return $message;
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}