
/* *
 * Classe para API do Chatterbot
 * @return {Chatterbot}
 */
function Chatterbot(serverUrl)
{
        var userid = 0;
        var pergunta = "";
        var objResposta = null;
        var antiga = "";
        var action = "";
        var oldCods = "0";
        var result = "";
        var result1 = "";
        var slice_url = "";
        var mySoap = "";
        var callBack = null;
        var myAactions = new Array();
        var __vars__ = new Array();
        var me = this;
        // Translate mechanism
        var lang;
        var detect;
        var windowsliveid = "";
        
        if(serverUrl !== undefined)
                slice_url = serverUrl;
        
        /**
         * METODOS PRIVADOS
         */
        
        function resolveLanguage()
        {
                if ( navigator && navigator.userAgent
                && (lang = navigator.userAgent.match(/android.*\W(\w\w)-(\w\w)\W/i))
                ) 
                {
                        lang = lang[1];
                }
                
                if (!lang && navigator) 
                {
                        if (navigator.language) 
                        {
                                lang = navigator.language;
                        } 
                        else if (navigator.browserLanguage) 
                        {
                                lang = navigator.browserLanguage;
                        } 
                        else if (navigator.systemLanguage) 
                        {
                                lang = navigator.systemLanguage;
                        } 
                        else if (navigator.userLanguage) 
                        {
                                lang = navigator.userLanguage;
                        }
                        lang = lang.substr(0, 2);
                }
                
                detect = lang;
        }
        
        function getAppId()
        {
                $.get(slice_url + "utils/Microsoft.php", function(data)
                          {
                                    result = data;
                                    windowsliveid = result;
                                    //alert(result);
                          }
                );
        }
        
        function refreshAppId()
        {
                getAppId();
        }
        
        function getId()
        {
                $.get(slice_url + "/utils/getId.php", function(data)
                        {
                                  userid = data;
                        }
              );
        }
        
        /**
                   * 0 - Resposta processada
                   * 1 - Frase Antiga
                   * 2 - Title de Ação
                   * 3 - Códigos de Frase Antiga
        */
        function frase(id)
        {
                  var dados = result.split("|");
                  return dados[id];
        }
        
        function acentos(val)
        {
                  var alfabetomaiusculo = "ABCDEFGHIJKLMNOPQRSTUVYXWZÁÉÍÓÚÊÔáéíóúêôÇçÀàÃãÕõ";
                  var alfabetominuscilo = "abcdefghijklmnopqrstuvyxwzaeioueoaeioueoccaaaaoo";
                  var aux1 = "";
                  var vv = false;

                  for ( i = 0; i < val.length; i++)
                  {
                            for ( j = 0; j < alfabetomaiusculo.length; j++)
                            {
                                      if ((val.charAt(i) == alfabetomaiusculo.charAt(j)))
                                      {
                                                aux1 += alfabetominuscilo.charAt(j);
                                                vv = true;
                                      }
                            }
                            if (vv != true)
                            {
                                      aux1 += val.charAt(i);
                            }
                            vv = false;
                  }

                  return aux1;
        }
        
        function getWebServer()
        {
                $.get(slice_url + '/' +  mySoap + '?pergunta=' 
                        + encodeURIComponent(acentos(pergunta)) 
                        + '&antiga=' + encodeURIComponent(antiga) 
                        + '&cods=' + oldCods , 
                function(data) 
                {
                        result = data;
                        
                        result1 = frase(0);
                        antiga = frase(1);
                        action = frase(2);
                        oldCods = frase(3);
                        var getjson = frase(4);

                        /* E AGORA TRASFORMA JSON EM OBJETO */
                        objResposta = $.parseJSON(getjson);

                        /* A ORDEM DE CHAMADA DESSAS FUNÇÕES */
                        actions();


                        /*if(!ambiguous())
                        {*/
                                MicrosoftTranslateStart2(result1, detect);
                                //resultLogs();
                        //}
              });
        }
        
        function callFx(name, params)
        {
                   var __retObj__ = null;
                   $.ajax(
                                      {
                                                async: false,
                                                type:'post',
                                                cache:false,
                                                url: slice_url + "/mods/Mods.php",
                                                data: {fx: name, params: params, pergunta: pergunta, antiga: antiga, userid: userid},
                                                success: function(data)
                                                {
                                                          __retObj__ = $.parseJSON(data);

                                                          if(__retObj__)
                                                          {
                                                                    if(__retObj__.concat)
                                                                              result1+= " " + __retObj__.result.out;

                                                                    if(__retObj__.result.vars)
                                                                    {
                                                                              for(var i = 0; i < __retObj__.result.vars.length; i++)
                                                                              {
                                                                                        me.setVar(__retObj__.result.vars[i].name, __retObj__.result.vars[i].value);
                                                                              }
                                                                    }

                                                                    if(__retObj__.result.action)
                                                                    {
                                                                              action = __retObj__.result.action;
                                                                              actions();
                                                                    }
                                                          }
                                                }
                                      }
                            );
        }
        
        function actions()
        {
                var acType = action.split(" ");
                if(acType[0] === "fun:")
                {
                        var dump = null;
                        var args = "";
                        if(acType[1].indexOf(":") !== -1)
                        {
                                dump = acType[1].split(":");
                                for(var i = 1; i < dump.length; i++)
                                {
                                          args += ":" + dump[i]; 
                                }
                        }
                        else
                                dump = acType[1].split(":");
                        
                        if((dump !== null) && (myAactions[dump[0]] !== undefined))
                        {
                                myAactions[dump[0]](dump);
                        }
                        else
                        {
                                if(acType[1].indexOf(":") === -1)
                                        callFx(acType[1]);
                                else
                                        callFx(dump[0], args);
                        }
                }
        }
        
        function MicrosoftTranslateStart1(text, language) 
        {
                if(detect != language)
                {
                          var el = document.createElement("script"); 
                          el.src = 'http://api.microsofttranslator.com/V2/Ajax.svc/Translate'; 
                          el.src += '?oncomplete=MicrosoftTranslateComplete1'; 
                          el.src += '&appId=Bearer ' + encodeURIComponent(windowsliveid);
                          el.src += '&text=' + encodeURI(text);
                          el.src += '&from=' + detect + '&to=' + language;
                          document.getElementsByTagName('head')[0].appendChild (el);
                }
                else
                {
                          //manda pra arvore
                          pergunta = text;
                          getWebServer();
                }
        }
        
        function MicrosoftTranslateComplete1(result) 
        { 
                //manda pra arvore
                pergunta = result;
                getWebServer();
        }
        
        function MicrosoftTranslateStart2(text, language) 
        {
                if(detect !== "pt")
                {
                          var el = document.createElement("script"); 
                          el.src = 'http://api.microsofttranslator.com/V2/Ajax.svc/Translate'; 
                          el.src += '?oncomplete=MicrosoftTranslateComplete2'; 
                          el.src += '&appId=Bearer ' + encodeURIComponent(windowsliveid);
                          el.src += '&text=' + encodeURI(text); 
                          el.src += '&from=' + "pt" + '&to=' + language;
                          document.getElementsByTagName('head')[0].appendChild (el);
                }
                else
                {
                          //manda pra arvore
                          if(callBack)
                                  callBack(text);
                          //actions();
                }
        }
        
        function MicrosoftTranslateComplete2(result) 
        {
                //manda pra arvore
                if(callBack)
                        callBack(result);
                //actions();
        }
        
        /**
         * METODOS PUBLICOS
         */
        
        this.postQuestion = function(_pergunta)
        {
                pergunta = _pergunta;
                MicrosoftTranslateStart1(pergunta, "pt");
        };
        
        this.setServerUrl = function(url)
        {
                slice_url = url;
                getId();
        };
        
        this.setWebServerFile = function(file)
        {
                mySoap = file;
        };
        
        this.setCompleteCallBack = function(func)
        {
                callBack = func;
        };
        
        this.addAction = function(prefix, func)
        {
                myAactions[prefix] = func;
        };
        
        this.enableTranslate = function()
        {
                getAppId();
                setInterval(refreshAppId, 500000);
        };
        
        //seta variavel de ambiente
        this.setVar = function(name, v)
        {
                  __vars__[name] = v;
        };
        
        // Construtor
        resolveLanguage();
        if(slice_url !== "")
                getId();
}