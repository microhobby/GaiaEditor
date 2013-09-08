$(document).ready(function(){
//---FUNÇÃO P/ JANELA MODAL---
    $('a[name=modal]').click(function(e) {
		e.preventDefault();
		
		window.scrollBy(-1000,-1000);
		
		var id = $(this).attr('href');

		var maskHeight = $(document).height();
		var maskWidth = $(window).width();

		$('#mask').css({'width':maskWidth,'height':maskHeight});

		$('#mask').fadeIn(1000);
		$('#mask').fadeTo("slow",0.8);

		//Get the window height and width
		var winH = $(window).height();
		var winW = $(window).width();

		$(id).css('top',  winH/2-$(id).height()/2);
		$(id).css('left', winW/2-$(id).width()/2);

		$(id).fadeIn(2000);

        $('#media').hide();
        
        

	});

	$('.window .close').click(function (e) {
		e.preventDefault();

		$('#mask').hide();
		$('.window').hide();
        $('#media').show();
	});

	$('#mask').click(function () {
		$(this).hide();
		$('.window').hide();
	});

} );