<?php 
function isAuthenticated() {

return isset($_COOKIE['auth_token']) && !empty($_COOKIE['auth_token']);

}
?>