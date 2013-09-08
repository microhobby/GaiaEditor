/*
 * UTILS Mpro3 2012 
 *  dependencias
 *  	jquery
 */

//alerta recebe referencia do alert
var alerta = alert;
var verdade = true;
var falso = false;
var uno = 1;

 //função que esmaece a tela
 function blackOut()
 {
	 /*$("#page").append("<div id='blackOut' style='position: absolute; width: " + window.innerWidth + "px; height: " + window.innerHeight + "px; background-color: #666; opacity: 0.8; display: none; z-index: 998;'>");
	 $("#blackOut").css("left", "0px");
	 $("#blackOut").css("top", "0px");*/
	 /*$("#page").append("<div id='blackOut' style='position: absolute; width: " + document.documentElement.clientWidth + "px; height: " + document.documentElement.clientHeight + "px; background-color: #666; display: none; z-index: 998;' class='opaque8'>");
	 $("#blackOut").css("left", "0px");
	 $("#blackOut").css("top", "0px");*/
	 //parseFloat($('#blackOut').css('width')) + (parseFloat($('#blackOut').css('width')) * scale)
	 if($("#page")[0] != undefined)
		$("#page").append("<div id='blackOut' style='display: none;'></div>");
	 else
		$("body").append("<div id='blackOut' style='display: none;'></div>");
	 
	 $('#blackOut').css('height', document.documentElement.clientHeight / (scale + uScale));
	 $('#blackOut').css('width', document.documentElement.clientWidth / (scale + uScale));
 }

//centralizar elemento horizontal e verticalmente
 function centra(id)
 {
	 var docW = document.documentElement.clientWidth;
	 var docH = document.documentElement.clientHeight;
	 
	 if(docW > ($("#" + id).width() * scale))
	 {
		 $("#" + id).css("left", (docW - $("#" + id).width()) / 2);
	 }
	 else
	 {
		 $("#" + id).css("left", $('#' + id).offset().left * -1);
	 }
	 if(docH > ($("#" + id).height() * scale))
	 {
		 $("#" + id).css("top", (docH - $("#" + id).height()) / 2 );
	 }
	 else
	 {
		 $("#" + id).css("top", $('#' + id).offset().top * -1);
	 }
	 uno++;
	 $('#logs').empty().append(uno);
 }

//função que pega se é internet explorer 8
 function ieHell()
 {
	 if (navigator.appVersion.indexOf("MSIE") != -1)
	 {
		 var ver = parseFloat(navigator.appVersion.split("MSIE")[1]);
		 if(ver == 8)
		 	return true;
		else if(ver < 8)
		{
			return true;
		}
	 }
	 return false;
 }
 
 //escurece a tela
 /*
  * Qualquer elemento que se deseje estar na frente da tela esmaecida
  * deve ser setado o z-index do mesmo para 999
  */
 function escurece(ix)
 {
	 if(ix)
	 {
		if(ieHell())
		{
			$('#blackOut').show();
		}
		else
		{
			$('#blackOut').fadeIn(2000);
		}
 	}
	else
	{
		if(ieHell())
		{
			$('#blackOut').hide();
		}
		else
		{
			$('#blackOut').fadeOut();
		}
	}
 }
 
 //para todas as animações do stack em div da pagina
 function cancela()
 {
 	var sDiv = $("div");
	sDiv.clearQueue();
	sDiv.stop();
 }
 
 //para tirar stack de elementos passados como objeto
 function cancelaElem(elems)
 {
 	for(var i = 0; i < elems.length; i++)
 	{
 		$(elems[i]).stop();
 	}
 }
 
 //html5
 function PlayAudio(id)
 {
	 id = id.replace("#", "");
	 var a = document.getElementById(id + "aud");
	 
	 if(a.play) //HTML5
	 {
		 a.play();
	 }
	 else //FLASH
	 {
		 var a = document.getElementById(id + "swf");
		 a.Fplay();
	 }
 }
 
 //tudo que comeca tem que parar
 function StopAudio(id)
 {
	 id = id.replace("#", "");
	 var a = document.getElementById(id + "aud");
	 
	 if(a.pause) //HTML5
	 {
		 a.currentTime = 0;
		 a.pause();
	 }
	 else //FLASH
	 {
		 var a = document.getElementById(id + "swf");
		 a.Fstop();
	 }
 }
 
//mostra o icone de próximo e ativa o reconhecimento de evento dos swipes
function prox()
{
	validProx();
}

//mostra o icone de anterior
function ante()
{
	validAnte();
}

/* COOKIES */
function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  	y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  	x=x.replace(/^\s+|\s+$/g,"");
	  	if (x==c_name)
	    {
	  		return unescape(y);
	    }
	 }
}

function checkCookie()
{
  var username=getCookie("username");
  if (username!=null && username!="")
  {
  alert("Welcome again " + username);
  }
  else 
  {
  username=prompt("Please enter your name:","");
  	if (username!=null && username!="")
    {
  		setCookie("username",username,365);
    }
  }
}

/* GET */
function getUrlVars(str)
{
    var vars = [], hash;
    var hashes = str.slice(str.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
