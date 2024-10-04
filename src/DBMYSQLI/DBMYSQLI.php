<?php

namespace Synaptic4u\Emile;

use Exception;
use mysqli;

class DBMYSQLI{

    private $connection;

    public function __construct()
    {
        try {

            $this->connection = new mysqli('localhost', 'devtest', 'Fried_Mushrooms_with_Feta', 'devtest');

            // Check connection
            if ($this->connection->connect_error) {
                
                throw("Connection failed: " . $this->connection->connect_error);
            }

        } catch (Exception $e) {
            var_dump($e);
        }
    }

    public function query($query, $params){
        
    }
}