/*
 * Script de Slides com load e tratamento de erros
 * By Matheus de Barros Castello
 * http://mpro3.com.br
 */
 
 var pgInd = 1; //fala qual é a página que esta carregada
 var qtP = 0; //vai ser atribuido a quantidades de paginas q serão carregadas
 var goProx = false; //var ser o flag de próximo ou não para eventos
 var enableHideProx = false; //vai ser flag se pode mostrar proximo automaticamente ou não
 var scale = 1.0;
 var uScale = 0.0;
 var enableGest = true;
 var timer = null;
 var __projectCod__ = 0;
 var __projectUser__ = 'matheus_1';
 var __webType = true;
var ___pages__ = new Array();
  var __badWolf = null;

var __total___Events__ = 0; var ___catch__Event = 0;
function VERIFY__EVENTS__LOAD(){ if(__total___Events__ === ___catch__Event){ hideLoading(); } }
function ____incrementCatch(){ ___catch__Event++; VERIFY__EVENTS__LOAD(); this.src = ""; }var ____ID_FETCH = 0;
 var ____ID_FETCH_OK = 0;
 var ____LOAD_THREAD = new Thread(function(){ if(____ID_FETCH == ____ID_FETCH_OK){ $("#loadloading").fadeOut(500, function(){ $("#main").find("#loadloading").remove(); }); escurece(false); ____LOAD_THREAD.stop(); } });
function showLoading(){ if($("#blackOut").css("display") != "block"){
$("#main").append('<div id="loadloading" style="display: none; background-color: white; position: absolute; top: 140.0px; left: 300.0px; width: 210px; height: 110px; z-index: 5000"><center><img style="" src="../img/loader.gif"></center><div id="msgloading"><center>Carregando Mídias...</center></div></div>'); escurece(true); $("#loadloading").fadeIn(500);  } ____ID_FETCH++; ____LOAD_THREAD.run(); }
function hideLoading(){ ____ID_FETCH_OK++; if(____ID_FETCH <= ____ID_FETCH_OK){$("#loadloading").fadeOut(500, function(){ $("#main").find("#loadloading").remove(); }); escurece(false); }}
function ____loadMidias(){
 
if(__total___Events__ !== 0)
{ showLoading(); }

}
 
 //quando inicia vamos ajustar os slides
 function iniS(numP)
 {
	 try
	 {
		 //prepara as paginas que virão
		 for(var i = 1; i <= numP; i++)
		 {
			 $("#content").append("<div id='pg" + i + "' style='zoom: 0.2;' class='pg'><div id='load" + i + "' style='position: absolute; top: 213.0px; left: 345.0px;'><img src='../img/loader.gif'/></div></div>");
			 $("#pg" + i).css("left", (2*($('#header').offset().left) + $('#header').width()) + "px");
		 }
		 qtP = numP;
		 //se proximo automatico
		 if((!enableHideProx) && (qtP != 1))
		 {
		 	goProx = true;
		 	$('#avancar_pag').fadeIn();
		 }
		 //arruma a pagina
		 blackOut();
		 recalcScale();
		 centra('page');
		 blackHell();
                                          ____loadMidias();
		 //se ie8
		 if(ieHell())
		 	$('#cont_zoom').empty();
	 }
	 catch(error)
	 {
		 //console.error(error);
	 }
 }
 
 //função que leva ao marco zero novamente
 function markZero()
 {
	 uScale = 0.0;
	 $("#page").css("left", 0);
	 $("#page").css("top", 0);
	 $('#blackOut').css('left', 0);
	 $('#blackOut').css('top', 0);
 }
 
 //função que recalcula a escala
 function recalcScale()
 {
  markZero();
	 //verifica tamanho da tela para aplicar escala
		 if(document.documentElement.clientWidth < 800.0)
		 {
		 	scale = (document.documentElement.clientWidth) / 800.0;
		 	$('#page').css("transform", "scale(" + (scale + uScale) + ")");
 		 }
	 	 else
	 	 {
	 	 	scale = 1;
		 	$('#page').css("transform", "scale(" + (scale + uScale) + ")");
	 	 }
 }

function magic(scroll){ 
        try{
 if(!scroll) if($("body").scrollTop() != 0) $("body").animate({ scrollTop: 0}, 500); ; 
__badWolf = null;
$("#pg" + pgInd).find(".badWolf").each(function(i){ try{ this.__Soma = ($(this).offset().top / scale) + $(this)[0].scrollHeight; if((__badWolf === null) || (__badWolf.__Soma < this.__Soma)){ __badWolf = this;} } catch(e){}} );
$("#pg" + pgInd).css("height", (__badWolf.__Soma) - ($(".header").height()) + 10);
$('#blackOut').css('left', 0);
$('#blackOut').css('top', 0);
blackHell();
        }catch (e){}
}

 
 //função que aplica zoom
 function setZoomOut()
 {
	 uScale += 0.05;
	 $('#page').css('transform', 'scale(' + (scale + uScale) + ')');
	 
	 blackHell();
 }
 
 function setZoomIn()
 {
	 uScale -= 0.05;
	 $('#page').css('transform', 'scale(' + (scale + uScale) + ')');
	 
	 blackHell();
 }
 
 //função de jesus
 function blackHell()
 {
	 //e coloca blackout no lugar certo
                   var winS = window.document.documentElement.scrollHeight || window.document.body.scrollHeight;	 if((scale + uScale) < scale)
	 {
		 $('#blackOut').css('height', winS / (scale + uScale));
		 $('#blackOut').css('width', document.documentElement.clientWidth / (scale + uScale));
		 $('#blackOut').css('left', Math.round(parseFloat($('#blackOut').position().left - $('#page').position().left /(scale + uScale))));
		 $('#blackOut').css('top', 0);
	 }
	 else
	 {
		 $('#blackOut').css('height', winS / (scale + uScale));
		 $('#blackOut').css('width', $(document).width() / (scale + uScale));
		 $('#blackOut').css('left', Math.round(parseFloat($('#blackOut').position().left - $('#page').position().left /(scale + uScale))));
		 $('#blackOut').css('top', 0);
	 }
 }
 
 //função que desabilita ou não o proximo automatico
 function enableProx(bool)
 {
 	enableHideProx = bool;
                   goProx = bool; 
 }
 
 //função que implementa entrada do slide
 function pageIn(id, time)
 {
	 if(!time)
	 	time = 500;
	 
	 //$('#avancar_pag').fadeOut();
	 
	$("#pg" + id).css("display", "block");
$("#pg" + id).animate(
                    {
                              opacity: 1.0,
                              //left: $('#header').offset().left
                              left: 0,
                              //top: 0,
                              zoom: 1
                    }, time, function() {
			//complete
			pageRefresh(id);
                   });
 }
 
 function page2(id)
 {
	 $("#pg" + id).css("display", "block");
	 $("#pg" + id).animate(
		{
			opacity: 1.0,
			left: $('#header').offset().left
		}, 500, function() {
			//complete
		}
	);
 }
 
//mais uma que vai e vem
 function pageGo(id)
 {
	id = parseInt(id);
	pgInd = parseInt(pgInd);
 
	 if(!(id < 1) && !(id > qtP))
	 {
var auxid = pgInd;
                    if(pgInd != id){ $("#pg" + auxid).animate(
                             {
                                       opacity: 0.0,
                                       left: 320,
                                       //top: 480,
                                       zoom: 0.2
                                       //left: (2*($('#header').offset().left) + parseInt($('#header').width())) * -1
                                       //left: (2*($("#page").position().left + $("#page").width() )) * -1
                                       //left: ($('#header').offset().left - parseInt($('#header').width()) - $('#header').offset().left)
                             }, 500, function() {
                                       $("#pg" + auxid).css("display", "none");
                                       garbCollect(auxid);
                                       //pgAnt = auxid;
                                       //relloc();
                             }
                    );

                    pgInd = id;
                    pageIn(pgInd); }
	 }
 }
 
  //função que implementa saida do slide
 function pageOutAnt()
 {
 	if(pgInd != 1)
 	{
		 var id = pgInd;
var auxid = pgInd;
                    $("#pg" + auxid).animate(
                             {
                                       opacity: 0.0,
                                       left: 320,
                                       //top: 480,
                                       zoom: 0.2
                                       //left: (2*($('#header').offset().left) + parseInt($('#header').width())) * -1
                                       //left: (2*($("#page").position().left + $("#page").width() )) * -1
                                       //left: ($('#header').offset().left - parseInt($('#header').width()) - $('#header').offset().left)
                             }, 500, function() {
                                       $("#pg" + auxid).css("display", "none");
                                       garbCollect(auxid);
                                       //pgAnt = auxid;
                                       //relloc();
                             }
                    );
		
		//verifica se tem q voltar o botão de proximo automatico
		if((!enableHideProx) && (qtP != 1))
		 {
		 	goProx = true;
		 	$('#avancar_pag').fadeIn();
		 }
		
		pgInd--;
		
		//verifica se tem q suprimir botões
		if(pgInd == 1)
			$('#voltar_pag').fadeOut();
		
		setTimeout(function(){
			pageIn(pgInd);
		}, 10);
	}
 }
 
  //função que implementa saida do slide
 function pageOutProx()
 {
 	if(pgInd < qtP)
 	{
		 	var id = pgInd;
var auxid = pgInd;
                    $("#pg" + auxid).animate(
                             {
                                       opacity: 0.0,
                                       left: 320,
                                       //top: 480,
                                       zoom: 0.2
                                       //left: (2*($('#header').offset().left) + parseInt($('#header').width())) * -1
                                       //left: (2*($("#page").position().left + $("#page").width() )) * -1
                                       //left: ($('#header').offset().left - parseInt($('#header').width()) - $('#header').offset().left)
                             }, 500, function() {
                                       $("#pg" + auxid).css("display", "none");
                                       garbCollect(auxid);
                                       //pgAnt = auxid;
                                       //relloc();
                             }
                    );
		
		pgInd++;
		
		if(enableHideProx || (pgInd == qtP))
		{
			$('#avancar_pag').fadeOut();
			goProx = false;
		}
		
		setTimeout(function(){
			pageIn(pgInd);
		}, 10);
	}
 }
 
 //funções para tratar anteriores e próximos
 function validProx()
 {
 	if(pgInd < qtP)
 	{
 		$('#avancar_pag').fadeIn();
		goProx = true;
 	}
 }
 
 function validAnte()
 {
 	if(pgInd != 1)
 	{
 		$('#voltar_pag').fadeIn();
 	}
 }
 
//Eventos de toque de saidas do slide
 
 //função que apaga lixo
 function garbCollect(id)
 {
	 document.getElementById("pg" + id).innerHTML = "<div id='load" + id + "' style='position: absolute; top: 213.0px; left: 345.0px;'><img src='../img/loader.gif'/>";
 }
 
 //função que tenta carregar de novo
 function pageRefresh(id)
 {
	 $("#pg" + id).load("Pg_" + id + ".html", function(response, status, xhr) {
		if(status != "error")
		{
			//console.log("carregado");
		}
		else
		{
			if(document.getElementById("error" + id) == null)
			{
				$("#pg" + id).append("<div id='error" + id + "' style='display: none; position: absolute; top: 210px; left: 230px; width: 320px;'><div style='position: absolute; top: 0px; left: 0px;'><img src='../img/exclamation5.png'/></div> <div style='position: absolute; top: 11px; left: 60px; text-align: center;'> Não foi possivel carregar a página! Confira sua conexão com a internet e clique em \"Ok\".</div><div style='position:absolute; left: 130px; top: 90px; width:67px; height:28px;' class='buttonOk'> <button id='bt__refresh'>Ok</button> </div></div><script>$('#bt__refresh').click(function(){pageRefresh(" + id + "); $('#error" + id + "').hide(); $('#load" + id + "').fadeIn();});</script>");
				$("#load" + id).fadeOut();
				$("#error" + id).fadeIn();
				//console.error(xhr.status + " " + xhr.statusText);
			}
			else
			{
				$("#load" + id).fadeOut();
				$("#error" + id).fadeIn();
				//console.error(xhr.status + " " + xhr.statusText);
			}
		}
	});
 }
 
//sobrescreve F5
document.onkeydown = function(event)
{
	if(event && event.keyCode == 116)
	{
		pageRefresh(pgInd);
		return false;
	}
}

//espera pra arrumar
function lazyScreen()
{
 if(!($("input:focus").length >= 1 && $("input:focus").hasClass("form-control"))){	recalcScale();
	centra('page'); 
	blackHell();
	if(window.onScale) window.onScale(); }
}

//arruma pagina
window.onresize = function()
{
	clearTimeout(timer);
	timer = setTimeout(lazyScreen, 500);
}

/*window.addEventListener("message", receiveMessage, false);
function receiveMessage(event){ try{ var str = eval(event.data);  if(window.opener.postMessage !== undefined){ window.opener.postMessage("eval|" + str, "*");} }catch(e){}}
window.onerror = function(message, url, line){ if(window.opener.postMessage !== undefined){ window.opener.postMessage(message + "|" + url + "|" + line, "*");  } };
window.onbeforeunload = function(){ if(window.opener.postMessage !== undefined){ window.opener.postMessage("fechou", "*");  } }*/