<?php
session_start();
ob_start();
require_once '../MproEntity/LauDB.php';

$email = $_POST['email'];
$senha = $_POST['senha'];

$db = new LauDB("../MproEntity/GaiaMproEntities.lau");

$res = $db->query("SELECT * FROM Pesquisador WHERE Email = '".$email."' AND SenhaCrypt = '{}".$senha."';");
if($res != null)
{
          for($i = 0; $i < count($res); $i++)
          {
                  $_SESSION['credentials'] = json_decode("{\"credential\":\"Pesquisador\", \"cod\": ".$res[i][0]."}");
                  echo "{\"ok\":true}";
                  break;
          }
}
else
{
        $res = $db->query("SELECT * FROM Orientador WHERE Email = '".$email."' AND SenhaCrypt = '{}".$senha."';");

        if($res)
        {
                for($i = 0; $i < count($res); $i++)
                {
                        $_SESSION['credentials'] = json_decode("{\"credential\":\"MASTER\", \"cod\": ".$res[i][0]."}");
                        echo "{\"ok\":true}";
                        break;
                }
        }
        else
        {
                echo "{\"ok\":false}";
        }
}

?>