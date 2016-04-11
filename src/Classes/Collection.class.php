<?php
require_once 'Classes/DB.class.php';

class Collection{
  private $name; 
  private $elements = array(array());

  function __construct($table){
    $database   = DB::getInstance($table);
    $cleanTable = $database->real_escape_string($table); 

    $result = $database->query('
        SELECT id, Name
        FROM '.$cleanTable.'
    ');

    $rowIndex =  0;
    if ( $result && $result->num_rows > 0 ){
      while ($row = $result->fetch_assoc()){
        foreach ($row as $name => $col) {
          $this->elements[$rowIndex][$name] = $col;
        }
        $rowIndex++;
      }
    } elseif ( $error = $database->error ) {
      header("HTTP/1.1 404 Not Found");
      die;
    }
  }

  function get($path = array()){
    return $this->elements;
  }

}
