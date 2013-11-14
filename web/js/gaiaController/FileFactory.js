

/**
 * Classe que retorna
 * @returns {FileFactory}
 */
function FileFactory()
{
        var _final = new ProjectSources();
        
        this.getProjectSource = function()
        {
                return _final;
        };
        
        this.makeStrign = function()
        {
                // paginas
                for(var i = 0; i < ptrProject.paginas.length; i++)
                {
                        if(ptrProject.layout[0].Tipo === Layout.EAD)
                        {
                                if(i === 0)
                                        _final.Topo = makePage(ptrProject.paginas[i], 100, ptrProject.LarguraPaginas, false);
                                else if(i === 1)
                                        _final.Rodape = makePage(ptrProject.paginas[i], 50, ptrProject.LarguraPaginas, false);
                                else
                                        _final.Paginas.push(makePage(ptrProject.paginas[i], ptrProject.AlturaPaginas, ptrProject.LarguraPaginas, true));
                        }
                }
                
                return _final;
        };
        
        /**
         * 
         * @param {Array} pais
         * @param {String} jqueryId
         * @returns {Array}
         */
        function childs(pais, jqueryId)
        {
                var filhos = new Array();
                for(var i = 0; i < pais.length; i++)
                {
                        /** @type Objetos */
                        var objTmp = pais[i];
                        if(objTmp.FatherId === jqueryId)
                                filhos.push(objTmp);
                }
                return filhos;
        }
        
        /**
         * 
         * @param {Paginas} page
         */
        function makePage(page, altura, largura, pgSub)
        {
                var java = "";
                var source =         '<!-- GaiaFrameWork 2013 -->\n'+
                                                '\n\n' +
                                                '<!-- Style Override -->\n' +
                                                '<style> ' +
                                                '	.pg_sub '+
                                                        '{ '+
                                                                'position: absolute; '+
                                                                'width: ' + largura + 'px; '+
                                                                'height: '+ altura +'px; '+
                                                                'background-color: #EAEAEA; '+
                                                                //'background-color: #666699; ' +
                                                        '}' +
                                                '</style>\n' +
                                                '<script type="text/javascript">\n' +
                                                '	$(document).ready(function() {\n' +
                                                '		$("button").bind("touchstart touchend", function(e) {\n' +
                                                '			$(this).toggleClass("hover_effect");\n' +
                                                '			if(e.type == "touchend")\n' +
                                                '				$(this).click();\n' +
                                                '		});\n' +
                                                '		$(".scrolls").mousedown(function(){\n'+
                                                '			enableGest = false;\n'+
                                                '		}).mouseup(function(){\n'+
                                                '			setTimeout(function()\n'+
                                                '			{\n'+
                                                '				enableGest = true;\n'+
                                                '			}, 200);\n'+
                                                '		}).bind("mouseleave",function(){\n'+
                                                '			setTimeout(function()\n'+
                                                '			{\n'+
                                                '				enableGest = true;\n'+
                                                '			}, 200);\n'+
                                                '		});\n'+
                                                '		$(".scrolls").bind("touchstart", function(e)\n'+
                                                '		{\n'+
                                                '			enableGest = false;\n'+
                                                '		}).bind("touchend", function(e)\n'+
                                                '		{\n'+
                                                '			setTimeout(function()\n'+
                                                '			{\n'+
                                                '				enableGest = true;\n'+
                                                '			}, 200);\n'+
                                                '		});\n'+
                                                '	});\n' +
                                                '</script>\n' +
                                                '<!-- conteudo -->\n' +
                                                '<div id="main" class="' + (pgSub ? "pg_sub" : "") + '">\n';
                
                // para todos os elementos
                for(var i = 0; i < page.Elementos.length; i++)
                {
                        /** @type Objetos */
                        var objTmp = page.Elementos[i];
                        
                        if(!objTmp.returned)
                        {
                                var filhos = childs(page.Elementos, objTmp.JqueryId);

                                // verifica os filhos
                                if(filhos.length > 0)
                                {
                                        var j = 0;
                                        var actPos = 0.0;

                                        if(objTmp.JqueryId.indexOf("VScroll") !== -1)
                                        {
                                                for(j = 0; j < filhos.length; j++)
                                                {
                                                        /** @type Objetos */
                                                        var objFilho = filhos[i];
                                                        actPos = (objFilho.L + objTmp.W + 30);
                                                        if(objTmp.Vss < actPos)
                                                                objTmp.Vss = actPos;
                                                }
                                        }
                                        else if(objTmp.JqueryId.indexOf("HScroll") !== -1)
                                        {
                                                for(j = 0; j < filhos.length; j++)
                                                {
                                                        /** @type Objetos */
                                                        var objFilho = filhos[i];
                                                        actPos = (objFilho.T + objTmp.H + 30);
                                                        if(objTmp.Vss < actPos)
                                                                objTmp.Vss = actPos;
                                                }
                                        }

                                        if(objTmp.JqueryId.indexOf("div") !== -1)
                                                source += objTmp.returnCode().substr(0, objTmp.returnCode().length - 8);
                                        else
                                                source += objTmp.returnCode().substr(0, objTmp.returnCode().length - 16);

                                        for(j = 0; j < filhos.length; i++)
                                        {
                                                /** @type Objetos */
                                                var objFilho = filhos[i];
                                                source += objFilho.returnCode();
                                                if(objFilho.eventos.length > 0)
                                                {
                                                        for(var e = 0; e < objFilho.eventos.length; e++)
                                                        {
                                                                /** @type Eventos */
                                                                var eventTmp = objFilho.eventos[e];
                                                                if(eventTmp.idAction !== 0)
                                                                        java += modelEventos.get(eventTmp.idEvento).obj(
                                                                                objFilho.JqueryId, modelActions.get(eventTmp.idAction).obj(eventTmp.TargetJqueryId) + "\n"
                                                                        );
                                                                else
                                                                       java += modelEventos.get(eventTmp.idEvento).obj(
                                                                                objFilho.JqueryId, eventTmp.Script + "\n"
                                                                        ); 
                                                        }
                                                }
                                                objFilho.returned = true;
                                        }

                                        source += "</div>\n";
                                        if(objTmp.JqueryId.indexOf("div") !== -1)
                                                source += "</div>\n";
                                }
                                else
                                {
                                        source += objTmp.returnCode() + "\n";
                                }
                                
                                if(objTmp.eventos.length > 0)
                                {
                                        for(var e = 0; e < objTmp.eventos.length; e++)
                                        {
                                                /** @type Eventos */
                                                var eventTmp = objTmp.eventos[e];
                                                if(eventTmp.idAction !== 0)
                                                        java += modelEventos.get(eventTmp.idEvento).obj(
                                                                objTmp.JqueryId, modelActions.get(eventTmp.idAction).obj(eventTmp.TargetJqueryId) + "\n"
                                                        );
                                                else
                                                       java += modelEventos.get(eventTmp.idEvento).obj(
                                                                objTmp.JqueryId, eventTmp.Script + "\n"
                                                        ); 
                                        }
                                }
                                
                        } // fim se não estiver retornado
                        else
                                objTmp.returned = false;
                }
        
                source += "</div>\n";
                source += '<!-- código -->\n' +
                                 '<script type="text/javascript">\n';
                source += java + "\n";
                source += "</script>";
                
                return source;
        }
}
