/* 
 * main for VIEW Gaia Editor
 */

/**@type User */
var LogedUser = null;
/** @type Projeto */
var ptrProject = null;                                                                                                                  // projeto selecionado
/** @type Paginas */
var ptrPage = null;
/** @type Rodape */
var ptrLayout = null;
/** @type Objetos */
var ptrObject = null;
/** @type Objetos */
var ptrState = null;
var ptrEntity = null;
var ptrEntityIx = -1;
var listProj = new List();
var listObjects = new List();
var listRecursos = new List();
var listDebug = new List();
var listObjsCheck = new List();
var comboLayouts = new Combobox();
var comboEfeitos = new Combobox();
var comboTool1Paginas = new Combobox();
var comboTool1Efeitos = new Combobox();
var comboTool1Layouts = new Combobox();
var comboTool1Recurso = new Combobox();
var objRecurso = new Combobox();
var objFont = new Combobox();
var objEventosTipo = new Combobox();
var objEventosActions = new Combobox();
var objEventosTarget = new Combobox();
var objScriptTarget = new Combobox();
var objScriptAction = new Combobox();
var objScriptAuto = new Combobox();
var objScriptAction1 = new Combobox();
var objScriptTarget1 = new Combobox();
var objAnimas = new Combobox();
var projEntities = new Combobox();
var comboTypes = new Combobox();
var colorPick1 = new ColorPicker();
var colorPick2 = new ColorPicker();
var objCorFundo = new ColorPicker();
var objCorSombra = new ColorPicker();
var objCorBorda = new ColorPicker();
var objCorFonte = new ColorPicker();
var fileUp1 = new FileUpload();
var fileUp2 = new FileUpload();
var fileUp3 = new FileUpload();
var modelProj = new ItemModel();
var modelLayouts = new ItemModel();
var modelLayoutsPages = new ItemModel();
var modelEfeitos = new ItemModel();
var modelPaginas = new ItemModel();
var modelObjects = new ItemModel();
var modelRecursos = new ItemModel();
var modelFonts = new ItemModel();
var modelEventos = new ItemModel();
var modelActions = new ItemModel();
var modelEstados = new ItemModel();
var modelEntities = new ItemModel();
var modelInputTypes = new ItemModel();
var modelOverflowTypes = new ItemModel();
var modelChartTypes = new ItemModel();
var modelTypes = new ItemModel();
var objs = new ItemModel();
var verifica = null;
var slice_url = "http://gaia.mpro3.com.br/system/";
//var slice_url = "http://localhost:8084/GaiaEditor/system/";
//var slice_url = "http://nut.unifenas.br:8080/GaiaEditor/system/";
//var slice_url = "http://mpro3.com.br/java/system/";
var ajax = new Ajax();
var thread = null;
var canSetTimeout = true;
var keyboard = new KeyBoardUtils();
var stackObjs = new StackUndo();
var novo = true;
/** @type Eventos */
var eventChange = null;
var eventGeral = false;
var IDE;
var errList = new ItemModel();
var checkObjs = new ItemModel();
var lastJquerySelected = "";
var isState = false;
var envios = 0;
var confirmados = 0;
var safira = new Chatterbot("http://localhost/botServer");
var gaiaVoiceId = "fimfdcmkbpidncilmcpjihejngmbmped";
var __badWolf = null; 
var scale = 1;
/*var errList = new Lista();
errList.init();*/

function sendMessageToExtension(msg)
{
        chrome.runtime.sendMessage(gaiaVoiceId, msg, function(resp)
        {});
}

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event)
{
        //console.log(event);
        if(event.data.indexOf("eval") !== -1)
        {
                errList.add(new Item(event.data.replace("eval|", ""), null, "../img/ok.png"));
                $("#debugTools").animate({ scrollTop: $('#debugTools')[0].scrollHeight}, 1000);
        }
        else if(event.data.indexOf("voz:") !== -1)
        {
               var comando = event.data.replace("voz:", "");
               safira.postQuestion(comando);
        }
        else if(event.data !== "fechou")
        {
                var parts = event.data.split("|");
                setErrorList(parts[0], parts[1], parts[2]);
        }
        else
                scalePanels("windowDebug", true);
}

$(document).ready(function()
{      
        
        /**
        * SAFIRA
        */
        safira.setWebServerFile("gaia.php");
        safira.setCompleteCallBack(function(palavra)
        {
                // faca alguma coisa com a resposta
                console.log(palavra);
                sendMessageToExtension(palavra);
        });
        
        /**
         * CONFIGURA AJAX
         */
        ajax.Url = slice_url + "server.jsp";
        
        /**
         * SETA PÁGINAS
         */
        comboTool1Paginas.setElement("#projPaginas");
        comboTool1Paginas.setModel(modelPaginas);
        comboTool1Paginas.addMouseActionListener(function()
        {
                saveAfter(true, true);
                openPage(comboTool1Paginas.getSelectIndex());
        });
        
        /**
         * IDE
         */
        IDE = document.getElementById("IDE").contentWindow;
        IDE.onload = function()
        {
                IDE.setText("/**\n* Seu código aqui\n*/\n\n\n\n\n");     
        };
        
        /**
         * SETA LAYOUTS
         */
        comboLayouts.setElement("#comboLayout");
        comboLayouts.setModel(modelLayouts);
        comboTool1Layouts.setElement("#projLayout");
        comboTool1Layouts.setModel(modelLayoutsPages);
        comboTool1Layouts.addMouseActionListener(function()
        {
                saveAfter(true, true);
                openLayout(comboTool1Layouts.getSelectIndex());
        });
        
        //modelLayouts.add(new Item("BOOK", 1));
        modelLayouts.add(new Item("EAD", 2));
        //modelLayouts.add(new Item("SMARTPHONE", 3));
        //modelLayouts.add(new Item("SMARTPHONEAPP", 4));
        modelLayouts.add(new Item("WEB", 5));
        modelLayouts.add(new Item("WEBAPP", 6));
        //modelLayouts.add(new Item("DESKTOP", 7));
        
        /**
         * SETA EFEITOS
         */
        comboEfeitos.setElement("#comboEfeito");
        comboEfeitos.setModel(modelEfeitos);
        comboTool1Efeitos.setElement("#projEfeito");
        comboTool1Efeitos.setModel(modelEfeitos);
        
        modelEfeitos.add(new Item("NENHUM", 0));
        modelEfeitos.add(new Item("PÁGINA", 1));
        modelEfeitos.add(new Item("ZOOM", 2));
        
        /**
         * SETA ENTITIES
         */
        projEntities.setElement("#projEntities");
        projEntities.setModel(modelEntities);
        comboTypes.setElement("#entityDataTypes");
        comboTypes.setModel(modelTypes);
        
        modelTypes.add(new Item("TEXT", "TEXT"));
        modelTypes.add(new Item("NUMERIC", "NUMERIC"));
        
        modelInputTypes.add(new Item("text", "text"));
        modelInputTypes.add(new Item("color", "color"));
        modelInputTypes.add(new Item("date", "date"));
        modelInputTypes.add(new Item("datetime-local", "datetime-local"));
        modelInputTypes.add(new Item("number", "number"));
        modelInputTypes.add(new Item("range", "range"));
        modelInputTypes.add(new Item("time", "time"));
        modelInputTypes.add(new Item("week", "week"));
        modelInputTypes.add(new Item("password", "password"));
        
        modelOverflowTypes.add(new Item("visible", "visible"));
        modelOverflowTypes.add(new Item("hidden", "hidden"));
        modelOverflowTypes.add(new Item("scroll", "scroll"));
        modelOverflowTypes.add(new Item("scroll-x", "scroll-x"));
        modelOverflowTypes.add(new Item("scroll-y", "scroll-y"));
        modelOverflowTypes.add(new Item("auto", "auto"));
        
        modelChartTypes.add(new Item("Line", "Line"));
        modelChartTypes.add(new Item("Bar", "Bar"));
        modelChartTypes.add(new Item("Radar", "Radar"));
        modelChartTypes.add(new Item("PolarArea", "PolarArea"));
        modelChartTypes.add(new Item("Pie", "Pie"));
        modelChartTypes.add(new Item("Doughnut", "Doughnut"));
        
        projEntities.addMouseActionListener(function(obj)
        {
                ptrEntity = obj.obj;
                ptrEntityIx = projEntities.getSelectIndex();
                /** @type $ */
                var myTable = $("#entityTable");
                
                myTable.html("");
                myTable.append("<thead><tr><th><b>Coluna</b></th><th><b>Tipo</b></th><th><b>Remove</b></th></tr></thead><tbody></tbody>");
                
                // passa pelas entidades
                for(var j = 0; j < ptrEntity.Fields.length; j++)
                {
                        myTable.find("tbody").append("<tr></tr>");
                        myTable.find("tbody").find("tr:last").append("<td>" + ptrEntity.Fields[j].Name + "</td>");
                        myTable.find("tbody").find("tr:last").append("<td>" + ptrEntity.Fields[j].Type + "</td>");
                        myTable.find("tbody").find("tr:last").append('<td width="10%"><center><button id="' + j + '" class="btn btn-default remEnti" title="Remover" style="width:  100%;"><i class="glyphicon "><img src="../img/error.png" /></i></button></center></td>');
                }
                
                $(".remEnti").click(function()
                {
                        var field = $(this).attr("id");
                        $(this).parent().parent().parent().remove();
                        ptrEntity.Fields.splice(field, 1);
                        saveEntity();
                });
        });
        
        /**
         * SETA COLOR PICKERS
         */
        colorPick1.setElement("#colorPicker1");
        colorPick2.setElement("#colorPicker2");
        objCorFundo.setElement("#objCorFundo");
        objCorSombra.setElement("#objCorSombra");
        objCorBorda.setElement("#objCorBorda");
        objCorFonte.setElement("#objCorFonte");
        
        colorPick2.onColorChange(function(val)
        {
                if(ptrProject)
                {
                        ptrProject.layout[0].BackgroundColor = val;
                }
        });
        
        $("#projAltura").change(function()
        {
                if(ptrProject)
                {
                        ptrProject.AlturaPaginas = parseFloat($("#projAltura").val());
                        $("#pgDinamic").text(".pg_sub { position: absolute; width: " + ptrProject.LarguraPaginas + 
                        "px; height: " + ptrProject.AlturaPaginas + "px; background-color: #EAEAEA; }");
                
                        if(ptrProject.layout[0].Tipo === Layout.WEB)
                        {
                                $("#main").css("top", 5);
                                $("#pgDinamic").text(".pg_sub { position: absolute; width: " + ptrProject.LarguraPaginas + 
                                "px; height: " + $(document).height() + "px; background-color: #EAEAEA; }");
                        }
                
                        goCenter(document.documentElement.clientHeight, document.documentElement.clientWidth - 180);
                }
        });
        
        $("#projLargura").change(function()
        {
                if(ptrProject)
                {
                        ptrProject.LarguraPaginas = parseFloat($("#projLargura").val());
                        $("#pgDinamic").text(".pg_sub { position: absolute; width: " + ptrProject.LarguraPaginas + 
                        "px; height: " + ptrProject.AlturaPaginas + "px; background-color: #EAEAEA; }");
                
                        if(ptrProject.layout[0].Tipo === Layout.WEB)
                        {
                                $("#main").css("top", 5);
                                $("#pgDinamic").text(".pg_sub { position: absolute; width: " + ptrProject.LarguraPaginas + 
                                "px; height: " + $(document).height() + "px; background-color: #EAEAEA; }");
                        }
                
                        goCenter(document.documentElement.clientHeight, document.documentElement.clientWidth - 180);
                }
        });
        
        comboTool1Efeitos.addMouseActionListener(function(obj)
        {
                if(ptrProject)
                        ptrProject.layout[0].Efeito = obj.obj;
        });
        
        /**
         * SETA FILE UPLOAD
         */
        fileUp1.setUrl(slice_url + "upload.jsp");
        fileUp1.setElement("#fileBack1");
        fileUp2.setUrl(slice_url +  "upload.jsp");
        fileUp2.setElement("#fileBack2");
        fileUp3.setUrl(slice_url + "upload.jsp");
        fileUp3.setElement("#fileBack3");
        
        /**
         * SETA FERRAMENTAS DA IDE
         */
        listObjects.setElement("#toolObjects");
        listObjects.setModel(modelObjects);
        listRecursos.setElement("#meusRecursos");
        listRecursos.setModel(modelRecursos);
        listRecursos.setInputFilter("#recursoFiltro");
        
        listRecursos.addMouseActionListener(function(obj)
        {
                var rec = obj.obj;
                window.open("../dados/" + LogedUser.UserName + "_" + LogedUser.cod + "/" + rec.Arquivo);
                //window.open("../" + LogedUser.UserName + "_" + LogedUser.cod + "/" + rec.Arquivo);
        });
        
        listDebug.setElement("#debugErros");
        listDebug.setModel(errList);
        
        listObjsCheck.setElement("#elementosChecks");
        listObjsCheck.setModel(checkObjs);
        
        listObjsCheck.addMouseActionListener(function(obj, bool, gambiarra)
        {
                if(bool)
                {
                       $(obj.obj.JqueryId).hide();
                }
                else if(bool === false)
                {
                        $(obj.obj.JqueryId).show();
                }
                else if(bool === null)
                {
                        if(gambiarra === 2)
                        {
                                $(obj.obj.JqueryId).show();
                                $(obj.obj.JqueryId).mousedown();
                                $(obj.obj.JqueryId).mouseup();
                        }
                }
        });
        
        modelObjects.add(new Item("Texto", function(){ return new GText(153, 52, 0, 0, true); }, "../img/ui_labels.png")); //0
        modelObjects.add(new Item("Container", function(){ return new GDiv(153, 52, 0, 0, true); }, "../img/div.png")); //1
        modelObjects.add(new Item("Container Dinamico", function(){ return new GDivStatic(153, 52, 0, 0, true); }, "../img/div.png")); //2
        modelObjects.add(new Item("Container Repetidor", function(){ return new GRepeater(153, 52, 0, 0, true); }, "../img/div.png")); //3
        modelObjects.add(new Item("Lista", function(){ return new GList(153, 183, 0, 0, true); }, "../img/ui_list_box_blue.png")); //4
        modelObjects.add(new Item("ComboBox", function(){ return new GComboBox(190, 40, 0, 0, true); }, "../img/ui_combo_box_blue.png")); //5
        modelObjects.add(new Item("Tabela", function(){ return new GTable(190, 190, 0, 0, true); }, "../img/ui_scroll_pane_table.png")); //6
        modelObjects.add(new Item("Gráfico", function(){ return new GGraph(190, 190, 0, 0, true); }, "../img/chart.png")); //7
        modelObjects.add(new Item("Imagem", function(){ return new GImage(64, 64, 0, 0, true); }, "../img/img.png")); //8
        modelObjects.add(new Item("Botão", function(){ return new GButton(67, 28, 0, 0, true); }, "../img/button.png")); //9
        modelObjects.add(new Item("Input", function(){ return new GInput(153, 52, 0, 0, true); }, "../img/input.png")); //10
        modelObjects.add(new Item("Botão Upload", function(){ return new GUpload(67, 28, 0, 0, true); }, "../img/button.png")); //11
        modelObjects.add(new Item("CheckBox", function(){ return new GCheckBox(153, 52, 0, 0, true); }, "../img/input.png")); //12
        modelObjects.add(new Item("Text Area", function(){ return new GTextArea(153, 153, 0, 0, true); }, "../img/ui_scroll_pane_both.png")); //13
        modelObjects.add(new Item("Text Editor", function(){ return new GTextEditor(300, 153, 0, 0, true); }, "../img/ui_scroll_pane_both.png")); //14
        modelObjects.add(new Item("Auto Form", function(){ return new GForm(300, 153, 0, 0, true); }, "../img/list.png")); //15
        modelObjects.add(new Item("Audio", function(){ return new GAudio(200, 35, 0, 0, true); }, "../img/ui-audio.png")); //16
        modelObjects.add(new Item("HAudio", function(){ return new GAudioHide(16, 16, -20, -20, true); }, "../img/ui-audio.png")); //17
        modelObjects.add(new Item("FonteDados", function(){ return new FonteDados(1, 1, -20, -20, true); }, "../img/db_blank16.png")); //18
        
        comboTool1Recurso.setElement("#projRecurso");
        objRecurso.setElement("#objRecurso");
        objRecurso.setModel(modelRecursos);
        comboTool1Recurso.setModel(modelRecursos);
        
        objFont.setElement("#objFonte");
        objFont.setModel(modelFonts);
        modelFonts.add(new Item("Arial", "Arial"));
        modelFonts.add(new Item("Cabin", "Cabin"));
        modelFonts.add(new Item("Creepster", "Creepster"));
        modelFonts.add(new Item("Droid Sans", "Droid Sans"));
        modelFonts.add(new Item("Fondamento", "Fondamento"));
        modelFonts.add(new Item("Helvetica", "Helvetica"));
        modelFonts.add(new Item("Lobster", "Lobster"));
        modelFonts.add(new Item("Oleo Script", "Oleo Script"));
        modelFonts.add(new Item("PT Serif", "PT Serif"));
        modelFonts.add(new Item("Ubuntu", "Ubuntu"));
        
        objEventosTipo.setElement("#objEventosTipo");
        objEventosTipo.setModel(modelEventos);
        objScriptAction1.setElement("#scriptAction1");
        objScriptAction1.setModel(modelEventos);
        
        objAnimas.setElement("#objAnimas");
        objAnimas.setModel(modelEstados);
        objAnimas.addMouseActionListener(function(obj)
        {
                ptrObject = obj.obj;
                
                $(obj.obj.JqueryId).click();
                $(obj.obj.JqueryId).remove();
                if(obj.obj.FatherId == "0")
                {
                         newElem(obj.obj.returnCode(true, false));
                        if(obj.obj.JqueryId.indexOf("div") !== -1)
                        {
                                for(var i in objs.lista_)
                                { 
                                        var obji = objs.lista_[i].obj;
                                        if(obji)
                                        {
                                                if(obji.FatherId === obj.obj.JqueryId)
                                                        newElemD(obj.obj.JqueryId, obji.returnCode(true, false));
                                        }
                                }
                        }
                }
                else
                        newElemD(obj.obj.FatherId, obj.obj.returnCode(true, false));
                obj.obj.implementGaiaEvents();
                $(obj.obj.JqueryId).mousedown();
                $(ptrObject.JqueryId).addClass("anima");
        });
        
        modelEventos.add(new Item("Evento"));
        modelEventos.add(new Item("Click", function(id, code)
        {
                return '$("' + id + '").click(function()\n' +
                                '{\n' +
                                        code + "\n" +
                                '});\n';
        }));
        modelEventos.add(new Item("Duplo Clique", function(id, code)
        {
                return '$("' + id + '").dblclick(function()\n' +
                                '{\n' +
                                        code +
                                '});';
        }));
        modelEventos.add(new Item("Sobre", function(id, code)
        {
                return '$("' + id + '").hover(function()\n' +
                                '{\n' +
                                        code + "\n" +
                                '});\n';
        }));
        modelEventos.add(new Item("KeyUp", function(id, code)
        {
                return '$("' + id + '").keyup(function(event)\n' +
                                '{\n' +
                                        code + "\n" +
                                '});\n';
        }));
        modelEventos.add(new Item("Mudou", function(id, code)
        {
                if(id.indexOf("GComboBox") !== -1)
                {
                        return '' + id.replace("#", "") + '.addMouseActionListener(function(argumento)\n' +
                                '{\n' +
                                        code + "\n" +
                                '})\n;';
                }
                else if(id.indexOf("GInput") !== -1)
                {
                        return '$("' + id + '").find("input").change(function()\n' +
                                        '{\n' +
                                                code + "\n" +
                                        '});\n';
                }
                else if(id.indexOf("GCheckBox") !== -1)
                {
                        return '$("' + id + '").find("input").change(function()\n' +
                                        '{\n' +
                                                code + "\n" +
                                        '});\n';
                }
                else if(id.indexOf("GTextArea") !== -1)
                {
                        return '$("' + id + '").find("input").find("textarea").bind("input propertychange", function()\n' +
                                        '{\n' +
                                                code + "\n" +
                                        '});\n';
                }
                else
                        return '$("' + id + '").change(function()\n' +
                                        '{\n' +
                                                code + "\n" +
                                        '});\n';
        }));
        
        objEventosActions.setElement("#objEventosAction");
        objEventosActions.setModel(modelActions);
        objScriptAction.setElement("#scriptAction");
        objScriptAction.setModel(modelActions);
        
        modelActions.add(new Item("Nenhum", function(id)
        {
                return "";
        }));                                                    // 0
        modelActions.add(new Item("Esconder", function(id)
        {
                return "$('" + id + "').hide();";
        })); 			//1
        modelActions.add(new Item("Mostrar", function(id, show)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show();";
                else
                        return "$('" + id + "').show();";
        })); 			//2
        modelActions.add(new Item("Fade In", function(id, show, n)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').fadeIn(" + (n <= 0 ? 1000 : n) + ");"; 
                else
                        return "$('" + id + "').fadeIn(" + (n <= 0 ? 1000 : n) + ");";
        })); 			//3
        modelActions.add(new Item("Fade Out", function(id, show, n)
        {
                return "$('" + id + "').fadeOut(" + (n <= 0 ? 1000 : n) + ");"; 
        })); 			//4
        modelActions.add(new Item("Toogle", function(id, show, n)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').toggle(" + (n <= 0 ? 1000 : n) + ");";
                else
                        return "$('" + id + "').toggle(" + (n <= 0 ? 1000 : n) + ");";
        })); 			//5
        modelActions.add(new Item("Zoom In", function(id, show)
        {
                if(show === true)
                        return "$('" + id + "').zero(); $('" + id + "').ion();";
                else
                        return "$('" + id + "').ion();";
        }));			//6
        modelActions.add(new Item("Zoom Out", function(id)
        {
                return "$('" + id + "').iin();"; 
        }));			//7
        modelActions.add(new Item("Slide In Up", function(id, show, n)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('slide', {\n" +
                                        "direction: 'up'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
                else
                        return "$('" + id + "').show('slide', {\n" +
                                        "direction: 'up'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
        }));                                               //8
        modelActions.add(new Item("Slide In Down", function(id, show, n)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('slide', {\n" +
                                        "direction: 'down'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
                else
                        return "$('" + id + "').show('slide', {\n" +
                                        "direction: 'down'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
        }));		//9
        modelActions.add(new Item("Slide Out Up", function(id, show, n)
        {
                        return "$('" + id + "').hide('slide', {\n" +
                                        "direction: 'up'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
        }));		//10
        modelActions.add(new Item("Slide Out Down", function(id, show, n)
        {
                        return "$('" + id + "').hide('slide', {\n" +
                                        " direction: 'up'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
        }));		//11
        modelActions.add(new Item("Slide In Left", function(id, show, n)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('slide', {\n" +
                                        " direction: 'left'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
                else
                        return "$('" + id + "').show('slide', {\n" +
                                        " direction: 'left'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
        }));                                             //12
        modelActions.add(new Item("Slide In Right", function(id, show, n)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('slide', {\n" +
                                        " direction: 'right'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
                else
                        return "$('" + id + "').show('slide', {\n" +
                                        " direction: 'right'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
        }));		//13
        modelActions.add(new Item("Slide Out Left", function(id, show, n)
        {
                        return "$('" + id + "').hide('slide', {\n" +
                                        " direction: 'left'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
        }));		//14
        modelActions.add(new Item("Slide Out Right", function(id, show, n)
        {
                        return "$('" + id + "').hide('slide', {\n" +
                                        " direction: 'right'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
        }));	                      //15
        modelActions.add(new Item("Explode In", function(id, show, n)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('explode', {\n" +
                                        "	pieces: 50\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
                else
                        return "$('" + id + "').show('explode', {\n" +
                                        "	pieces: 50\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
        }));			//16
        modelActions.add(new Item("Explode Out", function(id, show, n)
        {
                        return "$('" + id + "').hide('explode', {\n" +
                                        "	pieces: 50\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
        }));		//17
        modelActions.add(new Item("Drop In Up", function(id, show, n)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('drop', {\n" +
                                        " direction: 'up'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
                else
                        return "$('" + id + "').show('drop', {\n" +
                                        " direction: 'up'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
        }));			//18
        modelActions.add(new Item("Drop In Down", function(id, show, n)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('drop', {\n" +
                                        " direction: 'down'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
                else
                        return "$('" + id + "').show('drop', {\n" +
                                        " direction: 'down'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
        }));		//19
        modelActions.add(new Item("Drop Out Up", function(id, show, n)
        {
                        return "$('" + id + "').hide('drop', {\n" +
                                        " direction: 'up'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
        }));		//20
        modelActions.add(new Item("Drop Out Down", function(id, show, n)
        {
                        return "$('" + id + "').hide('drop', {\n" +
                                        " direction: 'down'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
        }));		//21
        modelActions.add(new Item("Drop In Left", function(id, show, n)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('drop', {\n" +
                                        " direction: 'left'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
                else
                        return "$('" + id + "').show('drop', {\n" +
                                        " direction: 'left'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
        }));		                      //22
        modelActions.add(new Item("Drop In Right", function(id, show, n)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('drop', {\n" +
                                        " direction: 'right'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
                else
                        return "$('" + id + "').show('drop', {\n" +
                                        " direction: 'right'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
        }));		//23
        modelActions.add(new Item("Drop Out Left", function(id, show, n)
        {
                        return "$('" + id + "').hide('drop', {\n" +
                                        " direction: 'left'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
        }));		//24
        modelActions.add(new Item("Drop Out Right", function(id, show, n)
        {
                        return "$('" + id + "').hide('drop', {\n" +
                                        " direction: 'right'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
        }));		//25
        modelActions.add(new Item("Clip In V", function(id, show, n)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('clip', {\n" +
                                        " direction: 'vertical'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
                else
                        return "$('" + id + "').show('clip', {\n" +
                                        " direction: 'vertical'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
        }));			//26
        modelActions.add(new Item("Clip Out V", function(id, show, n)
        {
                        return "$('" + id + "').hide('clip', {\n" +
                                        " direction: 'vertical'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
        }));			//27
        modelActions.add(new Item("Clip In H", function(id, show, n)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('clip', {\n" +
                                        " direction: 'horizontal'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
                else
                        return "$('" + id + "').show('clip', {\n" +
                                        " direction: 'horizontal'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
        }));			//28
        modelActions.add(new Item("Clip Out H", function(id, show, n)
        {
                        return "$('" + id + "').hide('clip', {\n" +
                                        " direction: 'horizontal'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
        }));			//29
        modelActions.add(new Item("Blind In V", function(id, show, n)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('blind', {\n" +
                                        " direction: 'vertical'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
                else
                        return "$('" + id + "').show('blind', {\n" +
                                        " direction: 'vertical'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
        }));			//30
        modelActions.add(new Item("Blind Out V", function(id, show, n)
        {
                        return "$('" + id + "').hide('blind', {\n" +
                                        " direction: 'vertical'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
        }));		                      //31
        modelActions.add(new Item("Blind In H", function(id, show, n)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('blind', {\n" +
                                        " direction: 'horizontal'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
                else
                        return "$('" + id + "').show('blind', {\n" +
                                        " direction: 'horizontal'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
        }));			//32
        modelActions.add(new Item("Blind Out H", function(id, show, n)
        {
                        return "$('" + id + "').hide('blind', {\n" +
                                        " direction: 'horizontal'\n" +
                                        "}, " + (n <= 0 ? 1000 : n) + ");";
        }));		                      //33
        modelActions.add(new Item("Puff In", function(id, show, n)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('puff', {}, " + (n <= 0 ? 1000 : n) + ");";
                else
                        return "$('" + id + "').show('puff', {}, " + (n <= 0 ? 1000 : n) + ");";
        }));			//34
        modelActions.add(new Item("Puff Out", function(id, show, n)
        {
                        return "$('" + id + "').hide('puff', {}, " + (n <= 0 ? 1000 : n) + ");";
        }));			//35
        modelActions.add(new Item("Flip In", function(id, show, n)
        {
                if(show === true)
                        return     '$("' + id + '").hide();\n' +
                                        '$("'+ id +'").css("opacity", 0); \n'+
                                        '$("'+ id +'").rotate3Di("flip"); \n'+
                                        '$("' + id + '").show(); \n'+
                                        '$("' + id + '").rotate3Di("unflip", ' + (n <= 0 ? 1000 : n) + ', {opacity: 1}); \n';
                else
                        return '$("'+ id +'").css("opacity", 0); \n'+
                                        '$("'+ id +'").rotate3Di("flip"); \n'+
                                        '$("' + id + '").show(); \n'+
                                        '$("' + id + '").rotate3Di("unflip", ' + (n <= 0 ? 1000 : n) + ', {opacity: 1}); \n';
        }));			//36
        modelActions.add(new Item("Flip Out", function(id, show, n)
        {
                        return '$("' + id + '").rotate3Di("flip", ' + (n <= 0 ? 1000 : n) + ', {opacity: 0}); \n';
        }));			//37
        modelActions.add(new Item("Play Audio", function(id, show, n)
        {
                if(show)
                {
                        setTimeout(function(){ StopAudio(id); }, 10000);
                        return 'PlayAudio("' + id + '"); \n';
                }
                else
                        return 'PlayAudio("' + id + '"); \n';
        }));			//38
        modelActions.add(new Item("Stop Audio", function(id)
        {
                return 'StopAudio("' + id + '"); \n';
        }));			//39
        modelActions.add(new Item("Anima ID", function(id, show, n)
        {
                if(!show)
                        return 'PlayBlock("' + id + '", ' + (n <= 0 ? 1000 : n) + ');\n';
        }));                                                    //40
        modelActions.add(new Item("Anima Estado", function(id, show, n)
        {
                if(!show)
                {
                        if(("" + n).indexOf(":") !== -1)
                        {
                                n = ("" + n).split(":");
                                return '$("'+ id + '").playAnimationState(' + n[0] + ', ' + (n[1] <= 0 ? 1000 : n[1]) + ');\n';
                        }
                        return '$("'+ id + '").playAnimationState(' + n + ', 1000);\n';
                }
        }));                                                    //41
        modelActions.add(new Item("Carrega Estado", function(id, show, n)
        {
                if(!show)
                {
                      return '$("'+ id + '").toState(' + n + ');\n';  
                }
        }));                                                    //42
        modelActions.add(new Item("Animação Loop", function(id, show, n)
        {
                if(!show)
                {
                        return '$("' + id + '").playAnimationLoop(' + (n <= 0 ? 1000 : n)  + ');\n';
                }
        }));                                                    //43
        modelActions.add(new Item("Animação Loop Z", function(id, show, n)
        {
                if(!show)
                {
                        return '$("' + id + '").playAnimationLoopZero(' + (n <= 0 ? 1000 : n)  + ');\n';
                }
        }));                                                    //44
        
        objEventosTarget.setElement("#objEventosTarget");
        objEventosTarget.setModel(objs);
        objScriptTarget.setElement("#scriptTarget");
        objScriptTarget.setModel(objs);
        objScriptTarget1.setElement("#scriptTarget1");
        objScriptTarget1.setModel(objs);
        
        
        $("#windowDebug").multidraggable({cancel:false});
        $("#windowCompleted").multidraggable({cancel:false});
        $("#windowElementos").multidraggable({cancel:false});
        
        /**
         *  REDIMENSIONAMENTO DAS TOOLS
         */
        window.onresize = function()
        {
                $("#tool1").css("height", (document.documentElement.clientHeight / 2.2) -20);
                $("#tool1base").css("height", (document.documentElement.clientHeight / 2.2) -20);
                $("#tool1base").css("left", -200);
                $("#tool1Things").css("height", (document.documentElement.clientHeight / 2.2) -65);
                
                $("#tool2").css("height", (document.documentElement.clientHeight / 1.8) -20);
                $("#tool2base").css("height", (document.documentElement.clientHeight / 1.8) -20);
                $("#tool2base").css("top", parseInt($("#tool1").css("height")) + 10);
                $("#tool2base").css("left", -200);
                $("#tool2Things").css("height", (document.documentElement.clientHeight / 1.8) - 65);
                
                $("#tool3").css("height", document.documentElement.clientHeight -20);
                $("#tool3").css("left", document.documentElement.clientWidth -225);
                $("#tool3Things").css("height", document.documentElement.clientHeight - 120);
                $("#tool4Things").css("height", document.documentElement.clientHeight - 120);
                
                $("#safiraInputContainer").css("top", document.documentElement.clientHeight - 40);
                $("#safiraInputContainer").css("left", document.documentElement.clientWidth - 650);
                
                $("#windowProjects").css("top", (document.documentElement.clientHeight / 2) - (225 / 2));
                $("#windowProjects").css("left", (document.documentElement.clientWidth / 2) - (400 / 2));
                
                $("#windowProjectsNew").css("top", (document.documentElement.clientHeight / 2) - (245 / 2));
                $("#windowProjectsNew").css("left", (document.documentElement.clientWidth / 2) - (400 / 2));
                
                $("#windowLayout").css("top", (document.documentElement.clientHeight / 2) - (245 / 2));
                $("#windowLayout").css("left", (document.documentElement.clientWidth / 2) - (400 / 2));
                
                $("#windowResources, #windowScript, #windowEntity").css("width", (document.documentElement.clientWidth / 2));
                $("#windowResources, #windowScript, #windowEntity").css("height", document.documentElement.clientHeight - 80);
                $("#windowResources, #windowScript, #windowEntity").css("left", ((document.documentElement.clientWidth / 2) / 2) - 65);
                $("#containerWindowResources, #containerWindowScript").css("width", (document.documentElement.clientWidth / 2));
                $("#containerWindowResources, #containerWindowScript").css("height", document.documentElement.clientHeight - 80);
                $("#containerWindowResources, #containerWindowScript").children("#iconConfig").css("left", (document.documentElement.clientWidth / 2) - 30);
                $("#IDE").width($("#containerWindowScript").width() - 220);
                $("#IDE").height($("#containerWindowScript").height() - 50);
                /*$("#entityTable").width();*/
                //$("#entityTable").height($("#windowResources").height() - 255);
                $("#entityContainer").height($("#windowResources").height() - 255);
                
                goCenter(document.documentElement.clientHeight, document.documentElement.clientWidth - 180);
        }
        window.onresize();
    
        /**
         *  TOOLS MOUSEHOVER
         */
        $("#tool1base, #tool2base").mouseenter(function()
        {
                $(this).stop().animate(
                {
                        left: -7
                }, 100);
        }).mouseleave(function()
        {
                $(this).stop().animate(
                {
                        left: -200
                }, 100);
        });
        
        $("body").fadeIn(2000);
        /**
        * FLIP JANELA
        */
       $("#windowProjects").css("transform", "scale(0)").css("opacity", "0");
       $("#windowProjectsNew").css("transform", "scale(0)").css("opacity", "0");
       $("#windowLayout").css("transform", "scale(0)").css("opacity", "0");
       $("#windowResources").css("transform", "scale(0)").css("opacity", "0");
       $("#windowScript").css("transform", "scale(0)").css("opacity", "0");
       $("#windowEntity").css("transform", "scale(0)").css("opacity", "0");
       $("#windowDebug").css("transform", "scale(0)").css("opacity", "0");
       $("#windowElementos").css("transform", "scale(0)").css("opacity", "0");
       $("#windowCompleted").css("transform", "scale(0)").css("opacity", "0");

        getUser(function()
        {
                /**
                * SETA PROJETOS
                */
               listProj.setModel(modelProj);
               listProj.setElement("#meusProjetos");
               listProj.setInputFilter("#searchText");

               for(var i = 0; i < LogedUser.Projetos.length; i++)
               {
                      modelProj.add(new Item(LogedUser.Projetos[i].Nome, LogedUser.Projetos[i]));
               }
               
                scalePanels("windowProjects");
        });
        
        /**
         * ABRE PROJETO
         */
        listProj.addMouseActionListener(function(item)
        {
                openProject(item.obj);
                scalePanels("windowProjects", true);
        });
        
        /**
         * Adiciona elemento
         */
        listObjects.addMouseActionListener(function(item)
        {
                var objTmp = item.obj();
                objs.add(new Item(objTmp.JqueryId, objTmp));
                var strTmp = newElem(objTmp.returnCode(true, false));
                if(strTmp !== "")
                {
                        objTmp.FatherId = strTmp;
                        if(objTmp.FatherId.indexOf("divStatic") !== -1)
                        {
                                objTmp.StaticPos = true;
                                $(objTmp.JqueryId).remove();
                                newElem(objTmp.returnCode(true, false));
                        }
                }
                objTmp.implementGaiaEvents();
                
                stackObjs.makeMomentumZ(ptrPage.Elementos);
                ptrPage.Elementos.push(objTmp);
                checkObjs.add(new Item("Ocultar " + objTmp.JqueryId, objTmp, "check"));
                
                // salva
                window.onbeforeunload = onBefore;
                newObjeto(objTmp);
                // seleciona
                ptrObject = objTmp;
                $(objTmp.JqueryId).mousedown();
        });
        
        /**
         * Assina evento de troca
         * @argument {Objetos} obj description
         */
        Objetos.addSelectListener(function(obj)
        {
                if($(obj.JqueryId).hasClass("gaiaFocused"))
                {
                        if((lastJquerySelected !== "") && (lastJquerySelected !== obj.JqueryId))
                        {
                                if(ptrObject !== null)
                                {
                                        // retorna o estado original
                                        if(modelEstados.get(0) && (!modelEstados.get(0).obj.Deleted) && ($(lastJquerySelected).hasClass("anima")))
                                        {
                                                //$(obj.JqueryId).hasClass("anima");
                                                var blMult = false;
                                                if($(lastJquerySelected).hasClass("ui-multidraggable"))
                                                        blMult = true;

                                                $(lastJquerySelected).remove();

                                                if(modelEstados.get(0).obj.FatherId == "0")
                                                {
                                                        newElem(modelEstados.get(0).obj.returnCode(true, false));
                                                }
                                                else
                                                {
                                                        newElemD(modelEstados.get(0).obj.FatherId, modelEstados.get(0).obj.returnCode(true, false));
                                                }

                                                var filhos = FileFactory.childs(ptrPage.Elementos, lastJquerySelected);
                                                for(var f = 0; f < filhos.length; f++)
                                                {
                                                        newElemD(lastJquerySelected, filhos[f].returnCode(true, false));
                                                        filhos[f].implementGaiaEvents();
                                                }

                                                modelEstados.get(0).obj.implementGaiaEvents();

                                                if(blMult)
                                                {
                                                        $(lastJquerySelected).addClass("ui-multidraggable");
                                                }
                                        }
                                }
                        }
                        else
                        {
                                if(ptrObject !== null)
                                        obj = ptrObject;
                        }

                        // carrega a lista de estados
                        if(lastJquerySelected !== obj.JqueryId)
                        {
                                modelEstados.clear();
                                modelEstados.add(new Item("Estado Primario", obj));
                                for(var i = 0; i < obj.estados.length; i++)
                                {
                                        /** @type Objetos */
                                        var tmpState = obj.estados[i];
                                        modelEstados.add(new Item(tmpState.Name, tmpState));
                                }
                                objAnimas.setSelectIndex(0, false);
                        }

                        lastJquerySelected = obj.JqueryId;

                        $("#idSelected").text(obj.JqueryId);
                        $("#idSelected1").text(obj.JqueryId);
                        ptrObject = obj;
                        // seta forms
                        objEventosTipo.setSelectIndex(0, false);
                        objEventosTarget.setSelectIndex(0, false);
                        objEventosActions.setSelectIndex(0, false);
                        novo = true;
                        $("#objVar").val(ptrObject.Name);
                        $("#objAltura").val(ptrObject.H);
                        $("#objLargura").val(ptrObject.W);
                        $("#objTopo").val(ptrObject.T);
                        $("#objEsquerda").val(ptrObject.L);
                        $("#objAngulo").val(ptrObject.A);
                        $("#objPadding").val(ptrObject.P);
                        objCorFundo.setColor(ptrObject.Cb);
                        $("#objRadius").val(ptrObject.R);
                        $("#objSombra").val(ptrObject.S);
                        objCorSombra.setColor(ptrObject.Cs);
                        $("#objZindex").val(ptrObject.Zindex);
                        $("#objBorda").val(ptrObject.B);
                        objCorBorda.setColor(ptrObject.Cbb);
                        $("#objOpacity").val(ptrObject.Opacity);

                        if((ptrObject.ClassType === "GImage") 
                                || (ptrObject.ClassType === "GAudioHide")
                                || (ptrObject.ClassType === "GAudio")
                                || (ptrObject.ClassType === "GButton"))
                        {
                                $("#objRecurso").find("button").prop("disabled", false);
                                var ixSelectRecurso = 0;
                                var countAll = 0;
                                modelRecursos.lista_.filter(function(elem)
                                {
                                        if(elem.obj.cod === ptrObject.recurso)
                                        {
                                                ixSelectRecurso = countAll;
                                                countAll++;
                                                return elem;
                                        }
                                        countAll++;
                                })
                                objRecurso.setSelectIndex(ixSelectRecurso, false);
                        }
                        else
                        {
                                $("#objRecurso").find("button").prop("disabled", true);
                                objRecurso.setSelectIndex(0, false);
                        }

                        objFont.setSelectIndex(ptrObject.FontId);
                        $("#objFonteTam").val(ptrObject.SizeFont);
                        objCorFonte.setColor(ptrObject.Cf);
                        $("#objTexto").val(ptrObject.Text);

                        // estados checks
                        $("#objVisible").find("input").attr('checked', (ptrObject.Visible ? true: false));
                        $("#objFonteNegrito").find("input").attr('checked', (ptrObject.Negrito ? true: false));
                        $("#objFonteItalico").find("input").attr('checked', (ptrObject.Italico ? true: false));
                        $("#objFonteSublinhado").find("input").attr('checked', (ptrObject.Subline ? true: false));

                        // vamos agora colocar os novos fields
                        $("#SpecialFields").html("");

                        for(var i = 0; i < ptrObject.getPrivateAttrs().length; i++)
                        {      
                                switch (ptrObject.getPrivateAttrs()[i].Type)
                                {
                                        case "objCombo":
                                                $("#SpecialFields").append(
                                                        '<span style="color:  #333333; font-size: 11px;">' + ptrObject.getPrivateAttrs()[i].Name + '</span><br>\n' +
                                                        '<div id="objCombo' + ptrObject.Id + '' + ptrObject.getPrivateAttrs()[i].Method + '" class="btn-group">\n'+
                                                        '<button type="button" class="btn btn-default dropdown-toggle" style="width: 190px;" data-toggle="dropdown">\n'+
                                                        '        ' + (ptrObject.getPrivateAttrs()[i].Data === null ? ptrObject.getPrivateAttrs()[i].Name : ptrObject.getPrivateAttrs()[i].Data) + ' <span class="caret"></span>\n' +
                                                        '</button>\n' +
                                                        '<ul class="dropdown-menu" style="width: 190px;" role="menu">\n' +     
                                                        '</ul>\n'+
                                                '</div>');
                                                var tmpCombo = new Combobox();
                                                tmpCombo.setElement('#objCombo' + ptrObject.Id + '' + ptrObject.getPrivateAttrs()[i].Method);
                                                tmpCombo.setModel(window[ptrObject.getPrivateAttrs()[i].Model]);
                                                var method = ptrObject[ptrObject.getPrivateAttrs()[i].Method];
                                                tmpCombo.addMouseActionListener(function(ptr, method)
                                                {
                                                        return function(obj)
                                                        {
                                                                method.call(ptr, obj.string, obj);
                                                        };
                                                }(ptrObject, method));
                                        break;
                                        case "objText":
                                                $("#SpecialFields").append(
                                                        '<span style="color:  #333333; font-size: 11px;">' + ptrObject.getPrivateAttrs()[i].Name + ': <br> </span>\n'+
                                                        '<input id="objText' + ptrObject.Id + '' + ptrObject.getPrivateAttrs()[i].Method + '" type="text" class="form-control" style="height: 25px; padding: 0px;" placeholder="'
                                                        + ptrObject.getPrivateAttrs()[i].Name +'" value="' + ptrObject.getPrivateAttrs()[i].Data + '">'
                                                );
                                                var method = ptrObject[ptrObject.getPrivateAttrs()[i].Method];
                                                $('#objText' + ptrObject.Id + '' + ptrObject.getPrivateAttrs()[i].Method).change(function(ptr, method)
                                                {
                                                        return function(obj)
                                                        {
                                                                method.call(ptr, $(obj.target).val());
                                                        };
                                                }(ptrObject, method));
                                        break;
                                        case "objNumber":
                                                $("#SpecialFields").append(
                                                        '<span style="color:  #333333; font-size: 11px;">' + ptrObject.getPrivateAttrs()[i].Name + ': <br> </span>\n'+
                                                        '<input id="objNumber' + ptrObject.Id + '' + ptrObject.getPrivateAttrs()[i].Method + '" type="text" class="form-control" style="height: 25px; padding: 0px;" placeholder="'
                                                        + ptrObject.getPrivateAttrs()[i].Name +'" value="' + ptrObject.getPrivateAttrs()[i].Data + '">'
                                                );
                                                var method = ptrObject[ptrObject.getPrivateAttrs()[i].Method];
                                                $('#objNumber' + ptrObject.Id + '' + ptrObject.getPrivateAttrs()[i].Method).change(function(ptr, method)
                                                {
                                                        return function(obj)
                                                        {
                                                                method.call(ptr, parseFloat($(obj.target).val()));
                                                        };
                                                }(ptrObject, method));
                                        break;
                                        case "objBoolean":

                                        break;
                                }
                        }

                        stackObjs.makeMomentumZ(ptrPage.Elementos);

                        // salva
                        saveAfter(true);
                }
        });
        
        /**
         * Evento de midia
         */
        objRecurso.addMouseActionListener(function(obj)
        {
                changePath(ptrObject.Id, obj.icon);
                ptrObject.recurso = obj.obj.cod;
                if(ptrObject.ClassType === "GImage")
                {
                        var imgTmp = new Image();
                        imgTmp.onload = function()
                        {
                                $("#objAltura").val(imgTmp.height).change();
                                $("#objLargura").val(imgTmp.width).change();
                        };
                        imgTmp.src = obj.icon;
                }
                // salva
                saveAfter();
        });
        
        objFont.addMouseActionListener(function(obj)
        {
                changeFont(ptrObject.JqueryId, obj.obj);
                ptrObject.FontId = objFont.getSelectIndex();
                ptrObject.Font = obj.obj;
                // salva
                saveAfter();
        });
        
        /* FECHA PROJETO ATUAL */
        $("#closeProject").click(function()
        {
                $("#main").html("");
                $("#pgDinamic").text(".pg_sub { position: absolute; width: " + 0 + 
                "px; height: " + 0 + "px; background-color: #EAEAEA; }");
                 scalePanels("windowProjects");
                 ptrObject = null;
                 ptrPage = null;
                 //ptrProject = null;
        });
        
           /* CHAMA JANELA DE NOVO PROJETO */
          $("#novoProjecto").click(function()
          {
                    scalePanels("windowProjects", true, function()
                    {
                              scalePanels("windowProjectsNew");
                    });
          });
          
          /* FECHA JANELA DE NOVO PROJETO E RETORNA PARA SELECIONAR PROJETO */
          $("#fechaProjectoNew").click(function()
          {
                    scalePanels("windowProjectsNew", true, function()
                    {
                              scalePanels("windowProjects");
                    });
          });
          
          /* REGISTRA NOVO PROJETO */
          $("#criaProjecto").click(function()
          {
                  newProject();
          });
          
          /* REGISTRA NOVO LAYOUT */
          $("#okLAyout").click(function()
          {
                  newLayout();
          });
          
          $("#addRecurso").click(function()
          {
                  scalePanels("windowResources");
          });
          
          $("#addEntities").click(function()
          {
                  scalePanels("windowEntity");
          });
          
          $("#addRecursoRec").click(function()
          {
                  if($("#recursoNome").val() !== "")
                  {
                        var tmpRes = new Recursos($("#recursoNome").val(), 0, fileUp3.getRealFileName());
                        newResource(tmpRes);
                  }
                  else
                  {
                        $("#recursoNome").focus();
                        $("#recursoNome").val("Coloque um nome aqui!");
                        $("#recursoNome").select();
                  }
          });
          
          $("#okResource").click(function()
          {
                  scalePanels("windowResources", true);
          });
          
          $("#okEntity").click(function()
          {
                  scalePanels("windowEntity", true);
                  makeUserEntities();
          });
          
          $("#objEventoScript").click(function()
          {
                IDE.setText("");
                scalePanels("windowScript");
                eventChange = null;
                for(var i = 0; i < ptrObject.eventos.length; i++)
                {
                        /** @type Eventos */
                        var evTmp = ptrObject.eventos[i];
                        if((evTmp.idEvento === objEventosTipo.getSelectIndex()) 
                                && (evTmp.TargetJqueryId === "")
                                && (evTmp.idAction === 0))
                        {
                                eventChange = evTmp;
                                IDE.setText(eventChange.Script);
                                break;
                        }
                }
                var f = new FileFactory();
                IDE.setHtmlPageParsed(f.makeStrign());
          });
          
          $("#scriptPage").click(function()
          {
                  IDE.setText("");
                  scalePanels("windowScript");
                  IDE.setText(ptrPage.ScriptGeral);
                  eventGeral = true;
                  var f = new FileFactory();
                  IDE.setHtmlPageParsed(f.makeStrign());
          });
          
          $("#elementoPage").click(function()
          {
                  scalePanels("windowElementos");
          });
          
          $("#closeElementos").click(function()
          {
                  scalePanels("windowElementos", true);
          });
          
          $("#scriptCancel").click(function()
          {
                  scalePanels("windowScript", true);
                  eventGeral = false;
          });
          
          $("#scriptSave").click(function()
          {
                if(eventGeral)
                {
                        ptrPage.ScriptGeral = IDE.getText();
                        saveAfter();
                        eventGeral = false;
                }
                else if(eventChange !== null)
                {
                         eventChange.Script = IDE.getText();
                         saveAfter();
                }
                else
                {
                        var evento = new Eventos(objEventosTipo.getSelectIndex(), "", 0);
                        evento.Script = IDE.getText();
                        window.onbeforeunload = onBefore;
                        newEvento(evento);
                }
                scalePanels("windowScript", true);
          });
          
          $("#scriptInsert").click(function()
          {
                  if((objScriptAction.getSelectIndex() !== 0) && (objScriptTarget.getSelectIndex() !== 0))
                  {
                          IDE.addFragment(objScriptAction.getSelectedItem().obj(objScriptTarget.getSelectedItem().string));
                  }
          });
          
          $("#scriptInsert1").click(function()
          {
                  if((objScriptTarget1.getSelectIndex() !== 0) && (objScriptAction1.getSelectIndex() !== 0))
                  {
                          IDE.addFragment(objScriptAction1.getSelectedItem().obj(objScriptTarget1.getSelectedItem().string, ""));
                  }
          });
          
          $("#completeOpen").click(function()
          {
                  scalePanels("windowCompleted", true);
                  winRef = window.open(GLOBALURL, "_blank");
                  if(GLOBALURL.indexOf(".zip") === -1)
                        scalePanels("windowDebug");
          });
          
          $("#savePage").click(function()
          {
                        saveAfter(true, true);
          });
          
          $("#debugPage").click(function()
          {
                  saveAfter(true, true);
                  $("#debugPage").find("img").attr("src", "../img/loading.gif");
                  makeProject();
          });
          
          $("#packagePage").click(function()
          {
                  $("#packagePage").find("img").attr("src", "../img/loading.gif");
                  makePackage();
          });
          
          $("#addPage").click(function()
          {
                  newPage();
          });
          
          $("#remPage").click(function()
          {
                  
          });

          $("#setLayoutH").click(function()
          {
                  var res = 0;
                  res = prompt("Digite valor da altura:", ptrLayout.Altura);
                  if((res !== null) && (res > -1))
                  {
                        ptrLayout.Altura = parseFloat(res);
                        saveLayout();
                        openLayout(ptrLayout.pgI);
                  }
          });

          $("#addEstado").click(function()
          {
                  window.onbeforeunload = onBefore;
                  newState();
          });

          $("#addEntityColl").click(function()
          {
                  ptrEntity.Fields.push(
                  {
                          Name: $("#collEntityNome").val(),
                          Type: comboTypes.getSelectedItem().string
                  });
                  
                  projEntities.setSelectIndex(ptrEntityIx, true);
                  saveEntity();
          });

          $("#addEntity").click(function()
          {
                  ptrProject.getEntities().Entities.push(
                  {
                          Name: $("#entityNome").val(),
                          Fields: []
                  });
                  modelEntities.add(new Item($("#entityNome").val(), ptrProject.getEntities().Entities[ptrProject.getEntities().Entities.length -1]));
                  modelTypes.add(new Item($("#entityNome").val(), ptrProject.getEntities().Entities[ptrProject.getEntities().Entities.length -1]));
                  projEntities.setSelectIndex(ptrProject.getEntities().Entities.length -1, true);
                  saveEntity();
                  $("#entityNome").val("");
          });

          /**
           * TIRA SELEÇÃO MULTIPLA
           */
          document.ondblclick = function()
          {
                  $(".ui-multidraggable").removeClass("ui-multidraggable");
          };
          
          /**
           * VAMOS CLICAR
           */
          $("#showEvents").click(function()
          {
                  $(".btn").removeClass("mpro3Active");
                  $(this).addClass("mpro3Active");
                  $("#tool3Things").fadeOut(500, function()
                  {
                          $("#tool4Things").fadeIn(500);
                  });
          });
          
          $("#showProps").click(function()
          {
                  $(".btn").removeClass("mpro3Active");
                  $(this).addClass("mpro3Active");
                  $("#tool4Things").fadeOut(500, function()
                  {
                          $("#tool3Things").fadeIn(500);
                  });
          });
          $("#showProps").click();
          
          /**
           * Thread para pegar as propiedades do objeto selecionado
           */
          thread = new Thread(function()
          {
                if(ptrObject !== null)
                {
                        var mySoma = 0;
                        // verifica se tem multidrag
                        if(_stack().length > 0)
                        {
                                for(var i = 0; i < _stack().length; i++)
                                {
                                        for(var j = 0; j < ptrPage.Elementos.length; j++)
                                        {
                                              if(ptrPage.Elementos[j].JqueryId === _stack()[i])
                                              {
                                                        /** @type $ */
                                                        var objTmp = $(ptrPage.Elementos[j].JqueryId);
                                                        
                                                        ptrPage.Elementos[j].W = objTmp.width();
                                                        ptrPage.Elementos[j].H = objTmp.height();
                                                        ptrPage.Elementos[j].T = parseFloat(objTmp.css("top"));
                                                        ptrPage.Elementos[j].L = parseFloat(objTmp.css("left"));
                                                        var nowSoma = ($(ptrPage.Elementos[j].JqueryId).offset().top / scale) + $(ptrPage.Elementos[j].JqueryId)[0].scrollHeight;
                                                        if(mySoma < nowSoma)
                                                                mySoma = nowSoma;
                                              }
                                        }
                                }
                        }
                        else if(ptrObject !== null)
                        {
                                // legal
                                /** @type $ */
                                var objTmp = $(ptrObject.JqueryId);
                                ptrObject.W = objTmp.width();
                                ptrObject.H = objTmp.height();
                                ptrObject.T = parseFloat(objTmp.css("top"));
                                ptrObject.L = parseFloat(objTmp.css("left"));
                                mySoma = ($(ptrObject.JqueryId).offset().top / scale) + $(ptrObject.JqueryId)[0].scrollHeight;
                        }
                        
                        if(ptrProject.layout[0].Tipo === Layout.WEB)
                        {
                                if(__badWolf.__Soma < mySoma)
                                {
                                        __badWolf.__Soma = mySoma;
                                        if($(document).height() < mySoma)
                                        {
                                                $("#pgDinamic").text(".pg_sub { position: absolute; width: " + ptrProject.LarguraPaginas + 
                                                "px; height: " + mySoma + "px; background-color: #EAEAEA; }");
                                        }
                                }
                        }
                }
          });
          thread.run();
          
          /**
           * Eventos de input
           */
          changeEvents();
          
          /**
           * Eventos de teclado
           */
          keyboard.onDeletePressed(function()
          {
                  stackObjs.makeMomentumZ(ptrPage.Elementos);
                  deleteObjeto();
          });
          
          keyboard.onLeftPressed(function()
          {
                  if(_stack().length === 0)
                        changeL(ptrObject.JqueryId, ptrObject.L -1);
                  else
                  {
                          for(var i = 0; i < _stack().length; i++)
                          {
                                  for(var j = 0; j < ptrPage.Elementos.length; j++)
                                  {
                                        if(ptrPage.Elementos[j].JqueryId === _stack()[i])
                                        {
                                                changeL(ptrPage.Elementos[j].JqueryId, ptrPage.Elementos[j].L -1);
                                        }
                                  }
                          }
                  }
                  saveAfter();
          });
          
          keyboard.onRightPressed(function()
          {
                  if(_stack().length === 0)
                        changeL(ptrObject.JqueryId, ptrObject.L +1);
                  else
                  {
                          for(var i = 0; i < _stack().length; i++)
                          {
                                  for(var j = 0; j < ptrPage.Elementos.length; j++)
                                  {
                                        if(ptrPage.Elementos[j].JqueryId === _stack()[i])
                                        {
                                                changeL(ptrPage.Elementos[j].JqueryId, ptrPage.Elementos[j].L +1);
                                        }
                                  }
                          }
                  }
                  saveAfter();
          });
          
          keyboard.onDownPressed(function()
          {
                  if(_stack().length === 0)
                        changeTop(ptrObject.JqueryId, ptrObject.T +1);
                  else
                  {
                          for(var i = 0; i < _stack().length; i++)
                          {
                                  for(var j = 0; j < ptrPage.Elementos.length; j++)
                                  {
                                        if(ptrPage.Elementos[j].JqueryId === _stack()[i])
                                        {
                                                changeTop(ptrPage.Elementos[j].JqueryId, ptrPage.Elementos[j].T +1);
                                        }
                                  }
                          }
                  }
                  saveAfter();
          });
          
          keyboard.onUpPressed(function()
          {
                  if(_stack().length === 0)
                        changeTop(ptrObject.JqueryId, ptrObject.T -1);
                  else
                  {
                          for(var i = 0; i < _stack().length; i++)
                          {
                                  for(var j = 0; j < ptrPage.Elementos.length; j++)
                                  {
                                        if(ptrPage.Elementos[j].JqueryId === _stack()[i])
                                        {
                                                changeTop(ptrPage.Elementos[j].JqueryId, ptrPage.Elementos[j].T -1);
                                        }
                                  }
                          }
                  }
                  saveAfter();
          });
          
          keyboard.onCtrVPressed(function()
          {
                  // copia elementos selecionados
                  var elems = _stack();
                  
                  for(var i = 0; i < elems.length; i++)
                  {
                          for(var j = 0; j < ptrPage.Elementos.length; j++)
                          {
                                  if(ptrPage.Elementos[j].JqueryId === elems[i])
                                  {
                                                var objTmp = ptrPage.Elementos[j].copy();
                                                objs.add(new Item(objTmp.JqueryId, objTmp));
                                                var strTmp = newElem(objTmp.returnCode(true, false));
                                                /*if(strTmp !== "")
                                                {
                                                        objTmp.FatherId = strTmp;
                                                }*/
                                                objTmp.implementGaiaEvents();

                                                stackObjs.makeMomentumZ(ptrPage.Elementos);
                                                ptrPage.Elementos.push(objTmp);

                                                // salva
                                                window.onbeforeunload = onBefore;
                                                newObjeto(objTmp);
                                  }
                          }
                  }
          });
          
          keyboard.onCtrYPressed(function()
          {
                  if(stackObjs.verifiStackY())
                  {
                          ptrPage.Elementos = stackObjs.getMomentumY(ptrPage.Elementos);
                          openPage(comboTool1Paginas.getSelectIndex());
                          saveAfter(true);
                  }
          });
          
          keyboard.onCtrZPressed(function()
          {
                  if(stackObjs.verifiStackZ())
                  {
                        ptrPage.Elementos = stackObjs.getMomentumZ(ptrPage.Elementos);
                        openPage(comboTool1Paginas.getSelectIndex());
                        saveAfter(true);
                  }
          });
});

function saveAfter(dontStack, gogo)
{
        if((gogo !== undefined) && (gogo === true))
        {
                if(!dontStack)
                        stackObjs.makeMomentumZ(ptrPage.Elementos);
                if(canSetTimeout)
                {
                        canSetTimeout = false;
                        window.onbeforeunload = onBefore;
                        $("#savePage").find("img").attr("src", "../img/loading.gif");
                        setTimeout(function()
                        {
                                canSetTimeout = true;
                                saveLayout();
                                saveProject();
                                savePage(function()
                                {
                                        //window.onbeforeunload = null;
                                        confirmados++;
                                        var t = new Thread(function()
                                        {
                                                if(confirmados === envios)
                                                {
                                                        t.stop();
                                                }
                                                verificaSaves();
                                        });
                                        t.run();
                                        //verificaSaves();
                                });
                        }, 10000);
                }
        }
}

function verificaSaves()
{
        if(confirmados === envios)
        {
                // tudo salvadinho
                window.onbeforeunload = null;
                $("#savePage").find("img").attr("src", "../img/grava.png");
        }
}

function onBefore()
{
        return "Espere dados estão sendo gravados!";
}

/**
 * Abre o projeto passado por parametro
 * @param {Projeto} proj
 */
function openProject(proj)
{
        Objetos.counterId = 0;
        
        $("#projName").text(proj.Nome);
        $("#projAltura").val(proj.AlturaPaginas);
        $("#projLargura").val(proj.LarguraPaginas);
        comboTool1Efeitos.setSelectIndex(proj.layout[0].Efeito);
        colorPick2.setColor(proj.layout[0].BackgroundColor);
        fileUp2.setFile(proj.layout[0].BackgroundImage);
        ptrProject = proj;
        ptrProject.ParseJsonEntities();
        
        /**
         * Verifica as páginas de layout
         */
        switch (proj.layout[0].Tipo)
        {
                case Layout.EAD:
                        modelLayoutsPages.clear();
                        modelLayoutsPages.add(new Item("Topo", proj.paginas[0]));
                        modelLayoutsPages.add(new Item("Rodapé", proj.paginas[1]));
                break;
                case Layout.WEB:
                        modelLayoutsPages.clear();
                        modelLayoutsPages.add(new Item("Topo", proj.paginas[0]));
                        modelLayoutsPages.add(new Item("Rodapé", proj.paginas[1]));
                break;
                default :
                        modelLayoutsPages.clear();
                        modelLayoutsPages.add(new Item("Topo", proj.paginas[0]));
                        modelLayoutsPages.add(new Item("Rodapé", proj.paginas[1]));
                break;
        }
        
        modelPaginas.clear();
        for(var i = 2; i < proj.paginas.length; i++)
        {
                if(proj.layout[0].Tipo === Layout.EAD)
                {
                        var pg = proj.paginas[i];
                        modelPaginas.add(new Item("Página " + (pg.Indice -1), pg));
                }
                else if(proj.layout[0].Tipo === Layout.WEB)
                {
                        var pg = proj.paginas[i];
                        modelPaginas.add(new Item("Página " + (pg.Indice -1), pg));
                }
                else if(proj.layout[0].Tipo === Layout.WEBAPP)
                {
                        var pg = proj.paginas[i];
                        modelPaginas.add(new Item("Página " + (pg.Indice -1), pg));
                }
        }
        
        /*if(proj.layout[0].Tipo === Layout.WEBAPP)
        {
                for(var i = 0; i < proj.paginas.length; i++)
                {
                        var pg = proj.paginas[i];
                        modelPaginas.add(new Item("Página " + (pg.Indice -1), pg));
                }
        }*/
        
        modelRecursos.clear();
        modelRecursos.add(new Item("Padrão", new Objetos(), "../img/question5.png", 120));
        for(var i = 0; i < proj.recursos.length; i++)
        {
                /** @type Recursos */
                var rec = proj.recursos[i];
                if((rec.Arquivo.indexOf(".jpg") !== -1) || (rec.Arquivo.indexOf(".png") !== -1) || (rec.Arquivo.indexOf(".jpeg") !== -1) || (rec.Arquivo.indexOf(".gif") !== -1))
                        modelRecursos.add(new Item(rec.Nome, rec, "../dados/" + LogedUser.UserName + "_" + LogedUser.cod + "/" + rec.Arquivo, 120));
                        //modelRecursos.add(new Item(rec.Nome, rec, "../" + LogedUser.UserName + "_" + LogedUser.cod + "/" + rec.Arquivo, 120));
                else
                        modelRecursos.add(new Item(rec.Nome, rec, "../img/clipping_sound.png", 120));
        }
        
        // e mostra a página
        $("#main").show();
        goCenter(document.documentElement.clientHeight, document.documentElement.clientWidth - 180);
        //openPage(0);
        
        // atualiza objectsID
        var tmpId = 0;
        for(var j = 0; j < ptrProject.paginas.length; j++)
        {
                /** @type Paginas */
                var refPage =  ptrProject.paginas[j];
                for(var k = 0; k < refPage.Elementos.length; k++)
                {             
                        /** @type Objetos */
                        var refElem = refPage.Elementos[k];
                        if(tmpId < refElem.Id)
                                tmpId = refElem.Id;
                }
                openPage(j);
        }
        
        openPage(0);
        
        Objetos.counterId = tmpId + 1;
        
        // entidades
        ptrProject.ParseJsonEntities();
        
        for(var i = 0; i < ptrProject.getEntities().Entities.length; i++)
        {
                modelEntities.add(new Item(ptrProject.getEntities().Entities[i].Name, ptrProject.getEntities().Entities[i]));
                modelTypes.add(new Item(ptrProject.getEntities().Entities[i].Name, ptrProject.getEntities().Entities[i]));
        }
        
        makeUserEntities();
}

function openPage(pgI)
{
        lastJquerySelected = "";
        ptrObject = null;
        comboTool1Paginas.setSelectIndex(pgI, false);
        ptrPage = comboTool1Paginas.getSelectedItem().obj;
        
        $("#pgDinamic").text(".pg_sub { position: absolute; width: " + ptrProject.LarguraPaginas + 
                "px; height: " + ptrProject.AlturaPaginas + "px; background-color: #EAEAEA; }");
        
        $("#main").html("");
        goCenter(document.documentElement.clientHeight, document.documentElement.clientWidth - 180);
        
        if(ptrProject.layout[0].Tipo === Layout.WEB)
        {
                $("#main").css("top", 5);
                $("#pgDinamic").text(".pg_sub { position: absolute; width: " + ptrProject.LarguraPaginas + 
                "px; height: " + $(document).height() + "px; background-color: #EAEAEA; }");
        }
        
        objs.clear();
        checkObjs.clear();
        objs.add(new Item("Nenhum"));
        //ptrPage = ptrProject.paginas[pgI];
        
        for(var i = 0; i < ptrPage.Elementos.length; i++)
        {
                /** @type Objetos */
                var objTmp = ptrPage.Elementos[i];
                
                if(!objTmp.Deleted)
                {
                        objs.add(new Item(objTmp.JqueryId, objTmp));
                        checkObjs.add(new Item("Ocultar " + objTmp.JqueryId, objTmp, "check"));
                        //var strTmp = newElem(objTmp.returnCode(true, false));
                        var strTmp = "";
                        
                        if(objTmp.FatherId == "0")
                        {
                                strTmp = newElem(objTmp.returnCode(true, false));
                        }
                        else
                        {
                                strTmp = newElemD(objTmp.FatherId, objTmp.returnCode(true, false));
                        }
                        
                        /*if(strTmp !== "")
                        {
                                objTmp.FatherId = strTmp;
                        }*/
                        objTmp.implementGaiaEvents();
                }
        }
        
        /*
         * run magic for web type
         */
        if(ptrProject.layout[0].Tipo === Layout.WEB)
        {
                $("#main").find(".badWolf").each(
                        function(i)
                        { 
                                if($(this).css("overflow") === "visible")
                                { 
                                        this.__Soma = ($(this).offset().top / scale) + $(this)[0].scrollHeight; 
                                        if((__badWolf === null) || (__badWolf.__Soma < this.__Soma))
                                        { 
                                                __badWolf = this;
                                        }
                                }
                        }
                );
        
                if($(document).height() < __badWolf.__Soma)
                {
                        $("#pgDinamic").text(".pg_sub { position: absolute; width: " + ptrProject.LarguraPaginas + 
                        "px; height: " + __badWolf.__Soma + "px; background-color: #EAEAEA; }");
                }
        }
        
        ptrPage.ResolveObjectsSpecialFields();
        window.onresize();
}

function openLayout(pgI)
{
        lastJquerySelected = "";
        ptrObject = null;
        $("#main").html("");
        objs.clear();
        checkObjs.clear();
        objs.add(new Item("Nenhum"));
        
        /**
         * ISSO É BURRICE ? NÃO QUE ISSO
         */
        switch (pgI)
        {
                case 0:
                        ptrLayout = ptrProject.layout[0].Topo[0];
                        ptrLayout.pgI = pgI;
                        ptrPage = ptrProject.layout[0].Topo[0];
                        $("#pgDinamic").text(".pg_sub { position: absolute; width: " + ptrPage.Largura + 
                "px; height: " + ptrPage.Altura + "px; background-color: #EAEAEA; }");
                        ptrPage = ptrProject.paginas[0];
                break;
                case 1:
                        ptrLayout = ptrProject.layout[0].Rodape[0];
                        ptrLayout.pgI = pgI;
                        ptrPage = ptrProject.layout[0].Rodape[0];
                        $("#pgDinamic").text(".pg_sub { position: absolute; width: " + ptrPage.Largura + 
                "px; height: " + ptrPage.Altura + "px; background-color: #EAEAEA; }");
                        ptrPage = ptrProject.paginas[1];
                break;
        }
        
        goCenter(document.documentElement.clientHeight, document.documentElement.clientWidth - 180);
        
        /*for(var i = 0; i < ptrPage.Elementos.length; i++)
        {
                var objTmp = ptrPage.Elementos[i];
                
                if(!objTmp.Deleted)
                {
                        objs.add(new Item(objTmp.JqueryId, objTmp));
                        checkObjs.add(new Item("Ocultar " + objTmp.JqueryId, objTmp, "check"));
                        var strTmp = newElem(objTmp.returnCode(true, false));
                        /*if(strTmp !== "")
                        {
                                objTmp.FatherId = strTmp;
                        }*/
                        /*objTmp.implementGaiaEvents();
                }
        }*/
        
        for(var i = 0; i < ptrPage.Elementos.length; i++)
        {
                /** @type Objetos */
                var objTmp = ptrPage.Elementos[i];
                
                if(!objTmp.Deleted)
                {
                        objs.add(new Item(objTmp.JqueryId, objTmp));
                        checkObjs.add(new Item("Ocultar " + objTmp.JqueryId, objTmp, "check"));
                        //var strTmp = newElem(objTmp.returnCode(true, false));
                        var strTmp = "";
                        
                        if(objTmp.FatherId == "0")
                        {
                                strTmp = newElem(objTmp.returnCode(true, false));
                        }
                        else
                        {
                                strTmp = newElemD(objTmp.FatherId, objTmp.returnCode(true, false));
                        }
                        
                        /*if(strTmp !== "")
                        {
                                objTmp.FatherId = strTmp;
                        }*/
                        objTmp.implementGaiaEvents();
                }
        }
        ptrPage.ResolveObjectsSpecialFields();
        window.onresize();
}

function changeEvents()
{
        $(".objNumber").change(function()
        {
                ptrObject[$(this).attr("method")](parseFloat($(this).val()));
                // salva
                saveAfter();
        });
        $(".objBoolean").change(function()
        {
                ptrObject[$(this).attr("method")]($(this).is(":checked"));
                // salva
                saveAfter();
        });
        $(".objText").bind("input propertychange", function()
        {
                ptrObject[$(this).attr("method")]($(this).val());
                // salva
                saveAfter();
        });
        objCorFundo.onColorChange(function()
        {
                ptrObject.setBackgroundColor(objCorFundo.getColor());
                
                // salva
                saveAfter();
        });
        objCorSombra.onColorChange(function()
        {
                ptrObject.setShadowColor(objCorSombra.getColor());
                // salva
                saveAfter();
        });
        objCorBorda.onColorChange(function()
        {
                ptrObject.setBorderColor(objCorBorda.getColor());
                // salva
                saveAfter();
        });
        objCorFonte.onColorChange(function()
        {
                ptrObject.setFontColor(objCorFonte.getColor());
                // salva
                saveAfter();
        });
        
        /*
         * Combos Eventos
         * */
        objEventosTipo.addMouseActionListener(function()
        {
                /*for(var i = 0; i < modelEventos.getTam(); i++)
                {
                        /** @type Eventos */
                       /*var event = modelEventos.get(i).obj;
                       if(event.idAction === objEventosTipo.getSelectIndex())
                       {
                               
                       }
                }*/
                objEventosTarget.setSelectIndex(0, false);
                objEventosActions.setSelectIndex(0, false);
        });
        
        objEventosTarget.addMouseActionListener(function()
        {
                //objEventosActions.setSelectIndex(0, false);
                for(var i = 0; i < ptrObject.eventos.length; i++)
                {
                        /** @type Eventos */
                        var evTmp = ptrObject.eventos[i];
                        if(evTmp.idEvento === objEventosTipo.getSelectIndex())
                        {
                                if(evTmp.TargetJqueryId === objEventosTarget.getSelectedItem().obj.JqueryId)
                                {
                                        objEventosActions.setSelectIndex(evTmp.idAction, false);
                                        $("#objEventosApoio").val(evTmp.NumApoio);
                                        novo = false;
                                        eventChange = evTmp;
                                        break;
                                }
                                else
                                        novo = true;
                        }
                        else
                                novo = true;
                }
        });
        
        objEventosActions.addMouseActionListener(function(obj)
        {
                if(eventChange === null)
                {
                        objEventosTarget.setSelectIndex(objEventosTarget.getSelectIndex(), true);
                }
                        
                
                //if((objEventosTarget.getSelectIndex() > 0) && (objEventosActions.getSelectIndex() > 0))
                if((objEventosTarget.getSelectIndex() > 0))
                {
                        eval(obj.obj(objEventosTarget.getSelectedItem().obj.JqueryId, true));
                        setTimeout(function()
                        {
                                if(objEventosActions.getSelectIndex() < 6)
                                        $(objEventosTarget.getSelectedItem().obj.JqueryId).show();
                                else if(objEventosActions.getSelectIndex() === 7)
                                        $(objEventosTarget.getSelectedItem().obj.JqueryId).ion();
                                else if($(objEventosTarget.getSelectedItem().obj.JqueryId).css("display") === "none")
                                        $(objEventosTarget.getSelectedItem().obj.JqueryId).show();
                        }, 1500);
                        
                        if(novo)
                        {
                                var evento = new Eventos(objEventosTipo.getSelectIndex(), objEventosTarget.getSelectedItem().obj.JqueryId, objEventosActions.getSelectIndex());
                                evento.NumApoio = $("#objEventosApoio").val();
                                newEvento(evento);
                                novo = false;
                        }
                        else
                        {
                                eventChange.idAction = objEventosActions.getSelectIndex();
                                eventChange.TargetJqueryId = objEventosTarget.getSelectedItem().obj.JqueryId;
                                saveAfter();
                        }
                }
        });
        
        $("#objEventosApoio").change(function()
        {
                if(eventChange !== null)
                {
                        eventChange.NumApoio = $("#objEventosApoio").val();
                        saveAfter();
                }
        });
}

/**
* Scale for panels
* */
function scalePanels(id, out, funct)
{
          if(out !== undefined && out)
                    $("#" + id).animate(
                    {
                              opacity: 0
                    }, 
                    {
                              step: function( now, fx ) 
                              {
                                        $("#" + id).css("transform", "scale(" + now + ")");
                              },
                              duration: 500,
                              complete: funct
                    });
          else
                   $("#" + id).animate(
                    {
                              opacity: 1
                    }, 
                    {
                              step: function( now, fx ) 
                              {
                                        $("#" + id).css("transform", "scale(" + now + ")");
                              },
                              duration: 500,
                              complete: funct
                    }); 
}

/** @type window */
var winRef;

/**
* ENTER NO INPUT SAFIRA
*/
function safiraEnter(ev)
{
        if(ev.keyCode === 13)
        {
                $("#cmdSafira").val("");
                winRef = window.open("");
        }
}

function debugLogEnter(ev)
{
        if(ev.keyCode === 13)
        {
                errList.add(new Item($("#debugLog").val(), null, "../img/script.png"));
                //var str = winRef.eval($("#debugLog").val());
                winRef.postMessage($("#debugLog").val(), "*");
                $("#debugLog").val("");
                $("#debugTools").animate({ scrollTop: $('#debugTools')[0].scrollHeight}, 1000);
        }
}

function setErrorList(message, url, line)
{
        var tmpErr = new ScriptError(message, line);
        errList.add(new Item("<span style='color: red;'>" + tmpErr.Message + "</span>", tmpErr, "../img/error.png"));
        $("#debugTools").animate({ scrollTop: $('#debugTools')[0].scrollHeight}, 1000);
}

function closeDebug()
{
        errList.clear();
        scalePanels("windowDebug", true);
}

window.onerror = function(message, url, line)
{
        var tmpErr = new ScriptError(message, line);
        errList.add(new Item("<span style='color: red;'>" + tmpErr.Message + "</span>", tmpErr, "../img/error.png"));
        $("#debugLog").val("");
        $("#debugTools").animate({ scrollTop: $('#debugTools')[0].scrollHeight}, 1000);
};