
package Gaia.controller;

import Gaia.model.Entities;
import Gaia.model.Entity;
import Gaia.model.Field;
import Gaia.model.Projeto;
import java.util.ArrayList;
import java.util.List;
import mpro.MproEntity.MproEntity;

/**
 *
 * @author matheus
 */
public class ProjectSources 
{
        public List<String> Paginas = new ArrayList();
        public List<ProjectMidias> Midias = new ArrayList();
        public String Rodape = "";
        public String Topo = "";
        private Projeto projeto;
        
        public ProjectSources()
        {}
        
        public ProjectSources(Projeto proj)
        {
                projeto = proj;
        }
        
        public void setProjeto(Projeto proj)
        {
                this.projeto = proj;
        }
        
        private String getTurnEffectProx()
        {
                String ret = "";
                switch(projeto.layout.get(0).Efeito)
                {
                        case 1: // pagina
                                ret = "$(\"#pg\" + id).animate(\n" +
                                        "				{\n" +
                                        "					opacity: 0.8,\n" +
                                        "					left: (($('#header').offset().left) + parseInt($('#header').width()) / scale) * -1\n" +
                                        "					//left: ($('#header').offset().left - parseInt($('#header').width()) - $('#header').offset().left)\n" +
                                        "				}, 500, function() {\n" +
                                        "					$(\"#pg\" + id).css(\"display\", \"none\");\n" +
                                        "					garbCollect(id);\n" +
                                        "				}\n" +
                                        "			);\n";
                        break;
                        case 2: // zoom
                                ret = "var auxid = pgInd;\n" +
                                        "                    $(\"#pg\" + auxid).animate(\n" +
                                        "                             {\n" +
                                        "                                       opacity: 0.0,\n" +
                                        "                                       left: 320,\n" +
                                        "                                       //top: 480,\n" +
                                        "                                       zoom: 0.2\n" +
                                        "                                       //left: (2*($('#header').offset().left) + parseInt($('#header').width())) * -1\n" +
                                        "                                       //left: (2*($(\"#page\").position().left + $(\"#page\").width() )) * -1\n" +
                                        "                                       //left: ($('#header').offset().left - parseInt($('#header').width()) - $('#header').offset().left)\n" +
                                        "                             }, 500, function() {\n" +
                                        "                                       $(\"#pg\" + auxid).css(\"display\", \"none\");\n" +
                                        "                                       garbCollect(auxid);\n" +
                                        "                                       //pgAnt = auxid;\n" +
                                        "                                       //relloc();\n" +
                                        "                             }\n" +
                                        "                    );\n";
                        break;
                }
                return ret;
        }
        
        private String getTurnEffectAnt()
        {
                String ret = "";
                switch(projeto.layout.get(0).Efeito)
                {
                        case 1: // pagina
                                ret =       "$(\"#pg\" + id).animate(\n" +
                                                "			{\n" +
                                                "				opacity: 0.8,\n" +
                                                "				left: (($('#header').offset().left) + parseInt($('#header').width()) / scale)\n" +
                                                "			}, 500, function() {\n" +
                                                "				$(\"#pg\" + id).css(\"display\", \"none\");\n" +
                                                "				garbCollect(id);\n" +
                                                "			}\n" +
                                                "		);\n";
                                                /*"$(\"#pg\" + id).animate(\n" +
                                                "			{\n" +
                                                "				opacity: 0.8,\n" +
                                                "				left: (2*($('#header').offset().left) + parseInt($('#header').width()))\n" +
                                                "			}, 500, function() {\n" +
                                                "				$(\"#pg\" + id).css(\"display\", \"none\");\n" +
                                                "				garbCollect(id);\n" +
                                                "			}\n" +
                                                "		);\n";*/
                        break;
                        case 2: // zoom
                                ret = "var auxid = pgInd;\n" +
                                        "                    $(\"#pg\" + auxid).animate(\n" +
                                        "                             {\n" +
                                        "                                       opacity: 0.0,\n" +
                                        "                                       left: 320,\n" +
                                        "                                       //top: 480,\n" +
                                        "                                       zoom: 0.2\n" +
                                        "                                       //left: (2*($('#header').offset().left) + parseInt($('#header').width())) * -1\n" +
                                        "                                       //left: (2*($(\"#page\").position().left + $(\"#page\").width() )) * -1\n" +
                                        "                                       //left: ($('#header').offset().left - parseInt($('#header').width()) - $('#header').offset().left)\n" +
                                        "                             }, 500, function() {\n" +
                                        "                                       $(\"#pg\" + auxid).css(\"display\", \"none\");\n" +
                                        "                                       garbCollect(auxid);\n" +
                                        "                                       //pgAnt = auxid;\n" +
                                        "                                       //relloc();\n" +
                                        "                             }\n" +
                                        "                    );\n";
                        break;
                }
                return ret;
        }
        
        private String getPageIn()
        {
                String ret = "";
                
                switch(projeto.layout.get(0).Efeito)
                {
                        case 1: // paginas
                                ret = "	$(\"#pg\" + id).animate(\n" +
                                                "		{\n" +
                                                "			opacity: 1.0,\n" +
                                                "			//left: $('#header').offset().left\n" +
                                                "			left: 0\n" +
                                                "		}, time, function() {\n" +
                                                "			//complete\n" +
                                                "			pageRefresh(id);\n" +
                                                "		}\n" +
                                                "	);\n";
                        break;
                        case 2: // zoom
                                ret = "$(\"#pg\" + id).animate(\n" +
                                        "                    {\n" +
                                        "                              opacity: 1.0,\n" +
                                        "                              //left: $('#header').offset().left\n" +
                                        "                              left: 0,\n" +
                                        "                              //top: 0,\n" +
                                        "                              zoom: 1\n" +
                                        "                    }, time, function() {\n" +
                                        "			//complete\n" +
                                        "			pageRefresh(id);\n" +
                                        "                   });\n";
                        break;
                }
                return ret;
        }
        
        private String getPageGo()
        {
                String ret = "";
                
                switch(projeto.layout.get(0).Efeito)
                {
                        case 1: // paginas
                                ret =        "if(id > pgInd)\n" +
                                                "		 {\n" +
                                                "			 var auxid = pgInd;\n" +
                                                "			 $(\"#pg\" + auxid).animate(\n" +
                                                "				{\n" +
                                                "					opacity: 0.8,\n" +
                                                "					//left: (2*($('#header').offset().left) + parseInt($('#header').width())) * -1\n" +
                                                "					left: (2*($(\"#page\").position().left + $(\"#page\").width() )) * -1\n" +
                                                "					//left: ($('#header').offset().left - parseInt($('#header').width()) - $('#header').offset().left)\n" +
                                                "				}, 500, function() {\n" +
                                                "					$(\"#pg\" + auxid).css(\"display\", \"none\");\n" +
                                                "					garbCollect(auxid);\n" +
                                                "					\n" +
                                                "					//relloc();\n" +
                                                "				}\n" +
                                                "			);\n" +
                                                "			 \n" +
                                                "			 pgInd = id;\n" +
                                                "			 pageIn(pgInd);\n" +
                                                "		 }\n" +
                                                "		 else if(id < pgInd)\n" +
                                                "		 {\n" +
                                                "			 var auxid = pgInd;\n" +
                                                "			 $(\"#pg\" + auxid).animate(\n" +
                                                "				{\n" +
                                                "					opacity: 0.8,\n" +
                                                "					//left: (2*($('#header').offset().left) + parseInt($('#header').width()))\n" +
                                                "					left: (2*($(\"#page\").position().left + $(\"#page\").width() ))\n" +
                                                "				}, 500, function() {\n" +
                                                "					$(\"#pg\" + auxid).css(\"display\", \"none\");\n" +
                                                "					garbCollect(auxid);\n" +
                                                "					\n" +
                                                "					//relloc();\n" +
                                                "				}\n" +
                                                "			);\n" +
                                                "			 \n" +
                                                "			 pgInd = id;\n" +
                                                "			 pageIn(pgInd);\n" +
                                                "		 }\n";
                        break;
                        case 2: // zoom
                                ret = "var auxid = pgInd;\n" +
                                        "                    $(\"#pg\" + auxid).animate(\n" +
                                        "                             {\n" +
                                        "                                       opacity: 0.0,\n" +
                                        "                                       left: 320,\n" +
                                        "                                       //top: 480,\n" +
                                        "                                       zoom: 0.2\n" +
                                        "                                       //left: (2*($('#header').offset().left) + parseInt($('#header').width())) * -1\n" +
                                        "                                       //left: (2*($(\"#page\").position().left + $(\"#page\").width() )) * -1\n" +
                                        "                                       //left: ($('#header').offset().left - parseInt($('#header').width()) - $('#header').offset().left)\n" +
                                        "                             }, 500, function() {\n" +
                                        "                                       $(\"#pg\" + auxid).css(\"display\", \"none\");\n" +
                                        "                                       garbCollect(auxid);\n" +
                                        "                                       //pgAnt = auxid;\n" +
                                        "                                       //relloc();\n" +
                                        "                             }\n" +
                                        "                    );\n" +
                                        "\n" +
                                        "                    pgInd = id;\n" +
                                        "                    pageIn(pgInd);\n";
                        break;
                }
                
                return ret;
        }
        
        private String getPageInis()
        {
                String ret = "";
                
                switch(projeto.layout.get(0).Efeito)
                {
                        case 2: // zoom
                                ret = "zoom: 0.2;";
                        break;
                }
                
                return ret;
        }
        
        private String getMidiaFiles()
        {
                String ret = "var __total___Events__ = " + Midias.size() + "; var ___catch__Event = 0;\n"+ 
                        "function VERIFY__EVENTS__LOAD(){ if(__total___Events__ === ___catch__Event){ $(\"#loadloading\").fadeOut(500, function(){ $(\"#main\").find(\"#loadloading\").remove(); }); escurece(false); } }\n"+
                        "function ____incrementCatch(){ ___catch__Event++; VERIFY__EVENTS__LOAD(); this.src = \"\"; }";
                String calls = "";
                int i;
                for(i = 0 ; i < Midias.size(); i++)
                {
                        if(Midias.get(i).Type == 1)
                        {
                                calls += " ____loading" + i + ".src = '" + Midias.get(i).FileName + "';";
                                ret += "var ____loading" + i + " = new Image(); ____loading" + i + ".onload = ____incrementCatch;\n";
                        }
                        else if(Midias.get(i).Type == 2)
                        {
                                calls += " ____loading" + i + ".src = '" + Midias.get(i).FileName + "';";
                                ret += "var ____loading" + i + " = new Audio(); ____loading" + i + ".addEventListener('canplaythrough', ____incrementCatch);\n";
                        }
                }
                
                ret += "function ____loadMidias(){\n " + calls + "\n";
                ret += 
                                        "if(__total___Events__ !== 0)\n"+
                                        "{ $(\"#main\").append(\'<div id=\"loadloading\" style=\"display: none; background-color: white; position: absolute; top: " + (projeto.AlturaPaginas / 2 - 110) + "px; left: " + (projeto.LarguraPaginas / 2 - 100) + "px; width: 210px; height: 110px; z-index: 5000\"><center><img style=\"\" src=\"../img/loader.gif\"></center><div id=\"msgloading\"><center>Carregando Mídias...</center></div></div>\'); escurece(true); $(\"#loadloading\").fadeIn(500);}\n";
                
                return ret + "\n}\n"; 
        }
        
        public String getAppJs()
        {
                String js = "";
                
                js += "/*\n" +
                        " * Script de Slides com load e tratamento de erros\n" +
                        " * By Matheus de Barros Castello\n" +
                        " * http://mpro3.com.br\n" +
                        " */\n" +
                        " \n" +
                        " var pgInd = 1; //fala qual é a página que esta carregada\n" +
                        " var qtP = 0; //vai ser atribuido a quantidades de paginas q serão carregadas\n" +
                        " var goProx = false; //var ser o flag de próximo ou não para eventos\n" +
                        " var enableHideProx = false; //vai ser flag se pode mostrar proximo automaticamente ou não\n" +
                        " var scale = 1.0;\n" +
                        " var uScale = 0.0;\n" +
                        " var enableGest = true;\n" +
                        " var timer = null;\n" +
                        "\n" +
                        /*"//carrega as imagens que precisam de carregamento imediato\n" +
                        "imagem_lista = Array('../img/exclamation5.png', '../img/btB.png', '../img/btC.png', '../img/btD.png');\n" +
                        "imagem_qtd = imagem_lista.length;\n" +
                        "for (var i = 0; i < imagem_qtd; i++) \n" +
                        "{\n" +
                        "    var preload = new Image();\n" +
                        "    preload.src = imagem_lista[i];\n" +
                        "}\n" +*/
                        // carrega as midias
                        getMidiaFiles()
                        +
                        " \n" +
                        " //quando inicia vamos ajustar os slides\n" +
                        " function iniS(numP)\n" +
                        " {\n" +
                        "	 try\n" +
                        "	 {\n" +
                        "		 //prepara as paginas que virão\n" +
                        "		 for(var i = 1; i <= numP; i++)\n" +
                        "		 {\n" +
                        "			 $(\"#content\").append(\"<div id='pg\" + i + \"' style='"
                                                                                        + getPageInis()+ "' class='pg'><div id='load\" + i + \"' style='position: absolute; top: " 
                                                                                        + ((projeto.AlturaPaginas / 2) - (75 / 2)) + "px; left: " 
                                                                                        + ((projeto.LarguraPaginas / 2) - (110 / 2)) + "px;"
                                                                                        + "'><img src='../img/loader.gif'/></div></div>\");\n" +
                        "			 $(\"#pg\" + i).css(\"left\", (2*($('#header').offset().left) + $('#header').width()) + \"px\");\n" +
                        "		 }\n" +
                        "		 qtP = numP;\n" +
                        "		 //se proximo automatico\n" +
                        "		 if((!enableHideProx) && (qtP != 1))\n" +
                        "		 {\n" +
                        "		 	goProx = true;\n" +
                        "		 	$('#avancar_pag').fadeIn();\n" +
                        "		 }\n" +
                        "		 //arruma a pagina\n" +
                        "		 blackOut();\n" +
                        "		 recalcScale();\n" +
                        "		 centra('page');\n" +
                        "		 blackHell();\n" +
                        "                                          ____loadMidias();\n" +
                        "		 //se ie8\n" +
                        "		 if(ieHell())\n" +
                        "		 	$('#cont_zoom').empty();\n" +
                        "	 }\n" +
                        "	 catch(error)\n" +
                        "	 {\n" +
                        "		 //console.error(error);\n" +
                        "	 }\n" +
                        " }\n" +
                        " \n" +
                        " //função que leva ao marco zero novamente\n" +
                        " function markZero()\n" +
                        " {\n" +
                        "	 uScale = 0.0;\n" +
                        "	 $(\"#page\").css(\"left\", 0);\n" +
                        "	 $(\"#page\").css(\"top\", 0);\n" +
                        "	 $('#blackOut').css('left', 0);\n" +
                        "	 $('#blackOut').css('top', 0);\n" +
                        " }\n" +
                        " \n" +
                        " //função que recalcula a escala\n" +
                        " function recalcScale()\n" +
                        " {\n" +
                        "	 markZero();\n" +
                        "	 //verifica tamanho da tela para aplicar escala\n" +
                        "		 if(document.documentElement.clientWidth < document.documentElement.clientHeight)\n" +
                        "		 {\n" +
                        "		 	scale = (document.documentElement.clientWidth) / " + projeto.LarguraPaginas + ";\n" +
                        "		 	$('#page').css(\"transform\", \"scale(\" + (scale + uScale) + \")\");\n" +
                        " 		 }\n" +
                        "	 	 else\n" +
                        "	 	 {\n" +
                        "	 	 	scale = (document.documentElement.clientHeight) / " + (projeto.AlturaPaginas + 180) + ";\n" +
                        "		 	$('#page').css(\"transform\", \"scale(\" + (scale + uScale) + \")\");\n" +
                        "	 	 }\n" +
                        " }\n" +
                        " \n" +
                        " //função que aplica zoom\n" +
                        " function setZoomOut()\n" +
                        " {\n" +
                        "	 uScale += 0.05;\n" +
                        "	 $('#page').css('transform', 'scale(' + (scale + uScale) + ')');\n" +
                        "	 \n" +
                        "	 blackHell();\n" +
                        " }\n" +
                        " \n" +
                        " function setZoomIn()\n" +
                        " {\n" +
                        "	 uScale -= 0.05;\n" +
                        "	 $('#page').css('transform', 'scale(' + (scale + uScale) + ')');\n" +
                        "	 \n" +
                        "	 blackHell();\n" +
                        " }\n" +
                        " \n" +
                        " //função de jesus\n" +
                        " function blackHell()\n" +
                        " {\n" +
                        "	 //e coloca blackout no lugar certo\n" +
                        "	 if((scale + uScale) < scale)\n" +
                        "	 {\n" +
                        "		 $('#blackOut').css('height', document.documentElement.clientHeight / (scale + uScale));\n" +
                        "		 $('#blackOut').css('width', document.documentElement.clientWidth / (scale + uScale));\n" +
                        "		 $('#blackOut').css('left', Math.round(parseFloat($('#blackOut').position().left - $('#page').position().left /(scale + uScale))));\n" +
                        "		 $('#blackOut').css('top', Math.round(parseFloat($('#blackOut').position().top - $('#page').position().top / (scale + uScale))));\n" +
                        "	 }\n" +
                        "	 else\n" +
                        "	 {\n" +
                        "		 $('#blackOut').css('height', $(document).height() / (scale + uScale));\n" +
                        "		 $('#blackOut').css('width', $(document).width() / (scale + uScale));\n" +
                        "		 $('#blackOut').css('left', Math.round(parseFloat($('#blackOut').position().left - $('#page').position().left /(scale + uScale))));\n" +
                        "		 $('#blackOut').css('top', Math.round(parseFloat($('#blackOut').position().top - $('#page').position().top / (scale + uScale))));\n" +
                        "	 }\n" +
                        " }\n" +
                        " \n" +
                        " //função que desabilita ou não o proximo automatico\n" +
                        " function enableProx(bool)\n" +
                        " {\n" +
                        " 	enableHideProx = bool;\n" +
                        "                   goProx = bool; \n" +
                        " }\n" +
                        " \n" +
                        " //função que implementa entrada do slide\n" +
                        " function pageIn(id, time)\n" +
                        " {\n" +
                        "	 if(!time)\n" +
                        "	 	time = 500;\n" +
                        "	 \n" +
                        "	 //$('#avancar_pag').fadeOut();\n" +
                        "	 \n" +
                        "	$(\"#pg\" + id).css(\"display\", \"block\");\n" +
                       getPageIn() +
                        " }\n" +
                        " \n" +
                        " function page2(id)\n" +
                        " {\n" +
                        "	 $(\"#pg\" + id).css(\"display\", \"block\");\n" +
                        "	 $(\"#pg\" + id).animate(\n" +
                        "		{\n" +
                        "			opacity: 1.0,\n" +
                        "			left: $('#header').offset().left\n" +
                        "		}, 500, function() {\n" +
                        "			//complete\n" +
                        "		}\n" +
                        "	);\n" +
                        " }\n" +
                        " \n" +
                        "//mais uma que vai e vem\n" +
                        " function pageGo(id)\n" +
                        " {\n" +
                        "	id = parseInt(id);\n" +
                        "	pgInd = parseInt(pgInd);\n" +
                        " \n" +
                        "	 if(!(id < 1) && !(id > qtP))\n" +
                        "	 {\n" +
                                getPageGo() +
                        "	 }\n" +
                        " }\n" +
                        " \n" +
                        "  //função que implementa saida do slide\n" +
                        " function pageOutAnt()\n" +
                        " {\n" +
                        " 	if(pgInd != 1)\n" +
                        " 	{\n" +
                        "		 var id = pgInd;\n" +
                                        getTurnEffectAnt() +
                        "		\n" +
                        "		//verifica se tem q voltar o botão de proximo automatico\n" +
                        "		if((!enableHideProx) && (qtP != 1))\n" +
                        "		 {\n" +
                        "		 	goProx = true;\n" +
                        "		 	$('#avancar_pag').fadeIn();\n" +
                        "		 }\n" +
                        "		\n" +
                        "		pgInd--;\n" +
                        "		\n" +
                        "		//verifica se tem q suprimir botões\n" +
                        "		if(pgInd == 1)\n" +
                        "			$('#voltar_pag').fadeOut();\n" +
                        "		\n" +
                        "		setTimeout(function(){\n" +
                        "			pageIn(pgInd);\n" +
                        "		}, 10);\n" +
                        "	}\n" +
                        " }\n" +
                        " \n" +
                        "  //função que implementa saida do slide\n" +
                        " function pageOutProx()\n" +
                        " {\n" +
                        " 	if(pgInd < qtP)\n" +
                        " 	{\n" +
                        "		 	var id = pgInd;\n" +
                                getTurnEffectProx() +
                        "		\n" +
                        "		pgInd++;\n" +
                        "		\n" +
                        "		if(enableHideProx || (pgInd == qtP))\n" +
                        "		{\n" +
                        "			$('#avancar_pag').fadeOut();\n" +
                        "			goProx = false;\n" +
                        "		}\n" +
                        "		\n" +
                        "		setTimeout(function(){\n" +
                        "			pageIn(pgInd);\n" +
                        "		}, 10);\n" +
                        "	}\n" +
                        " }\n" +
                        " \n" +
                        " //funções para tratar anteriores e próximos\n" +
                        " function validProx()\n" +
                        " {\n" +
                        " 	if(pgInd < qtP)\n" +
                        " 	{\n" +
                        " 		$('#avancar_pag').fadeIn();\n" +
                        "		goProx = true;\n" +
                        " 	}\n" +
                        " }\n" +
                        " \n" +
                        " function validAnte()\n" +
                        " {\n" +
                        " 	if(pgInd != 1)\n" +
                        " 	{\n" +
                        " 		$('#voltar_pag').fadeIn();\n" +
                        " 	}\n" +
                        " }\n" +
                        " \n" +
                        "//Eventos de toque de saidas do slide\n" +
                        "$(\"#content\").live('swipeleft',function(event){\n" +
                        "	if(goProx && (enableGest))\n" +
                        "	{\n" +
                        "		pageOutProx();\n" +
                        "	}\n" +
                        "});\n" +
                        " \n" +
                        "$(\"#content\").live('swiperight',function(event){\n" +
                        "	if(!(pgInd <= 1) && (enableGest))\n" +
                        "	{\n" +
                        "		pageOutAnt();\n" +
                        "	}\n" +
                        "});\n" +
                        " \n" +
                        " //função que apaga lixo\n" +
                        " function garbCollect(id)\n" +
                        " {\n" +
                        "	 document.getElementById(\"pg\" + id).innerHTML = \"<div id='load\" + id + \"' style='position: absolute; top: " + ((projeto.AlturaPaginas / 2) - (75 / 2)) + "px; left: " + ((projeto.LarguraPaginas / 2) - (110 / 2)) + "px;'><img src='../img/loader.gif'/>\";\n" +
                        " }\n" +
                        " \n" +
                        " //função que tenta carregar de novo\n" +
                        " function pageRefresh(id)\n" +
                        " {\n" +
                        "	 $(\"#pg\" + id).load(\"Pg_\" + id + \".html\", function(response, status, xhr) {\n" +
                        "		if(status != \"error\")\n" +
                        "		{\n" +
                        "			//console.log(\"carregado\");\n" +
                        "		}\n" +
                        "		else\n" +
                        "		{\n" +
                        "			if(document.getElementById(\"error\" + id) == null)\n" +
                        "			{\n" +
                        "				$(\"#pg\" + id).append(\"<div id='error\" + id + \"' style='display: none; position: absolute; top: 210px; left: 230px; width: 320px;'><div style='position: absolute; top: 0px; left: 0px;'><img src='../img/exclamation5.png'/></div> <div style='position: absolute; top: 11px; left: 60px; text-align: center;'> Não foi possivel carregar a página! Confira sua conexão com a internet e clique em \\\"Ok\\\".</div><div style='position:absolute; left: 130px; top: 90px; width:67px; height:28px;' class='buttonOk'> <button id='bt__refresh'>Ok</button> </div></div><script>$('#bt__refresh').click(function(){pageRefresh(\" + id + \"); $('#error\" + id + \"').hide(); $('#load\" + id + \"').fadeIn();});</script>\");\n" +
                        "				$(\"#load\" + id).fadeOut();\n" +
                        "				$(\"#error\" + id).fadeIn();\n" +
                        "				//console.error(xhr.status + \" \" + xhr.statusText);\n" +
                        "			}\n" +
                        "			else\n" +
                        "			{\n" +
                        "				$(\"#load\" + id).fadeOut();\n" +
                        "				$(\"#error\" + id).fadeIn();\n" +
                        "				//console.error(xhr.status + \" \" + xhr.statusText);\n" +
                        "			}\n" +
                        "		}\n" +
                        "	});\n" +
                        " }\n" +
                        " \n" +
                        "//sobrescreve F5\n" +
                        "document.onkeydown = function(event)\n" +
                        "{\n" +
                        "	if(event && event.keyCode == 116)\n" +
                        "	{\n" +
                        "		pageRefresh(pgInd);\n" +
                        "		return false;\n" +
                        "	}\n" +
                        "}\n" +
                        "\n" +
                        "//espera pra arrumar\n" +
                        "function lazyScreen()\n" +
                        "{\n" +
                        "	recalcScale();\n" +
                        "	centra('page'); \n"+
                        "	blackHell();\n" +
                        "}\n" +
                        "\n" +
                        "//arruma pagina\n" +
                        "window.onresize = function()\n" +
                        "{\n" +
                        "	clearTimeout(timer);\n" +
                        "	timer = setTimeout(lazyScreen, 500);\n" +
                        "}\n"+
                        "window.addEventListener(\"message\", receiveMessage, false);\n" +
                        "function receiveMessage(event){ var str = eval(event.data);  if(window.opener.postMessage !== undefined){ "
                        + "window.opener.postMessage(\"eval|\" + str, \"*\");} }\n" +
                        "window.onerror = function(message, url, line){ if(window.opener.postMessage !== undefined){ "
                        + "window.opener.postMessage(message + \"|\" + url + \"|\" + line, \"*\"); "
                        + " } };\n"+
                        "window.onbeforeunload = function(){ if(window.opener.postMessage !== undefined){ window.opener.postMessage(\"fechou\", \"*\");  } }";
                
                return js;
        }
        
        public String getAulaCss()
        {
                String css = "";
                
                css += ".pg\n" +
                                "{\n" +
                                "	position: absolute;\n" +
                                "	display: none;\n" +
                                "	opacity: 0.0;\n" +
                                "	width: " + projeto.LarguraPaginas + "px; /*default: 799px*/\n" +
                                "	height: " + projeto.AlturaPaginas + "px; /*default: 394px*/\n" +
                                "	background-color: #EAEAEA;\n" +
                                "	top: 109px;\n" +
                                "}\n" +
                                "\n" +
                                ".pg_sub\n" +
                                "{\n" +
                                "	position: absolute;\n" +
                                "	width: " + projeto.LarguraPaginas + "px; /*default: 799px*/\n" +
                                "	height: " + projeto.AlturaPaginas + "px; /*default: 394px*/\n" +
                                "	background-color: #EAEAEA;\n" +
                                "}\n"
                                + ".header{\n" +
                                "  position: absolute;\n" +
                                "  width: " + projeto.LarguraPaginas + "px;\n" +
                                "  height: 100px;\n" +
                                "  -webkit-border-radius: 10px;\n" +
                                "  border-radius: 10px;\n" +
                                "}\n"
                                + ".footer{\n" +
                                "	position: absolute;\n" +
                                "	height: 50px;\n" +
                                "	width: " + projeto.LarguraPaginas + "px;\n" +
                                "	-webkit-border-radius: 10px;\n" +
                                "	border-radius: 10px;\n" +
                                "	position: absolute;\n" +
                                "	top: " + (projeto.AlturaPaginas + 120) + "px;\n" +
                                "}\n"
                                + "#page{\n" +
                                "    width: " + projeto.LarguraPaginas + "px;\n" +
                                "	height: " + (projeto.AlturaPaginas + 180) + "px;\n" +
                                "	position: absolute;\n" +
                                "    /*margin:10px auto;*/\n" +
                                "/*    padding: 10px;\n" +
                                "    padding-top:0px;*/\n" +
                                "    /*text-align:left; /* \"remédio\" para o hack do IE */\n" +
                                "    /*border: 1px solid #333;*/\n" +
                                "	background-color: transparent;\n" +
                                "	/*overflow-x: hidden;*/\n" +
                                "}";
                
                return css;
        }
        
        public String getUserEntities()
        {
                boolean joined = false;
                String js = "";
                
                Entities entities = MproEntity.fromJson(this.projeto.JsonEntities, Entities.class);
                
                for(Entity entity : entities.Entities)
                {
                        js += "\nfunction " + entity.Name + "(){\n";
                        for(Field field : entity.Fields)
                        {
                                if((field.Type.equals("TEXT")) || (field.Type.equals("NUMERIC")))
                                {
                                        js += "this." + field.Name + " = " + (field.Type.equals("TEXT") ? "\"\"" : "2147483647") + ";\n";
                                }
                                else //relation
                                {
                                        joined = true;
                                        js += "this.Entity" + field.Type + " = new Array();\n";
                                        js += "this." + field.Name + " = " + "this.Entity" + field.Type + ";";
                                }
                        }
                        js += "this.class = '" + entity.Name + "';\n";
                        js += "MproEntity.call(this);\n";
                        js += "}\n " + entity.Name + ".prototype = new MproEntity();\n";
                        
                        joined = false;
                }
                
                return js;
        }
        
        public String getIndex()
        {
                String html = "";
                
                if(projeto.layout.get(0).Tipo == 2) //EAD
                {
                        html += "<?php header('Access-Control-Allow-Origin: *'); ?>\n" +
                                        "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\"\n" +
                                        "\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\n" +
                                        "\n" +
                                        "<html xmlns=\"http://www.w3.org/1999/xhtml\">\n" +
                                        "\n" +
                                        "<!-- PÁGINA PRINCIPAL DO NED TEMPLATE -->\n" +
                                        "\n" +
                                        "<head>\n" +
                                        "	<!-- METAS -->\n" +
                                        "    <meta charset=\"utf-8\" />\n" +
                                        "    <meta\n" +
                                        "    	name=\"viewport\"\n" +
                                        "    	content=\"width=device-width, initial-scale=1, maximum-scale=1\"\n" +
                                        "	/>\n" +
                                        "    \n<meta http-equiv=\"cache-control\" content=\"max-age=0\" />\n" +
"<meta http-equiv=\"cache-control\" content=\"no-cache\" />\n" +
"<meta http-equiv=\"expires\" content=\"-1\" />\n" +
"<meta http-equiv=\"expires\" content=\"Tue, 01 Jan 1980 1:00:00 GMT\" />\n" +
"<meta http-equiv=\"pragma\" content=\"no-cache\" /> <meta http-equiv=\"cache-control\" content=\"no-store\">" +
                                        "    <!-- FAVICON -->\n" +
                                        "    <link rel=\"shortcut icon\" href=\"../img/favicon.ico\" type=\"image/x-icon\" />\n" +
                                        "    \n" +
                                        "    <!-- TITLE -->\n" +
                                        "    <title>Gaia Release</title>\n" +
                                        "    \n" +
                                        "    <!-- STYLES -->\n" +
                                        "	<link rel=\"stylesheet\" href=\"../css/main.css\" type=\"text/css\" />\n" +
                                        "	<!--[if !IE]><!-->\n" +
                                        "		<link rel=\"stylesheet\" href=\"../css/exMain.css\" type=\"text/css\" />\n" +
                                        "	<!--<![endif]-->\n" +
                                        "<link href='http://fonts.googleapis.com/css?family=Ubuntu' rel='stylesheet' type='text/css' />\n" +
                                        "<link href='http://fonts.googleapis.com/css?family=Cabin' rel='stylesheet' type='text/css' />\n" +
                                        " <link href='http://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css' />\n" +
                                        "<link href='http://fonts.googleapis.com/css?family=PT Serif' rel='stylesheet' type='text/css' />\n" +
                                        "<link href='http://fonts.googleapis.com/css?family=Creepster' rel='stylesheet' type='text/css' />\n" +
                                        "<link href='http://fonts.googleapis.com/css?family=Fondamento' rel='stylesheet' type='text/css' />\n" +
                                        "<link href='http://fonts.googleapis.com/css?family=Oleo Script' rel='stylesheet' type='text/css' />\n" +
                                        "<link href='http://fonts.googleapis.com/css?family=Droid Sans' rel='stylesheet' type='text/css' />" +
                                        "                               <!-- Bootstrap core CSS -->\n" +
                                        "                              <link href=\"../dist/css/bootstrap.min.css\" rel=\"stylesheet\">\n" +
                                        "                              <!-- Bootstrap theme -->\n" +
                                        "                              <link href=\"../dist/css/bootstrap-theme.min.css\" rel=\"stylesheet\">" +
                                        "    <link rel=\"stylesheet\" href=\"../css/aulas.css\" type=\"text/css\" />\n" +
                                        "    \n" +
                                        "    <!-- SCRIPTS -->\n" +
                                        "	<script src=\"../js/jquery.js\" type=\"text/javascript\"> </script>\n" +
                                        "	<script src=\"../js/jqueryMobile.js\" type=\"text/javascript\"> </script>\n" +
                                        "	<script src=\"../js/jqueryUI.js\" type=\"text/javascript\"> </script>\n" +
                                        "    <script src=\"../js/jQueryRotate.js\" type=\"text/javascript\"> </script>\n" +
                                        "    <!--<script src=\"../js/jqueryWheel.js\" type=\"text/javascript\"> </script>-->\n" +
                                        "    <script src=\"../js/Anima.js\" type=\"text/javascript\"> </script>\n" +
                                        "    <script type=\"text/javascript\" src=\"../js/jquerycsstransform.js\"> </script>\n" +
                                        "	<script type=\"text/javascript\" src=\"../js/rotate3Di.js\"> </script>\n" +
                                        "    <script type=\"text/javascript\" src=\"../js/iscroll.js\"> </script>\n" +
                                        "	<script src=\"../js/gaiaView/Ajax.js\" type=\"text/javascript\"> </script>\n" +
                                        "	<script src=\"../js/gaiaController/Thread.js\" type=\"text/javascript\"> </script>\n" +
                                        "	<script src=\"../js/gaiaController/DBsource.js\" type=\"text/javascript\"> </script>\n" +
                                        "	<script src=\"../js/MproEntity.js\" type=\"text/javascript\"> </script>\n" +
                                        "	<script src=\"../js/MproEntityRelation.js\" type=\"text/javascript\"> </script>\n" +
                                        "	<script src=\"../js/UserEntities.js\" type=\"text/javascript\"> </script>\n" +
                                        "	<script src=\"../js/gaiaView/Lista.js\" type=\"text/javascript\"> </script>\n" +
                                        "	<script src=\"../js/gaiaView/List.js\" type=\"text/javascript\"> </script>\n" +
                                        "	<script src=\"../js/gaiaView/Item.js\" type=\"text/javascript\"> </script>\n" +
                                        "	<script src=\"../js/gaiaView/ItemModel.js\" type=\"text/javascript\"> </script>\n" +
                                        "	<script src=\"../lib/app.js\" type=\"text/javascript\"> </script>\n" +
                                        "	<script src=\"../js/utils.js\" type=\"text/javascript\"> </script>\n <script src=\"../dist/js/bootstrap.min.js\"></script>\n" +
                                        "</head>\n" +
                                        "\n" +
                                        "<!-- ONLOAD INICIA ENGINE E ENTRA PRIMEIRA PAGINA -->\n" +
                                        "<body style=\"background-image: url(../img/fundo.jpg); background-color: " + projeto.layout.get(0).BackgroundColor + "; margin: 0;\" onload=\"iniS('" + (projeto.paginas.size() - 2) + "'); enableProx(false); pageIn('1');\">\n" +
                                        "<!--PAGE-->\n" +
                                        "<div id=\"page\">\n" +
                                        "<!--HEADER-->\n" +
                                
                                        /**
                                         * HEADER
                                         */
                                
                                        "  <div id=\"header\" class=\"header\">\n" +
                                                Topo + 
                                        "	</div>\n" +
                                
                                
                                        "\n" +
                                        "<!--CONTENT-->\n" +
                                        "<div id=\"content\" class=\"content\">\n" +
                                        "</div>\n" +
                                        "\n" +
                                        "<!--FIM CONTENT-->\n" +
                                        "\n" +
                                        "<!--FOOTER-->\n" +
                                
                                        /**
                                         * FOOTER
                                         */
                                
                                        "    <div class=\"footer\">\n" +
                                                Rodape + 
                                        "    </div>\n" +
                                        "<!--FIM FOOTER-->\n" +
                                
                                
                                        "\n" +
                                        "</div>\n" +
                                        "<!--FIM PAGE-->\n" +
                                        "</body>\n" +
                                        "\n" +
                                        "</html>";
                }
                
                return html;
        }
}