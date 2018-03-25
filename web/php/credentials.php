<?php

session_start();
ob_start();

//echo $_SESSION['credentials']; 

if($_SESSION['credentials'])
{
        echo json_encode($_SESSION['credentials']);
}
else
{
        echo "null<br>";
}

?>