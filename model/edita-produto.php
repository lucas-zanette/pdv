<?php

    require_once "config.php";

    $id         = $_POST["id"];
    $nome       = $_POST["produto"];
    $marca      = $_POST["marca"];
    $categora   = $_POST["categora"];
    $sexo       = $_POST["sexo"];
    $preco      = $_POST["preco"];

    $con = new PDO("mysql:dbname=". DB_BASE .";host=". DB_HOST .";charset=utf8", DB_USER, DB_SENHA);

    $sql = "update produtos set
                nome        = '$nome',
                marca       = '$marca',
                categora    = '$categora',
                sexo        = '$sexo',
                preco       = '$preco',            
            where id= $id";

    //$res = $con->query($sql);
    $res = $con->exec($sql);

    if ($res === false) {
        echo "ocorreu um erro ao editar o produto";
    } else {
        echo "ok";
    }
    
?>