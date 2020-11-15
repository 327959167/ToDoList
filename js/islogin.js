var loginFlag = sessionStorage.getItem( 'username' )
if ( !loginFlag ) {
  window.location = 'login.html'
}
