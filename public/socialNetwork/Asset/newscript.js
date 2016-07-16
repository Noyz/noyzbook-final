$(document).ready(function(){
	var user = {};
	/**** Vérification existanse cookie ****/
		if(location.pathname.length == 1){
			if(localStorage.getItem('noyzCookie')){
				window.location.href = 'http://localhost:5000/accueil';
			}else{
				user.pseudo = $('.navbar-brand').text().substr(20);
			}
		};
	/**** Gestion Local storage ****/
	$('.navbar-brand').click(function(){
		localStorage.removeItem('noyzCookie');
		window.location.href = 'http://localhost:5000';
	});

	/*** Page privateMessage ***/
		if(/administrateur/.test(window.location.pathname)){
			window.adminLibrary.connectForm();
			window.adminLibrary.membersManagement();
			$.ajax({
	           type: "POST",
	           url: "/connectAdmin", 
	           data:{}, 
	           success: function(data)
		           {	
		               console.log(data);
		           }
	         	});
		};
	/**** Main page Inscription / Connexion *****/
		$('.loginMain').click(function(){
			$('html, body').animate({
			   scrollTop: $('footer').offset().top
			}, 'slow');
			$('#login').fadeIn(700);
			$('#subscription').fadeOut(1000);
		});

		$('.subscriptionMain').click(function(){
			$('html, body').animate({
			   scrollTop: $('footer').offset().top
			}, 'slow');
			$('#login').fadeOut(1000);
			$('#subscription').fadeIn(700);
		});

		$('#formSub').on('submit', function(event){
		event.preventDefault();
          $.ajax({
           type: "POST",
           url: "/sub", 
           data: $('#formSub').serialize(), 
           success: function(data)
           {	
               fct_Inscription(data);
           }
         });
      });

		var fct_Inscription = function(data){
		$('.errorMessage').text('');
		$('.errorSub').css('display','block');
		if(localStorage.getItem('noyzCookie') == null){
			localStorage.setItem("noyzCookie", Math.random());
		}
		user.username = $('input[name="usernameSub"]').val();
		user.password = $('input[name="passwordSub"]').val();
		user.dataCookie = localStorage.getItem('noyzCookie');
		if(data  == 'error'){
			$('.errorSub').text('Ce compte existe déjà');
			$('.errorSub').css('color','red');
		}else{
			$('.errorSub').css('color','green');
			$('.errorSub').text('Bienvenue ! ');
			$.ajax({
	           type: "POST",
	           url: "/connexionToProfilSub", 
	           data: user, 
	           success: function(data)
		           {
		               window.location.href = 'http://localhost:5000/accueil';
		           }
	        });		
		}
	};

	$('#formLog').on('submit', function(event){
		event.preventDefault();
          $.ajax({
           type: "POST",
           url: "/connect", 
           data: $('#formLog').serialize(), 
           success: function(data)
           {
           	fct_Connexion(data);
           }
         });
     });

	var fct_Connexion = function(data){
		$('.errorLog').text('');
		$('.errorLog').css('display','block');
		if(localStorage.getItem('noyzCookie') == null){
			localStorage.setItem("noyzCookie", Math.random());
		}
		user.username = $('input[name="usernameLog"]').val();
		user.password = $('input[name="passwordLog"]').val();
		user.dataCookie = localStorage.getItem('noyzCookie');
		if(data == 'valid'){
			$('.errorLog').css('color','green');
			$('.errorLog').text('Bienvenue ! ');
				$.ajax({
		           type: "POST",
		           url: "/connexionToProfilLog",
		           data: user, 
		           success: function(data)
		           {
		             window.location.href = 'http://localhost:5000/accueil';
		           }
		        });
		}else{
			$('.errorLog').css('color','red');
			$('.errorLog').text('Ce compte n\'existe pas');
		}
	};

	$('.passwordLost').click(function(){
		$('#formLog').hide();
		$('#formPasswordLost').show();
	});


	$('.cancelReset').click(function(){
		$('#formLog').show();
		$('#formPasswordLost').hide();
	});
	$('.validReset').click(function(e){
		e.preventDefault();
		$.ajax({
           type: "POST",
           url: "/resetPassword",
           data: {data:$('input[name="mailPasswordLost"]').val()}, 
           success: function(data)
	           {
	             if(parseInt(data) > 0){
	             	$('.notificationMailOk').show();
	             	$('.notificationMailNOk').hide();
	             	setTimeout(function(){
	             		$('.notificationMailNok').hide();
	             		$('.notificationMailOk').hide();
	             	}, 2000)
	             }else{
	             	$('.notificationMailOk').hide();
	             	$('.notificationMailNok').show();
	             }
	           }
        });
	});
	/**** TOUTES LES PAGES ****/
	$.ajax({
       type: "POST",
       url: "/fetchName",
       data: {dataCookie:localStorage.getItem('noyzCookie')}, 
       success: function(obj){
       		if(location.pathname.length != 1 && location.pathname != "/administrateur"){
				$('.navbar-brand').text($('.navbar-brand').text() + ' ' +  obj[0].username);
				$('.navbar-brand').after('<img src="'+ obj[0].profil+'"/>')
       		}
       }
    });

	/**** PAGE ACCUEIL ****/
	if(/accueil/.test(window.location.pathname)){
		$('.accueilShortcut').css('color','#5cb85c');
		window.accueilLibrary.togglePublic();
		setTimeout(function(){
			window.accueilLibrary.createListMessage();
			window.accueilLibrary.sendMessagePublic();
		}, 800);		
	};
	/**** PAGE profil ****/
	if(/profil/.test(window.location.pathname)){
		$('.profilShortcut').css('color', '#5cb85c');
		window.profilLibrary.autoFilling();
		window.profilLibrary.updateInformation();
		window.profilLibrary.updatePassword();
		window.profilLibrary.updateProfilPicture();
	};

			/**** PAGE EDITION ****/
			if(/edition/.test(window.location.pathname)){
				window.editionLibrary.setTinymce();
				window.editionLibrary.createNewArticle();
			};
	/**** PAGE Notification ****/
	if(/notifications/.test(window.location.pathname)){
		$('.notificationsShortcut').css('color', '#5cb85c');
		window.setNotification.loadNotification();
	};		
	/**** PAGE list user ****/
	if(/listUsers/.test(window.location.pathname)){
		$('.listUsersShortcut').css('color', '#5cb85c');
		window.setListUsers.setList();
	};
	/**** PAGE list Friends ****/
	if(/listFriends/.test(window.location.pathname)){
		$('.listFriendsShortcut').css('color', '#5cb85c');
		window.setListFriends.setList();
	};
			/*** Page acces friends wall ***/
			if(/friendWall/.test(window.location.pathname)){
				window.editionLibrary.setTinymceUpdate();
				window.setMessageOnFriendWall.setMessagePublicFriend();
			};
			/*** Page writing on friend wall ***/
			if(/editionFriendWall/.test(window.location.pathname)){
				window.editionLibrary.editionWallFriend();
			};
			/*** Page privateMessage Editor ***/
			if(/privateMessageEditor/.test(window.location.pathname)){
				$('.privateMessagesShortcut').css('color', '#5cb85c');
				window.editionLibrary.setTinymce();
				window.privateMessageLibrary.setContactList();
				window.editionLibrary.editionPrivateMessage();
				window.privateMessageLibrary.sendPrivateMessage();
			};
			/*** Page privateMessage ***/
			if(/privateMessage/.test(window.location.pathname)){
				$('.privateMessagesShortcut').css('color', '#5cb85c');
				window.editionLibrary.setTinymceUpdate();
				window.privateMessageLibrary.setContactList();
				window.editionLibrary.editionPrivateMessage();
				window.privateMessageLibrary.sendPrivateMessage();
				window.privateMessageLibrary.createPrivateMessage();
			};
	/**** PAGE list Friends ****/
	if(/tchat/.test(window.location.pathname)){
		var objtSession = {};
		$('.tchatShortcut').css('color', '#5cb85c');
		var socket = io.connect("http://localhost:5000");


		var myname = $('.navbar-brand').text().substr(20);
				
				setTimeout(function(){
					myname = $('.navbar-brand').text().substr(20);
				}, 500);
		socket.on('askInfoUser', function(data){
			setTimeout(function(){
				socket.emit('new user', $('.navbar-brand').text().substr(20));
			}, 500);
		});	
		socket.on("displayOnlineContact", function(data){
			$('.containerOnline li').remove();
			var html = [];

			for(var i = 0; i < data.length;i++){
				var li = '<li>'+ data[i]+'</li>';
				html.push(li);
			}
			window.tchatLibrary.getFriendsList(data);
		});
		////////////////////////// YOUTUBE /////////////////

		socket.on('notificationInvitation', function(data){
			$('.chatWith').each(function(x){
				if($(this).find('a').text() == data){
					$(this).closest('li').find('.privateOneChat').attr('disabled','disabled');
					$(this).append('<div class="offer"><p class="accepterChat chatOffer">Accepter</p><p class="refuserChat chatOffer">Refuser</p></div>');
					gestionInvitationChatStatus(data);
				}
			});
		});

		var chatInvitation = function(){
			$('.privateOneChat').click(function(e){
				e.preventDefault();
				socket.emit("sendInvitation", {userClicked : $(this).closest('li').find('a').text(), currentUser : $('.navbar-brand').text().substr(20)})
				$(this).closest('li').append('<p id="invitationChatStatus">En attente de confirmation </p>');
				$(this).closest('li').find('.privateOneChat').attr('disabled','disabled');
			});
		};
		window.tchatLibrary.invitation = chatInvitation;

		var boutton = 0;
		var gestionInvitationChatStatus = function(data){
			$('.accepterChat').click(function(){
				$(this).closest('li').find('.offer').remove();
				socket.emit('inviteInRoom', data);
			});
			$('.refuserChat').click(function(){
				$(this).closest('li').find('.privateOneChat').attr('enabled','enabled').removeAttr('disabled', 'disabled');
				$(this).closest('li').find('.offer').remove();
				socket.emit('deniedChat', data);
			});
		};


		socket.on('chatOpen', function(data){
			$('.interactionChat').append('<button class="showHide btn btn-success">' + data.room +'</button>');
			$('#invitationChatStatus').remove();
			$('.startChat').after('<div class="userChat" id='+ data.room +'><p><span>Vous êtes en</span> discussion avec '+ data.room+'</p><div class="chatScreen"><div class="chatWindow"></div><form class="chatForm"><textarea class="chatBox" style="width:80%"></textarea><button type="submit" class="btn btn-success '+data.room+'">Envoyer</button></form></div></div>');
			$('.chatForm').submit(function(e){
				e.preventDefault();
					socket.emit("send message", {myName:myname, message: $('.chatBox').val(), room:$(this).find('button').attr('class').substr(16)});
				$('.chatBox').val('');
			});

		});
		socket.on("new message", function(data){

			$('.containerChat .chatWindow').each(function(x){
				console.log(data)
				if($(this).closest('.userChat').attr('id') == data.room){
					if(data.myname == $('.navbar-brand').text().substr(20)){
						$(this).append('<div class="contentChat"><p>'+ data.myname +' : </p><p>'+ data.data +'</p></div>');
					}else{	
						$(this).append('<div class="contentChat goRight"><p>'+ data.myname +' : </p><p>'+ data.data +'</p></div>');
					}
				}
			});
		});

		


	};

});