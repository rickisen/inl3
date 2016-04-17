<?php

class TemplateRenderer{
    private function __construct(){}
        private function __clone(){}

        public static function render($data){
            include 'Templates/header.php';

            include 'Templates/'.$data['loadview'].'.php';

            include 'Templates/footer.php';
        }
}
