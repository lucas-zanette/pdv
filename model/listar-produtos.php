<?php

require_once "config.php";

$con = new PDO("mysql:dbname=". DB_BASE .";host=". DB_HOST .";charset=utf8", DB_USER, DB_SENHA);

$ordem = ($_GET['ordem'] != "") ? $_GET['ordem'] : "id";
$sql = "SELECT * FROM produtos";
$sql .= " order by $ordem";

$res = $con->query($sql);

$produtos = $res->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($produtos);

?>