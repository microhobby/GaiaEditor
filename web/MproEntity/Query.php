<?php

        require_once 'LauDB.php';

        if (isset($_POST["cmd"]))
                $cmd = $_POST["cmd"];
        
        $laudb = new LauDB("GaiaMproEntities.lau");

        $res = $laudb->query(stripslashes($cmd));
        
        //sleep(2);
        
        echo json_encode($res);
?>

