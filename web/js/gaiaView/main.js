/* 
 * main for VIEW Gaia Editor
 */

/**@type User */
var LogedUser = null;
var listProj = new List();
var comboLayouts = new Combobox();
var comboEfeitos = new Combobox();
var colorPick1 = new ColorPicker();
var fileUp1 = new FileUpload();
var modelProj = new ItemModel();
var modelLayouts = new ItemModel();
var modelEfeitos = new ItemModel();
var slice_url = "http://localhost:8084/GaiaEditor/system/server.jsp";

$(document).ready(function()
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
        
        /**
         * SETA LAYOUTS
         */
        comboLayouts.setElement("#comboLayout");
        comboLayouts.setModel(modelLayouts);
        
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
        
        modelEfeitos.add(new Item("NENHUM", 0));
        modelEfeitos.add(new Item("PÁGINA", 1));
        modelEfeitos.add(new Item("ZOOM", 2));
        
        /**
         * SETA COLOR PICKERS
         */
        colorPick1.setElement("#colorPicker1");
        
        /**
         * SETA FILE UPLOAD
         */
        fileUp1.setUrl("http://localhost:8084/GaiaEditor/system/upload.jsp");
        fileUp1.setElement("#fileBack1");
        
        /**
         *  REDIMENSIONAMENTO DAS TOOLS
         */
        window.onresize = function()
        {
                $("#tool1").css("height", (document.documentElement.clientHeight / 2.2) -20);
                $("#tool1base").css("height", (document.documentElement.clientHeight / 2.2) -20);
                $("#tool1base").css("left", -200);
                $("#tool1Things").css("height", (document.documentElement.clientHeight / 2.2) -60);
                
                $("#tool2").css("height", (document.documentElement.clientHeight / 1.8) -20);
                $("#tool2base").css("height", (document.documentElement.clientHeight / 1.8) -20);
                $("#tool2base").css("top", parseInt($("#tool1").css("height")) + 10);
                $("#tool2base").css("left", -200);
                $("#tool2Things").css("height", (document.documentElement.clientHeight / 1.8) - 60);
                
                $("#tool3").css("height", document.documentElement.clientHeight -20);
                $("#tool3").css("left", document.documentElement.clientWidth -225);
                $("#tool3Things").css("height", document.documentElement.clientHeight - 60);
                
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
        
        /**
         * FLIP JANELA
         */
        $("body").fadeIn(2000, function()
        {
                    scalePanels("windowProjects");
        });
        $("#windowProjects").css("transform", "scale(0)").css("opacity", "0");
        $("#windowProjectsNew").css("transform", "scale(0)").css("opacity", "0");
        $("#windowLayout").css("transform", "scale(0)").css("opacity", "0");
        
        /**
         * ABRE PROJETO
         */
        listProj.addMouseActionListener(function(obj)
        {
                console.log(obj);
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
});

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
 * ROTINA PARA COMBO DE LAYOUTS
 */
function changeChoiceLayout(ix)
{
          switch(ix)
          {
                    case 1:
                    break;
                    case 1:
                    break;
                    case 1:
                    break;
                    case 1:
                    break;
                    case 1:
                    break;
                    case 1:
                    break;
          }
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