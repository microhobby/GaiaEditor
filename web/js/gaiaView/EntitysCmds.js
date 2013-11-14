/* 
 * Todos os comandos para as Entidades
 */

//inputa do Gaia pro template 
function newElem(code) 
{ 
        var a = _stack(); 
        if((a.length == 1) && (a[0].indexOf("div") != -1)) 
        { 
                $(a[0]).append(code); return a[0]; 
        }
        else if((a.length == 1) && (a[0].indexOf("Vscroll") != -1))
        { 
                $(a[0]).find("#scroller" + a[0].replace("#", "")).append(code); return a[0]; 
        }
        else 
        { 
                $("#main").append(code); return "";	 
        }
} 

//inputa do gaia pro template mas fora do padrão
function newElemD(jqueryID, code) 
{ 
        if(jqueryID.indexOf("div") != -1)
        { 
                $(jqueryID).append(code); 
        }
        else if(jqueryID.indexOf("Vscroll") != -1)
        { 
                $(jqueryID).find("#scroller" + jqueryID.replace("#", "")).append(code); 
        }
}

//troca a largura de um elemento 
function changeW(jqueryID, num) 
{ 
        $(jqueryID).css("width", num+"px"); 
} 

//troca a altura de um elemento 
function changeH(jqueryID, num) 
{ 
        $(jqueryID).css("height", num+"px"); 
} 

//troca o left de um elemento 
function changeL(jqueryID, num) 
{ 
        $(jqueryID).css("left", num+"px"); 
} 

//troca o topo 
function changeTop(jqueryID, num) 
{ 
        $(jqueryID).css("top", num+"px");  
} 

//troca o padding do elemento 
function changeP(jqueryID, num) 
{ 
        $(jqueryID).css("padding", num+"px"); 
} 

//troca o radius do elemento 
function changeR(jqueryID, num) 
{ 
        $(jqueryID).css("border-radius", num+"px"); 
        $(jqueryID).css("-webkit-border-radius", num+"px"); 
} 

//troca o fator da sombra 
function changeS(jqueryID, str) 
{ 
        $(jqueryID).css("-webkit-box-shadow", str);	 
} 

//troca a cor de fundo 
function changeC1(jqueryID, str) 
{ 
        $(jqueryID).css("background-color", str); 
}

//troca a cor da sombra 
function changeC2(jqueryID, str) 
{ 
        $(jqueryID).css("-webkit-box-shadow", str); 
}

//troca o caminho da imagem 
function changePath(id, str) 
{ 
        $("#cont_img"+id).attr("src", str); 
} 

//troca a fonte 
function changeFont(jqueryID, name) 
{ 
        $(jqueryID).css("font-family", name); 
} 

//troca o tamanho da fonte 
function changeSizeFont(jqueryID, size) 
{ 
        $(jqueryID).css("font-size", size); 
} 

//troca a cor da fonte 
function changeColorFont(jqueryID, cor) 
{ 
        $(jqueryID).css("color", cor); 
} 

//coloca fonte em italico 
function changeFontI(jqueryID, value) 
{ 
        $(jqueryID).css("font-style", value);  
}

//coloca fonte em negrito 
function changeFontN(jqueryID, value) { 
        $(jqueryID).css("font-weight", value); 
} 

//coloca sublinhado 
function changeFontS(jqueryID, value) 
{ 
        $(jqueryID).css("text-decoration", value); 
}

//troca o texto de um elemento 
function changeT(jqueryID, str) 
{ 
        $(jqueryID).resizable("destroy"); 
        $(jqueryID).empty(); 
        $(jqueryID).append(str); 
        $(jqueryID).resizable(); 
}

//troca o texto de um botão
function changeTB(id, str) 
{ 
        $("#bt" + id).empty(); 
        $("#bt" + id).append(str); 
} 

//troca z-index de um elemento
function changeZ(jqueryID, z) 
{ 
        $(jqueryID).css("z-index", z); 
}

//troca opacidade de um elemento
function changeOpa(jqueryID, z) 
{ 	
        $(jqueryID).css("opacity", z); 
} 

//traz os elementos que estão sendo dragados
function _stack()
{
        var a = new Array();
        $(".ui-multidraggable").each(function(i)
        {
            a.push("#" + $(this).attr("id"));
        });
        return a;
}

//slides
function slidesHide(target, dir)
{
        $(target).hide("slide", { direction: dir }, 1000);
}

function slidesShow(target, dir)
{
        $(target).show("slide", { direction: dir }, 1000);
}

//function explodes
function explodesShow(target, p)
{
        $(target).show("explode", { pieces: p }, 1000);
}

function explodesHide(target, p)
{
        $(target).hide("explode", { pieces: p }, 1000);
}

//function drops
function dropShow(target, dir)
{
        $(target).show("drop", { direction: dir }, 1000);
}

function dropHide(target, dir)
{
        $(target).hide("drop", { direction: dir }, 1000);
}

//function clips
function clipShow(target, dir)
{
        $(target).show("clip", { direction: dir }, 1000);
}

function clipHide(target, dir)
{
        $(target).hide("clip", { direction: dir }, 1000);
}

//fucntion blinds
function blindShow(target, dir)
{
        $(target).show("blind", { direction: dir }, 1000);
}

function blindHide(target, dir)
{
        $(target).hide("blind", { direction: dir }, 1000);
}

//fucntion bounce
function blindShow(target, dir)
{
        $(target).show("blind", { direction: dir }, 1000);
}

function blindHide(target, dir)
{
        $(target).hide("blind", { direction: dir }, 1000);
}

//quando troca o tamanho centraliza
function goCenter(h, w)
{
        if(w > $("#main").width())
        {
                $("#main").css("left", (w/2) - ($("#main").width() / 2) + "px");
        }
        if(h > $("#main").height())
        {
                $("#main").css("top", (h/2) - ($("#main").height() / 2) + "px");
        }
}

document.onkeydown = function(event)
{
        //desabilita backspace
        /*if(event && event.keyCode == 8)
        { 
            return false; 
        }*/
}

