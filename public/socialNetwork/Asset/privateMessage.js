$(document).ready(function(){

	var privateMessageLibrary = {
		userData: [],
		userDestinataire:null,
		clickedUsername:null,
		setContactList : function(){
			var that = this;
			$.ajax({
				type:"POST",
				url:"/loadContactPrivateMessageList",
				data: {data:localStorage.getItem('noyzCookie')},
				success: function(data){
					that.userData.push(data);
					that.handleList(data);
	           }
			});
		},
		handleList : function(data){
			var that = this;
			var html = [];
			if(data.privateMessages != undefined){
			var nameContact = Object.keys(data.privateMessages);
				that.displayContact(nameContact, data);
			}else{
				console.log('je n\'affiche pas la liste')
				var li = '<li><div>Vous n\'avez pas de message.<br> Rendez-vous sur la <a href="listFriends">liste d\'amis</a> afin d\'envoyer un message à un de vos amis.</div></li>';
				html.push(li);
				html = html.join('\n');
				$('ul.containerContact').append(html);
			}
		},
		displayContact : function(nameContact, data){
			var that = this;
			var html = [];
			for(var i = 0;i < nameContact.length;i++){
				$('.contactPM select').append('<option value="'+ nameContact[i] +'">'+ nameContact[i]+ '</option>')
				var li = '<li><div class="thisContactPM">'+ nameContact[i] +'</div><div class="thisImageContactPM"></div></li>';
				html.push(li);
			}
				html = html.join('\n');
				// $('ul.containerContact').append(html);
				that.displayMessageContact(nameContact);
		},
		displayMessageContact:function(data){
			var that = this;
			$('.contactPM select').on('blur change', function(){
				$('.redactionPM').text('Votre historique de conversation avec : ');
				that.userDestinataire = $(this).val();
				$.ajax({
					type:"POST",
					data: {expediteur:localStorage.getItem('noyzCookie'), receveur:that.userDestinataire},
					url:"/createPrivateMessage",
					success: function(data){
						// that.handleList(data);
		           	}
				});
				$('.containerPrivateMessage li').remove();
				var html = []; 
				that.clickedUsername = data;
				for(var i = 0;i < data.length;i++){
					if($(this).val() == data[i]){
						for(var j = 0; j < that.userData[0].privateMessages[data[i]].length;j++){
							if(that.userData[0].privateMessages[data[i]][j][2] == $('.navbar-brand').text().substr(20)){
								var li  = '<li><div class="usernameContactPM">'+ that.userData[0].privateMessages[data[i]][j][2]  +' :</div><div class="thisMessageContactPM">'+ that.userData[0].privateMessages[data[i]][j][0] +'</div><div>Envoyé le : '+ that.userData[0].privateMessages[data[i]][j][1] +'</div></li>';
								html.push(li);
							}else{
								var li  = '<li class="goRight"><div class="usernameContactPM">'+ that.userData[0].privateMessages[data[i]][j][2]  +' :</div><div class="thisMessageContactPM">'+ that.userData[0].privateMessages[data[i]][j][0] +'</div><div>Envoyé le : '+ that.userData[0].privateMessages[data[i]][j][1] +'</div></li>';
								html.push(li);
							}
						}
					}
				}
				html = html.join('\n');
				$('ul.containerPrivateMessage').append(html);
				$('.redactionPM').text($('.redactionPM').text() + that.userDestinataire)
				that.sendPrivateMessageOnOwnPage();
			});
		},
		sendPrivateMessage:function(){
			var that = this;
			$('.btnPrivateMessage').click(function(event){
				event.preventDefault();
				that.userData[0].message = tinyMCE.activeEditor.getContent();		// contenu du message
				$.ajax({
					type:"POST",
					data: that.userData[0],
					url:"/sendPrivateMessage",
					success: function(data){
						window.location.href = 'http://noyzbook.herokuapp.com/privateMessage'
		           	}
				});
			});
		},
		sendPrivateMessageOnOwnPage:function(){
			var that = this;
			$('.privateMessagesPageEditorForm').submit(function(event){
				event.preventDefault();
				that.userData[0].message = tinyMCE.activeEditor.getContent();
				$.ajax({
					type:"POST",
					data: that.userData[0],
					url:"/sendPrivateMessage",
					success: function(data){
						$('.containerPrivateMessage li').remove();
						var html = [];
						for(var i = 0;i < data[that.userDestinataire].length;i++){
							if(that.userDestinataire == that.clickedUsername[i]){
								for(var j = 0; j < data[that.clickedUsername[i]].length;j++){
									if(data[that.clickedUsername[i]][j][2] == $('.navbar-brand').text().substr(20)){
										var li  = '<li><div class="usernameContactPM">'+ data[that.clickedUsername[i]][j][2]  +' :</div><div class="thisMessageContactPM">'+ data[that.clickedUsername[i]][j][0] +'</div><div>Envoyé le : '+ data[that.clickedUsername[i]][j][1] +'</div></li>';
										html.push(li);
									}else{
										var li  = '<li class="goRight"><div class="usernameContactPM">'+ data[that.clickedUsername[i]][j][2]  +' :</div><div class="thisMessageContactPM">'+ data[that.clickedUsername[i]][j][0] +'</div><div>Envoyé le : '+ data[that.clickedUsername[i]][j][1] +'</div></li>';
										html.push(li);
									}
								}
							}
						}
						html = html.join('\n');
						$('ul.containerPrivateMessage').append(html);
						tinyMCE.activeEditor.dom.remove(tinyMCE.activeEditor.dom.select('p'));
					}	
				});
			});
		}
	}
	window.privateMessageLibrary = privateMessageLibrary;


});