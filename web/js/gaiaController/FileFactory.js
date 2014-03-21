

/**
 * Classe que retorna
 * @returns {FileFactory}
 */
function FileFactory()
{
        /** @type ProjectSources */
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
                        if((ptrProject.layout[0].Tipo === Layout.EAD) || (ptrProject.layout[0].Tipo === Layout.WEB))
                        {
                                if(i === 0)
                                        _final.Topo = makePage(ptrProject.paginas[i], ptrProject.layout[0].Topo[0].Altura, ptrProject.LarguraPaginas, false);
                                else if(i === 1)
                                        _final.Rodape = makePage(ptrProject.paginas[i], ptrProject.layout[0].Rodape[0].Altura, ptrProject.LarguraPaginas, false);
                                else
                                        _final.Paginas.push(makePage(ptrProject.paginas[i], ptrProject.AlturaPaginas, ptrProject.LarguraPaginas, true));
                        }
                        else if(ptrProject.layout[0].Tipo === Layout.WEBAPP)
                        {
                                _final.Paginas.push(makePage(ptrProject.paginas[i], ptrProject.AlturaPaginas, ptrProject.LarguraPaginas, true));
                        }
                }
                
                return _final;
        };
        
        /**
         * 
         * @param {Paginas} page
         */
        function makePage(page, altura, largura, pgSub)
        {
                var java = "";
                var vars = "";
                var instructs = "";
                var totalEv = 0;
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
                                                '		/*$("button").bind("touchstart touchend", function(e) {\n' +
                                                '			$(this).toggleClass("hover_effect");\n' +
                                                '			if(e.type == "touchend")\n' +
                                                '				$(this).click();\n' +
                                                '		});*/\n' +
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
                        var objEstadosArray = new Array();
                        
                        if((!objTmp.returned) && (!objTmp.Deleted))
                        {
                                var resolveRecursive = function(objTmp)
                                {
                                        if(!objTmp.returned && !objTmp.Deleted)
                                        {
                                                var filhos = FileFactory.childs(page.Elementos, objTmp.JqueryId);

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

                                                        for(j = 0; j < filhos.length; j++)
                                                        {
                                                                /** @type Objetos */
                                                                var objFilho = filhos[j];

                                                                resolveRecursive(objFilho);

                                                                if(!objFilho.returned && !objFilho.Deleted)
                                                                {
                                                                        source += objFilho.returnCode().replace("badWolf", "");
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
                                                                        vars += objFilho.returnCodeVars();
                                                                        instructs += objFilho.returnCodeInstructs();

                                                                        // nome acessivel para o javascript
                                                                        if(objFilho.Name !== "")
                                                                        {
                                                                                if(objFilho.canCreateVar())
                                                                                {
                                                                                        java += "var " + objFilho.Name + " = $('" + objFilho.JqueryId + "');";
                                                                                        if(objFilho.ClassType === "GImage")
                                                                                        {
                                                                                                totalEv++;
                                                                                                _final.Midias.push({FileName: objFilho.GetFileResource(objFilho.recurso), 
                                                                                                        JqueyId: objFilho.JqueryId,
                                                                                                        CallBack: ('function(){ ___catch__Event++; VERIFY__EVENTS__LOAD(); }\n'),
                                                                                                        Type: 1});
                                                                                                //java += 'function ___func' + objTmp.Name + '(){ ___catch__Event++; VERIFY__EVENTS__LOAD(); }\n';
                                                                                                //java += "$('#cont_img" + objTmp.Id + "').bind('load', ___func" + objTmp.Name + ");\n";
                                                                                        }
                                                                                        else if(objFilho.ClassType === "GAudioHide")
                                                                                        {
                                                                                                totalEv++;
                                                                                                _final.Midias.push({FileName: objFilho.GetFileResource(objFilho.recurso), 
                                                                                                        JqueyId: objFilho.JqueryId,
                                                                                                        CallBack: ('function(){ ___catch__Event++; VERIFY__EVENTS__LOAD(); }\n'),
                                                                                                        Type: 2});
                                                                                                //java += 'function ___func' + objTmp.Name + '(){ ___catch__Event++; VERIFY__EVENTS__LOAD(); }\n';
                                                                                                //java += "$('#Haudio" + objTmp.Id + "aud').bind('canplaythrough', ___func" + objTmp.Name + ");\n";
                                                                                        }
                                                                                }
                                                                        }
                                                                }
                                                        }

                                                        source += "</div>\n";
                                                        /*if(objTmp.JqueryId.indexOf("div") !== -1)
                                                                source += "</div>\n";*/
                                                        objTmp.returned = true;
                                                }
                                                else
                                                {
                                                        source += objTmp.returnCode() + "\n";
                                                        objTmp.returned = true;
                                                }

                                                // estados
                                                if(objTmp.estados.length > 0)
                                                {
                                                        java += '\n var ' + objTmp.JqueryId.replace("#", "") + 'Original = ' + JSON.stringify(objTmp) + '; \n';
                                                        objEstadosArray.push(objTmp.JqueryId.replace("#", "") + 'Original');
                                                        for(var s = 0; s < objTmp.estados.length; s++)
                                                        {
                                                                /** @type Objetos */
                                                                var objState = objTmp.estados[s];
                                                                java += '\n var ' + objState.Name + ' = ' + JSON.stringify(objState) + ' \n';
                                                                objEstadosArray.push(objState.Name);
                                                        }
                                                        java += '\n var ' + objTmp.JqueryId.replace("#", "") + 'States = ' + JSON.stringify(objEstadosArray) + ';\n';
                                                }


                                                // nome acessivel para o javascript
                                                if(objTmp.Name !== "")
                                                {
                                                        if(objTmp.canCreateVar())
                                                        {
                                                                java += "var " + objTmp.Name + " = $('" + objTmp.JqueryId + "');";
                                                                if(objTmp.ClassType === "GImage")
                                                                {
                                                                        totalEv++;
                                                                        _final.Midias.push({FileName: objTmp.GetFileResource(objTmp.recurso), 
                                                                                JqueyId: objTmp.JqueryId,
                                                                                CallBack: ('function(){ ___catch__Event++; VERIFY__EVENTS__LOAD(); }\n'),
                                                                                Type: 1});
                                                                        //java += 'function ___func' + objTmp.Name + '(){ ___catch__Event++; VERIFY__EVENTS__LOAD(); }\n';
                                                                        //java += "$('#cont_img" + objTmp.Id + "').bind('load', ___func" + objTmp.Name + ");\n";
                                                                }
                                                                else if(objTmp.ClassType === "GAudioHide")
                                                                {
                                                                        totalEv++;
                                                                        _final.Midias.push({FileName: objTmp.GetFileResource(objTmp.recurso), 
                                                                                JqueyId: objTmp.JqueryId,
                                                                                CallBack: ('function(){ ___catch__Event++; VERIFY__EVENTS__LOAD(); }\n'),
                                                                                Type: 2});
                                                                        //java += 'function ___func' + objTmp.Name + '(){ ___catch__Event++; VERIFY__EVENTS__LOAD(); }\n';
                                                                        //java += "$('#Haudio" + objTmp.Id + "aud').bind('canplaythrough', ___func" + objTmp.Name + ");\n";
                                                                }
                                                        }
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

                                                vars += objTmp.returnCodeVars();
                                                instructs += objTmp.returnCodeInstructs();
                                        }
                                };
                                
                                resolveRecursive(objTmp);
                                
                        } // fim se não estiver retornado
                        else
                                objTmp.returned = false;
                }
        
                for(var i = 0; i < page.Elementos.length; i++)
                {
                        page.Elementos[i].returned = false;
                }
        
                source += "</div>\n";
                source += '<!-- código -->\n' +
                                 '<script type="text/javascript">\n';
                /*source += 'var __total___Events__ = ' + totalEv + ';\n var ___catch__Event = 0; \n' +
                                        'if(__total___Events__ !== 0)\n'+
                                        '{ $("#pg" + pgInd).append(\'<div id="loadloading" style="display: none; background-color: white; position: absolute; top: ' + (ptrProject.AlturaPaginas / 2 - 110) + 'px; left: ' + (ptrProject.LarguraPaginas / 2 - 100) + 'px; width: 210px; height: 110px; z-index: 5000"><center><img style="" src="../img/loader.gif"></center><div id="msgloading"><center>Carregando Mídias...</center></div></div>\'); escurece(true); $("#loadloading").fadeIn(500);}\n' +
                                        'function VERIFY__EVENTS__LOAD(){ if(__total___Events__ === ___catch__Event){ $("#loadloading").fadeOut(500, function(){ $("#pg" + pgInd).find("#loadloading").remove(); }); escurece(false); } }\n';*/
                //source += vars + "\n" +  java + "\n" + page.ScriptGeral + "\n" + instructs + "\n";
                source += vars + "\n" +  java + "\n" + instructs + "\n" + page.ScriptGeral + "\n";
                
                if((ptrProject.layout[0].Tipo === Layout.WEB) && pgSub)
                {
                        source += "magic();\n";
                }
                
                source += "</script>";
                
                return source;
        }
}

/**
* 
* @param {Array} pais
* @param {String} jqueryId
* @returns {Array}
*/
FileFactory.childs = function(pais, jqueryId)
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
};