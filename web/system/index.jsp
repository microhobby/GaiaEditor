<%-- 
    Document   : index
    Created on  : 04/09/2013, 20:52:33
    Author          : Matheus de Barros Castello  
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8" import="Gaia.controller.*, Gaia.model.*, mpro.MproEntity.*"%>

<%
        MproEntity.setBasePath("/home/matheus");
        MproEntity.setProjectName("GaiaEditor");
        String usu = request.getParameter("usu");
        String key = request.getParameter("key");
        boolean isLoged = Login.canLog(usu, key);
        
        if(isLoged)
        {
                session.setAttribute("isLoged", isLoged);
        }
        else if(session.getAttribute("isLoged") != null && (Boolean)session.getAttribute("isLoged"))
        {
                isLoged = true;
        }
        
        pageContext.setAttribute("isLoged", isLoged);
%>

<c:choose>
        <c:when test="${isLoged}">
            
                <!DOCTYPE html>
                <html>

                <!-- PÁGINA PRINCIPAL DO NED TEMPLATE -->

                <head>
                            <!-- METAS -->
                            <meta charset="utf-8" />
                            <meta
                                name="viewport"
                                content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"
                            />

                            <!-- FAVICON -->
                            <link rel="shortcut icon" href="../gaia.ico" type="image/x-icon" />

                            <!-- TITLE -->
                            <title>Gaia Editor Beta</title>

                            <!-- STYLES -->
                            <link rel="stylesheet" href="../css/normaliza.css" type="text/css" />
                            <link rel="stylesheet" href="../css/main.css" type="text/css" />
                            <!--[if !IE]><!-->
                            <link rel="stylesheet" href="../css/exMain.css" type="text/css" />
                            <!--<![endif]-->
                            <link href='http://fonts.googleapis.com/css?family=Ubuntu' rel='stylesheet' type='text/css' />
                            <link rel="stylesheet" href="../css/aulas.css" type="text/css" />

                            <!-- SCRIPTS -->
                            <script src="../js/jquery.js" type="text/javascript"> </script>
                            <!--<script src="../js/jqueryMobile.js" type="text/javascript"> </script>-->
                            <!-- <script src="../js/swipe.js" type="text/javascript"> </script> -->
                            <!-- <script type="text/javascript" src="../js/biscoito.js"> </script> -->
                            <script src="../js/jqueryUI.js" type="text/javascript"> </script>
                            <script src="../js/jQueryRotate.js" type="text/javascript"> </script>
                            <!--<script src="../js/jqueryWheel.js" type="text/javascript"> </script>-->
                            <script src="../js/Anima.js" type="text/javascript"> </script>
                            <script type="text/javascript" src="../js/jquerycsstransform.js"> </script>
                            <script type="text/javascript" src="../js/jqueryShadow.js"> </script>
                            <script type="text/javascript" src="../js/rotate3Di.js"> </script>
                            <script type="text/javascript" src="../js/jquery.flippy.min.js"> </script>
                            <!--<script type="text/javascript" src="../js/iscroll.js"> </script>-->
                            <!--<script type="text/javascript" src="../js/iscroll-lite.js"> </script>-->
                            <!--<script src="../lib/app.js" type="text/javascript"> </script>
                            <script type="text/javascript" src="../js/KineticScroll.js"> </script>-->
                            <script src="../js/utils.js" type="text/javascript"> </script>
                            
                            <!-- MODEL -->
                            <script src="../js/gaiaModel/User.js" type="text/javascript"> </script>
                            <script src="../js/gaiaModel/Projeto.js" type="text/javascript"> </script>
                            
                            <!-- CONTROLLER -->
                            <script src="../js/gaiaController/server.js" type="text/javascript"> </script>
                            
                            <!-- VIEW -->
                            <script src="../js/gaiaView/main.js" type="text/javascript"> </script>
                            <script src="../js/gaiaView/EntitysCmds.js" type="text/javascript"> </script>
                            
                            <script type="text/javascript">
                                    LogedUser = $.parseJSON('<% out.print(Login.UserToJson()); %>');
                                    LogedUser = new User(LogedUser);
                            </script>
                            
                </head>

                <!-- ONLOAD INICIA ENGINE E ENTRA PRIMEIRA PAGINA -->
                <body style="margin: 0; background-color:#444; display: none;" onload="">
                        
                        <!-- DIV CONTAINER -->
                        <!--PAGE-->
                        <div id="page">

                        <!--CONTENT-->
                        <div id="content" class="content">
                                <!-- Style Override -->
                                <style> .pg_sub { position: absolute; width: 600px; height: 500px; background-color: #EAEAEA; }</style>
                                <script type="text/javascript">
                                          $(document).ready(function() {
                                                    $("button").bind("touchstart touchend", function(e) {
                                                              $(this).animate({});
                                                              $(this).toggleClass("hover_effect");
                                                              /*if(e.type == "touchend")
                                                                        $(this).click();*/
                                                    });
                                                    $(".scrolls").mousedown(function(){
                                                              enableGest = false;
                                                    }).mouseup(function(){
                                                              setTimeout(function()
                                                              {
                                                                        enableGest = true;
                                                              }, 200);
                                                    }).bind("mouseleave",function(){
                                                              setTimeout(function()
                                                              {
                                                                        enableGest = true;
                                                              }, 200);
                                                    });
                                                    $(".scrolls").bind("touchstart", function(e)
                                                    {
                                                              enableGest = false;
                                                    }).bind("touchend", function(e)
                                                    {
                                                              setTimeout(function()
                                                              {
                                                                        enableGest = true;
                                                              }, 200);
                                                    });
                                          });
                                </script>
                                
                                <div id="main" class="pg_sub">
                                        <!-- MAKE WHAT YOU HAVE TO DO -->
                                </div>
                        </div>

                        </div>
                    
                        <!-- MENU TOOL 1 -->
                        <div id="tool1base">
                                <div id="tool1" class="tool">
                                        <span style="position: absolute; top: 5px; left: 20px; color:  #fefefe">Projeto</span>
                                        <img id="iconConfig" style="position: absolute; top: 5px; left:  200px;" src="../img/project.png" />
                                        <div id="tool1Things" class="things">
                                        <%
                                                
                                        %>
                                        </div>
                                </div>
                        </div>
                        
                        <!-- MENU TOOL2 -->
                        <div id="tool2base">
                                <div id="tool2" class="tool">
                                        <span style="position: absolute; top: 5px; left: 20px; color:  #fefefe">Ferramentas</span>
                                        <img id="iconConfig" style="position: absolute; top: 5px; left:  200px;" src="../img/set.png" />
                                        <div id="tool2Things" class="things">
                                        <%
                                               
                                        %>
                                        </div>
                                </div>
                        </div>
                        
                        <!-- MENU TOOL 3 -->
                        <div id="tool3" class="tool">
                                <span style="position: absolute; top: 5px; left: 102px; color:  #fefefe">Propriedades</span>
                                <img id="iconConfig" style="position: absolute; top: 5px; left:  5px;" src="../img/properties.png" />
                                <div id="tool3Things" class="things">
                                        <%
                                               
                                        %>
                                </div>
                        </div>
                         
                        <!-- JANELA DE PROJETOS -->
                        <div id="windowProjects" class="flipbox-container">
                        <div id="containerWindowProjects" class="tool">
                                <span style="position: absolute; top: 5px; left: 20px; color:  #fefefe">Seus Projetos:</span>
                                <img id="iconConfig" style="position: absolute; top: 5px; left:  380px;" src="../img/project.png" />
                                <div id="searchProject">
                                        <span class="androidInput">
                                                <input id="searchText" type="text" class="inputAndroid" style="font-size:  15px; color: white;
                                                       width: 200px;" onkeypress="buscaProjeto(event)">
                                        </span>
                                </div>
                                <button id="novoProjecto">
                                        <img id="iconConfig" style="position: absolute; top: 7px; left: 7px;" src="../img/project.png" />
                                        &nbsp;&nbsp;&nbsp;&nbsp;Novo
                                </button>
                                <!-- TABELA DE PROJETOS -->
                                <div id="meusProjetos" style="border: 1px solid #EAEAEA">
                                    <table id="projectsContainer">
                                            
                                    </table>
                                </div>
                        </div>
                        </div>
                        
                        <!-- JANELA DE NOVO PROJETO  -->
                        <div id="windowProjectsNew" class="flipbox-container">
                        <div id="containerWindowProjectsNew" class="tool">
                                <span style="position: absolute; top: 5px; left: 20px; color:  #fefefe">Novo Projeto:</span>
                                <img id="iconConfig" style="position: absolute; top: 5px; left:  380px;" src="../img/project.png" />
                                <span style="position: absolute; top: 50px; left: 8px; color:  #fefefe; font-size: 15px">Nome do Projeto:</span>
                                <div id="nameProject">
                                        <span class="androidInput">
                                                <input id="nameProjectText" type="text" class="inputAndroid" style="font-size:  15px; color: white;
                                                       width: 380px;">
                                        </span>
                                </div>
                                <span style="position: absolute; top: 100px; left: 8px; color:  #fefefe; font-size: 15px">Altura das Páginas:</span>
                                <div id="alturaProject">
                                        <span class="androidInput">
                                                <input id="alturaProjectText" type="text" class="inputAndroid" style="font-size:  15px; color: white;
                                                       width: 177px;">
                                        </span>
                                </div>
                                <span style="position: absolute; top: 100px; left: 210px; color:  #fefefe; font-size: 15px">Largura das Páginas:</span>
                                <div id="larguraProject">
                                        <span class="androidInput">
                                                <input id="larguraProjectText" type="text" class="inputAndroid" style="font-size:  15px; color: white;
                                                       width: 177px;">
                                        </span>
                                </div>
                                <span style="position: absolute; top: 150px; left: 8px; color:  #fefefe; font-size: 15px">Observações:</span>
                                <div id="obsProject">
                                        <span class="androidInput">
                                                <input id="obsProjectText" type="text" class="inputAndroid" style="font-size:  15px; color: white;
                                                       width: 380px;">
                                        </span>
                                </div>
                                <button id="criaProjecto">
                                        <img id="iconConfig" style="position: absolute; top: 7px; left: 7px;" src="../img/+.png" />
                                        &nbsp;&nbsp;&nbsp;&nbsp;Novo
                                </button>
                                <button id="fechaProjectoNew">
                                        <img id="iconConfig" style="position: absolute; top: 7px; left: 7px;" src="../img/verifica_false.png" />
                                        &nbsp;&nbsp;&nbsp;&nbsp;Fecha
                                </button>
                        </div>
                        </div>
                                
                        <!-- SAFIRA TESTE -->
                        <div id="safiraInputContainer">
                                <span class="androidInput">
                                        <input id="cmdSafira" type="text" class="inputAndroid" style="font-size:  15px; color: white;
                                               width: 400px;" onkeypress="safiraEnter(event)">
                                </span>
                        </div>
                        
                </body>
                <!--FIM PAGE-->
                </html>
                
        </c:when>
        <c:otherwise>
                <script>
                        alert("Senha ou Usuário não encontrados!");
                        window.location = "../index.html";
                </script>
        </c:otherwise>
</c:choose> 