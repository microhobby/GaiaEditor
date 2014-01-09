<?php

require_once 'MproEntity.php';

/**
 * Description of MproEntityRelation
 *
 * @author Matheus
 */
abstract class MproEntityRelation extends MproEntity
{
          public $superCod = 0;
          
          public static function EntityRelationType($fromClas)
          {
                    return "Entity".$fromClas;
          }
          
          function __construct() 
          {
                    parent::__construct();
          }
}

?>
