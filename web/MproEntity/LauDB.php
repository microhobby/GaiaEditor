<?php

class LauDB
{
          private $_conn; //referencia a conexão
          private $_elems; //querys
          private $_elemArray; //vetor dos dados associados
          private $_countArray; //conta quantos dados vieram no sql
          private $_elem; //elemento retornado pelo prox

          /**
           * Código construtor </br>
           * $filename: Caminho do arquivo de banco de dados a ser
           * aberto
           */
          function __construct($filename)
          {
                    try
                    {
                              $this->_conn = new PDO('sqlite:'.$filename);
                              $this->_conn->exec("PRAGMA synchronous=OFF");
                    }
                    catch (Exception $e)
                    {
                              echo 'Mpro L.A.U DB ERROR: '.$e;
                              die($e);
                    }
          }

          /**
           * Abre arquivo de banco de dados </br>
           * $filename: Caminho do arquivo de banco de dados a ser
           * aberto
           */
          public function open($filename)
          {
                    try
                    {
                              $this->_conn = new PDO('sqlite:'.$filename);
                    }
                    catch (Exception $e)
                    {
                              echo 'Mpro L.A.U DB ERROR: '.$e;
                              die($e);
                    }
          }

          /**
           * Executa comando sql </br>
           * $cmd: String sql </br>
           * return: Objeto com os dados retornados pela sql
           * @return PDOStatement
           */
          public function query($cmd)
          {
                    $this->_elems = $this->_conn->query($cmd);
                    //$this->_elems = $this->_conn->prepare($cmd);
                    if($this->_elems)
                    {
                              $this->_elemArray = $this->_elems->fetchAll(PDO::FETCH_NUM);
                              $this->_countArray = count($this->_elemArray);
                              return $this->_elemArray;
                    }
                    else
                    {
                              $arrE = $this->_conn->errorInfo();
                              echo 'Mpro L.A.U DB ERROR: '.$arrE[2]." :: '".$cmd."'";
                    }
          }

          /**
           * Executa comando sql sem retornar todos os dados
           * @param string $cmd
           * @return bool
           */
          public function unQuery($cmd)
          {
                    $this->_elems = $this->_conn->query($cmd);
                    if($this->_elems)
                    {
                              return true;
                    }
                    else
                    {
                              $arrE = $this->_conn->errorInfo();
                              echo 'Mpro L.A.U DB ERROR: '.$arrE[2]." :: '".$cmd."'";
                              return false;
                    }
          }

          /**
           * Função que aponta pra linha que quero
           * @param int $row
           * @param string $table
           * @return string
           */
          public function Row($row, $table)
          {
                    for($i = 0; $i < $this->countRows(); $i++)
                    {
                              if($i == $row)
                              {
                                        $tmp = $this->_elemArray[$i][$table];
                                        break;
                              }
                    }

                    return $tmp;
          }//fim Row

          /**
           * Executa comando sql </br>
           * $cmd: String sql </br>
           * return: Verdadeiro caso haja sucesso no comando e falso caso não
           */
          public function execute($cmd)
          {
                    //$exe = $this->_conn->prepare($cmd);
                    if($this->_conn->exec($cmd))
                    {
                              //$exe->execute();
                              return true;
                    }
                    else
                              return false;
          }

          public function get_last_insert_rowid()
          {
                    $this->unQuery("SELECT last_insert_rowid();");
                    if($this->_elems)
                              return $this->prox()->{"last_insert_rowid()"};
                    return null;
          }
          
          /**
           * Retorna quantos elementos foram aplicados </br>
           */
          public function count()
          {

                    return $this->_elems->rowCount();
          }

          /**
           * Implementa o fetch do objetos de dados </br>
           * É aconselhável que só se use esse método quando for implementa-lo em loop while
           */
          public function prox()
          {
                    return $this->_elem = $this->_elems->fetchObject();
          }

          /**
           * Retorna o objeto resgatado pelo prox() </br>
           * É aconselhável que só se use esse método quando for implementa-lo em loop while
           * @return PDOStatement
           */
          public function getElem()
          {
                    return $this->_elem;
          }

          /**
           * Retorna quantos dados foram resolvidos por QUERY
           */
          public function countRows()
          {
                    return $this->_countArray;
          }

          /**
           * Destroi a conexão com o arquivo de dados </br>
           */
          public function close()
          {
                    $this->_conn = null;
          }
}
?>