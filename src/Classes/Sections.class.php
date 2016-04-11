<?php
require_once 'Classes/DB.class.php';

class Sections{
  private $sections = array();

  function __construct(){
    $database = DB::getInstance();

    $result = $database->query('
        SELECT id, Name, Href
        FROM Section
      ');

    if ( $result && $result->num_rows > 0 ){
      while ($row = $result->fetch_assoc()){
        $this->sections[] = array( 'id' => $row['id'], 'name' => $row['Name'], 'href' => $row['Href']); 
      }
    } elseif ( $error = $database->error ) {
      header("HTTP/1.1 404 Not Found");
      die;
    }
  }

  function get($path = array()){
    return $this->sections;
  }

}
