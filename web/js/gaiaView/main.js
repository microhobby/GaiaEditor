/* 
 * main for VIEW Gaia Editor
 */

var LogedUser = null;
var slice_url = "http://localhost:8084/GaiaEditor/system/server.jsp";

$(document).ready(function()
{  
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
                $("#safiraInputContainer").css("left", document.documentElement.clientWidth - 670);
                
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
         * FOCUS INPUTS
         */
        $("input").focus(function()
        {
                $(this).parent().animate(
                {
                       borderBottomColor : "#09F",
                       borderLeftColor : "#09F",
                       borderRightColor : "#09F"
                });
        }).focusout(function()
        {
                $(this).parent().animate(
                {
                       borderBottomColor : "#CCC",
                       borderLeftColor : "#CCC",
                       borderRightColor : "#CCC"
                });
        });
        
        /**
         * FLIP JANELA
         */
        $("body").fadeIn(2000);
        unFlipWindowProjectsNew();
        unFlipWindowLayout();
        unFlipWindowProjects(flipWindowProjects);
});

function flipWindowProjectsNew()
{
       //$("#windowProjectsNew").show();
       $("#windowProjectsNew").flippyReverse();
}

function unFlipWindowProjectsNew(callB)
{
        $("#windowProjectsNew").flippy({color_target: "#333333", duration: 500, 
            onMidway: function()
            {
                    $("#windowProjectsNew").fadeOut(100);
            },
            onFinish: callB,
            onReverseStart : function()
            {
                    $("#windowProjectsNew").fadeIn(300);
            },
            onReverseFinish: function()
            {
                    /* FECHA JANELA DE NOVO PROJETO E RETORNA PARA SELECIONAR PROJETO */
                    $("#fechaProjectoNew").click(function()
                    {
                            unFlipWindowProjectsNew(function()
                            {
                                    $("#windowProjects").flippyReverse();
                            });
                    });
                
                    /* GERA NOVO PROJETO */
                    $("#criaProjecto").click(function()
                    {
                            newProject();
                    });
                
                    $("input").focus(function()
                    {
                            $(this).parent().animate(
                            {
                                   borderBottomColor : "#09F",
                                   borderLeftColor : "#09F",
                                   borderRightColor : "#09F"
                            });
                    }).focusout(function()
                    {
                            $(this).parent().animate(
                            {
                                   borderBottomColor : "#CCC",
                                   borderLeftColor : "#CCC",
                                   borderRightColor : "#CCC"
                            });
                    });
            }
        });
}

function flipWindowProjects()
{
       $("#windowProjects").flippyReverse();
}

function unFlipWindowProjects(callB)
{
        $("#windowProjects").flippy({color_target: "#333333", duration: 500,
            onMidway: function()
            {
                    $("#windowProjects").fadeOut(100);
            },
            onFinish: callB,
            onReverseStart: function()
            {
                    $("#windowProjects").fadeIn(300);
            },
            onReverseFinish: function()
            {
                    /* CHAMA JANELA DE NOVO PROJETO */
                    $("#novoProjecto").click(function()
                    {
                            unFlipWindowProjects(function()
                            {
                                    $("#windowProjectsNew").flippyReverse();
                            });
                    });

                    $("input").focus(function()
                    {
                            $(this).parent().animate(
                            {
                                   borderBottomColor : "#09F",
                                   borderLeftColor : "#09F",
                                   borderRightColor : "#09F"
                            });
                    }).focusout(function()
                    {
                            $(this).parent().animate(
                            {
                                   borderBottomColor : "#CCC",
                                   borderLeftColor : "#CCC",
                                   borderRightColor : "#CCC"
                            });
                    });
            }
        });
}

function flipWindowLayout()
{
       $("#windowLayout").flippyReverse();
}

function unFlipWindowLayout(callB)
{
        $("#windowLayout").flippy({color_target: "#333333", duration: 500,
            onMidway: function()
            {
                    $("#windowLayout").fadeOut(100);
            },
            onFinish: callB,
            onReverseStart: function()
            {
                    $("#windowLayout").fadeIn(300);
            },
            onReverseFinish: function()
            {
                    
                
                     $("input").focus(function()
                    {
                            $(this).parent().animate(
                            {
                                   borderBottomColor : "#09F",
                                   borderLeftColor : "#09F",
                                   borderRightColor : "#09F"
                            });
                    }).focusout(function()
                    {
                            $(this).parent().animate(
                            {
                                   borderBottomColor : "#CCC",
                                   borderLeftColor : "#CCC",
                                   borderRightColor : "#CCC"
                            });
                    });
            }
        });
}

/**
 * ROTINA PARA BUSCAR UM PROJETO
 */
function buscaProjeto(ev)
{
        
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