<?php

require_once "LauDB.php";
require_once "Lista.php";
require_once "MproEntityRelation.php";

/**
 * Description of MproEntity
 *
 * @author Matheus
 */
abstract class MproEntity
{
          private static $_conn = null;
          public $cod;
          private $reflection;
          private $class = array();
          private $joined;
          private $nameRelation;
          
          /**
           * Retorna a table intera sem exeção
           * @return Lista
           */
          public static function getAll($class)
          {
                    if(!MproEntity::$_conn)
                              MproEntity::$_conn = new LauDB("MproEntity.lau");
                    
                    $list = new Lista();
                    $contains = new Lista();
                    
                    $cc = new $class();
                    $res = array(array());
                    $tmp = null;
                    $arrT = null;
                    $join = null;
                    $c = array();
                    
                    $fields = $cc->reflection->getProperties(ReflectionProperty::IS_PUBLIC);
                    foreach ($fields as $field)
                    {
                              $c[] = $field->getName();
                    }
                    
                    for($j = 0; $j < count($c); $j++)
                    {
                              //if(gettype($cc->{$c[$j]}) == "Object")
                              if(strpos($c[$j], "Entity") !== false)
                              {
                                        $join = $c[$j];
                              }
                              else
                                        $contains->add ($c[$j]);
                    }
                    
                    $parts = "";
                    
                    for($j = 0; $j < $contains->getTam(); $j++)
                    {
                              $parts .= $contains->get($j).", ";
                    }
                    
                    $parts = preg_replace("{, $}", "", $parts);
                    $res = MproEntity::$_conn->query("SELECT ".$parts." FROM ".$class.";");
                    
                    if($res != null)
                    {
                              for($i = 0; $i < count($res); $i++)
                              {
                                        $tmp = new $class();
                                        
                                        for($j = 0; $j < $contains->getTam(); $j++)
                                        {
                                                  if($res[$i][$j] != null)
                                                  {
                                                            if(($res[$i][$j] == "0") && ($contains->get($j) != "cod"))
                                                                      $tmp->{$contains->get ($j)} = false;
                                                            else if(($res[$i][$j] == "1") && ($contains->get($j) != "cod"))
                                                                      $tmp->{$contains->get ($j)} = true;
                                                            else
                                                                      $tmp->{$contains->get ($j)} = $res[$i][$j];
                                                  }
                                        }
                                        
                                        if($join != null)
                                        {
                                                  $fName = str_replace("Entity", "", $join);
                                                  $t = new $fName();
                                                  $arrT = new Lista();
                                                  $t->superCod = $tmp->cod;
                                                  $arrT = MproEntity::getWhere($t);
                                                  $tmp->{$join} = $arrT;
                                        }
                                        
                                        $list->add($tmp);
                              }
                    }
                    
                    return $list;
          }
          
          /**
           * @return Lista
           */
          public static function getSQL($class, $where)
          {
                   if(!MproEntity::$_conn)
                              MproEntity::$_conn = new LauDB("MproEntity.lau");
                   
                    $list = new Lista();
                    $fildsnames = new Lista();
                    $filds = "";
                    $cf = null;
                    $c = array();
                    $tmp = new $class();
                     
                     $fields = $tmp->reflection->getProperties(ReflectionProperty::IS_PUBLIC);
                     foreach ($fields as $field)
                     {
                               $c[] = $field->getName();
                     }
                     
                     for($j = 0; $j < count($c); $j++)
                     {
                               //if(gettype($filterObj->{$c[$j]}) == "Object")
                               if(strpos($c[$j], "Entity") !== false)
                               {
                                         $cf = $c[$j];
                                         continue;
                               }
                               else
                                         $fildsnames->add ($c[$j]);
                     }
                     
                     $sql = "SELECT * FROM ".$class." WHERE ".$where;
                     $res = MproEntity::$_conn->query($sql);
                     for($i = 0; $i < count($res); $i++)
                     {
                               $tmp = new $class();
                               
                               for($j = 0; $j < $fildsnames->getTam(); $j++)
                               {
                                        if($res[$i][$j] != null)
                                        {
                                                  if(($res[$i][$j] == "0") && ($fildsnames->get($j) != "cod"))
                                                            $tmp->{$fildsnames->get ($j)} = false;
                                                  else if(($res[$i][$j] == "1") && ($fildsnames->get($j) != "cod"))
                                                            $tmp->{$fildsnames->get ($j)} = true;
                                                  else
                                                            $tmp->{$fildsnames->get ($j)} = $res[$i][$j];
                                        }
                               }
                               
                               if($cf != null)
                              {
                                        $fName = str_replace("Entity", "", $cf);
                                        $typin = new $fName();
                                        $typin->superCod = $tmp->cod;
                                        $mpR = MproEntity::getWhere($typin);
                                        $tmp->{$cf} = $mpR;
                              }
                               
                               $list->add($tmp);
                     }
                     
                     return $list;
          }
          
          /**
           * @return Lista 
           */
          public static function getWhere($filterObj, $enaB)
          {
                     if(!MproEntity::$_conn)
                              MproEntity::$_conn = new LauDB("MproEntity.lau");
                     if($enaB == null)
                               $enaB = false;
                     
                     $list = new Lista();
                     $fildsnames = new Lista();
                     $cc = get_class($filterObj);
                     $where = "";
                     $filds = "";
                     $sql = "SELECT ";
                     $cf = null;
                     $c = array();
                     
                     $fields = $filterObj->reflection->getProperties(ReflectionProperty::IS_PUBLIC);
                     foreach ($fields as $field)
                     {
                               $c[] = $field->getName();
                     }
                     
                     for($j = 0; $j < count($c); $j++)
                     {
                               //if(gettype($filterObj->{$c[$j]}) == "Object")
                               if(strpos($c[$j], "Entity") !== false)
                               {
                                         $cf = $c[$j];
                                         continue;
                               }
                               else
                                         $fildsnames->add ($c[$j]);
                               
                               if(($filterObj->{$c[$j]} != PHP_INT_MAX) && ($filterObj->{$c[$j]} != null))
                               {
                                        if(gettype($filterObj->{$c[$j]}) != "boolean" && $enaB)
                                                  $where .= $c[$j]." = ".($filterObj->{$c[$j]} ? "1" : "0").", ";
                                        else if(gettype($filterObj->{$c[$j]}) != "boolean")
                                                  $where .= $c[$j]." = '".$filterObj->{$c[$j]}."', ";
                                        $filds .= $c[$j].", ";
                               }
                     }
                     
                     $where = preg_replace("/\, /", " AND ", $where);
                     $where = preg_replace("{AND $}", " ", $where);
                     $filds = preg_replace("{, $}", "", $filds);
                     $sql .= "* FROM ".$cc." WHERE ".$where.";";
                     $res = MproEntity::$_conn->query($sql);
                     for($i = 0; $i < count($res); $i++)
                     {
                               $tmp = new $cc();
                               
                               for($j = 0; $j < $fildsnames->getTam(); $j++)
                               {
                                        if($res[$i][$j] != null)
                                        {
                                                  if(($res[$i][$j] == "0") && ($fildsnames->get($j) != "cod"))
                                                            $tmp->{$fildsnames->get ($j)} = false;
                                                  else if(($res[$i][$j] == "1") && ($fildsnames->get($j) != "cod"))
                                                            $tmp->{$fildsnames->get ($j)} = true;
                                                  else
                                                            $tmp->{$fildsnames->get ($j)} = $res[$i][$j];
                                        }
                               }
                               
                               if($cf != null)
                              {
                                        $fName = str_replace("Entity", "", $cf);
                                        $typin = new $fName();
                                        $typin->superCod = $tmp->cod;
                                        $mpR = MproEntity::getWhere($typin);
                                        $tmp->{$cf} = $mpR;
                              }
                               
                               $list->add($tmp);
                     }
                     
                     return $list;
          }
          
          function __construct() 
          {
                    if(!MproEntity::$_conn)
                              MproEntity::$_conn = new LauDB("MproEntity.lau");
                    $this->reflection = new ReflectionClass($this);
                    $this->cod = PHP_INT_MAX;
                    $this->nameRelation = "";
                    $this->getClass();
                    $this->initialConfig();
                    $this->toNull();
          }
          
          
          public function Save()
          {
                    if($this->cod == PHP_INT_MAX)
                    {
                              MproEntity::$_conn->execute("INSERT INTO ".get_class($this)." VALUES( ".$this->getValues().");");
                              $this->cod = MproEntity::$_conn->get_last_insert_rowid();
                              if($this->joined)
                              {
                                        $arr = $this->{$this->nameRelation};
                                        if($arr)
                                        {
                                                  for($i = 0; $i < $arr->getTam(); $i++)
                                                  {
                                                            $arr->get($i)->superCod = $this->cod;
                                                            $arr->get($i)->Save();
                                                  }
                                        }
                              }
                    }
                    else
                    {
                              MproEntity::$_conn->execute("UPDATE ".get_class($this)." SET ".$this->getValuesUpdate()." WHERE cod = ".$this->cod);
                              if($this->joined)
                              {
                                        $arr = $this->{$this->nameRelation};
                                        for($i = 0; $i < $arr->getTam(); $i++)
                                        {
                                                 $arr->get($i)->superCod = $this->cod;
                                                  $arr->get($i)->Save();  
                                        }
                                        $this->joined = true;
                              }
                    }
          }
          
          public function Delete()     
          {
                    if($this->cod != PHP_INT_MAX)
                    {
                              MproEntity::$_conn->execute("DELETE FROM ".get_class($this)." WHERE cod = ".$this->cod);
                    }
          }

          

          private function initialConfig()
          {
                    $isEqual = false;
                    $tableInfo = MproEntity::$_conn->query("Pragma table_info(".get_class($this).")");
                    $fieldNot = new Lista();
                    $changesTable = new Lista();
                    
                    if(($tableInfo == null) || (count($tableInfo) == 0))
                    {
                              MproEntity::$_conn->execute("CREATE TABLE ".get_class($this)."(".$this->getTableFields().")");
                              return;
                    }
                    else
                    {
                              // verifica campos
                              for($j = 0; $j < count($this->class); $j++)
                              {
                                        for($i = 0; $i < count($tableInfo); $i++)
                                        {
                                                  //if(gettype($this->{$this->class[$j]}) != "object")
                                                  if(strpos($this->class[$j], "Entity") === false)
                                                  {
                                                            $fName = str_replace("Entity", "", $this->class[$j]);
                                                            $isEqual = $tableInfo[$i][1] == $fName ? true : false;
                                                            if($isEqual)
                                                                      break;
                                                  }
                                                  else
                                                  {
                                                            $this->joined = true;
                                                            $this->nameRelation = $this->class[$j];
                                                  }
                                        }
                                        
                                        // se tem campo
                                        if(!$isEqual)
                                        {
                                                  $fieldNot->add($this->class[$j]);
                                        }
                              }
                              
                              // se tem algum no fieldNot
                              if($fieldNot->getTam() > 0)
                              {
                                        $fieldNot = $this->getTableFieldsFromLista($fieldNot);
                                        for($i = 0; $i < $fieldNot->getTam(); $i++)
                                        {
                                                  MproEntity::$_conn->execute($fieldNot->get($i));
                                        }
                              }
                              
                              // vamos testar se temos que trocar algo
                              $isEqual = false;
                              for($w = 0; $w < count($tableInfo); $w++)
                              {
                                        $cf = new containField($tableInfo[$w][1], $tableInfo[$w][2], false);
                                        for($q = 0; $q < count($this->class); $q++)
                                        {
                                                  $cf->isDB = $this->class[$q] == $cf->name ? true : false;
                                                  if($cf->isDB)
                                                            break;
                                        }
                                        
                                        if($cf->isDB)
                                                  $changesTable->add($cf);
                                        else
                                                  $isEqual = true;
                              }
                              
                              // agora podemos fazer as querys
                              if(($changesTable->getTam() > 0) && $isEqual)
                                        $this->changeTable($changesTable);
                    }
          }
          
          /**
           *  Pega valores para insert
           * @return string
           */
          private function getValues()
          {
                    $parts = "";          
                    for($i = 0; $i < count($this->class); $i++)
                    {
                             // if(gettype($this->{$this->class[$i]}) != "object")
                               if(strpos($this->class[$i], "Entity") === false)
                               {
                                        if(gettype($this->{$this->class[$i]}) == "boolean")
                                                  $parts .= $this->{$this->class[$i]} ? "1, " : "0, ";
                                        else if($this->class[$i] != "cod")
                                                  $parts .= (gettype ($this->{$this->class[$i]}) == "string" ? "'" : "").
                                                                      ($this->{$this->class[$i]}).
                                                                      (gettype ($this->{$this->class[$i]}) == "string" ? "', " : ", ");
                                        else
                                                  $parts .= "NULL, ";
                              }
                              else
                              {
                                        $this->joined = true;
                                        $this->nameRelation = $this->class[$i];
                              }
                    }
                    $parts = preg_replace("{, $}", " ", $parts);
                    return $parts;
          }
          
          /**
           * Pega valores com seus campos para update
           * @return string
           */
          private function getValuesUpdate()
          {
                    $parts = "";          
                    for($i = 0; $i < count($this->class); $i++)
                    {
                              //if(gettype($this->{$this->class[$i]}) != "object")
                              if(strpos($this->class[$i], "Entity") === false)
                              {
                                          if($i < count($this->class) -1)
                                          {
                                                  if(gettype($this->{$this->class[$i]}) == "boolean")
                                                          $parts .= $this->class[$i]." = ".($this->{$this->class[$i]} ? "1, " : "0, ");
                                                  else
                                                            $parts .= $this->class[$i]." = ".(gettype ($this->{$this->class[$i]}) == "string" ? "'" : "").
                                                                              ($this->{$this->class[$i]}).
                                                                              (gettype ($this->{$this->class[$i]}) == "string" ? "', " : ", ");
                                          }
                                          else
                                          {
                                                   if(gettype($this->{$this->class[$i]}) == "boolean")
                                                          $parts .= $this->class[$i]." = ".($this->{$this->class[$i]} ? "1" : "0");
                                                  else
                                                            $parts .= $this->class[$i]." = ".(gettype ($this->{$this->class[$i]}) == "string" ? "'" : "").
                                                                              ($this->{$this->class[$i]}).
                                                                              (gettype ($this->{$this->class[$i]}) == "string" ? "'" : ""); 
                                          }         
                              }
                              else
                              {
                                        $this->joined = true;
                                        $this->nameRelation = $this->class[$i];
                              }
                    }
                    return $parts;
          }
          
          /**
           * 
           * @return LauDB
           */
          public static function getConnection()
          {
                    return MproEntity::$_conn;
          }
          
          /**
           * 
           * @param Lista $arrcf 
           */
          private function changeTable($arrcf)
          {
                    if($arrcf->getTam() > 0)
                    {
                              $parts = "CREATE TABLE tmp(".$this->getTableFields().");";
                              $parts1 = "INSERT INTO tmp( ";
                              $parts2 = "";
                              for($i = 0; $i < $arrcf->getTam(); $i++)
                              {
                                        if($i < $arrcf->getTam() -1)
                                                  $parts2 .= $arrcf->get($i)->name.", ";
                                        else
                                                   $parts2 .= $arrcf->get($i)->name." ";
                              }
                              $parts1 .= $parts2.") SELECT ".$parts2." FROM ".get_class($this).";";
                              // começa
                              MproEntity::$_conn->execute($parts);
                              MproEntity::$_conn->execute($parts1);
                              MproEntity::$_conn->execute("DROP TABLE ".get_class($this).";");
                              MproEntity::$_conn->execute("ALTER TABLE tmp RENAME TO ".get_class($this).";");
                    }
          }
          
          /**
           * Pega os parametrizados para Alteração
           * @param Lista $arrl
           * @return Lista Description
           */
          private function getTableFieldsFromLista($arrl)
          {
                    $parts = "";
                    $_parts = new Lista();
                    $_parts->add("CREATE TABLE tmp(".$this->getTableFields().");");
                    for($i = 0; $i < $arrl->getTam(); $i++)
                    {
                              for($j = 0; $j < count($this->class); $j++)
                              {
                                        if($arrl->get($i) != $this->class[$j])
                                        {
                                                  $parts .= $this->class[$j].", ";
                                        }
                              }
                    }
                    $parts = preg_replace("{, $}", "", $parts);
                    $_parts->add("INSERT INTO tmp(".$parts.") SELECT ".$parts." FROM ".get_class($this).";");
                    $_parts->add("DROP TABLE ".get_class($this).";");
                    $_parts->add("ALTER TABLE tmp RENAME TO ".get_class($this).";");
                    return $_parts;
          }
          
          private function getTableFields()
          {
                    $parts = "";
                    for($i = 0; $i < count($this->class); $i++)
                    {
                              //if(gettype($this->{$this->class[$i]}) != "Object")
                              if(strpos($this->class[$i], "Entity") === false)
                              {
                              
                                        if($this->class[$i] != "cod")
                                                  $parts .= $this->class[$i]." ".(gettype($this->{$this->class[$i]}) == "string" ? "TEXT, " : "NUMERIC, ");
                                        else
                                                  $parts .= $this->class[$i]." INTEGER PRIMARY KEY";
                              }
                              else
                              {
                                        $this->joined = true;
                                        $this->nameRelation = $this->class[$i];
                              }
                    }
                    $parts = preg_replace("{, $}", "", $parts);
                    return $parts;
          }
          
          private function getClass()
          {
                    $fields = $this->reflection->getProperties(ReflectionProperty::IS_PUBLIC);
                    foreach ($fields as $field)
                    {
                              $this->class[] = $field->getName();
                    }
                    
                    /*echo "<br><pre>";
                    print_r($this->class);
                    echo "</pre><br>";
                    echo "CREATE TABLE ".get_class($this)."(".$this->getTableFields().")<br>";*/
          }
          
          private function toNull()
          {
                    for($i = 0; $i < count($this->class); $i++)
                    {
                              $field = $this->class[$i];
                              if(gettype($this->{$field}) == "string")
                                        $this->{$field} = null;
                              else if(gettype($this->{$field}) == "boolean")
                                        $this->{$field} = false;
                              else
                                        $this->{$field} = PHP_INT_MAX;
                    }
          }
}

class containField
{
          public $isDB = false;
          public $name = "";
          public $type = "";
          public $field = "";

          function __construct($_name, $_type, $_idDb)
          {
                    $this->isDB = $_idDb;
                    $this->name = $_name;
                    $this->type = $_type;
          }
          
          public function cointainField($_field)
          {
                    $this->field = $_field;
          }
}

?>
