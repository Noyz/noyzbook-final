$(document).ready(function(){

	var accueilLibrary = {
		userData: null,
		allUsers:null,
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
		createListMessage: function(){
			var that = this;
			var html = [];
			$.ajax({
				type:"POST",
				url:"/loadProfil",
				data: {data:localStorage.getItem('noyzCookie')},
				success: function(data){
					that.userData = data;
					if(data.actualUserInfo[0].messagePublic != undefined){
						for(var i = 0; i < data.actualUserInfo[0].messagePublic.length; i++){
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
									var li = '<li><div class="articleUser quart'+[i]+'"><img src="img/anonymous.jpg" class="senderImg"/><p class="senderIdentity">' + data.actualUserInfo[0].username +'</p><div class="clearfix"></div><p class="messages">Ecrit par :'+ data.actualUserInfo[0].messagePublic[i][0] +'</p><p class="publishingDate">Envoyé le : '+ data.actualUserInfo[0].messagePublic[i][1]+' <div class="articleModification glyphicon glyphicon-trash"></div><div class="articleModification glyphicon glyphicon-pencil"></div><p class="deleteThisMessage">Etes-vous certains de vouloir effacer ce message? : <a class="acceptDelete">oui</a> / <a class="cancelDelete">non</a></p></p></div><div class="editThisMessage"><form class="editMessagePublicForm"><textarea></textarea><button style="margin-top:10px; margin-right:15px" type="submit" class="accepterModification btn btn-success">Accepter modification</button><button type="submit" style="margin-top:10px" class="cancelModification btn btn-success">Annuler</button></form></div></div></li>'
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
		editMessage : function(data){
			var objEdit = {};
			window.editionLibrary.setTinymceUpdate();
			$('.glyphicon-pencil').closest('ul').find('li').each(function(x){
				tinymce.editors[x].execCommand('mceInsertContent', false, data.actualUserInfo[0].messagePublic[x][0]);
			});
			$('.glyphicon-pencil').on('click', function(){
				var that = $(this);
				objEdit.userName = $(this).closest('li').find('.senderIdentity').text();
				objEdit.content = $(this).closest('li').find('.messages').siblings('p').text();
				objEdit.date = $(this).closest('li').find('.publishingDate').text();
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
							objEdit.contentUpdate = tinymce.editors[nbr].getContent();
							$.ajax({
								type:"POST",
								url:"/updateMessagePublic",
								data: {dataCookie:localStorage.getItem('noyzCookie'), messageUpdate : objEdit.contentUpdate, positionInBd:nbr},
								success: function(data){
									$('.accepterModification, .cancelModification').hide();
									that.closest('li').find(".editMessagePublicForm").after('<p class="statutUpdate">Message mis à jour.</p>');
									setTimeout(function(){
										window.location.href = "http://localhost:5000/accueil";
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
				that.closest('li').find(".deleteThisMessage").show(500);
				$('.cancelDelete').click(function(){
					that.closest('li').find(".deleteThisMessage").hide();
				});
				$('.acceptDelete').click(function(){
					var nbr = parseInt(that.closest('li').find('.articleUser').attr('class').substr(17));
					$.ajax({
						type:"POST",
						url:"/deleteMessagePublic",
						data: {dataCookie:localStorage.getItem('noyzCookie'), positionInBd:nbr},
						success: function(data){
							console.log(data[0]);
			           }
					});
				});
			});
		}
	}
	window.accueilLibrary = accueilLibrary;
});