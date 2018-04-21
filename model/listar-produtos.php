<?php

$user = "root";
$senha = "elaborata";

$con = new PDO('mysql:dbname=pdv;host=localhost;charset=utf8', $user, $senha);

$sql = "SELECT * FROM produtos";
$res = $con->query($sql);
$produtos = $res->fetchAll(PDO::FETCH_ASSOC);

//var_dump($produtos);
echo json_encode($produtos);

?>