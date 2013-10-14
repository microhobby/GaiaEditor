<%-- 
    Document   : index
    Created on  : 04/09/2013, 20:52:33
    Author          : Matheus de Barros Castello  
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8" import="Gaia.controller.*, Gaia.model.*, mpro.MproEntity.*"%>

<%
        //MproEntity.setBasePath("c:\\MproEntity\\");
        MproEntity.setBasePath("/home/matheus");
        MproEntity.setProjectName("GaiaEditor");
        String usu = request.getParameter("usu");
        String key = request.getParameter("key");
        boolean isLoged = Login.canLog(usu, key);
        
        if(isLoged)
        {
                session.setAttribute("isLoged", isLoged);
                session.setAttribute("userObject", Login.LogedUser);
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
                            <!--<link rel="stylesheet" href="../themes/holo-dark/holo-dark.min.css" type="text/css" />-->
                              <!-- Bootstrap core CSS -->
                              <link href="../dist/css/bootstrap.css" rel="stylesheet">
                              <!-- Bootstrap theme -->
                              <link href="../dist/css/bootstrap-theme.min.css" rel="stylesheet">
                              <link href="../css/colorpicker.css" rel="stylesheet">
                              <link rel="stylesheet" href="../css/jquery.fileupload.css">

                              <!-- Custom styles for this template -->
                              <!--<link href="theme.css" rel="stylesheet">-->

                              <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
                              <!--[if lt IE 9]>
                                <script src="../assets/js/html5shiv.js"></script>
                                <script src="../assets/js/respond.min.js"></script>
                              <![endif]-->

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
                            <script src="../dist/js/bootstrap.min.js"></script>
                            <script src="../assets/js/holder.js"></script>
                            <script src="../js/bootstrap-colorpicker.js"></script>
                            <script src="../js/jquery.ui.widget.js"></script>
                            <script src="../js/jquery.iframe-transport.js"></script>
                            <script src="../js/jquery.fileupload.js"></script>
                            
                            <!-- MODEL -->
                            <script src="../js/gaiaModel/User.js" type="text/javascript"> </script>
                            <script src="../js/gaiaModel/Projeto.js" type="text/javascript"> </script>
                            <script src="../js/gaiaModel/Layout.js" type="text/javascript"> </script>
                            <script src="../js/gaiaModel/Paginas.js" type="text/javascript"> </script>
                            <script src="../js/gaiaModel/Objetos.js" type="text/javascript"> </script>
                            <script src="../js/gaiaModel/Eventos.js" type="text/javascript"> </script>
                            <script src="../js/gaiaModel/Recursos.js" type="text/javascript"> </script>

                            
                            <!-- CONTROLLER -->
                            <script src="../js/gaiaController/server.js" type="text/javascript"> </script>
                            <script src="../js/gaiaController/GText.js" type="text/javascript"> </script>
                            
                            <!-- VIEW -->
                            <script src="../js/gaiaView/Lista.js" type="text/javascript"> </script>
                            <script src="../js/gaiaView/Item.js" type="text/javascript"> </script>
                            <script src="../js/gaiaView/ItemModel.js" type="text/javascript"> </script>
                            <script src="../js/gaiaView/List.js" type="text/javascript"> </script>
                            <script src="../js/gaiaView/Combobox.js" type="text/javascript"> </script>
                            <script src="../js/gaiaView/ColorPicker.js" type="text/javascript"> </script>
                            <script src="../js/gaiaView/FileUpload.js" type="text/javascript"> </script>
                            <script src="../js/gaiaView/main.js" type="text/javascript"> </script>
                            <script src="../js/gaiaView/EntitysCmds.js" type="text/javascript"> </script>
                            
                            <script type="text/javascript">
                                    LogedUser = $.parseJSON('<% out.print(Login.UserToJson()); %>');
                                    LogedUser = $.extend(new User(), LogedUser);
                                    LogedUser.cast();
                                    //LogedUser = new User(LogedUser);
                            </script>
                            
                </head>

                <!-- ONLOAD INICIA ENGINE E ENTRA PRIMEIRA PAGINA -->
                <body style="margin: 0; background-color:#444; display: none;" onload="">
                        <!-- STACK.JS -->
                        <div class="page">
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
                                
                                <div id="main" class="pg_sub" style="display: none;">
                                        <!-- MAKE WHAT YOU HAVE TO DO -->
                                </div>
                        </div>

                        </div>
                    
                        <!-- MENU TOOL 1 -->
                        <div id="tool1base">
                                <div id="tool1" class="panel panel-default tool">
                                        <div class="panel-heading">
                                                <h3 class="panel-title">Projeto</h3>
                                        </div>
                                        <img id="iconConfig" style="position: absolute; top: 5px; left:  200px;" src="../img/project.png" />
                                        <div id="tool1Things" class="things">
                                        <%
                                                
                                        %>
                                        </div>
                                </div>
                        </div>
                        
                        <!-- MENU TOOL2 -->
                        <div id="tool2base">
                                <div id="tool2" class="panel panel-default tool">
                                        <div class="panel-heading">
                                                <h3 class="panel-title">Ferramentas</h3>
                                        </div>
                                        <img id="iconConfig" style="position: absolute; top: 5px; left:  200px;" src="../img/set.png" />
                                        <div id="tool2Things" class="things">
                                        <%
                                               
                                        %>
                                        </div>
                                </div>
                        </div>
                        
                        <!-- MENU TOOL 3 -->
                        <div id="tool3" class="panel panel-default tool">
                                <div class="panel-heading">
                                        <h3 class="panel-title">&nbsp;&nbsp;&nbsp;&nbsp;Propiedades</h3>
                                </div>
                                <img id="iconConfig" style="position: absolute; top: 5px; left:  5px;" src="../img/properties.png" />
                                <div id="tool3Things" class="things">
                                        <%
                                               
                                        %>
                                </div>
                        </div>
                         
                        <!-- JANELA DE PROJETOS -->
                        <div id="windowProjects" class="tool">
                        <div id="containerWindowProjects" class="panel panel-default">
                                 <div class="panel-heading">
                                        <h3 class="panel-title">Seus Projetos</h3>
                                 </div>
                                <img id="iconConfig" style="position: absolute; top: 10px; left:  370px;" src="../img/project.png" />
                                <div id="searchProject">
                                        <input type="text" class="form-control" style="height: 25px; padding: 5px;" id="searchText" placeholder="Busque">  
                                </div>
                                <button id="novoProjecto" class="btn btn-default">
                                          &nbsp;&nbsp;&nbsp;&nbsp;Novo
                                          <img id="iconConfig" style="position: absolute; top: 7px; left: 7px;" src="../img/project.png" />
                                </button>
                                <!-- TABELA DE PROJETOS -->
                                <div id="meusProjetos" class="list-group">
                                         <!-- CARREGA AQUI UMA LISTA -->
                                        
                                </div>
                        </div>
                        </div>
                        
                        <!-- JANELA DE NOVO PROJETO  -->
                        <div id="windowProjectsNew" class="tool">
                        <div id="containerWindowProjectsNew" class="panel panel-default">
                                  <div class="panel-heading">
                                        <h3 class="panel-title">Novo Projeto</h3>
                                 </div>
                                <img id="iconConfig" style="position: absolute; top: 10px; left:  370px;" src="../img/project.png" />
                                <span style="position: absolute; top: 41px; left: 8px; color:  #333333; font-size: 11px">Nome do Projeto:</span>
                                <div id="nameProject">
                                          <input id="nameProjectText" type="text" class="form-control" placeholder="Nome do Projeto" style="height: 25px; padding: 5px; width: 380px">
                                </div>
                                <span style="position: absolute; top: 90px; left: 8px; color:  #333333; font-size: 11px">Altura das Páginas:</span>
                                <div id="alturaProject">
                                          <input id="alturaProjectText" type="text" class="form-control" placeholder="Altura da Página" style="height: 25px; padding: 5px; width: 177px;">
                                </div>
                                <span style="position: absolute; top: 90px; left: 210px; color:  #333333; font-size: 11px">Largura das Páginas:</span>
                                <div id="larguraProject">
                                          <input id="larguraProjectText" type="text" class="form-control" placeholder="Largura da Página" style="height: 25px; padding: 5px; width: 177px;">
                                </div>
                                <span style="position: absolute; top: 140px; left: 8px; color:  #333333; font-size: 11px">Observações:</span>
                                <div id="obsProject">
                                          <input id="obsProjectText" type="text" class="form-control" placeholder="Observações" style="height: 25px; padding: 5px;
                                               width: 380px;">          
                                </div>
                                <button id="criaProjecto" class="btn btn-default">
                                        <img id="iconConfig" style="position: absolute; top: 7px; left: 7px;" src="../img/+.png" />
                                        &nbsp;&nbsp;&nbsp;&nbsp;Novo
                                </button>
                                <button id="fechaProjectoNew" class="btn btn-default">
                                        <img id="iconConfig" style="position: absolute; top: 7px; left: 7px;" src="../img/verifica_false.png" />
                                        &nbsp;&nbsp;&nbsp;&nbsp;Fecha
                                </button>
                        </div>
                        </div>
                                
                        <!-- JANELA DE ESCOLHA DE LAYOUT -->
                        <div id="windowLayout" class="tool">
                              <div id="containerWindowLayout" class="panel panel-default">
                                        <div class="panel-heading">
                                                <h3 class="panel-title">Layout</h3>
                                        </div>
                                      <img id="iconConfig" style="position: absolute; top: 10px; left:  370px;" src="../img/project.png" />
                                        <span style="position: absolute; top: 50px; left: 10px; color:  #333333; font-size: 11px">Tipo de Layout:</span>
                                      <div id="comboLayout" class="btn-group">
                                              <button type="button" class="btn btn-default dropdown-toggle" style="width: 180px;" data-toggle="dropdown">
                                                        Escolha o Layout <span class="caret"></span>
                                                </button>
                                                <ul class="dropdown-menu" style="width: 180px;" role="menu">          
                                                </ul>
                                      </div>
                                        <span style="position: absolute; top: 50px; left: 210px; color:  #333333; font-size: 11px">Efeito de Transição:</span>
                                        <div id="comboEfeito" class="btn-group">
                                              <button type="button" class="btn btn-default dropdown-toggle" style="width: 180px;" data-toggle="dropdown">
                                                        Escolha Efeito<span class="caret"></span>
                                                </button>
                                              <ul class="dropdown-menu" style="width: 180px;" role="menu">
                                              </ul>
                                      </div>
                                        <span style="position: absolute; top: 120px; left: 10px; color:  #333333; font-size: 11px">Cor de Fundo:</span>
                                        <div id="colorPicker1" class="input-group input-append color" data-color="#fff" data-color-format="hex">
                                                <span class="input-group-addon" style="padding: 3px;"><i style="background-color: #fff"></i></span>
                                                <input type="text" class="form-control" style="height: 25px; width: 155px;" value="#fff" >
                                        </div>
                                        <span style="position: absolute; top: 120px; left: 210px; color:  #333333; font-size: 11px">Imagem de Fundo:</span>
                                        <span id="fileBack1" class="btn btn-default fileinput-button" style="width: 180px;">
                                                <i class="glyphicon "><img src="../img/img.png" /></i>
                                                <span class="fileDesc">Selecione Imagem ...</span>
                                                <input id="fileupload" class="fileUpload" type="file" name="files[]" multiple>
                                                <div class="progress progress-striped active" style="display: none; margin-bottom: 0px;">
                                                        <div class="progress-bar"></div>
                                                </div>
                                        </span>
                                      <button id="okLAyout" class="btn btn-default">
                                                <i class="glyphicon "><img src="../img/ok.png" /></i>
                                                  Ok
                                        </button>
                              </div>
                        </div>
                        
                        <!-- SAFIRA TESTE -->
                        <div id="safiraInputContainer">
                                <span class="androidInput">
                                        <input id="cmdSafira" type="text" class="form-control" placeholder="Safira" style="height: 25px; padding: 5px;
                                               width: 400px;" onkeypress="safiraEnter(event)">
                                </span>
                        </div>
                        </div>
                        <!--<script src="../js/fries.min.js"></script>
                        <script src="../js/fingerblast.js"></script>-->
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