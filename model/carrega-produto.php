<?php

        require_once "config.php";

        $id = $_GET["id"];
        $con = new PDO("mysql:dbname=". DB_BASE .";host=". DB_HOST .";charset=utf8", DB_USER, DB_SENHA);

        $sql = "select * from produtos where id = $id";

        $res = $con->query($sql);

        $produtos = $res->fetchAll(PDO::FETCH_ASSOC);
        
        //json produtos na posicao 0 retorna um array com todos os dados na posicao 0 como se fosse array dentro de array
        
        echo json_encode($produtos[0]);
    
    ?>