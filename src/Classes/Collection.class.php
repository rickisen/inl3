<?php
require_once 'Classes/DB.class.php';
require_once 'Classes/Element.class.php';

class Collection{
  private $name; 
  private $path; 
  private $elementList = array(array());
  private $childElement; 

  function __construct($path, $parent = null){
    $this->parent = $parent;
    $this->name   = array_shift($path);
    $this->path   = $path;
    $database     = DB::getInstance();
    $cleanTable   = $database->real_escape_string($this->name);

    $result = $database->query('
        SELECT id, title
        FROM '.$cleanTable.'
    ');

    if ( $result && $result->num_rows > 0 ){
      while ( $row = $result->fetch_assoc() ){
        foreach ( $row as $keyName => $col ) {
          $this->elementList[$row['id']][$keyName] = $col;
        }
      }
    } elseif ( $error = $database->error ) {
      throw new RuntimeException($error); 
    }
  }

  function get(){
    if ( count($this->path) > 0 && !empty($this->path[0])) {
      $element = new Element($this->path, $this->name); 
      return $element->get(); 
    } else {
      return $this->elementList;
    }
  }
}

