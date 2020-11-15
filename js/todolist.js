// 代办事项
$( '#submit' ).on( 'click', function( ) {
  // 获取当前时间
  Date.prototype.format = function( fmt ) {
    var o = {
      'M+': this.getMonth( ) + 1, //月份
      'd+': this.getDate( ), //日
      'h+': this.getHours( ) % 12 == 0 ? 12 : this.getHours( ) % 12, //小时
      'H+': this.getHours( ), //小时
      'm+': this.getMinutes( ), //分
      's+': this.getSeconds( ), //秒
      'q+': Math.floor( ( this.getMonth( ) + 3 ) / 3 ), //季度
      S: this.getMilliseconds( ), //毫秒
    }
    if ( /(y+)/.test( fmt ) )
      fmt = fmt.replace(
        RegExp.$1,
        ( this.getFullYear( ) + '' ).substr( 4 - RegExp.$1.length )
      )
    for ( var k in o )
      if ( new RegExp( '(' + k + ')' ).test( fmt ) )
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1 ?
          o[ k ] :
          ( '00' + o[ k ] ).substr( ( '' + o[ k ] ).length )
        )
    return fmt
  }
  var myDate = new Date( )
  myDate = new Date( ).format( 'yyyy-MM-dd HH:mm:ss' )
    // 获取当前时间

  // 用户输入的待办事项
  var txt = $( '#search' ).val( )
  var username = sessionStorage.getItem( 'username' )

  if ( txt == '' ) {
    alert( '代办事项不能为空！' )
    return false
  } else {
    $.ajax( {
      type: 'POST',
      url: './control/todolist.php',
      data: {
        txt: txt,
        username: username,
        status: 0,
        myDate: myDate,
      },
      success: function( response ) {
        location.reload( )
        console.log( response )
      },
      error: function( ) {
        alert( '请求出错了！' )
      },
    } )
  }

  $( '#search' ).val( '' )
  return false
} )

// 事件的删除
function dele( id ) {
  var index = id
  $.ajax( {
    type: 'POST',
    url: './control/delete.php',
    data: {
      index: index,
    },
    success: function( reponsText ) {
      location.reload( )
    },
    error: function( ) {
      alert( '删除失败，请联系管理员！' )
    },
  } )
}

// 完成的选项
$( '.checkbox' ).click( function( ) {
  // 获取当前时间
  Date.prototype.format = function( fmt ) {
    var o = {
      'M+': this.getMonth( ) + 1, //月份
      'd+': this.getDate( ), //日
      'h+': this.getHours( ) % 12 == 0 ? 12 : this.getHours( ) % 12, //小时
      'H+': this.getHours( ), //小时
      'm+': this.getMinutes( ), //分
      's+': this.getSeconds( ), //秒
      'q+': Math.floor( ( this.getMonth( ) + 3 ) / 3 ), //季度
      S: this.getMilliseconds( ), //毫秒
    }
    if ( /(y+)/.test( fmt ) )
      fmt = fmt.replace(
        RegExp.$1,
        ( this.getFullYear( ) + '' ).substr( 4 - RegExp.$1.length )
      )
    for ( var k in o )
      if ( new RegExp( '(' + k + ')' ).test( fmt ) )
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1 ?
          o[ k ] :
          ( '00' + o[ k ] ).substr( ( '' + o[ k ] ).length )
        )
    return fmt
  }
  var myDate = new Date( )
  myDate = new Date( ).format( 'yyyy-MM-dd HH:mm:ss' )
    // 获取当前时间

  // 当前点击的id
  var index = $( this ).attr( 'value' )
  var status

  if ( $( this ).is( ':checked' ) ) {
    status = 1
  } else {
    status = 0
  }

  $.ajax( {
    type: 'POST',
    url: './control/finish.php',
    data: {
      index: index,
      status: status,
      myDate: myDate,
    },
    success: function( reponsText ) {
      location.reload( )
    },
    error: function( ) {
      alert( 'error！' )
    },
  } )
} )

// 焦点框改变事项的功能
$( '.text' ).blur( function( e ) {
  var todo = $( this ).val( )
  var index = $( this ).attr( 'name' )

  if ( todo.trim( ) == '' ) {
    alert( '代办事项不能为空！' )
    location.reload( )
  } else {
    $.ajax( {
      type: 'POST',
      url: './control/changetodo.php',
      data: {
        todo: todo,
        index: index,
      },
      success: function( responText ) {
        location.reload( )
      },
      error: function( ) {
        alert( '服务器出现错误，你暂时无法修改代办事项，请稍后再试！' )
        location.reload( )
      },
    } )
  }
} )

// 退出登录
function loginout( ) {
  sessionStorage.removeItem( 'username' )
  window.location = 'login.html'
}
