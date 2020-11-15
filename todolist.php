<script src="./js/islogin.js"></script>
<noscript>
    对不起，由于您的浏览器禁用了javascript，你暂时无法对此网站进行任何数据的操作网站！
</noscript>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="css/todolist.css" />
</head>

<body>
    <?php
    include './control/connect.php';
    session_start();
    $username = $_SESSION['username'];
    // 未完成的记录条数
    $sqlcount = "select count(*) from todolist WHERE `status` = '0'  and username = '$username' ";
    $count = $db_connect->query($sqlcount);
    $num = $count->fetch_all();
    // 已经完成的记录条数
    $sqlcount1 = "select count(*) from todolist WHERE `status` = '1'  and username = '$username' ";
    $count1 = $db_connect->query($sqlcount1);
    $num1 = $count1->fetch_all();
    ?>
    <div class="container">
        <!-- 导航栏 -->
        <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">ToDoList</a>
                </div>

                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <div class="navbar-form navbar-left navbarsearch">
                        <form class="form-group" onkeypress="return event.keyCode != 13;">
                            <input type="text" class="form-control" id="search" placeholder="Please enter something">
                        </form>
                        <button class="btn btn-default" id="submit">Submit</button>
                    </div>
                    <ul class="nav navbar-nav navbar-right">
                        <li><img src="./images/login3.jpg" id="headerimg"></li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                                aria-haspopup="true" aria-expanded="false" id="username">
                                <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="#">个人中心</a></li>
                                <li><a href="#">信息修改</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="javascript:loginout()">退出登录</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- 导航栏 -->

        <!-- 未完成 -->
        <div class="matters unfinished">
            <div class="title">
                <div class="left">正在进行</div>
                <div class="right"><?php echo $num[0][0]; ?></div>
            </div>
            <div class="todo">
                <ul>
                    <?php
                    include './control/connect.php';
                    $sql = "select * from todolist where status = '0' and username = '$username' ";
                    $result = $db_connect->query($sql);

                    foreach ($result as $row) {
                        echo "<li>";
                        echo "<div>";
                        echo "<span>&nbsp;</span>";
                        echo '<input type="checkbox" class="checkbox" value=' . $row["id"] . '>';
                        echo '<input type="text" class="form-control text" name=' . $row["id"] . ' value=' . $row["todo"] . '   >';
                        echo "<span id='time'>" . $row["date"] . "</span>";
                        echo "<a class='glyphicon glyphicon-trash' id='dele' href='javascript:dele(" . $row['id'] . ")'></a>";
                        echo "</div>";
                        echo "</li>";
                    }
                    ?>
                </ul>
            </div>
        </div>
        <!-- 未完成 -->

        <!-- 以完成 -->
        <div class="matters finished">
            <div class="title">
                <div class="left">已经完成</div>
                <div class="right"><?php echo $num1[0][0]; ?></div>
            </div>
            <div class="todo">
                <ul>
                    <?php
                    $sql1 = "select * from todolist where status = '1' and username = '$username' ";
                    $result1 = $db_connect->query($sql1);

                    foreach ($result1 as $row) {
                        echo "<li>";
                        echo "<div>";
                        echo "<span>&nbsp;</span>";
                        echo '<input type="checkbox" checked class="checkbox" value=' . $row["id"] . '>';
                        echo '<input type="text" class="form-control text" value=' . $row["todo"] . '   >';
                        echo "<span id='time'>" . $row["date"] . "</span>";
                        echo "<a class='glyphicon glyphicon-trash' id='dele' href='javascript:dele(" . $row['id'] . ")'></a>";
                        echo "</div>";
                        echo "</li>";
                    }

                    // 关闭连接
                    mysqli_close($db_connect);
                    ?>
                </ul>
            </div>
        </div>
        <!-- 以完成 -->
    </div>
    <script src="./js/todolist.js"></script>
    <script src="./js/todolist2.js"></script>
</body>

</html>