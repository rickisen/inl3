<?php
class DB{
	private static $instance;
	private function __construct(){}
	private function __clone(){}

	public static function getInstance(){
		if(!self::$instance){
      /* $config = parse_ini_file('../Assets/mysqliConfig.ini'); */
			/* self::$instance = new mysqli($config['host'], $config['user'], $config['password'], $config['database']); */
			self::$instance = new mysqli('localhost', 'root', 'root', 'Gottfrid');
			return self::$instance;
		}else{
			return self::$instance;
		}
	}
}
