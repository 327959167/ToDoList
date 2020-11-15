// 获取session用户的姓名
var data = sessionStorage.getItem( 'username' )
  // 设置username
$( '#username' ).text( data + '  ▼' )

// 监听键盘enter事件
$( '#search' ).on( 'focus', function( ) {
  $( document ).on( 'keypress', 'form', function( event ) {
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
    if ( event.keyCode == 13 ) {
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
          success: function( reponsText ) {
            location.reload( )
          },
          error: function( ) {
            alert( '请求出错了！' )
          },
        } )
      }
      $( '#search' ).val( '' )
      return false
    }
    return event.keyCode != 13
  } )
} )
