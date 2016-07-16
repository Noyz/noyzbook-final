$(document).ready(function(){
	var setListUsers = {
		arrayUsers : [],
		obj:{},
		setList : function(){
		var that = this;
			$.ajax({
				type:"POST",
				url:"/loadList",
				data: {data:localStorage.getItem('noyzCookie')},
				success: function(obj){
					console.log('hit')
					var from = $('.navbar-brand').text().substr(20);
					var tabUsers = [];
					that.arrayUsers = [];
	                	for(var i = 0;i<obj.data.length;i++){
	                		tabUsers.push(obj.data[i].username)
	                	}
		                for(i = 0;i< obj.data.length;i++){
		                	if(obj.data[i].username != from){
		                		var li = '<li><div class="contenuUser"><div class="pictureUser"><img src="'+ obj.data[i].profil +'"/></div><div class="nameUser">' + obj.data[i].username +'</div><div class="updateUser"><button class="btn btn-success addUser">Ajouter</button></div></div></li>'
		            			that.arrayUsers.push(li);
		                	}
		                }
	                that.arrayUsers = that.arrayUsers.join('\n');
			          $('ul.contenuListUsers').append(that.arrayUsers);
					that.updateUsers(obj);
	           }
			});
		},
		updateUsers : function(list){
			var that = this;
			$('.nameUser').each(function(){
				that.obj.divers = $(this).text();
				for(var i = 0;i < list.data.length;i++){
					if($(this).text() == list.dataToDelete[i]){
						$(this).closest('li').remove();
					}
				}
			});
			$('.addUser').on('click', function(){
				that.obj.divers = $(this).closest('div');
				var name_user = $(this).closest('.updateUser').siblings('.nameUser').html();
				$.ajax({
					type:"POST",
					data: {data:localStorage.getItem('noyzCookie'), name_user:name_user},
					url:"/addThisUser",
					success: function(data){
		            	window.setListUsers.sendRequestUser(data);
		           	}
				});
			});
		},
		sendRequestUser : function(name){
			var that = this;
			console.log(name)
			var from = $('.navbar-brand').text().substr(20);
			$.ajax({
				type:"POST",
				url:"/requestThisUser",
				data: {from:from, to:name},
				success: function(data){
					$(that.obj.divers).after('<p>Invitation envoyée !</p>');
					$(that.obj.divers).find('button').attr('disabled','disabled');
					setTimeout(function(){
						$(that.obj.divers).parent().fadeOut(1000);
					}, 2000);
	           	}
			});
		}
	};
	window.setListUsers = setListUsers;
});