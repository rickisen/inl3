<?php

class API{
  private static $instance;
  private function __construct(){}
  private function __clone(){}

  public static function handleCall($path){
    $method = $_SERVER['REQUEST_METHOD'];
    $allowedResources = ['Munks']; 
    $urlType = array_shift($path); // should be 'api'
    $collection = array_shift($path); 

    if ( in_array($collection, $allowedResources) ) {
      require_once 'Classes/'.$collection.".class.php" ;
      $collectionObject = new $collection(); 

      return $collectionObject->$method($path); 
    } else {
      header("HTTP/1.1 404 Not Found");
      die;
    }
  }

  // Gets the relevant data depending on 
  // what http method was used to 
  // call this php instance
  public static function getHTTPData($method) {
    switch ($method) {
    case 'GET':
      $data = $_GET;
      break;
    case 'POST':
      $data = $_POST;
      break;
    case 'PUT':
    case 'DELETE' : 
      parse_str(file_get_contents('php://input', false, null,-1, $_SERVER['CONTENT_LENGTH']), $data );
      break;
    }

    return $data; 
  }
}
