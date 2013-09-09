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
                $("#tool1base").css("left", -195);
                $("#tool1Things").css("height", (document.documentElement.clientHeight / 2.2) -60);
                
                $("#tool2").css("height", (document.documentElement.clientHeight / 1.8) -20);
                $("#tool2base").css("height", (document.documentElement.clientHeight / 1.8) -20);
                $("#tool2base").css("top", parseInt($("#tool1").css("height")) + 10);
                $("#tool2base").css("left", -195);
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
                
                goCenter(document.documentElement.clientHeight, document.documentElement.clientWidth - 180);
        }
        window.onresize();
    
        /**
         *  TOOLS MOUSEHOVER
         */
        $("#tool1base, #tool2base").mouseenter(function()
        {
                $(this).animate(
                {
                        left: -1
                }, 100);
        }).mouseleave(function()
        {
                $(this).animate(
                {
                        left: -195
                }, 100);
        });
        
        /**
         * FOCUS INPUTS
         */
        $("input").focus(function()
        {
                $(this).animate(
                {
                        boxShadow: "0px 3px 5px #888"
                });
        }).focusout(function()
        {
                $(this).animate(
                {
                        boxShadow: "0px 0px 0px #888"
                });
        });
        
        /**
         * FLIP JANELA
         */
        $("body").fadeIn(2000);
        unFlipWindowProjectsNew();
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
                            $(this).animate(
                            {
                                    boxShadow: "0px 3px 5px #888"
                            });
                    }).focusout(function()
                    {
                            $(this).animate(
                            {
                                    boxShadow: "0px 0px 0px #888"
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
                            $(this).animate(
                            {
                                    boxShadow: "0px 3px 5px #888"
                            });
                    }).focusout(function()
                    {
                            $(this).animate(
                            {
                                    boxShadow: "0px 0px 0px #888"
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
* ENTER NO INPUT SAFIRA
*/
function safiraEnter(ev)
{
        if(ev.keyCode == 13)
        {
                $("#cmdSafira").val("");
        }
}