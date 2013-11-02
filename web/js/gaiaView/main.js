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
var comboLayouts = new Combobox();
var comboEfeitos = new Combobox();
var comboTool1Paginas = new Combobox();
var comboTool1Efeitos = new Combobox();
var comboTool1Layouts = new Combobox();
var comboTool1Recurso = new Combobox();
var objRecurso = new Combobox();
var colorPick1 = new ColorPicker();
var colorPick2 = new ColorPicker();
var objCorFundo = new ColorPicker();
var objCorSombra = new ColorPicker();
var objCorBorda = new ColorPicker();
var fileUp1 = new FileUpload();
var fileUp2 = new FileUpload();
var modelProj = new ItemModel();
var modelLayouts = new ItemModel();
var modelLayoutsPages = new ItemModel();
var modelEfeitos = new ItemModel();
var modelPaginas = new ItemModel();
var modelObjects = new ItemModel();
var modelRecursos = new ItemModel();
var objs = new ItemModel();
var verifica = null;
var slice_url = "http://localhost:8084/GaiaEditor/system/";
var ajax = new Ajax();
var thread = null;
var canSetTimeout = true;
var keyboard = new KeyBoardUtils();
var stackObjs = new StackUndo();

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
        
        /**
         * SETA LAYOUTS
         */
        comboLayouts.setElement("#comboLayout");
        comboLayouts.setModel(modelLayouts);
        comboTool1Layouts.setElement("#projLayout");
        comboTool1Layouts.setModel(modelLayoutsPages);
        
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
        
        /**
         * SETA FILE UPLOAD
         */
        fileUp1.setUrl(slice_url + "upload.jsp");
        fileUp1.setElement("#fileBack1");
        fileUp2.setUrl(slice_url +  "upload.jsp");
        fileUp2.setElement("#fileBack2");
        
        /**
         * SETA FERRAMENTAS DA IDE
         */
        listObjects.setElement("#toolObjects");
        listObjects.setModel(modelObjects);
        
        modelObjects.add(new Item("Texto", function(){ return new GText(153, 52, 0, 0, true); }, "../img/ui_labels.png"));
        modelObjects.add(new Item("Container", function(){ return new GDiv(153, 52, 0, 0, true); }, "../img/div.png"));
        modelObjects.add(new Item("Imagem", function(){ return new GImage(64, 64, 0, 0, true); }, "../img/img.png"));
        
        comboTool1Recurso.setElement("#projRecurso");
        objRecurso.setElement("#objRecurso");
        objRecurso.setModel(modelRecursos);
        comboTool1Recurso.setModel(modelRecursos);
        
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
                $("#tool3Things").css("height", document.documentElement.clientHeight - 65);
                
                $("#safiraInputContainer").css("top", document.documentElement.clientHeight - 40);
                $("#safiraInputContainer").css("left", document.documentElement.clientWidth - 650);
                
                $("#windowProjects").css("top", (document.documentElement.clientHeight / 2) - (225 / 2));
                $("#windowProjects").css("left", (document.documentElement.clientWidth / 2) - (400 / 2));
                
                $("#windowProjectsNew").css("top", (document.documentElement.clientHeight / 2) - (245 / 2));
                $("#windowProjectsNew").css("left", (document.documentElement.clientWidth / 2) - (400 / 2));
                
                $("#windowLayout").css("top", (document.documentElement.clientHeight / 2) - (245 / 2));
                $("#windowLayout").css("left", (document.documentElement.clientWidth / 2) - (400 / 2));
                
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
                ptrObject = obj;
                // seta forms
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
          
          /**
           * TIRA SELEÇÃO MULTIPLA
           */
          document.ondblclick = function()
          {
                  $(".ui-multidraggable").removeClass("ui-multidraggable");
          };
          
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
                        else
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
        $("#pgDinamic").text(".pg_sub { position: absolute; width: " + proj.LarguraPaginas + 
                "px; height: " + proj.AlturaPaginas + "px; background-color: #EAEAEA; }");
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
                        modelLayoutsPages.add(new Item("Topo", proj.layout[0].Topo[0]));
                        modelLayoutsPages.add(new Item("Rodapé", proj.layout[0].Rodape[0]));
                break;  
        }
        
        modelPaginas.clear();
        for(var i = 0; i < proj.paginas.length; i++)
        {
                var pg = proj.paginas[i];
                modelPaginas.add(new Item("Página " + (pg.Indice + 1), pg));
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
        comboTool1Paginas.setSelectIndex(pgI);
        $("#main").html("");
        objs.clear();
        ptrPage = ptrProject.paginas[pgI];
        
        for(var i = 0; i < ptrProject.paginas[pgI].Elementos.length; i++)
        {
                var objTmp = ptrProject.paginas[pgI].Elementos[i];
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

/**
* ENTER NO INPUT SAFIRA
*/
function safiraEnter(ev)
{
        if(ev.keyCode == 13)
        {
                $("#cmdSafira").val("");
        }
}