<?php
require_once 'Classes/URL.class.php'; 

// if we got an API call, Call the API and 
// return that data in a json file. 
// Else create and send a HTML page
if ( URL::getUrlParts()[0] == 'api' ){
  echo "api call!";
} else {
  // Render the page from php templates
  $data = ['loadview' => 'main']; // placeholder
  require_once("Classes/TemplateRenderer.class.php"); 
  TemplateRenderer::render($data);
}
