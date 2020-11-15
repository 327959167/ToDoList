<?php
// 连接数据库
$dbname = "root";
$dbpass = "123456";
$dbhost = "localhost";
$dbdatabase = "bookshop";
$db_connect = new mysqli($dbhost, $dbname, $dbpass, $dbdatabase);
// 防止中文乱码
mysqli_query($db_connect, 'set names utf8');