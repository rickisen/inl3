<?php

class API{
  private static $instance;
  private function __construct(){}
  private function __clone(){}

  public static function handleCall($path = array()){
    $method           = $_SERVER['REQUEST_METHOD'];
    /* $allowedResources = ['munk', 'section']; */
    $urlType          = array_shift($path); // should be 'api'
    $collection       = $path[0];

    /* if ( in_array($collection, $allowedResources) ) { */
    if (true) {
      require_once 'Classes/Collection.class.php' ;
      $collectionObject = new Collection($path); 
      return $collectionObject->$method(); 
    } else {
      throw new RuntimeException('Collection not allowed'); 
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
