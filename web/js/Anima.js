/*
 * Definação de Classe para animações automaticas
 * By Matheus de Barros Castello
 * http://mpro3.com.br
 *
 * Dependencias:
 * jquery.js - jquery.jangle.js
 */

/* uma pilha global */

var __stack__ = new Array();


(function($) {
	
	/* Zera tudo para conseguir chapar o coco */
	$.fn.zero = function()
	{
		//para cada um que vier a executar essa função
		$(this).each(function(){
			//alert("w: " + param.w + "| h: " + param.h + "| l: " + param.l + "| t: " + param.t + "| a: " + param.a);
			var aux = {w:$(this).css("width"), h:$(this).css("height"), l:$(this).css("left"), t:$(this).css("top"), f:$(this).css("font-size")};
			__stack__[$(this).attr("id")] = aux;
			$(this).css("top", parseFloat($(this).css("top")) + (parseFloat($(this).css("height"))/2));
			$(this).css("left", parseFloat($(this).css("left")) + (parseFloat($(this).css("width"))/2));
			$(this).css("width", "0px");
			$(this).css("height", "0px");
			$(this).css("font-size", "0px");
			//alert($(this).css("height"));
		});
	}
	
	/* Anima normal todos os parametros */
	$.fn.Anima = function(param, func) {
	
		/* tratamento de parametros */
		if(!param.w)
		{
			param.w = parseFloat($(this).css('width'));
			!param.w ? param.w = 0 : false;
			//param.w == "auto" ? param.w = 0 : false;
		}
		else if((param.w.toString().indexOf("+") != -1) || (param.w.toString().indexOf("-") != -1))
		{
			param.w = parseFloat($(this).css('width')) + parseFloat(param.w);
		}
		if(!param.h)
		{
			param.h = parseFloat($(this).css('height'));
			!param.h ? param.h = 0 : false;
			//param.h == "auto" ? param.h = 0 : false;
		}
		else if((param.h.toString().indexOf("+") != -1) || (param.h.toString().indexOf("-") != -1))
		{
			param.h = parseFloat($(this).css('height')) + parseFloat(param.h);
		}
		if(!param.t)
		{
			param.t = parseFloat($(this).css('top'));
			!param.t ? param.t = 0 : false;
			//param.t == "auto" ? param.t = 0 : false;
		}
		else if((param.t.toString().indexOf("+") != -1) || (param.t.toString().indexOf("-") != -1))
		{
			param.t = parseFloat($(this).css('top')) + parseFloat(param.t);
		}
		if(!param.l)
		{
			param.l = parseFloat($(this).css('left'));
			!param.l ? param.l = 0 : false;
			//param.l == "auto" ? param.l = 0 : false;
		}
		else if((param.l.toString().indexOf("+") != -1) || (param.l.toString().indexOf("-") != -1))
		{
			param.l = parseFloat($(this).css('left')) + parseFloat(param.l);
		}
		if(!param.f)
		{
			param.f = parseFloat($(this).css('font-size'));
			!param.f ? param.f = 0 : false;
			//param.l == "auto" ? param.l = 0 : false;
		}
		else if((param.f.toString().indexOf("+") != -1) || (param.f.toString().indexOf("-") != -1))
		{
			param.f = parseFloat($(this).css('font-size')) + parseFloat(param.f);
		}
		if(!param.c)
		{
			param.c = $(this).css('background-color');
			!param.c ? param.c = null : false;
		}
		if(!func)
		{
			func = function()
			{
				return null;
			}
		}
		if(!param.a)
		{
			param.a = parseFloat(this.getRotateAngle());
			!param.a ? param.a = 0 : false;
		}
		else if((param.a.toString().indexOf("+") != -1) || (param.a.toString().indexOf("-") != -1))
		{
			param.a = parseFloat(this.getRotateAngle()) + parseFloat(param.a);
		}
		
		if(param.o == undefined)
		{
			param.o = parseFloat($(this).css('opacity'));
			!param.o ? param.o = 0 : false;
		}
		else if((param.o.toString().indexOf("+") != -1) || (param.o.toString().indexOf("-") != -1))
		{
			param.o = parseFloat(parseFloat($(this).css('opacity')) + parseFloat(param.o));
		}
		
		/* variaveis locais */
		var ang = 0;
	
		$(this).each(function(){
			//alert("w: " + param.w + "| h: " + param.h + "| l: " + param.l + "| t: " + param.t + "| a: " + param.a);
			//console.log("w: " + param.w + "| h: " + param.h + "| l: " + param.l + "| t: " + param.t + "| a: " + param.a);
			goAnima($(this));
		});
	
		function goAnima($this)
		{
			/*try
			{*/
				if(!ieHell())
				{
					$($this).rotate({
					  angle: (parseFloat($this.getRotateAngle()) ? parseFloat($this.getRotateAngle()) : 0),
					  animateTo: param.a, 
					  callback: null
				   });
				}
				
				if((param.c.indexOf("rgba") == -1) && (param.c.indexOf("transparent") == -1))
				{
					$($this).animate(
					{
						top: param.t,
						left: param.l,
						width: param.w,
						height: param.h,
						fontSize: param.f,
						backgroundColor: param.c,
						opacity: param.o
					}, 500, function(){
						func();
					});
				}
				else
				{
					$($this).animate(
					{
						top: param.t,
						left: param.l,
						width: param.w,
						height: param.h,
						fontSize: param.f,
						opacity: param.o
					}, 500, function(){
						func();
					});
				}
			/*}
			catch(err)
			{
				throw new Error("Erro no plugin Anima :: " + err.name + "  " + err.message);
			}*/
		}
		
		//return this;
	}
	
	/* e executa a tarefa de ir pra frente */
	$.fn.iin = function(func){
		
		/* prepara parametros */
		if(!func)
		{
			func = function()
			{
				return null;
			}
		}
		
			//para cada um que vier a executar essa função
		$(this).each(function(){
			var aux = {w:$(this).css("width"), h:$(this).css("height"), l:$(this).css("left"), t:$(this).css("top"), f:$(this).css("font-size")};
			__stack__[$(this).attr("id")] = aux;
			$(this).Anima({
				t: parseFloat($(this).css("top")) + (parseFloat($(this).css("height"))/2),
				l: parseFloat($(this).css("left")) + (parseFloat($(this).css("width"))/2),
				w: "0",
				h: "0",
				f: "0"
			}, func);
			//console.log($(this).css("width"));
		});
	}
	
	/* executa a tarefa referente ao stack */
	$.fn.ion = function(func, angle){
		
		/* prepara parametros */
		if(!func)
			func = function()
			{
				return null;
			}
		if(!angle)
			angle = null;
		
		//para cada um que vier a executar essa função
		$(this).each(function(){
			if(__stack__[$(this).attr("id")])
			{
				$(this).show();
				$(this).Anima({
					l: __stack__[$(this).attr("id")].l,
					t: __stack__[$(this).attr("id")].t,
					w: __stack__[$(this).attr("id")].w,
					h: __stack__[$(this).attr("id")].h,
					f: __stack__[$(this).attr("id")].f,
					a: angle
				}, func);
			}
		});
	}
	
})(jQuery);