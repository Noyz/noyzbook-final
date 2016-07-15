$(document).ready(function(){
	var user = {};
	/**** Vérification existanse cookie ****/
		if(location.pathname.length == 1){
			if(localStorage.getItem('noyzCookie')){
				window.location.href = 'http://noyzbook.herokuapp.com/accueil';
			}else{
				user.pseudo = $('.navbar-brand').text().substr(20);
			}
		};
	/**** Gestion Local storage ****/
	$('.navbar-brand').click(function(){
		localStorage.removeItem('noyzCookie');
		window.location.href = 'http://noyzbook.herokuapp.com';
	});

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
		               window.location.href = 'http://noyzbook.herokuapp.com/accueil';
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
		             window.location.href = 'http://noyzbook.herokuapp.com/accueil';
		           }
		        });
		}else{
			$('.errorLog').css('color','red');
			$('.errorLog').text('Ce compte n\'existe pas');
		}
	};
	/**** TOUTES LES PAGES ****/
	$.ajax({
       type: "POST",
       url: "/fetchName",
       data: {dataCookie:localStorage.getItem('noyzCookie')}, 
       success: function(obj){
       		if(location.pathname.length != 1){
				$('.navbar-brand').text($('.navbar-brand').text() + ' ' +  obj[0].username);
       		}
       }
    });

	/**** PAGE ACCUEIL ****/
	if(/accueil/.test(window.location.pathname)){
		$('.accueilShortcut').css('color','#5cb85c');
		setTimeout(function(){
			window.accueilLibrary.createListMessage();
		}, 800);		
	};
	/**** PAGE profil ****/
	if(/profil/.test(window.location.pathname)){
		$('.profilShortcut').css('color', '#5cb85c');
		window.profilLibrary.autoFilling();
		window.profilLibrary.updateInformation();
		window.profilLibrary.updatePassword();
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

});