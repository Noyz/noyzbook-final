$(document).ready(function(){
	var adminLibrary = {
		allUser:[],
		thisUser:null,
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
			$('.containersMembers').show()
			$('.membersShortcut').show();
			$('.navbarAdmin').show();
		},
		membersManagement:function(){
			var that = this;
			$('.membersShortcut').click(function(){
				$('.containerFormProfil').hide();
				$('.containerMembers').contents().remove();
				$.ajax({
					type:"POST",
					url:"/getMembers",
					data: {},
					success: function(data){
						that.allUser.push(data);
		             	for(var i = 0; i < data.length;i++){
		             		$('.containerMembers').append('<div class="thisMember"><p>'+data[i].username+'</p><div class="traitement"><a class="checkProfil">Gérer messages publiques</a><a class="checkInformation">Gérer ses informations personnel<a class="checkRelationShip">Gérer les amitiés</a><a class="deleteProfil">Supprimer profil</a></div></div>');
		             	}
		             	that.checkProfil();
		             	that.checkInformation();
		             	that.checkRelation();
		            }
				});
			});
		},
		checkRelation:function(){
			var that = this;
			$('.checkRelationShip').click(function(){
				var thisUser = null;
				thisUser = $(this).closest('.thisMember').find('p').text();
				$.ajax({
					type:"POST",
					url:"/getFriendsListsAdmin",
					data: {name:thisUser},
					success: function(data){
						$('.containerMembers').contents().remove()
						for(var i = 0;i < data.length;i++){
							if(data[0].amis[i] != undefined){
								$('.containerMembers').prepend('<p class="addFriendAdmin">Lui ajouter un ami</p>');
								$('.containerMembers').append('<div class="thisFriendAdmin"><div>' + data[0].amis[i] +'</div><div><button class="btn btn-danger">Supprimer</button></div></div>');
								
							}else{
								$('.containerMembers').prepend('<p class="addFriendAdmin">Lui ajouter un ami</p>');
								$('.containerMembers').append('<div>Ce contact n\'a de contact avec personne.</div>');
							}
						}
		            }
				});
			});
		},
		addFriendAdmin:function(){
			var that = this;
			$('.addFriendAdmin').click(function(){
				var thisUser = null;
				thisUser = $(this).closest('.thisMember').find('p').text();
				$.ajax({
					type:"POST",
					url:"/getFriendsListsAdmin",
					data: {name:thisUser},
					success: function(data){
						$('.containerMembers').contents().remove()
						for(var i = 0;i < data.length;i++){
							if(data[0].amis[i] != undefined){
								$('.containerMembers').prepend('<p class="addFriendAdmin">Lui ajouter un ami</p>');
								$('.containerMembers').append('<div class="thisFriendAdmin"><div>' + data[0].amis[i] +'</div><div><button class="btn btn-danger">Supprimer</button></div></div>');
								
							}else{
								$('.containerMembers').prepend('<p class="addFriendAdmin">Lui ajouter un ami</p>');
								$('.containerMembers').append('<div>Ce contact n\'a de contact avec personne.</div>');
							}
						}
		            }
				});
			});
		},
		getInfo:function(){
			var that = this;
			$('.containerMembers').contents().remove()
			$.ajax({
				type:"POST",
				url:"/getMembers",
				data: {},
				success: function(data){
					that.allUser.push(data);
	             	for(var i = 0; i < data.length;i++){
	             		$('.containerMembers').append('<div class="thisMember"><p>'+data[i].username+'</p><div class="traitement"><a class="checkProfil">Gérer messages publiques</a><a class="checkInformation">Gérer ses informations personnel<a class="checkRelationShip">Gérer les amitiés</a><a class="deleteProfil">Supprimer profil</a></div></div>');
	             	}
	             	that.checkProfil();
	             	
	            }
			});
		},
		checkProfil:function(){
			var that = this;
			$('.checkProfil').click(function(){
				var thisUser = null;
				thisUser = $(this).closest('.thisMember').find('p').text();
				that.thisUser = $(this).closest('.thisMember').find('p').text();
				$.ajax({
					type:"POST",
					url:"/getMessagePublic",
					data: {name:thisUser},
					success: function(data){
						console.log(data[0].messagePublic)
						if(data[0].messagePublic != undefined){
							$('.containerMembers').find('.thisMember').hide();
							for(var i = 0; i < data[0].messagePublic.length;i++){
								console.log(data[0].messagePublic);
								$('.containerMembers').find('.noPublic').remove();
								if(data[0].messagePublic[i][2] != undefined){
									$('.containerMembers').append('<div class="thisPublicMessage" id="'+i+'"><p class="usernameAdminBlock">' + data[0].messagePublic[i][2] + '</p><div  class="messageAdminBlock">' + data[0].messagePublic[i][0] + '</div><p class="publishingDate">' + data[0].messagePublic[i][1] + '</p><div class="articleModification glyphicon glyphicon-trash"></div><div class="articleModification glyphicon glyphicon-pencil"></div><p class="deleteThisMessageAdmin">Etes-vous certains de vouloir effacer ce message? : <a class="acceptDelete">oui</a> / <a class="cancelDelete">non</a></p><div class="editThisMessageAdmin"><form class="editMessagePublicFormAdmin"><textarea></textarea><button style="margin-top:10px; margin-right:15px" type="submit" class="accepterModification btn btn-success">Accepter modification</button><button type="submit" style="margin-top:10px" class="cancelModification btn btn-success">Annuler</button></form></div></div>');
									that.thisUser = data[0].username;
								}else{
									$('.containerMembers').append('<div class="thisPublicMessage" id="'+i+'"><p class="usernameAdminBlock">' + data[0].username + '</p><div class="messageAdminBlock">'+ data[0].messagePublic[i][0] + '</div><p class="publishingDate">' + data[0].messagePublic[i][1] + '</p><div class="articleModification glyphicon glyphicon-trash"></div><div class="articleModification glyphicon glyphicon-pencil"></div><p class="deleteThisMessageAdmin">Etes-vous certains de vouloir effacer ce message? : <a class="acceptDelete">oui</a> / <a class="cancelDelete">non</a></p><div class="editThisMessageAdmin"><form class="editMessagePublicFormAdmin"><textarea></textarea><button style="margin-top:10px; margin-right:15px" type="submit" class="accepterModification btn btn-success">Accepter modification</button><button type="submit" style="margin-top:10px" class="cancelModification btn btn-success">Annuler</button></form></div></div>');
									that.thisUser = data[0].username;
								}
							}
						}else{
							$('.containerMembers').find('.thisMember').remove();
							$('.containerMembers').find('.noPublic').remove();
							$('.containerMembers').append('<div class="noPublic">L\'utilisateur ne possède aucun message public</div>');
						}
						that.editMessagePublicAdmin();
						that.deleteMessageAdmin(thisUser);
						window.editionLibrary.setTinymceUpdate();
		            }
				});
			});
		},
		editMessagePublicAdmin : function(data){
			var _this = this;
			var objEdit = {};
			$('.glyphicon-pencil').on('click', function(e){
				$(this).closest('.thisPublicMessage').find('.editThisMessageAdmin').toggle('slow');
				var that = $(this);
				objEdit.mceId = $(this).siblings('.editThisMessageAdmin').find('textarea').attr('id')
				objEdit.userName = $(this).closest('.thisPublicMessage').find('.usernameAdminBlock').text();
				objEdit.content = $(this).closest('.thisPublicMessage').find('.messageAdminBlock').text();
				objEdit.date = $(this).closest('.thisPublicMessage').find('.publishingDate').text();
				$.ajax({
					type:"POST",
					data: {data:objEdit, name:objEdit.userName},
					url:"/editMessagePublicAdmin",
					success: function(data){
						tinyMCE.get(objEdit.mceId).setContent('');
						tinyMCE.get(objEdit.mceId).execCommand('mceInsertContent', false, objEdit.content);
						$('.cancelModification').on('click', function(e){
							e.preventDefault();
							that.closest('.thisPublicMessage').find('.editThisMessageAdmin').hide('slow');
						});
						$('.accepterModification').on('click', function(e){
							e.preventDefault();
							var nbr = parseInt(that.closest('.thisPublicMessage').attr('id'));
							var n2  = nbr +1;
							objEdit.contentUpdate = tinyMCE.get(objEdit.mceId).getContent();
							$.ajax({
								type:"POST",
								url:"/updateMessagePublicAdmin",
								data: {messageUpdate : objEdit.contentUpdate, positionInBd:nbr, name:_this.thisUser},
								success: function(data){
									$('.accepterModification, .cancelModification').hide();
									that.closest('li').find(".editMessagePublicForm").after('<p class="statutUpdate">Message mis à jour.</p>');
									console.log('contact mis à jour');
									$('.containerMembers div').remove();
									_this.getInfo();

					           }
							});
						});
					}
				});
			});
		},
		deleteMessageAdmin : function(data){
			var that = this;
			$('.glyphicon-trash').on('click', function(){
				console.log(that)
				$(this).closest('.thisPublicMessage').find('.deleteThisMessageAdmin').show(500);
				$('.cancelDelete').click(function(){
					$(this).closest('.thisPublicMessage').find('.deleteThisMessageAdmin').hide();
				});
				$('.acceptDelete').click(function(){
					var nbr = parseInt($(this).closest('.thisPublicMessage').attr('id'));
					$.ajax({
						type:"POST",
						url:"/deleteMessagePublicAdmin",
						data: {dataCookie:localStorage.getItem('noyzCookie'), positionInBd:nbr, name:data},
						success: function(data){
							$('.containerMembers div').remove();
							that.getInfo();
			           }
					});
				});
			});
		},
		checkInformation:function(){
			var that = this;
			$('.checkInformation').click(function(){
				var thisUser = null;
				thisUser = $(this).closest('.thisMember').find('p').text();
				that.thisUser = $(this).closest('.thisMember').find('p').text();
				$.ajax({
					type:"POST",
					url:"/chechInformationUserAdmin",
					data: {name:thisUser},
					success: function(toFill){
						$('.containerMembers div').remove();
						$('.containerFormProfil').show();
						var infoContact = Object.keys(toFill);
						var infoName = ['nom', 'prenom', 'mail', 'age', 'genre', 'adressePostal'];
						for( x in infoContact){
							if($('input[name="'+ infoContact[x] +'"]').val() == '' && toFill[infoContact[x]][infoName[x]] != ''){
								$('input[name="'+ infoContact[x] +'"]').val(toFill[infoContact[x]][infoName[x]]); 
							}
						}
						$('#updateProfil').on('submit', function(e){
							e.preventDefault();
							$.ajax({
								url:"/updateProfilInfoAdmin",
								type:"POST",
								data:{nameUpdate:$('input[name="nameUpdate"]').val(), prenomUpdate : $('input[name="prenomUpdate"]').val(), mailUpdate : $('input[name="mailUpdate"]').val(), ageUpdate : $('input[name="ageUpdate"]').val(), gender:$('.gender').val(), adresseUpdate : $('input[name="adressePostal"]').val(), name:thisUser},
								success: function(data){
									$('.errorUpdate').show();
									setTimeout(function(){
										$('.errorUpdate').fadeOut(1000);
									}, 1000);
					            }
							});
						});	
						var verificationChampsPassword = function(){
							var objPassword = {};
							if($('input[name="currentPassword"]').val() == ''){
								$('.errorFieldCurrentPassword').text('Impossible de modifier le mot de passe car le champs est vide.');
							}else{
								$('.errorFieldCurrentPassword').text('');
								$.ajax({
									url:"/updatePasswordAdmin",
									type:"POST",
									data:{passwordToChange : $('input[name="currentPassword"]').val(), name : that.thisUser},
									success: function(data){
										$('.errorUpdatePassword').show();
										setTimeout(function(){
											$('.errorUpdatePassword').fadeOut(1000);
										}, 1000);
						            }
								});	
							}
						}
						$('#updatePasswordForm').on('submit', function(e){
								e.preventDefault();
								verificationChampsPassword();
						});
			        }
				});
			});
		}
	};
	window.adminLibrary = adminLibrary;
});