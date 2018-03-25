<?php

session_start();
ob_start();

$_SESSION['credentials'] = json_decode("{\"credential\":\"Pesquisador\", \"cod\": 1}");

?>