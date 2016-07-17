$(document).ready(function(){
	var editionLibrary = {
		setTinymce : function(){
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
		},
		setTinymceUpdate : function(){
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
		},
		createNewArticle : function(){
			var user = {};
			$('#editor').on('submit', function(event){
				event.preventDefault();
				user.message = tinyMCE.activeEditor.getContent();
				user.dataCookie = localStorage.getItem('noyzCookie');
				$.ajax({
					type:"POST",
					data:user,
					url:"/sendMessage",
					success: function(data){
						window.location.href = 'http://noyzbook.herokuapp.com/accueil';
					}
				});
			});
		},
		editionWallFriend : function(){
			var user = {};
			$.ajax({
				type:"POST",
				data:'',
				url:"/getNameFriend",
				success: function(data){
					$('.redactionFriendWall p').text($('.redactionFriendWall p').text() + data.receveur);
				}
			});
			$('.publierOnFriendWall').click(function(e){
				e.preventDefault();
				user.message = tinyMCE.activeEditor.getContent();		// contenu du message
				user.dataCookie = localStorage.getItem('noyzCookie');	//cookie de la personne connecté
				$.ajax({
					type:"POST",
					data:user,
					url:"/sendMessageToFriend",
					success: function(data){
						user.name = data[0].username;
						$.ajax({
							type:"POST",
							data:user,
							url:"/loadWallFriend",
							success: function(data){
								window.location.href = 'http://noyzbook.herokuapp.com/friendWall';
							}
						})
					}
				})
			});
		},
		editionPrivateMessage:function(){
			var user = {};
			$.ajax({
				type:"POST",
				data:'',
				url:"/getNameFriendPrivateMessage",
				success: function(data){
					console.log(data);
					$('.destinataire').text($('.destinataire').text() + data.receveur);
				}
			});
		}
	}
	window.editionLibrary = editionLibrary;
});