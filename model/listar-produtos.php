<?php

//$user = "root";
//$senha = "elaborata";

//$con = new PDO('mysql:dbname=pdv;host=localhost;charset=utf8', $user, $senha);

require_once "config.php";
$con = new PDO("mysql:dbname=". DB_BASE .";host=". DB_HOST .";charset=utf8", DB_USER, DB_SENHA);


$sql = "SELECT * FROM produtos";
$res = $con->query($sql);
$produtos = $res->fetchAll(PDO::FETCH_ASSOC);

//var_dump($produtos);
echo json_encode($produtos);

?>