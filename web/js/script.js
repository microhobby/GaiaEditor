$(document).ready(function(){
    $('#clique_aqui').click(function(){
        $('#img_1').toggle("slow");
        $('#Mostrar1').show("slow");
    } );
    
    $('#clique_aqui_2').click(function(){
        $('#img_2').toggle("slow");
        $('#Mostrar2').show("slow");
    } );
    
    //Função para tabela de operadores
    $('#vertabela').click(function(){
    	$('#tabela_operadores').show("slow");
    });
    $('#vertabela_fechar').click(function(){
    	$('#tabela_operadores').hide("slow");
    });
    
    //Função esconde animação da Lição 3
    $('#fecharInicio3').click(function(){
    	$('#animacao').show();
    });


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