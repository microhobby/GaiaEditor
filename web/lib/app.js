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

var __total___Events__ = 4; var ___catch__Event = 0;
function VERIFY__EVENTS__LOAD(){ if(__total___Events__ === ___catch__Event){ $("#loadloading").fadeOut(500, function(){ $("#main").find("#loadloading").remove(); }); escurece(false); } }
function ____incrementCatch(){ ___catch__Event++; VERIFY__EVENTS__LOAD(); this.src = ""; }var ____loading0 = new Image(); ____loading0.onload = ____incrementCatch;
var ____loading1 = new Audio(); ____loading1.addEventListener('canplaythrough', ____incrementCatch);
var ____loading2 = new Image(); ____loading2.onload = ____incrementCatch;
var ____loading3 = new Image(); ____loading3.onload = ____incrementCatch;
function ____loadMidias(){
  ____loading0.src = '../matheus_1/1385594555317.choosewisely.jpg'; ____loading1.src = '../matheus_1/1385598139980.Eric Johnson - Trail of Tears.mp3'; ____loading2.src = '../matheus_1/1385612402594.feel-like-a-sir.gif'; ____loading3.src = '../matheus_1/1385616486909.OompaLoompa3.jpg';
if(__total___Events__ !== 0)
{ $("#main").append('<div id="loadloading" style="display: none; background-color: white; position: absolute; top: 140.0px; left: 250.0px; width: 210px; height: 110px; z-index: 5000"><center><img style="" src="../img/loader.gif"></center><div id="msgloading"><center>Carregando Mídias...</center></div></div>'); escurece(true); $("#loadloading").fadeIn(500);}

}
 
 //quando inicia vamos ajustar os slides
 function iniS(numP)
 {
	 try
	 {
		 //prepara as paginas que virão
		 for(var i = 1; i <= numP; i++)
		 {
			 $("#content").append("<div id='pg" + i + "' style='' class='pg'><div id='load" + i + "' style='position: absolute; top: 213.0px; left: 295.0px;'><img src='../img/loader.gif'/></div></div>");
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
		 if(document.documentElement.clientWidth < document.documentElement.clientHeight)
		 {
		 	scale = (document.documentElement.clientWidth) / 700.0;
		 	$('#page').css("transform", "scale(" + (scale + uScale) + ")");
 		 }
	 	 else
	 	 {
	 	 	scale = (document.documentElement.clientHeight) / 680.0;
		 	$('#page').css("transform", "scale(" + (scale + uScale) + ")");
	 	 }
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
	 if((scale + uScale) < scale)
	 {
		 $('#blackOut').css('height', document.documentElement.clientHeight / (scale + uScale));
		 $('#blackOut').css('width', document.documentElement.clientWidth / (scale + uScale));
		 $('#blackOut').css('left', Math.round(parseFloat($('#blackOut').position().left - $('#page').position().left /(scale + uScale))));
		 $('#blackOut').css('top', Math.round(parseFloat($('#blackOut').position().top - $('#page').position().top / (scale + uScale))));
	 }
	 else
	 {
		 $('#blackOut').css('height', $(document).height() / (scale + uScale));
		 $('#blackOut').css('width', $(document).width() / (scale + uScale));
		 $('#blackOut').css('left', Math.round(parseFloat($('#blackOut').position().left - $('#page').position().left /(scale + uScale))));
		 $('#blackOut').css('top', Math.round(parseFloat($('#blackOut').position().top - $('#page').position().top / (scale + uScale))));
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
			left: 0
		}, time, function() {
			//complete
			pageRefresh(id);
		}
	);
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
if(id > pgInd)
		 {
			 var auxid = pgInd;
			 $("#pg" + auxid).animate(
				{
					opacity: 0.8,
					//left: (2*($('#header').offset().left) + parseInt($('#header').width())) * -1
					left: (2*($("#page").position().left + $("#page").width() )) * -1
					//left: ($('#header').offset().left - parseInt($('#header').width()) - $('#header').offset().left)
				}, 500, function() {
					$("#pg" + auxid).css("display", "none");
					garbCollect(auxid);
					
					//relloc();
				}
			);
			 
			 pgInd = id;
			 pageIn(pgInd);
		 }
		 else if(id < pgInd)
		 {
			 var auxid = pgInd;
			 $("#pg" + auxid).animate(
				{
					opacity: 0.8,
					//left: (2*($('#header').offset().left) + parseInt($('#header').width()))
					left: (2*($("#page").position().left + $("#page").width() ))
				}, 500, function() {
					$("#pg" + auxid).css("display", "none");
					garbCollect(auxid);
					
					//relloc();
				}
			);
			 
			 pgInd = id;
			 pageIn(pgInd);
		 }
	 }
 }
 
  //função que implementa saida do slide
 function pageOutAnt()
 {
 	if(pgInd != 1)
 	{
		 var id = pgInd;
$("#pg" + id).animate(
			{
				opacity: 0.8,
				left: (($('#header').offset().left) + parseInt($('#header').width()) / scale)
			}, 500, function() {
				$("#pg" + id).css("display", "none");
				garbCollect(id);
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
$("#pg" + id).animate(
				{
					opacity: 0.8,
					left: (($('#header').offset().left) + parseInt($('#header').width()) / scale) * -1
					//left: ($('#header').offset().left - parseInt($('#header').width()) - $('#header').offset().left)
				}, 500, function() {
					$("#pg" + id).css("display", "none");
					garbCollect(id);
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
$("#content").live('swipeleft',function(event){
	if(goProx && (enableGest))
	{
		pageOutProx();
	}
});
 
$("#content").live('swiperight',function(event){
	if(!(pgInd <= 1) && (enableGest))
	{
		pageOutAnt();
	}
});
 
 //função que apaga lixo
 function garbCollect(id)
 {
	 document.getElementById("pg" + id).innerHTML = "<div id='load" + id + "' style='position: absolute; top: 213.0px; left: 295.0px;'><img src='../img/loader.gif'/>";
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
	recalcScale();
	centra('page'); 
	blackHell();
}

//arruma pagina
window.onresize = function()
{
	clearTimeout(timer);
	timer = setTimeout(lazyScreen, 500);
}