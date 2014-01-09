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
		// a.Fplay();
                                            a.SetVariable("method:play", "");
                                            a.SetVariable("enabled", "true");
                        }
 }
 
 function OnStopAudio(id, func)
 {
         id = id.replace("#", "");
         var a = document.getElementById(id + "aud");
         //eval();
         var obj = {_func: func, _runed: false};
         
         if(a.play)
         {
                 if(!a._eventsS)
                                a._eventsS = new Array();
                 if(!a._events)
                 {
                        a._events = new Array();
                        a.addEventListener("timeupdate", function()
                        {
                                for(var i = 0; i < a._events.length; i++)
                                {
                                        if(a._events[i]._time <= this.currentTime)
                                        {
                                                if(a._events[i]._func && !a._events[i]._runed)
                                                {
                                                        a._events[i]._func();
                                                        a._events[i]._runed = true;
                                                }
                                        }
                                }
                        });
                        a.addEventListener("seeked", function()
                        {
                                for(var i = 0; i < a._events.length; i++)
                                {
                                        a._events[i]._runed = false;      
                                }
                                for(var i = 0; i < a._eventsS.length; i++)
                                {
                                        a._eventsS[i]._func();
                                        a._eventsS[i]._runed = true;
                                }
                        });
                 }
                 a._eventsS.push(obj);
         }
         else
         {
                 var a = document.getElementById(id + "swf");
                 if(!eval("____fuction" + id + "._eventsS"))
                 {
                         if(!eval("____fuction" + id + "._events"))
                        {
                                eval("____fuction" + id + "._events = new Array();");
                        }
                         eval("____fuction" + id + "._eventsS = new Array();");
                 }
                 eval("____fuction" + id + "._eventsS").push(obj);
                 a.SetVariable("enabled", "true");
         }
 }
 
 function OnTimeAudio(id, func, time)
 {
         id = id.replace("#", "");
         var a = document.getElementById(id + "aud");
         var obj = {_time: time, _func: func, _runed: false};
         
         if(a.play)
         {
                 if(!a._events)
                 {
                        a._events = new Array();
                        if(!a._eventsS)
                                a._eventsS = new Array();
                        
                        a.addEventListener("timeupdate", function()
                        {
                                for(var i = 0; i < a._events.length; i++)
                                {
                                        if(a._events[i]._time <= this.currentTime)
                                        {
                                                if(a._events[i]._func && !a._events[i]._runed)
                                                {
                                                        a._events[i]._func();
                                                        a._events[i]._runed = true;
                                                }
                                        }
                                }
                        });
                        a.addEventListener("seeked", function()
                        {
                                for(var i = 0; i < a._events.length; i++)
                                {
                                        a._events[i]._runed = false;      
                                }
                                for(var i = 0; i < a._eventsS.length; i++)
                                {
                                        a._eventsS[i]._func();
                                        a._eventsS[i]._runed = true;
                                }
                        });
                }
                a._events.push(obj);
         }
         else
         {
                 var a = document.getElementById(id + "swf");
                 if(!eval("____fuction" + id + "._events"))
                 {
                         eval("____fuction" + id + "._events = new Array();");
                         if(!eval("____fuction" + id + "._eventsS"))
                        {
                                 eval("____fuction" + id + "._eventsS = new Array();");
                        }
                 }
                 eval("____fuction" + id + "._events").push(obj);
                 a.SetVariable("enabled", "true");
         }
 }
 
 function PauseAudio(id)
 {
         id = id.replace("#", "");
         var a = document.getElementById(id + "aud");
         
         if(a.pause)
         {
                 a.pause();
         }
         else
         {
                 var a = document.getElementById(id + "swf");
                 a.SetVariable("method:pause", "");
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
		 //a.Fstop();
                                             a.SetVariable("method:stop", "");
	 }
 }
 
 function getPlayBackRecur(jquery, time, arr, ix, call)
 {
         if(arr[ix])
                Anima(jquery, window[arr[ix]], time, function(){
                        getPlayBackRecur(jquery, time, arr, ix+1, call)
                });
        else if(call)
                call();
 }
 
 function PlayBlock(jquery, tempo, call)
 {
         if((eval(jquery.replace("#", "") + 'States')) && (eval(jquery.replace("#", "") + 'States').length > 1))
         {
                 /** @type Array */
                 var states = eval(jquery.replace("#", "") + 'States');
                 var realTime = tempo / (states.length -1);
                 getPlayBackRecur(jquery, realTime, states, 1, call);
         }
 }
 
 /**
  * 
  * @param {String} jqueryId
  * @param {Objetos} objDest
  * @param {Integer} tempo
  * @param {function} call
  * @returns {undefined}
  */
 function Anima(jqueryId, objDest, tempo, call)
 {
         //$(jqueryId).css("background-color", (objDest.Cb === "transparent" ? "rgba(255, 255, 255, 255)" : objDest.Cb));
         $(jqueryId).rotate(
                 {
                        angle: (parseFloat($(jqueryId).getRotateAngle()) ? parseFloat($(jqueryId).getRotateAngle()) : 0),
                        animateTo: objDest.A,
                        duration: tempo,
                        callback: null
                }
        );
         if((objDest.Cb === "transparent" ? true : false))
         {
                $(jqueryId).animate(
                {
                        width: objDest.W,
                        height: objDest.H,
                        top: objDest.T,
                        left: objDest.L,
                        'padding-top' : objDest.P,
                       'padding-right' : objDest.P,
                       'padding-bottom' : objDest.P,
                       'padding-left' : objDest.P,
                       //'background-color': (objDest.Cb === "transparent" ? "rgba(255, 255, 255, 255)" : objDest.Cb),
                       'border-radius': objDest.R,
                       'box-shadow': '9px 20px 18px ' + objDest.S + 'px ' + objDest.Cs,
                       'border-top-color': objDest.Cbb,
                       'border-right-color': objDest.Cbb,
                       'border-bottom-color': objDest.Cbb,
                       'border-left-color': objDest.Cbb,
                       'border-top-width': objDest.B,
                       'border-right-width': objDest.B,
                       'border-bottom-width': objDest.B,
                       'border-left-width': objDest.B,
                       fontSize: objDest.SizeFont,
                       'color': objDest.Cf,
                       opacity: (objDest.Opacity / 100)
                }, tempo, call);
        }
        else
        {
                $(jqueryId).animate(
                {
                        width: objDest.W,
                        height: objDest.H,
                        top: objDest.T,
                        left: objDest.L,
                        'padding-top' : objDest.P,
                       'padding-right' : objDest.P,
                       'padding-bottom' : objDest.P,
                       'padding-left' : objDest.P,
                       'background-color': objDest.Cb,
                       'border-radius': objDest.R,
                       'box-shadow': '9px 20px 18px ' + objDest.S + 'px ' + objDest.Cs,
                       'border-top-color': objDest.Cbb,
                       'border-right-color': objDest.Cbb,
                       'border-bottom-color': objDest.Cbb,
                       'border-left-color': objDest.Cbb,
                       'border-top-width': objDest.B,
                       'border-right-width': objDest.B,
                       'border-bottom-width': objDest.B,
                       'border-left-width': objDest.B,
                       fontSize: objDest.SizeFont,
                       'color': objDest.Cf,
                       opacity: (objDest.Opacity / 100)
                }, tempo, call);
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
