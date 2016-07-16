$(document).ready(function(){
	var adminLibrary = {
		allUser:[],
		connectForm:function(){
			var that = this;
			$('.btnConnectAdmin').on('click', function(){
				$.ajax({
					type:"POST",
					url:"/verificationConnexionAdmin",
					data: {username:$('.usernameAdmin').val(), password:$('.passwordAdmin').val()},
					success: function(data){
						
		             	if(parseInt(data) > 0){
		             		that.adminHandler();
							
		             	}else{
		             		console.log('recommencer');
		             	}
		            }
				});
			});
		},
		adminHandler:function(){
			$('.formAdmin').hide();
		},
		membersManagement:function(){
			var that = this;
			$('.membersShortcut').click(function(){
				$.ajax({
					type:"POST",
					url:"/getMembers",
					data: {},
					success: function(data){
						that.allUser.push(data);
		             	for(var i = 0; i < data.length;i++){
		             		$('.containerMembers').append('<div class="thisMember"><p>'+data[i].username+'</p><div class="traitement"><a class="checkProfil">Consulter ses informations</a><a class="checkPublicMessage">Consulter / modifier ses messages Public</a><a class="deleteProfil">Supprimer profil</a></div></div>');
		             	}
		             	that.checkProfil();
		            }
				});
			});
		},
		checkProfil:function(){
			var that = this;
			$('.checkProfil').click(function(){
				var thisUser = null;
				thisUser = $(this).closest('.thisMember').find('p').text();
				for(var i = 0; i < that.allUser.length;i++){
					if(that.allUser[0][i].username == thisUser){
						console.log(that.allUser[0][i].username);
					}
				}
			});
		},
	};
	window.adminLibrary = adminLibrary;
});