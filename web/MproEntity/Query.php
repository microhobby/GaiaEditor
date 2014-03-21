<?php

        require_once 'LauDB.php';

        if (isset($_POST["cmd"]))
                $cmd = $_POST["cmd"];
        
        $laudb = new LauDB("GaiaMproEntities.lau");

        $res = $laudb->query($cmd);
        
        sleep(3);
        
        echo json_encode($res);
?>

