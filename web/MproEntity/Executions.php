<?php

        require_once 'LauDB.php';

        if (isset($_POST["jsonList"]))
                $json = $_POST["jsonList"];
        if(isset($_POST["ins"]))
                $ins = $_POST["ins"];
        
        $laudb = new LauDB("GaiaMproEntities.lau");
        $json = json_decode($json);
        
        for($i = 0; $i < count($json); $i++)
        {
                $laudb->execute($json[$i]);
        }
        if($ins == "ver")
                echo $laudb->get_last_insert_rowid();
        else
                echo "SUCESSO";
?>
