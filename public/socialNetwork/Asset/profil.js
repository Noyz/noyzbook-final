$(document).ready(function(){
	var profilLibrary = {
		arrayInfo : [],
		autoFilling : function(){
			var that = this;
			$.ajax({
				url:"/autoFillingRequest",
				type:"POST",
				data:{nameUpdate:$('input[name="nameUpdate"]').val(), prenomUpdate : $('input[name="prenomUpdate"]').val(), mailUpdate : $('input[name="mailUpdate"]').val(), ageUpdate : $('input[name="ageUpdate"]').val(), genre:$('.gender').val(), adresseUpdate : $('input[name="adressePostal"]').val(), dataCookie:localStorage.getItem('noyzCookie')},
				success: function(toFill){
					that.autoFillingFonction(toFill);	
	            }
			});
			$.ajax({
				url:"/autoFillingPicture",
				type:"POST",
				data:{dataCookie:localStorage.getItem('noyzCookie')},
				success: function(data){
					console.log(data)
					$('.profilImg').attr('src', data.profil);
	            }
			});
		},
		autoFillingFonction : function(toFill){
			var infoContact = Object.keys(toFill);
			var infoName = ['nom', 'prenom', 'mail', 'age', 'genre', 'adressePostal'];
			for( x in infoContact){
				if($('input[name="'+ infoContact[x] +'"]').val() == '' && toFill[infoContact[x]][infoName[x]] != ''){
					$('input[name="'+ infoContact[x] +'"]').val(toFill[infoContact[x]][infoName[x]]); 
				}
			}
		},
		updateInformation : function(){
			$('#updateProfil').on('submit', function(e){
				e.preventDefault();
				$.ajax({
					url:"/updateProfilInfo",
					type:"POST",
					data:{nameUpdate:$('input[name="nameUpdate"]').val(), prenomUpdate : $('input[name="prenomUpdate"]').val(), mailUpdate : $('input[name="mailUpdate"]').val(), ageUpdate : $('input[name="ageUpdate"]').val(), gender:$('.gender').val(), adresseUpdate : $('input[name="adressePostal"]').val(), dataCookie:localStorage.getItem('noyzCookie')},
					success: function(data){
							$('.errorUpdate').show();
						setTimeout(function(){
							$('.errorUpdate').fadeOut(1000);
						}, 1000);
		            }
				});
			});
		},
		updateProfilPicture : function(){
			$('.formImgProfil').on('submit', function(event){
				  $.ajax({
					url:"/loadProfilPicture",
					type:"POST",
					data:{data:localStorage.getItem('noyzCookie')},
					success: function(data){
						$('.imgProfil').attr('src', data.profil);
		 				window.location.href = 'http://localhost:3000/accueil'
		            }
				});
			});
		},
		updatePassword : function(){
			var that = this;
			$('#updatePasswordForm').on('submit', function(e){
				e.preventDefault();
				that.verificationChampsPassword();
			});
		},
		verificationChampsPassword : function(){
			var objPassword = {};
			if($('input[name="currentPassword"]').val() == ''){
				$('.errorFieldCurrentPassword').text('Le champs est vide');
			}else{
				$('.errorFieldCurrentPassword').text('');
				$.ajax({
					url:"/checkCurrentPassword",
					type:"POST",
					data:{passwordToCheck : $('input[name="currentPassword"]').val(), dataCookie : localStorage.getItem('noyzCookie')},
					success: function(data){
						objPassword.currentPassword = parseInt(data);
						if($('input[name="newPassword"]').val() == ''){
							$('.errorFieldNewPassword').text('Le champs est vide');
							objPassword.newPassword = -1;
						}else{
							if($('input[name="newPassword"]').val() == $('input[name="currentPassword"]').val()){
								$('.errorFieldNewPassword').text('Votre mot de passe est identique au précédent');
								objPassword.newPassword = -1;
							}else{
								$('.errorFieldNewPassword').text('');
								objPassword.newPassword = 1;
							}
						}
						if($('input[name="confirmPassword"]').val() == ''){
							$('.errorFieldConfirmPassword').text('Le champs est vide');
							objPassword.confirmPassword = -1;
						}else{
							if($('input[name="newPassword"]').val() != $('input[name="confirmPassword"]').val()){
								$('.errorFieldConfirmPassword').text('Le champs n\'est pas identiques au précédent');
								objPassword.confirmPassword = -1;
							}else{
								$('.errorFieldConfirmPassword').text('');
								objPassword.confirmPassword = 1;
							}
						}
						if(objPassword.currentPassword + objPassword.newPassword + objPassword.confirmPassword == 3 ){
							$.ajax({
								url:"/updatePassword",
								type:"POST",
								data:{passwordToChange: $('input[name="confirmPassword"]').val() , dataCookie:localStorage.getItem('noyzCookie')},
								success: function(data){
									console.log(data);
					            }
							});
							$('.errorUpdatePassword').show();
							setTimeout(function(){
								$('.errorUpdatePassword').fadeOut(1000);
							}, 1000);
						}else{
							//
						}
		            }
				});	
			}
		}
	};
	window.profilLibrary = profilLibrary;
});
