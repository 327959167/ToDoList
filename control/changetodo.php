<?php
include './connect.php';

$todo = $_POST['todo'];
$index = $_POST['index'];

$sql = "UPDATE todolist SET todo = '$todo' WHERE id = '$index'";

$db_connect->query($sql);


// 关闭连接
mysqli_close($db_connect);