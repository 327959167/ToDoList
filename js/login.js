// 用户名和密码不为空验证
$( '#username' ).on( 'blur', ( ) => {
  var username = $( '#username' ).val( )
  if ( username == '' ) {
    alert( '用户名不能为空！' )
    return false
  } else if ( username.trim( ).length > 20 ) {
    alert( '用户名长度不得大于20位！' )
    $( '#username' ).val( '' )
    return false
  }
} )
$( '#password' ).on( 'blur', ( ) => {
    var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
    var password = $( '#password' ).val( )
    if ( password == '' ) {
      alert( '密码不能为空！' )
      return false
    } else if ( !reg.exec( password ) ) {
      alert( '密码为6~20位字母与数字组合！' )
      $( '#password' ).val( '' )
      return false
    }
  } )
  //表单内容的发送
$( '#sure' ).on( 'click', ( ) => {
  var username = $( '#username' ).val( )
  var password = $( '#password' ).val( )

  if ( username.trim( ).length == 0 || password.trim( ).length == 0 ) {
    alert( '用户名或密码为空！' )
    return false
  } else {
    $.ajax( {
      type: 'POST',
      url: './control/logincheck.php',
      data: {
        username: username,
        password: password,
      },
      success: function( data ) {
        if ( data ) {
          window.location.href = 'todolist.php'
            // 将用户名存进session
          sessionStorage.setItem( 'username', username )
        } else {
          alert( '账号或密码错误！' )
        }
      },
      error: function( ) {
        alert( '服务器出现错误！' )
      },
    } )
  }
  // 阻止表单的默认提交事件
  return false
} )
