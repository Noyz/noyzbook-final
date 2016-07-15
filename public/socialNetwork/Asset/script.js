$(document).ready(function(){

	var myCookie; 
	var user = {};

	/*** LAYOUT ***/
	$('.navbar-link').click(function(){
		localStorage.removeItem('noyzCookie');
	});


	/******** Main Page *********/
	$('.loginMain').click(function(){
		$('#login').show()
		$('#subscription').hide()
	});

	$('.subscriptionMain').click(function(){
		$('#login').hide();
		$('#subscription').show();
	});

	/**** Authentification Sub ****/
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
		               window.location.href = 'http://localhost:5000/myprofil';
		           }
	        });		
		}
	};


	/**** Authentification Log ****/

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
		             window.location.href = 'http://localhost:5000/myprofil';
		           }
		        });
		}else{
			$('.errorLog').css('color','red');
			$('.errorLog').text('Ce compte n\'existe pas');
		}
	};

	/*** Page profil***/
	if(/myprofil/.test(window.location.pathname)){
		window.profilLibrary.setUserName();
		window.profilLibrary.page_name();
		setTimeout(function(){
			window.profilLibrary.createListMessage();
		}, 800);		
	};

	// var alertNotification = function(){
	// 	$.ajax({
	// 		type:"POST",
	// 		data:{data:localStorage.getItem('noyzCookie')},
	// 		url:'/checkNotification',
	// 		success: function(data){
	// 			toggleNotification(data);
	// 		}
	// 	});
	// };
	// alertNotification();

	// var toggleNotification = function(userNotificationArray){
	// 	var handleUserNotification = setInterval(function(){
	// 		while(userNotificationArray.length > 0){
	// 			$('.notification').toggleClass('blink');
	// 		}
	// 	}, 3500);
	// };

	// setInterval(function(){
	// }, 5000);

	/*** WHICH PAGE ARE YOU ****/
	


	/*** Page Edition ***/
	if(/edition/.test(window.location.pathname)){
		window.profilLibrary.setUserName();
		window.profilLibrary.page_name();
		tinymce.init({
		  selector: 'textarea',
		  height: 300,
		  plugins: [
		    'advlist autolink lists link image charmap print preview anchor',
		    'searchreplace visualblocks code fullscreen',
		    'insertdatetime media table contextmenu paste code'
		  ],
		  toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
		  content_css: [
		    '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
		    '//www.tinymce.com/css/codepen.min.css'
		  ]
		});

		$('#editor').submit(function(event){
			event.preventDefault();
			user.message = tinyMCE.activeEditor.getContent();;
			user.dataCookie = localStorage.getItem('noyzCookie');
			$.ajax({
				type:"POST",
				data:user,
				url:"/sendMessage",
				success: function(data){
					console.log(data);
					window.location.href = 'http://localhost:5000/myprofil';
				}
			});
		});
	};

	
	/*** Page ListUser ***/	
	if(/listUsers/.test(window.location.pathname)){
		window.profilLibrary.setUserName();
		window.profilLibrary.page_name();
		setTimeout(function(){
			window.setListUsers.setList();
		}, 800);
	};

	/*** Page notification ***/
	if(/notifications/.test(window.location.pathname)){
		window.profilLibrary.setUserName();
		window.profilLibrary.page_name();
		window.setNotification.loadNotification();
	};

	/*** Page friends ***/
	if(/listFriends/.test(window.location.pathname)){
		window.profilLibrary.setUserName();
		window.profilLibrary.page_name();
		window.setListFriends.setList();
	};

	/*** Page friends wall ***/
	if(/friendWall/.test(window.location.pathname)){
		window.profilLibrary.setUserName();
		window.profilLibrary.page_name();
		window.setMessageOnFriendWall.setMessagePublicFriend();
	};

	/*** Page writing on friend wall ***/
	if(/editionFriendWall/.test(window.location.pathname)){
		window.profilLibrary.page_name();
		window.profilLibrary.setUserName();
		$('#editorFriendWall').submit(function(e){
			e.preventDefault();
			user.message = tinyMCE.activeEditor.getContent();		// contenu du message
			user.dataCookie = localStorage.getItem('noyzCookie');	//cookie de la personne connecté
			$.ajax({
				type:"POST",
				data:user,
				url:"/sendMessageToFriend",
				success: function(data){
					user.name = data[0].username;
					console.log(data[0])
					$.ajax({
						type:"POST",
						data:user,
						url:"/loadWallFriend",
						success: function(data){
							window.location.href = 'http://localhost:5000/friendWall';
						}
					})
				}
			})
		});
		
	};
	/***** Page privateMessage *****/
	if(/privateMessage/.test(window.location.pathname)){
		window.profilLibrary.setUserName();
		window.profilLibrary.page_name();
		window.privateMessageLibrary.setContactList();
		window.privateMessageLibrary.sendPrivateMessage();
		tinymce.init({
		  selector: 'textarea',
		  height: 100,
		  plugins: [
		    'advlist autolink lists link image charmap print preview anchor',
		    'searchreplace visualblocks code fullscreen',
		    'insertdatetime media table contextmenu paste code'
		  ],
		  toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
		  content_css: [
		    '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
		    '//www.tinymce.com/css/codepen.min.css'
		  ]
		});
	};
	/***** Page tchat *****/
	if(/tchat/.test(window.location.pathname)){
		window.profilLibrary.setUserName();
		window.profilLibrary.page_name();
		var socket = io.connect("http://localhost:5000");
		socket.on('askInfoUser', function(data){
			socket.emit('new user', $('.navbar-text strong').text().substr(14));
		});	
		socket.on("displayOnlineContact", function(data){
			// console.log(data)
			$('.containerOnline li').remove();
			var html = [];

			for(var i = 0; i < data.length;i++){
				var li = '<li>'+ data[i]+'</li>';
				html.push(li);
			}
			// console.log(data)
			getFriendsList(data);
			
		});

		var getFriendsList = function(data){
			// console.log(data);
			var updatehtml = [];
			$.ajax({
				type:"POST",
				data: {user:data, dataCookie:localStorage.getItem('noyzCookie')},
				url:"/updateContactOnline",
				success: function(listFriends){
					for(var i = 0; i < data.length;i++){
						if(listFriends.indexOf(data[i]) != -1){
							// console.log(data[i] + ' est bien est amie avec toi')
							var li = '<li class="chatWith" title="Envoie d\'une invitation de chat à '+ data[i] +' "><a>'+ data[i] +'</a></li>';
							updatehtml.push(li);
						}else{
							// console.log(data[i] + ' nest pas avec toi')
						}
					}
					$('.containerOnline').append(updatehtml);
					chatInvitation();
				}
			});
		};

		var chatInvitation = function(){
			$('.chatWith a').click(function(){
				socket.emit("sendInvitation", {userClicked : $(this).text(), currentUser : $('.navbar-text strong').text().substr(14)})
				$(this).append('<p id="invitationChatStatus">En attente de confirmation </p>');
			});
		};

		socket.on('notificationInvitation', function(data){
			$('.chatWith').each(function(x){
				if($(this).text() == data){
					$(this).append('<div><p class="accepterChat chatOffer">Accepter</p> <p class="refuserChat chatOffer">Refuser</p></div>');
					gestionInvitationChatStatus(data);
				}
			});
		});

		var gestionInvitationChatStatus = function(data){
			$('.accepterChat').click(function(){
				socket.emit('openNewChatBox', data);
			});
		};
		socket.on('chatOpen', function(data){
			$('.contactOnline').after('<div class="userChat"><p><span>Afficher</span> discussion avec '+ data +'</p><div class="chatScreen"><div class="chatWindow"></div><form class="chatForm"><textarea class="chatBox" style="width:80%"></textarea><input type="submit"/></form></div></div>');
			$('.chatForm').submit(function(e){
				e.preventDefault();
					socket.emit("send message", {messageTo:data, message: $('.chatBox').val()});
					$('.chatBox').val('');
			});
			socket.on("new message", function(data){
				for(var i = 0; i < $('div.userChat').length;i++){
					if($('.userChat').find('p').text().substr(25) == data.exp){
						$(this).find('.chatWindow').append(data.exp +' : ' + data.msg + '<br>');
					}
				}
			});
		});


	};
	
});