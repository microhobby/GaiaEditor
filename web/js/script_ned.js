function Abrir(id){
	var objeto = "#"+id;
	$(objeto).slideDown("slow");
}

function Abrirtempo(id, tempo){
	var objeto = "#"+id;
	$(objeto).delay(tempo);
	$(objeto).slideDown("slow");
}

function Fechar(id){
	var objeto = "#"+id;
	$(objeto).slideUp("fast");
}

function Fadein(id, tempo){
	var objeto = "#"+id;
	$(objeto).fadeIn(tempo);
}

function fadein_fadeout(id){
	var i=0;
	for(i=0; i<=20; i++)
	{
		$('#'+id).fadeTo(100, 1);
		$('#'+id).delay(1000);
		$('#'+id).fadeTo(100,0.3);
	}
	$('#'+id).fadeTo(100, 1);
}

function Fim_fadein_fadeout(id){
	$('#'+id).stop(true, true).fadeIn();
}

function fechar_class(idclass){
	//$('.'+idclass).hide();
	$('.'+idclass).each(function(index){
		$(this).hide();	
	});
}


function Abrir_class(classe){
	var objeto = "."+classe;
	$(objeto).show("slow");
}

function FecharTudo(){
	$('#div-naturais').hide();
	$('#div-inteiros').hide();
	$('#div-racionais').hide();
	$('#div-reais').hide();
	$('#div-irracionais').hide();
}

function FecharDivsTextuais(){
	$('#div-injuntivo').hide();
	$('#div-argumentativo').hide();
	$('#div-expositivo').hide();
	$('#div-descritivo').hide();
	$('#div-narrativo').hide();
}


function FecharJanela()
{
ww = window.open(window.location, "_self");
ww.close();
}


$(document).ready(function(){
    $('#lnk_primo').click(function(){
        $('#div_primo').show("slow");
        $('#con_primo').show();
    } );
    
    $('#lnk_exemplos').click(function(){
       $('#div_exemplos_fatoracao').show("slow");
       $('#con-2').show();
    } );
    
	 $('.dock-item').click(function(){
       $('#div_exemplos_fatoracao').show("slow");
       $('#avancar_pag').show();
    } );
    
     $('#click_fatora').click(function(){
       $('#anima_fatora').show();
    } );
    
      $('#fechar_fatora').click(function(){
       $('#anima_fatora').hide();
    } );
    
     $('#click_divisoes').click(function(){
       $('#anima_divisoes').show();
    } );
    
      $('#fechar_divisoes').click(function(){
       $('#anima_divisoes').hide();
       $('#avancar_pag').show();
    } );

	$('#click-quadro1').click(function(){
       $('#div-quadro1').show("slow");
    } );
    
    $('#click-fechar').click(function(){
       $('#div-quadro2').hide();
       $('#div-con').show();
    } );
    
    $('#click-quadro2').click(function(){
       $('#div-quadro1').hide();
       $('#div-quadro2').show("slow");
    } );

    $('#click-exemplos-mmc').click(function(){
       $('#div-exemplos-mmc').show();
    } );
    
    $('#click-fechar').click(function(){
       $('#div-exemplos-mmc').hide();
       $('#avancar_pag').show();
    } );

	$('#click-calculo-mmc').click(function(){
       $('#anima-calculo-mmc').show();
    } );
    
    $('#click-fechar').click(function(){
       $('#anima-calculo-mmc').hide();
       $('#avancar_pag').show();
    } );




    //---Funções para Onde estou---
    $('#clique_onde_estou').click(function(){
        $('.onde_estou').show("slow");
    } );

    $('.fechar_onde').click(function(){
         $('.onde_estou').fadeOut("slow");
    } );

    //---Funções para Retrovisor
    $('#clique_retrovisor').click(function(){
        $('.retrovisor').show("slow");
    } );

    $('.fechar_retro').click(function(){
        $('.retrovisor').fadeOut("slow");
    } );

} );
