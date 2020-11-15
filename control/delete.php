<?php
include '../control/connect.php';

$index = $_POST['index'];

$sql = "delete from todolist where id = '$index'";

$db_connect->query($sql);



// 关闭连接
mysqli_close($db_connect);