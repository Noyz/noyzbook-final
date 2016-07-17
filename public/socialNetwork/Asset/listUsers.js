$(document).ready(function(){
	var setListUsers = {
		arrayUsers : [],
		myInfo:null,
		obj:{},
		setList : function(){
		var that = this;
			$.ajax({
				type:"POST",
				url:"/loadList",
				data: {data:localStorage.getItem('noyzCookie')},
				success: function(obj){
					that.myInfo = obj.dataOwn; 
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
					that.disabled(obj.data);
	           }
			});
		},
		disabled:function(){
			var that = this;
			$('.contenuUser').each(function(x){
				for(var i = 0; i< that.myInfo.length;i++){
					if($(this).find('.nameUser').text() == that.myInfo[i]){
						$(this).find('button').attr('disabled',"disabled").text('En attente de confirmation');
					}
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
			var from = $('.navbar-brand').text().substr(20);
			$.ajax({
				type:"POST",
				url:"/requestThisUser",
				data: {from:from, to:name},
				success: function(data){
					$(that.obj.divers).after('<p class="invitationSent">Invitation envoyée !</p>');
					$(that.obj.divers).find('button').attr('disabled','disabled');
					$(that.obj.divers).find('button').text('En attente de confirmation');
					$.ajax({
						type:"POST",
						data: {dataCookie:localStorage.getItem('noyzCookie'), name:name},
						url:"/userInWaiting",
						success: function(data){
			            	console.log('hit')
			           	}
					});
					setTimeout(function(){
						$('.invitationSent').fadeOut(1000);
					}, 2000);
	           	}
			});
		}
	};
	window.setListUsers = setListUsers;
});