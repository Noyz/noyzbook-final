window.onload = function(){
	setInterval(function(){
		if(window.pageYOffset > 690){
			$('#magic span:first-child').fadeIn(1000);
			$('#second').delay(3000).fadeIn(1000);
			$('#third').delay(6000).fadeIn(1000);
			$('#fourth').delay(9000).fadeIn(1000);
			$('#fifth').delay(12000).fadeIn(1000);
			$('#sixth').delay(15000).fadeIn(1000);
			$('#seven').delay(17500).fadeIn(1000);
		}
	}, 500);
}
