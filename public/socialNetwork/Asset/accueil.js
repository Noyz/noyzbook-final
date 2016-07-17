$(document).ready(function(){

	var accueilLibrary = {
		userData: null,
		allUsers:null,
		message:{},
		oneId : 0,
		setUserName : function(){
			var that = this;
			var changeContent = function(obj){
				$('.navbar-text strong').after('<img src='+ obj.actualUserInfo[0].profil +' class="titleImg"/>').text($('.navbar-text strong').text() + obj.actualUserInfo[0].username);
				$('.profilImg').attr('src', obj.actualUserInfo[0].profil);
				that.allUsers = obj;

				window.accueilLibrary.changeProfilPicture();
			};
			$.ajax({
				type:"POST",
				url:"/loadProfil",
				data: {data:localStorage.getItem('noyzCookie')},
				success: function(data){
					that.userData = data;
	                changeContent(data);
	           }
			});
		},
		page_name:function(){
			var url = window.location.href;
			var pageName = url.substr(22, 34);
			$('#actionBar p').after(pageName);
		},
		togglePublic:function(){
			$('.edit').on('click', function(e){
				e.preventDefault();
				$('.newMessageWallEdit').toggle('slow');
			});
		},
		createListMessage: function(){
			// console.log('hit')
			var that = this;
			var html = [];
			$.ajax({
				type:"POST",
				url:"/loadProfil",
				data: {data:localStorage.getItem('noyzCookie')},
				success: function(data){
					that.userData = data;
					if(data.actualUserInfo[0].messagePublic != undefined){
						for(var i = data.actualUserInfo[0].messagePublic.length - 1; i >= 0; i--){
							console.log(data.actualUserInfo[0].messagePublic)
							if(data.actualUserInfo[0].messagePublic[i][2] != undefined){ // si une deuxième propriete au tableau existe "cad : nom"
								// Parcours le tableau de tout les utilisateurs et retourne un tableau avec les données des utilsiateurs concernées;
								var otherUserName = data.actualUserInfo[0].messagePublic[i][2];
								for(var j = 0;j < data.everyUser.length;j++){
									if(otherUserName == data.everyUser[j].username){
										var li = '<li><div class="articleUser"><img src='+ data.everyUser[j].profil +' class="senderImg"/><p class="senderIdentity">' + data.actualUserInfo[0].messagePublic[i][2] +'</p><p class="messages">'+ data.actualUserInfo[0].messagePublic[i][0] +'</p><p class="publishingDate">Envoyé le : '+ data.actualUserInfo[0].messagePublic[i][1]+'</p></div></li>'
									}
								}
							}else{
								if(data.actualUserInfo[0].messagePublic[i] != undefined){
									var li = '<li><div class="articleUser quart'+[i]+'"><img src='+ data.actualUserInfo[0].profil +' class="senderImg"/><p class="senderIdentity">' + data.actualUserInfo[0].username +'</p><div class="clearfix"></div><div class="messages">'+ data.actualUserInfo[0].messagePublic[i][0] +'</div><p class="publishingDate">Envoyé le : '+ data.actualUserInfo[0].messagePublic[i][1]+' <div class="articleModification glyphicon glyphicon-trash"></div><div class="articleModification glyphicon glyphicon-pencil"></div><p class="deleteThisMessage">Etes-vous certains de vouloir effacer ce message? : <a class="acceptDelete">oui</a> / <a class="cancelDelete">non</a></p></p></div><div class="editThisMessage"><form class="editMessagePublicForm"><textarea></textarea><button style="margin-top:10px; margin-right:15px" type="submit" class="accepterModification btn btn-success">Accepter modification</button><button type="submit" style="margin-top:10px" class="cancelModification btn btn-success">Annuler</button></form></div></div></li>'
								}
							}
							html.push(li);	
						}
					};
				html = html.join('\n');
				$('ul.messageContainer').append(html);
				that.editMessage(data);
				that.deleteMessage(data);
		        }
			});
		},
		sendMessagePublic: function(){
			var that = this;
			$('.publicMessage').on('click', function(){
				$.ajax({
					type:"POST",
					data:{dataCookie:localStorage.getItem('noyzCookie'), message : tinymce.editors[0].getContent()},
					url:"/sendMessage",
					success: function(data){
						$('.messageContainer li').remove();
						that.editMessage(data);
						that.createListMessage();
						setTimeout(function(){
							tinymce.editors[0].setContent('');
						}, 500);
					}
				});
			});
		},
		editMessage : function(data){
			var objEdit = {};
			window.editionLibrary.setTinymceUpdate();
			$('.glyphicon-pencil').on('click', function(e){
				var that = $(this);
				objEdit.mceId = $(this).closest('li').find('textarea').attr('id');
				objEdit.userName = $(this).closest('li').find('.senderIdentity').text();
				objEdit.content = $(this).closest('li').find('.messages').text();
				objEdit.date = $(this).closest('li').find('.publishingDate').text();
				tinyMCE.get(objEdit.mceId).execCommand('mceInsertContent', false, objEdit.content);
				$.ajax({
					type:"POST",
					url:"/editMessagePublic",
					data: {dataCookie:localStorage.getItem('noyzCookie'), messagePublic : objEdit},
					success: function(data){
						window.editionLibrary.setTinymceUpdate();
						that.closest('li').find(".editThisMessage").animate({height: that.closest('li').find(".editThisMessage").get(0).scrollHeight}, 1000 );
						$('.cancelModification').on('click', function(e){
							e.preventDefault();
							that.closest('li').find(".editThisMessage").animate({height:0}, 1000);
						});
						$('.accepterModification').on('click', function(e){
							e.preventDefault();
							var nbr = parseInt(that.closest('li').find('.articleUser').attr('class').substr(17));
							var n2  = nbr +1;
							objEdit.contentUpdate = tinyMCE.get(objEdit.mceId).getContent();
							$.ajax({
								type:"POST",
								url:"/updateMessagePublic",
								data: {dataCookie:localStorage.getItem('noyzCookie'), messageUpdate : objEdit.contentUpdate, positionInBd:nbr},
								success: function(data){
									$('.accepterModification, .cancelModification').hide();
									that.closest('li').find(".editMessagePublicForm").after('<p class="statutUpdate">Message mis à jour.</p>');
									setTimeout(function(){
										$('.messageContainer li').remove();
										window.accueilLibrary.createListMessage();
									}, 1000);
					           }
							});
						});
		            }
				});
			});
		},
		deleteMessage : function(){
			$('.glyphicon-trash').on('click', function(){
				var that = $(this);
				that.closest('li').find(".deleteThisMessageAdmin").show(500);
				$('.cancelDelete').click(function(){
					that.closest('li').find(".deleteThisMessageAdmin").show(500);
				});
				$('.acceptDelete').click(function(){
					var nbr = parseInt(that.closest('li').find('.articleUser').attr('class').substr(17));
					$.ajax({
						type:"POST",
						url:"/deleteMessagePublic",
						data: {dataCookie:localStorage.getItem('noyzCookie'), positionInBd:nbr},
						success: function(data){
							$('.messageContainer li').remove();
							window.accueilLibrary.createListMessage();
							window.accueilLibrary.editMessage(data);
							tinymce.editors[0].execCommand('mceInsertContent', false,'');
			           }
					});
				});
			});
		}
	}
	window.accueilLibrary = accueilLibrary;
});