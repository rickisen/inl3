<?php
require_once 'Classes/URL.class.php'; 
require_once 'Classes/API.class.php'; 

// if we got an API call, Call the API and 
// return that data in a json file. 
// Else create and send a HTML page 
// rendered with the same data
if ( URL::getUrlParts()[0] == 'api' ){
  try {
    $responce = API::handleCall(URL::getUrlParts()); 
    if ( !empty($responce) ){
      header('Content-type: application/json');
      echo json_encode($responce); 
    } else {
      throw new RuntimeException("Empty response"); 
    }
  } catch ( RuntimeException $e ) {
      header("HTTP/1.1 404 Not Found");
      echo $e->getMessage(); 
      die;
    }
} else {
  // Render the page from php templates
  $data = ['loadview' => 'main']; // placeholder
  require_once("Classes/TemplateRenderer.class.php"); 
  TemplateRenderer::render($data);
}
