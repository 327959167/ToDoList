<?php
// 连接数据库
include './connect.php';

// 获取代办事项、状态值、用户名
$txt = $_POST['txt'];
$username = $_POST['username'];
$status = $_POST['status'];
$myDate = $_POST['myDate'];

// 将代办事项写入数据库
$sql = "INSERT INTO todolist (`status`, todo, username,`date`) VALUES ('$status', '$txt', '$username','$myDate')";

if ($db_connect->query($sql) === TRUE) {
    echo "新记录插入成功";
} else {
    echo "Error: " . $sql . "<br>" . $db_connect->error;
}

// 关闭连接
mysqli_close($db_connect);