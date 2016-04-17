<?php
require_once 'Classes/DB.class.php';

class Element{
    private $id; 
    private $name; 
    private $path; 
    private $collection; 
    private $data = array();

    function __construct($path, $collection){
        $database         = DB::getInstance();
        $this->id         = array_shift($path);
        $this->path       = $path;
        $this->collection = $collection;
        $cleanTable       = $database->real_escape_string($this->collection);
        $cleanId          = $database->real_escape_string($this->id);

        $result = $database->query('
            SELECT *
            FROM '.$cleanTable.'
            WHERE id = '.$cleanId.'
            ');

        if ( $result && $result->num_rows > 0 ){
            $row = $result->fetch_assoc(); 
            foreach ($row as $name => $col) {
                $this->data[$name] = $col;
            }
        } elseif ( $error = $database->error ) {
            throw new RuntimeException($error); 
        }
    }

    function get(){
        return $this->data;
    }
}
