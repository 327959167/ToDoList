<?php
include '../control/connect.php';

$index = $_POST['index'];
$status = $_POST['status'];
$myDate = $_POST['myDate'];

$sql = "update todolist set status = '$status',date = '$myDate' where id = '$index' ";

$db_connect->query($sql);

// 关闭连接
mysqli_close($db_connect);