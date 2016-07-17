$(document).ready(function(){
	var searchLibrary = {
		thisInput:null,
	 	searchUser : function(){
	 		var that = this;
	 		$('input').on('click', function(){
	 			$('input').val('');
	 			that.thisInput = $(this).attr('id');
	 		});
	 		$('.searchUser').on('click', function(e){
	 			e.preventDefault();
	 		});
		},
		byLastname : function(){
			$('.searchUserByLastName').click(function(e){
				e.preventDefault();
				$.ajax({
		           type: "POST",
		           url: "/searchByLastName",
		           data: {data:$('input[name="searchName"]').val(), dataCookie:localStorage.getItem('noyzCookie')}, 
		           success: function(data){
		           	$('.ResultatSearch .thisUserSearch').remove();
			            if(typeof data != 'string'){
			            	for(var i = 0 ; i < data.length;i++){
			            		$('.ResultatSearch').append('<div class="thisUserSearch"><p>'+ data[i].username +'</p><div><img src=' + data[i].profil + '></div></div>')
			            	}
			            }
			        }
		        });
		        $('input[type="text"]').val('');
			});
		},
		byFirstname : function(){
			$('.searchUserByFirstName').click(function(e){
				e.preventDefault();
				$.ajax({
		           type: "POST",
		           url: "/searchByFirstName",
		           data: {data:$('input[name="searchFirstName"]').val(), dataCookie:localStorage.getItem('noyzCookie')}, 
		           success: function(data){
		           	$('.ResultatSearch .thisUserSearch').remove();
			            if(typeof data != 'string'){
			            	for(var i = 0 ; i < data.length;i++){
			            		$('.ResultatSearch').append('<div class="thisUserSearch"><p>'+ data[i].username +'</p><div><img src=' + data[i].profil + '></div></div>')
			            	}
			            }
			        }
		        });
				$('input[type="text"]').val('');
			});
		},
		byUsername : function(){
			$('.searchUserByUsername').click(function(e){
				e.preventDefault();
				$.ajax({
		           type: "POST",
		           url: "/searchByUsername",
		           data: {data:$('input[name="searchUsername"]').val(), dataCookie:localStorage.getItem('noyzCookie')}, 
		           success: function(data){
		           	$('.ResultatSearch .thisUserSearch').remove();
			           if(typeof data != 'string'){
			            	for(var i = 0 ; i < data.length;i++){
			            		$('.ResultatSearch').append('<div class="thisUserSearch"><p style="text-align:center">'+ data[i].username +'</p><div><img  class="profilUserSearch" src=' + data[i].profil + '><div></div></div></div>')
			            	}
			            }else{
			            	$('.ResultatSearch').append('<p class="noUserFound" style="text-align:center">Aucun utilisateur n\'a été trouvée</p>');
			            	setTimeout(function(){
			            		$('p.noUserFound').remove();
			            	}, 1500)
			            }
			        }
		        });
				$('input[type="text"]').val('');
			});
		}
	}
	window.searchLibrary = searchLibrary;
});
