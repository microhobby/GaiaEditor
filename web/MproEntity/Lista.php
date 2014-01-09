<?php

class Lista implements Iterator
{
          private $lista_ = array();
          private $tam = 0;
          private $position = 0;

          //adiciona na lista
          public function add($str)
          {
                    $this->lista_[] = $str;
                    $this->tam++;
          }

          //remove da lista
          public function rem($int)
          {
                    $tmp = $this->lista_[$int];
                    //unset($this->lista_[$int]);
                    array_splice($this->lista_, $int, 1);
                    $this->tam--;
                    return $tmp;
          }

          /**
           * Retorna o último adicionado
           */
          public function pop()
          {
                    $tmp = $this->lista_[$this->tam-1];
                    array_splice($this->lista_, $this->tam-1, 1);
                    $this->tam--;
                    return $tmp;
          }

          /**
           * Retorna o primeiro adicionado
           */
          public function top()
          {
                    $tmp = $this->lista_[0];
                    array_splice($this->lista_, 0, 1);
                    $this->tam--;
                    return $tmp;
          }

          /**
           * Apaga todos os elementos da lista
           */
          public function removeAll()
          {
                    $this->lista_ = null;
                    $this->lista_ = array();
          }

          //le da lista
          public function get($int)
          {
                    return $this->lista_[$int];
          }

          //pega o tam
          public function getTam()
          {
                    return $this->tam;
          }

          /**
           * Copia a conteudo de uma lista para a lista parametro
           * @param Lista $lista
           */
          public function copy($lista)
          {
                    //limpa lista
                    $this->removeAll();
                    //recoloca a lista
                    for($i = 0; $i < $lista->getTam(); $i++)
                              $this->add($lista->get($i));
                    //repoe o tamanho certo agora
                    $this->tam = $lista->getTam();
          }

          /**
           * 
           * @param Lista $lista
           */
          public function copyNotAmbigous($lista)
          {
                    //limpa lista
                    $this->removeAll();
                    $isOk = true;
                    //recoloca a lista
                    for($i = 0; $i < $lista->getTam(); $i++)
                    {
                              for($j = 0; $j < count($this->lista_); $j++)
                              {
                                        if($lista->get($i) == $this->lista_[$j])
                                        {
                                                  $isOk = false;
                                        }
                              }
                              if($isOk)
                              {
                                        $this->add($lista->get($i));
                              }
                              $isOk = true;
                    }
                    //repoe o tamanho certo agora
                    $this->tam = $lista->getTam();
          }

          /**
           * Inclui conteudo da lista parametro na presente lista
           * @param Lista $lista
           */
          public function append($lista)
          {
                    for($i = 0; $i < $lista->getTam(); $i++)
                              $this->add($lista->get($i));

                    $this->tam = count($this->lista_);
          }

          /**
           * Inverte sequencia da lista
           */
          public function reverse()
          {
                    $lista_aux = array();

                    for($i = count($this->lista_)-1; $i >= 0; $i--)
                    {
                              $lista_aux[] = $this->lista_[$i];
                    }

                    $this->lista_ = $lista_aux;
          }

          /**
           * Metodo que passa a lista para um string com espaços
           */
          public function toString()
          {
                    $str = "";

                    for($i = 0; $i < count($this->lista_); $i++)
                    {
                              $str .= $this->lista_[$i]." ";
                    }

                    return $str;
          }

          /**
           * Passa um string com intervalos entre palavras de virgula ou espaços para lista
           * @param string $string
           */
          public static function toLista($string)
          {
                    $listAux = new Lista();
                    $frase = $string;
                    $aux = "";

                    for($i = 0; $i < strlen($frase); $i++)
                    {
                              if(($frase[$i] != ",") && ($frase[$i] != " "))
                              {
                                        $aux .= $frase[$i];
                              }
                              else
                              {
                                        if($frase[$i] == " ")
                                        {
                                                  $listAux->add($aux);
                                                  $aux = "";
                                        }
                              }
                    }
                    $listAux->add($aux);

                    return $listAux;
          }

          public function current() 
          {
                    return $this->lista_[$this->position];
          }

          public function key() 
          {
                    return $this->position;
          }

          public function next() 
          {
                    ++$this->position;
          }

          public function rewind() 
          {
                    $this->position = 0;
          }

          public function valid() 
          {
                    return isset($this->lista_[$this->position]);
          }
}

?>