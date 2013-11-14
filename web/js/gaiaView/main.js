/* 
 * main for VIEW Gaia Editor
 */

/**@type User */
var LogedUser = null;
/** @type Projeto */
var ptrProject = null;                                                                                                                  // projeto selecionado
/** @type Paginas */
var ptrPage = null;
/** @type Objetos */
var ptrObject = null;
var listProj = new List();
var listObjects = new List();
var listRecursos = new List();
var listDebug = new List();
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
var objs = new ItemModel();
var verifica = null;
var slice_url = "http://localhost:8084/GaiaEditor/system/";
var ajax = new Ajax();
var thread = null;
var canSetTimeout = true;
var keyboard = new KeyBoardUtils();
var stackObjs = new StackUndo();
var novo = true;
/** @type Eventos */
var eventChange = null;
var IDE;
var errList = new ItemModel();
/*var errList = new Lista();
errList.init();*/

$(document).ready(function()
{  
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
                openLayout(comboTool1Layouts.getSelectIndex());
        });
        
        modelLayouts.add(new Item("BOOK", 1));
        modelLayouts.add(new Item("EAD", 2));
        modelLayouts.add(new Item("SMARTPHONE", 3));
        modelLayouts.add(new Item("SMARTPHONEAPP", 4));
        modelLayouts.add(new Item("WEB", 5));
        modelLayouts.add(new Item("WEBAPP", 6));
        
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
         * SETA COLOR PICKERS
         */
        colorPick1.setElement("#colorPicker1");
        colorPick2.setElement("#colorPicker2");
        objCorFundo.setElement("#objCorFundo");
        objCorSombra.setElement("#objCorSombra");
        objCorBorda.setElement("#objCorBorda");
        objCorFonte.setElement("#objCorFonte");
        
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
                window.open("../" + LogedUser.UserName + "_" + LogedUser.cod + "/" + rec.Arquivo);
        });
        
        listDebug.setElement("#debugErros");
        listDebug.setModel(errList);
        
        modelObjects.add(new Item("Texto", function(){ return new GText(153, 52, 0, 0, true); }, "../img/ui_labels.png"));
        modelObjects.add(new Item("Container", function(){ return new GDiv(153, 52, 0, 0, true); }, "../img/div.png"));
        modelObjects.add(new Item("Imagem", function(){ return new GImage(64, 64, 0, 0, true); }, "../img/img.png"));
        modelObjects.add(new Item("Botão", function(){ return new GButton(67, 28, 0, 0, true); }, "../img/button.png"));
        modelObjects.add(new Item("HAudio", function(){ return new GAudioHide(16, 16, -20, -20, true); }, "../img/ui-audio.png"));
        
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
                return '$("' + id + '").change(function()\n' +
                                '{\n' +
                                        code + "\n" +
                                '});\n';
        }));
        
        objEventosActions.setElement("#objEventosAction");
        objEventosActions.setModel(modelActions);
        objScriptAction.setElement("#scriptAction");
        objScriptAction.setModel(modelActions);
        
        modelActions.add(new Item("Ação"));
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
        modelActions.add(new Item("Fade In", function(id, show)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').fadeIn(1000);"; 
                else
                        return "$('" + id + "').fadeIn(1000);";
        })); 			//3
        modelActions.add(new Item("Fade Out", function(id)
        {
                return "$('" + id + "').fadeOut(1000);"; 
        })); 			//4
        modelActions.add(new Item("Toogle", function(id, show)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').toggle(1000);";
                else
                        return "$('" + id + "').toggle(1000);";
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
        modelActions.add(new Item("Slide In Up", function(id, show)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('slide', {\n" +
                                        "	direction: 'up'\n" +
                                        "}, 1000);";
                else
                        return "$('" + id + "').show('slide', {\n" +
                                        "	direction: 'up'\n" +
                                        "}, 1000);";
        }));                                               //8
        modelActions.add(new Item("Slide In Down", function(id, show)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('slide', {\n" +
                                        "	direction: 'down'\n" +
                                        "}, 1000);";
                else
                        return "$('" + id + "').show('slide', {\n" +
                                        "	direction: 'down'\n" +
                                        "}, 1000);";
        }));		//9
        modelActions.add(new Item("Slide Out Up", function(id, show)
        {
                        return "$('" + id + "').hide('slide', {\n" +
                                        "	direction: 'up'\n" +
                                        "}, 1000);";
        }));		//10
        modelActions.add(new Item("Slide Out Down", function(id, show)
        {
                        return "$('" + id + "').hide('slide', {\n" +
                                        "	direction: 'up'\n" +
                                        "}, 1000);";
        }));		//11
        modelActions.add(new Item("Slide In Left", function(id, show)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('slide', {\n" +
                                        "	direction: 'left'\n" +
                                        "}, 1000);";
                else
                        return "$('" + id + "').show('slide', {\n" +
                                        "	direction: 'left'\n" +
                                        "}, 1000);";
        }));                                             //12
        modelActions.add(new Item("Slide In Right", function(id, show)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('slide', {\n" +
                                        "	direction: 'right'\n" +
                                        "}, 1000);";
                else
                        return "$('" + id + "').show('slide', {\n" +
                                        "	direction: 'right'\n" +
                                        "}, 1000);";
        }));		//13
        modelActions.add(new Item("Slide Out Left", function(id)
        {
                        return "$('" + id + "').hide('slide', {\n" +
                                        "	direction: 'left'\n" +
                                        "}, 1000);";
        }));		//14
        modelActions.add(new Item("Slide Out Right", function(id)
        {
                        return "$('" + id + "').hide('slide', {\n" +
                                        "	direction: 'right'\n" +
                                        "}, 1000);";
        }));	                      //15
        modelActions.add(new Item("Explode In", function(id, show)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('explode', {\n" +
                                        "	pieces: 50\n" +
                                        "}, 1000);";
                else
                        return "$('" + id + "').show('explode', {\n" +
                                        "	pieces: 50\n" +
                                        "}, 1000);";
        }));			//16
        modelActions.add(new Item("Explode Out", function(id)
        {
                        return "$('" + id + "').hide('explode', {\n" +
                                        "	pieces: 50\n" +
                                        "}, 1000);";
        }));		//17
        modelActions.add(new Item("Drop In Up", function(id, show)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('drop', {\n" +
                                        "	direction: 'up'\n" +
                                        "}, 1000);";
                else
                        return "$('" + id + "').show('drop', {\n" +
                                        "	direction: 'up'\n" +
                                        "}, 1000);";
        }));			//18
        modelActions.add(new Item("Drop In Down", function(id, show)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('drop', {\n" +
                                        "	direction: 'down'\n" +
                                        "}, 1000);";
                else
                        return "$('" + id + "').show('drop', {\n" +
                                        "	direction: 'down'\n" +
                                        "}, 1000);";
        }));		//19
        modelActions.add(new Item("Drop Out Up", function(id)
        {
                        return "$('" + id + "').hide('drop', {\n" +
                                        "	direction: 'up'\n" +
                                        "}, 1000);";
        }));		//20
        modelActions.add(new Item("Drop Out Down", function(id)
        {
                        return "$('" + id + "').hide('drop', {\n" +
                                        "	direction: 'down'\n" +
                                        "}, 1000);";
        }));		//21
        modelActions.add(new Item("Drop In Left", function(id, show)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('drop', {\n" +
                                        "	direction: 'left'\n" +
                                        "}, 1000);";
                else
                        return "$('" + id + "').show('drop', {\n" +
                                        "	direction: 'left'\n" +
                                        "}, 1000);";
        }));		                      //22
        modelActions.add(new Item("Drop In Right", function(id, show)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('drop', {\n" +
                                        "	direction: 'right'\n" +
                                        "}, 1000);";
                else
                        return "$('" + id + "').show('drop', {\n" +
                                        "	direction: 'right'\n" +
                                        "}, 1000);";
        }));		//23
        modelActions.add(new Item("Drop Out Left", function(id)
        {
                        return "$('" + id + "').hide('drop', {\n" +
                                        "	direction: 'left'\n" +
                                        "}, 1000);";
        }));		//24
        modelActions.add(new Item("Drop Out Right", function(id)
        {
                        return "$('" + id + "').hide('drop', {\n" +
                                        "	direction: 'right'\n" +
                                        "}, 1000);";
        }));		//25
        modelActions.add(new Item("Clip In V", function(id, show)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('clip', {\n" +
                                        "	direction: 'vertical'\n" +
                                        "}, 1000);";
                else
                        return "$('" + id + "').show('clip', {\n" +
                                        "	direction: 'vertical'\n" +
                                        "}, 1000);";
        }));			//26
        modelActions.add(new Item("Clip Out V", function(id)
        {
                        return "$('" + id + "').hide('clip', {\n" +
                                        "	direction: 'vertical'\n" +
                                        "}, 1000);";
        }));			//27
        modelActions.add(new Item("Clip In H", function(id, show)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('clip', {\n" +
                                        "	direction: 'horizontal'\n" +
                                        "}, 1000);";
                else
                        return "$('" + id + "').show('clip', {\n" +
                                        "	direction: 'horizontal'\n" +
                                        "}, 1000);";
        }));			//28
        modelActions.add(new Item("Clip Out H", function(id)
        {
                        return "$('" + id + "').hide('clip', {\n" +
                                        "	direction: 'horizontal'\n" +
                                        "}, 1000);";
        }));			//29
        modelActions.add(new Item("Blind In V", function(id, show)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('blind', {\n" +
                                        "	direction: 'vertical'\n" +
                                        "}, 1000);";
                else
                        return "$('" + id + "').show('blind', {\n" +
                                        "	direction: 'vertical'\n" +
                                        "}, 1000);";
        }));			//30
        modelActions.add(new Item("Blind Out V", function(id)
        {
                        return "$('" + id + "').hide('blind', {\n" +
                                        "	direction: 'vertical'\n" +
                                        "}, 1000);";
        }));		                      //31
        modelActions.add(new Item("Blind In H", function(id, show)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('blind', {\n" +
                                        "	direction: 'horizontal'\n" +
                                        "}, 1000);";
                else
                        return "$('" + id + "').show('blind', {\n" +
                                        "	direction: 'horizontal'\n" +
                                        "}, 1000);";
        }));			//32
        modelActions.add(new Item("Blind Out H", function(id)
        {
                        return "$('" + id + "').hide('blind', {\n" +
                                        "	direction: 'horizontal'\n" +
                                        "}, 1000);";
        }));		                      //33
        modelActions.add(new Item("Puff In", function(id, show)
        {
                if(show === true)
                        return "$('" + id + "').hide(); $('" + id + "').show('puff', {}, 1000);";
                else
                        return "$('" + id + "').show('puff', {}, 1000);";
        }));			//34
        modelActions.add(new Item("Puff Out", function(id)
        {
                        return "$('" + id + "').hide('puff', {}, 1000);";
        }));			//35
        modelActions.add(new Item("Flip In", function(id, show)
        {
                if(show === true)
                        return     '$("' + id + '").hide();\n' +
                                        '$("'+ id +'").css("opacity", 0); \n'+
                                        '$("'+ id +'").rotate3Di("flip"); \n'+
                                        '$("' + id + '").show(); \n'+
                                        '$("' + id + '").rotate3Di("unflip", 1000, {opacity: 1}); \n';
                else
                        return '$("'+ id +'").css("opacity", 0); \n'+
                                        '$("'+ id +'").rotate3Di("flip"); \n'+
                                        '$("' + id + '").show(); \n'+
                                        '$("' + id + '").rotate3Di("unflip", 1000, {opacity: 1}); \n';
        }));			//36
        modelActions.add(new Item("Flip Out", function(id)
        {
                        return '$("' + id + '").rotate3Di("flip", 1000, {opacity: 0}); \n';
        }));			//37
        modelActions.add(new Item("Play Audio", function(id)
        {
                return 'PlayAudio("' + id + '"); \n';
        }));			//38
        modelActions.add(new Item("Stop Audio", function(id)
        {
                return 'StopAudio("' + id + '"); \n';
        }));			//39
        
        objEventosTarget.setElement("#objEventosTarget");
        objEventosTarget.setModel(objs);
        objScriptTarget.setElement("#scriptTarget");
        objScriptTarget.setModel(objs);
        objScriptTarget1.setElement("#scriptTarget1");
        objScriptTarget1.setModel(objs);
        
        
        $("#windowDebug").multidraggable({cancel:false});
        
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
                
                $("#windowResources, #windowScript").css("width", (document.documentElement.clientWidth / 2));
                $("#windowResources, #windowScript").css("height", document.documentElement.clientHeight - 80);
                $("#windowResources, #windowScript").css("left", ((document.documentElement.clientWidth / 2) / 2) - 65);
                $("#containerWindowResources, #containerWindowScript").css("width", (document.documentElement.clientWidth / 2));
                $("#containerWindowResources, #containerWindowScript").css("height", document.documentElement.clientHeight - 80);
                $("#containerWindowResources, #containerWindowScript").children("#iconConfig").css("left", (document.documentElement.clientWidth / 2) - 30);
                $("#IDE").width($("#containerWindowScript").width() - 220);
                $("#IDE").height($("#containerWindowScript").height() - 50);
                
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
       $("#windowDebug").css("transform", "scale(0)").css("opacity", "0");

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
                }
                objTmp.implementGaiaEvents();
                ptrPage.Elementos.push(objTmp);
                // salva
                newObjeto(objTmp);
        });
        
        /**
         * Assina evento de troca
         */
        Objetos.addSelectListener(function(obj)
        {
                $("#idSelected").text(obj.JqueryId);
                $("#idSelected1").text(obj.JqueryId);
                ptrObject = obj;
                // seta forms
                objEventosTipo.setSelectIndex(0, false);
                objEventosTarget.setSelectIndex(0, false);
                objEventosActions.setSelectIndex(0, false);
                novo = true;
                $("#objAltura").val(ptrObject.H);
                $("#objLargura").val(ptrObject.W);
                $("#objTopo").val(ptrObject.T);
                $("#objEsquerda").val(ptrObject.L);
                $("#objPadding").val(ptrObject.P);
                objCorFundo.setColor(ptrObject.Cb);
                $("#objRadius").val(ptrObject.R);
                $("#objSombra").val(ptrObject.S);
                objCorSombra.setColor(ptrObject.Cs);
                $("#objZindex").val(ptrObject.Zindex);
                $("#objBorda").val(ptrObject.B);
                objCorBorda.setColor(ptrObject.Cbb);
                $("#objOpacity").val(ptrObject.Opacity);
                
                if((ptrObject.ClassType === "GImage") || (ptrObject.ClassType === "GAudioHide"))
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
                
                // salva
                saveAfter();
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
          
          $("#objEventoScript").click(function()
          {
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
          });
          
          $("#scriptCancel").click(function()
          {
                  scalePanels("windowScript", true);
          });
          
          $("#scriptSave").click(function()
          {
                if(eventChange !== null)
                {
                         eventChange.Script = IDE.getText();
                         saveAfter();
                }
                else
                {
                        var evento = new Eventos(objEventosTipo.getSelectIndex(), "", 0);
                        evento.Script = IDE.getText();
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
          
          $("#debugPage").click(function()
          {
                  makeProject();
                  scalePanels("windowDebug");
          });
          
          $("#addPage").click(function()
          {
                  newPage();
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
                        // verifica se tem multidrag
                        if($(".ui-multidraggable").length > 0)
                        {
                                // ae vc se ferrou
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
                  changeL(ptrObject.JqueryId, ptrObject.L -1);
                  saveAfter();
          });
          
          keyboard.onRightPressed(function()
          {
                  changeL(ptrObject.JqueryId, ptrObject.L +1);
                  saveAfter();
          });
          
          keyboard.onDownPressed(function()
          {
                  changeTop(ptrObject.JqueryId, ptrObject.T +1);
                  saveAfter();
          });
          
          keyboard.onUpPressed(function()
          {
                  changeTop(ptrObject.JqueryId, ptrObject.T -1);
                  saveAfter();
          });
          
          keyboard.onCtrZPressed(function()
          {
                  ptrPage.Elementos = stackObjs.getMomentumZ(ptrPage.Elementos);
                  openPage(comboTool1Paginas.getSelectIndex());
                  saveAfter();
          });
});

function saveAfter()
{
        if(canSetTimeout)
        {
                canSetTimeout = false;
                window.onbeforeunload = onBefore;
                setTimeout(function()
                {
                        canSetTimeout = true;
                        savePage(function()
                        {
                                window.onbeforeunload = null;
                        });
                }, 10000);
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
        }
        
        modelPaginas.clear();
        for(var i = 2; i < proj.paginas.length; i++)
        {
                if(proj.layout[0].Tipo === Layout.EAD)
                {
                        var pg = proj.paginas[i];
                        modelPaginas.add(new Item("Página " + (pg.Indice -1), pg));
                }
        }
        
        modelRecursos.clear();
        modelRecursos.add(new Item("Padrão", new Objetos(), "../img/question5.png", 120));
        for(var i = 0; i < proj.recursos.length; i++)
        {
                /** @type Recursos */
                var rec = proj.recursos[i];
                if((rec.Arquivo.indexOf(".jpg") !== -1) || (rec.Arquivo.indexOf(".png") !== -1) || (rec.Arquivo.indexOf(".jpeg") !== -1) || (rec.Arquivo.indexOf(".gif") !== -1))
                        modelRecursos.add(new Item(rec.Nome, rec, "../" + LogedUser.UserName + "_" + LogedUser.cod + "/" + rec.Arquivo, 120));
                else
                        modelRecursos.add(new Item(rec.Nome, rec, "../img/clipping_sound.png", 120));
        }
        
        // e mostra a página
        $("#main").show();
        goCenter(document.documentElement.clientHeight, document.documentElement.clientWidth - 180);
        openPage(0);
        
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
        }
        Objetos.counterId = tmpId + 1;
}

function openPage(pgI)
{
        ptrObject = null;
        comboTool1Paginas.setSelectIndex(pgI, false);
        ptrPage = comboTool1Paginas.getSelectedItem().obj;
        
        $("#pgDinamic").text(".pg_sub { position: absolute; width: " + ptrProject.LarguraPaginas + 
                "px; height: " + ptrProject.AlturaPaginas + "px; background-color: #EAEAEA; }");
        
        $("#main").html("");
        goCenter(document.documentElement.clientHeight, document.documentElement.clientWidth - 180);
        objs.clear();
        objs.add(new Item("Nenhum"));
        //ptrPage = ptrProject.paginas[pgI];
        
        for(var i = 0; i < ptrPage.Elementos.length; i++)
        {
                var objTmp = ptrPage.Elementos[i];
                objs.add(new Item(objTmp.JqueryId, objTmp));
                var strTmp = newElem(objTmp.returnCode(true, false));
                if(strTmp !== "")
                {
                        objTmp.FatherId = strTmp;
                }
                objTmp.implementGaiaEvents();
        }
}

function openLayout(pgI)
{
        ptrObject = null;
        $("#main").html("");
        objs.clear();
        objs.add(new Item("Nenhum"));
        
        switch (pgI)
        {
                case 0:
                        ptrPage = ptrProject.layout[0].Topo[0];
                        $("#pgDinamic").text(".pg_sub { position: absolute; width: " + ptrPage.Largura + 
                "px; height: " + ptrPage.Altura + "px; background-color: #EAEAEA; }");
                        ptrPage = ptrProject.paginas[0];
                break;
                case 1:
                        ptrPage = ptrProject.layout[0].Rodape[0];
                        $("#pgDinamic").text(".pg_sub { position: absolute; width: " + ptrPage.Largura + 
                "px; height: " + ptrPage.Altura + "px; background-color: #EAEAEA; }");
                        ptrPage = ptrProject.paginas[1];
                break;
        }
        
        goCenter(document.documentElement.clientHeight, document.documentElement.clientWidth - 180);
        
        for(var i = 0; i < ptrPage.Elementos.length; i++)
        {
                var objTmp = ptrPage.Elementos[i];
                objs.add(new Item(objTmp.JqueryId, objTmp));
                var strTmp = newElem(objTmp.returnCode(true, false));
                if(strTmp !== "")
                {
                        objTmp.FatherId = strTmp;
                }
                objTmp.implementGaiaEvents();
        }
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
                        
                
                if((objEventosTarget.getSelectIndex() > 0) && (objEventosActions.getSelectIndex() > 0))
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
                var str = winRef.eval($("#debugLog").val());
                errList.add(new Item(str, null, "../img/ok.png"));
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