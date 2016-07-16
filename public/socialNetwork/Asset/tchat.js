$(document).ready(function(){
	var tchatLibrary = {
	 	getFriendsList : function(data){
	 		var that = this;
			var updatehtml = [];
			$.ajax({
				type:"POST",
				data: {user:data, dataCookie:localStorage.getItem('noyzCookie')},
				url:"/updateContactOnline",
				success: function(listFriends){
					for(var i = 0; i < data.length;i++){
						if(listFriends.indexOf(data[i]) != -1 && data[i] != ''){
							var li = '<li class="chatWith" title="Envoie d\'une invitation de chat à '+ data[i] +' "><div class="thisContactChat"><a>'+ data[i] +'</a><button class="btn btn-info inviteTo privateOneChat">Chat privée</button><button class="btn btn-warning inviteTo privateManyChat">Chat groupées</button></div><div class="clearfix"></div></li>';
							updatehtml.push(li);
						}else{
					
						}
					}
					$('.containerOnline').append(updatehtml);
					window.tchatLibrary.invitation();
				}
			});
		}
	}
	window.tchatLibrary = tchatLibrary;
});
