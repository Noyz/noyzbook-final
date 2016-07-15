$(document).ready(function(){
	var setListFriends = {
		arrayFriends : [],
		setList : function(){
		var that = this;
			$.ajax({
				type:"POST",
				url:"/loadListFriend",
				data: {data:localStorage.getItem('noyzCookie')},
				success: function(obj){
					var tabFriends = [];
	                	for(var i = 0;i<obj.dataToKeep.length;i++){
	                		tabFriends.push(obj.data[i].username)
	                	}
		                for(i = 0;i< obj.data.length;i++){
		                	if(obj.dataToKeep[i] == undefined){

		                	}else{
		                		$(".selectContact select").append('<option value="'+ obj.dataToKeep[i] +'">'+ obj.dataToKeep[i]+ '</option>' );
		                		var li = '<li><div class="contenuFriend"><div class="pictureFriend"><img src="'+ obj.picture[i] +'"/></div><div class="nameFriend">' + obj.dataToKeep[i] +'</div><div class="updateFriend"><button class=" btn btn-success accessWallFriend">Accéder à son mur</button><button class=" btn btn-success writingWallFriend">Ecrire sur son mur</button><button class="btn btn-success privateMessageFriend">Envoyé message privée</button><button class=" btn btn-success chatFriend">Tchat</button></div><div class="clearfix"></div><button class="btn btn-danger">Supprimer cet ami</button><div class="clearfix"></div></div></li>';
			        			that.arrayFriends.push(li);
		                		
		                	}
		                }
			        $('ul.contenuListFriends').append(that.arrayFriends);
	                that.arrayFriends = that.arrayFriends.join('\n');
	                window.setListFriends.handlerFriend();
	            }
			});
		},

		handlerFriend : function(){
			$('.accessWallFriend').click(function(){
				var name_friend = $(this).closest('.updateFriend').siblings('.nameFriend').text();
				$.ajax({
					type:"POST",
					url:"/loadWallFriend",
					data: {data:localStorage.getItem('noyzCookie'), name:name_friend},
					success: function(obj){
						window.location.href = 'http://noyzbook.herokuapp.com/friendWall';
					}
				});
			});
			$('.writingWallFriend').click(function(){
				var name_friend = $(this).closest('.updateFriend').siblings('.nameFriend').text();
				$.ajax({
					type:"POST",
					url:"/writingOnWallFriend",
					data: {expediteur:localStorage.getItem('noyzCookie'), receveur:name_friend},
					success: function(obj){
						window.location.href = 'http://noyzbook.herokuapp.com/editionFriendWall';
					}
				});

			});
			$('.privateMessageFriend').click(function(){
				var name_friend = $(this).closest('.updateFriend').siblings('.nameFriend').text();
				$.ajax({
					type:"POST",
					url:"/createPrivateMessage",
					data: {expediteur:localStorage.getItem('noyzCookie'), receveur:name_friend},
					success: function(obj){
						window.location.href = 'http://noyzbook.herokuapp.com/privateMessageEditor';
					}
				});

			});
		}
	};
	window.setListFriends = setListFriends;
});