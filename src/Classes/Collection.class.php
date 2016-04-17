<?php
require_once 'Classes/DB.class.php';
require_once 'Classes/Element.class.php';

class Collection{
    private $name; 
    private $path; 
    private $elementList = array();
    private $childElement; 

    function __construct($path, $parent = null){
        $this->parent = $parent;
        $this->name   = array_shift($path);
        $this->path   = $path;
        $database     = DB::getInstance();
        $cleanTable   = $database->real_escape_string($this->name);

        if ($cleanTable == 'munk') {
            $query = '
                SELECT id, title, description
                FROM '.$cleanTable.'
                '; 
        } else {
            $query = '
                SELECT id, title
                FROM '.$cleanTable.'
                '; 

        }

        $result = $database->query($query);

        $index = 0;
        if ( $result && $result->num_rows > 0 ){
            while ( $row = $result->fetch_assoc() ){
                foreach ( $row as $keyName => $col ) {
                    $this->elementList[$index][$keyName] = $col;
                }
                $index++; 
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

    // warning this is specifc to products!
    function post(){
        $database = DB::getInstance();

        if ( count($_POST) == 0){
            throw new RuntimeException('No post data sent'); 
        }

        // clean the data, and put it in an array.
        $cleanProducts = array(); 
        $cleanName     = $database->real_escape_string($_POST['name']);
        $cleanDeadline = date('Y-m-d H:i:s', strtotime($database->real_escape_string($_POST['deadline'])));

        // itterate through the products array, clean and append all the data
        // to a the array
        $key = 0; 
        foreach ($_POST['products'] as $product) {
            $cleanProductId = $database->real_escape_string($product['id']);
            $cleanAmmount   = $database->real_escape_string($product['ammount']);

            $cleanProducts[$key]['title']     = '"'.$cleanName.'"';
            $cleanProducts[$key]['deadline']  = '"'.$cleanDeadline.'"';
            $cleanProducts[$key]['productId'] = '"'.$cleanProductId.'"';
            $cleanProducts[$key]['ammount']   = '"'.$cleanAmmount.'"';
            $key++; 
        }

        // Build the sql query 
        $values = array(); 
        foreach ($cleanProducts as $product) {
            $values[] = '('.implode($product,',').')'; 
        }

        $keys = implode(array_keys($cleanProducts[0]), ','); 

        $query = '
            INSERT  
            INTO '.$this->name.' ('.$keys.')
            VALUES '.implode($values,',').'
            '; 

        $database->query($query);
        if ( $error = $database->error ) {
            throw new RuntimeException($error); 
        }

        header('location:/');
        die;
    }

}

