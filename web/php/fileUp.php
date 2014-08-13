<?php

$data = array();


$error = false;
$files = array();

$uploaddir = '../uploads/';
$retJSON = "{\"files\":[";

foreach($_FILES as $file)
{
        if(move_uploaded_file($file['tmp_name'][0], $uploaddir.time().".".$file['name'][0]))
        {
                $files[] = $uploaddir .time().".".$file['name'][0];
                $retJSON .= "{\"name\":\""  . time().".".$file['name'][0] . "\", \"size\":\"" . $file['size'][0] . "\", \"type\": \"multipart form-data;\"}";
        }
        else
        {
            $error = true;
        }
}

if($error)
{
        $retJSON  = "{\"files\":[" 
                . "{\"name\":\"0.Erro no servidor!. \", \"size\":\"1024\", \"type\": \"multipart form-data;\", \"error\":\"" . "deu ruim" . "\"}]}";
}
else
{
        $retJSON .= "]}";
}

echo $retJSON;

?>