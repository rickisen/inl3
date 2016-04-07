<?php
require_once 'Classes/DB.class.php';

class Munks{
  private $munks = array();

  function __construct(){
    $database = DB::getInstance();

    $result = $database->query('
        SELECT id, Name, price
        FROM Munk
      ');

    if ( $result && $result->num_rows > 0 ){
      while ($row = $result->fetch_assoc()){
        $this->munks[] = array( 'id' => $row['id'], 'name' => $row['Name'], 'price' => $row['price']); 
      }
    } elseif ( $error = $database->error ) {
      header("HTTP/1.1 404 Not Found");
      die;
    }
  }

  function get($path = array()){
    return $this->munks;
  }

}
