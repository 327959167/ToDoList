<?php
// 连接数据库
include './connect.php';

// 获取前端传来的用户名与密码
$username = $_POST['username'];
$password = $_POST['password'];
// 查询用户是否存在
$sql = "select * from login where username = '$username'";
$result = $db_connect->query($sql);
// 循环返回结果
$flag = true;
while ($row = $result->fetch_object()) {
    if ($row->password == $password) {
        $flag = true;
        session_start();
        $_SESSION['username']  = $username;
    } else {
        $flag = false;
    }
}
echo $flag;

// 关闭连接
mysqli_close($db_connect);