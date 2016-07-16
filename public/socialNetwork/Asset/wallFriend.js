$(document).ready(function(){
	var setMessageOnFriendWall = {
		userData: null,
		arrayMessage : [],
		info : null,
		setMessagePublicFriend : function(){
		var that = this;
		setTimeout(function(){
			$('.editFriendWallMessage').text($('.editFriendWallMessage').text() + ' : ' + that.info);
		}, 500)
			$.ajax({
				type:"POST",
				url:"/loadMessageFriend",
				data: {data:localStorage.getItem('noyzCookie')},
				success: function(obj){
	             that.createListMessageFriend(obj);
	             that.info = obj.actualUserInfo[0].username;
	            }
			});
		},
		createListMessageFriend: function(data){
			var that = this;
			var html = [];
			for(var i = data.actualUserInfo[0].messagePublic.length -1; i >= 0; i--){
				if(data.actualUserInfo[0].messagePublic[i][2] != undefined){
					var otherUser = data.actualUserInfo[0].messagePublic[i][2];
					for(var j = 0;j < data.everyUser.length;j++){
						if(otherUser == data.everyUser[j].username){
							if(data.everyUser[j].username == $('.navbar-brand').text().substr(20)){
								var li = '<li><div class="articleUser articleFriend line'+[i]+'"><img src='+ data.everyUser[j].profil +' class="senderImg"/><p class="senderIdentity">' + data.actualUserInfo[0].messagePublic[i][2] +'</p><p class="messages">'+ data.actualUserInfo[0].messagePublic[i][0] +'</p><p class="publishingDate">Envoyé le : '+ data.actualUserInfo[0].messagePublic[i][1]+'</p><div class="articleModification glyphicon glyphicon-trash"></div><p class="deleteThisMessage">Etes-vous certains de vouloir effacer votre message? : <a class="acceptDelete">oui</a> / <a class="cancelDelete">non</a></p></p></div><div class="editThisMessage"><form class="editMessagePublicForm"><textarea></textarea><button style="margin-top:10px; margin-right:15px" type="submit" class="accepterModification btn btn-success">Accepter modification</button><button type="submit" style="margin-top:10px" class="cancelModification btn btn-success">Annuler</button></form></div></div></li>'
							}else{
								var li = '<li><div class="articleUser articleFriend line'+[i]+'"><img src='+ data.everyUser[j].profil +' class="senderImg"/><p class="senderIdentity">' + data.actualUserInfo[0].messagePublic[i][2] +'</p><p class="messages">'+ data.actualUserInfo[0].messagePublic[i][0] +'</p><p class="publishingDate">Envoyé le : '+ data.actualUserInfo[0].messagePublic[i][1]+'</p>'
							}
						}
					}
				}else{
					if(data.actualUserInfo[0].messagePublic[i] != undefined){
						var li = '<li><div class="articleUser articleFriend line'+[i]+'"><img src='+ data.actualUserInfo[0].profil +' class="senderImg"/><p class="senderIdentity">' + data.actualUserInfo[0].username +'</p><p class="messages">'+ data.actualUserInfo[0].messagePublic[i][0] +'</p><p class="publishingDate">Envoyé le : '+ data.actualUserInfo[0].messagePublic[i][1]+'</p></div></li>'
					}
				}
				html.push(li);	
			}
			html = html.join('\n');
			$('.containerMessageFriend').append(html);
			that.deleteMessage();
			that.createMessagePublicFriend();
		},
		createMessagePublicFriend : function(){
			var that = this;
			$('.editFriendWallMessage').on('click', function(){
				$('.formMessagePublicFriend').toggle('slow');
			});
			$('.buttonPublicWallFriend').on('click', function(e){
				e.preventDefault();
				tinyMCE.get('mce_0').getContent()	
				$.ajax({
					type:"POST",
					data:{message:tinyMCE.activeEditor.getContent(), receveur: that.info,dataCookie:localStorage.getItem('noyzCookie')},
					url:"/sendMessageToFriend",
					success: function(data){
						$.ajax({
							type:"POST",
							data:{message:tinyMCE.activeEditor.getContent(), dataCookie:localStorage.getItem('noyzCookie'), name:that.info},
							url:"/loadWallFriend",
							success: function(data){
								$('.containerMessageFriend li').remove();
								console.log(data)
								that.setMessagePublicFriend(data);
							}
						})
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
					var nbr = parseInt(that.closest('li').find('.articleUser').attr('class').substr(30));
					$.ajax({
						type:"POST",
						url:"/deleteMessagePublicOnFriend",
						data: {dataCookie:localStorage.getItem('noyzCookie'), positionInBd:nbr},
						success: function(data){
							console.log(data[0]);
			           }
					});
				});
			});
		}
	};
	window.setMessageOnFriendWall = setMessageOnFriendWall;
});